const User = require('../models/user-model')
const Map = require('../models/map-model')
const Graphics = require('../models/graphics-model')
const Convert = require('../map-convert/map-conversion')
var zlib = require('zlib');


createMap = async (req,res) =>{
    const body = req.query;
    console.log("user id: " + req.userId)
    if (!body) {
        return res.status(400).json({
            success: false,
            errorMessage: 'You must provide a Map File',
        })
    }

    console.log(body)
    let geojsonData = {}
    if(body.fileType == "kml"){
        geojsonData = Convert.convertKML(req.files[0])
    }
    else if(body.fileType == "shapefile"){
        geojsonData = await Convert.convertShapeFile(req.files[1], req.files[0])
    }
    else{// check if native file type TODO
        geojsonData = Convert.convertJSON(req.files[0])
    }

    if(!Convert.checkGeoJSON(geojsonData)){
        return res.status(400).json({
            success: false,
            errorMessage: 'Provided file is not correctly formatted or incorrectly converted. Please try another file!',
        })
    }

    let graphic = {}

    var input = new Buffer.from(JSON.stringify(geojsonData), 'utf8')
    var deflated= zlib.deflateSync(input);

    graphic.geojson = deflated
    // Here we give basic properties to the graphics. Here we should give special properties based on the type of map To be done tomorrow
    graphic.legend =
        {
            hideLegend: false,
            fillColor: "#FFFFFF",
            borderColor: "#FFFFFF",
            borderWidth: 1,
            title: "Example Title",
            fields:[
            {
                fieldColor:"#FF0000",
                fieldText:"Field 1"
            },
            {
                fieldColor:"#000000",
                fieldText:"Field 2"
            },
            {
                fieldColor:"#FFFFFF",
                fieldText:"Field 3"
            },
            ]
        }

    graphic.typeSpecific =
        {
            selectAll: false,
            size: 0,
            dotColor: "#000000",
            color: "#FFFFFF",
            range:3,
            spikeColor: "#FFFFFF",
        }
    graphic.region = {
            fillColor: "#FFFFFF",
            borderColor: "#FFFFFF",
            borderWidth: 1,
            size: 12
        }
    graphic.text = {
            color: "#FFFFFF",
            font: "Nova Square",
            size: 12
        }
    graphic.ownerUsername = body.ownerUsername

    console.log(graphic)
    
    const graphics = new Graphics(graphic)
    
    User.findOne({ _id: req.userId }).then( (user) => {
        console.log("user found: " + JSON.stringify(user));
        
        graphics
            .save()
            .then(()=>{
                tempMap = {
                    title: "Map Example",
                    ownerUsername: body.ownerUsername,
                    reactions:{
                        comments:[],
                    likes:0,
                    dislikes:0,
                    },
                    isPublic: false,
                    type: body.mapType,
                    publishDate: body.publishedDate,
                }
                tempMap.graphics = graphics._id
                const map = new Map(tempMap);
                
                user.mapsOwned.push(map._id);
                user
                    .save()
                    .then(() => {
                        map
                            .save()
                            .then(() => {
                                //Show actual geojson data not ID or zipped
                                graphic.geojson = geojsonData
                                tempMap.graphics = graphic
                                return res.status(201).json({
                                    success: true,
                                    map: tempMap
                                })
                            })
                            .catch(error => {
                                console.log(error)
                                return res.status(400).json({
                                    success:false,
                                    errorMessage: 'Map Not Created!'
                                })
                            }) 
                    })
                
            }).catch((err) => {
                console.log(err)
                return res.status(400).json({
                    success:false,
                    errorMessage: 'Map Not Created. File Size too big.'
                })
            });
    }).catch(error => {
        console.log(error)
        return res.status(400).json({
            success:false,
            errorMessage: 'Authentication Error, please log in again!'
        })
    })
}
deleteMap = async (req, res) =>{
    console.log("delete Map with id: " + JSON.stringify(req.params.id));
    console.log("delete " + req.params.id);
    Map.findById({ _id: req.params.id }).then((map) => {
        console.log("Map found: " + JSON.stringify(map));

        // DOES THIS MAP BELONG TO THIS USER?
        async function asyncFindUser(map) {
            User.findOne({ username: map.ownerUsername }).then((user) => {
                console.log("user._id: " + user._id);
                console.log("req.userId: " + req.userId);
                if (user._id == req.userId) {
                    console.log("correct user!");
                    Map.findOneAndDelete({ _id: req.params.id }).then(() => {
                        Graphics.findOneAndDelete({ _id: map.graphics }).then(() => {
                            return res.status(200).json({ success: true });
                        }).catch(err => console.log(err))
                    }).catch(err => console.log(err))
                }
                else {
                    console.log("incorrect user!");
                    return res.status(400).json({ 
                        errorMessage: "Authentication Error" 
                    });
                }
            });
        }
        asyncFindUser(map);
    }).catch((err) => {
        return res.status(404).json({
            errorMessage: 'Map not found!',
        })
    })
}

getMapById = async (req, res) => {
    console.log("Find Map with id: " + JSON.stringify(req.params.id));

    
    Map.findById({ _id: req.params.id }).then((map) => {
        console.log("Found map: " + JSON.stringify(map));
        Graphics.findOne({ _id: map.graphics }).then((graphics) => {
            graphics.geojson = JSON.parse(zlib.inflateSync(graphics.geojson).toString("utf-8"));
            map.graphics = graphics;
            console.log("correct user!");
            return res.status(200).json({ success: true, map: map })
        }).catch((err) => {
            return res.status(400).json({ success: false, error: err });
        })
    }).catch((err) => {
        return res.status(400).json({ success: false, error: err });
    })
}

getUserMapIdPairs = async (req, res) => {
    console.log("getMapPairs");
    User.findOne({ _id: req.userId }).then((user) => {
        console.log("find user with id " + req.userId);
        async function asyncFindMap(username) {
            console.log("find all Playlists owned by " + username);
            console.log("Title parameter: " + req.query.title);
            Map.find({ ownerUsername: username, title: {"$regex": req.query.title, "$options": "i"} }).then((maps) => {
                console.log("found Maps: " + JSON.stringify(maps));
                if (!maps) {
                    console.log("!maps.length");
                    return res
                        .status(404)
                        .json({ success: false, error: 'Maps not found' })
                }
                else {
                    console.log("Send the Maps pairs");
                    // PUT ALL THE LISTS INTO ID, NAME PAIRS
                    
                    let pairs = [];
                    for (let key in maps) {
                        let map = maps[key];
                        let pair = {
                            _id: map._id,
                            title: map.title,
                            ownerUsername: map.ownerUsername,
                            reactions: map.reactions,
                            graphics: map.graphics,
                            isPublic: map.isPublic,
                            publishDate: map.publishDate,
                        };
                        pairs.push(pair);
                    }
                    return res.status(200).json({ success: true, idNamePairs: pairs })
                }
            }).catch(err => {
                return res.status(400).json({ success: false, error: err })
            })
        }
        asyncFindMap(user.username);
    }).catch(err => {return res.status(400).json({ success: false, error: err })})
}

getPublicMapIdPairs = async (req, res) => {
    console.log("getPublicMapIdPairs:");
    Map.find({ isPublic : true }).then((maps) => {
        console.log("found Maps: " + JSON.stringify(maps));
        if (!maps) {
            console.log("!maps.length");
            return res
                .status(404)
                .json({ success: false, error: 'Maps not found' })
        }
        else {
            console.log("Send the map pairs");
            // PUT ALL THE MAPS INTO ID, NAME PAIRS
            let pairs = [];
            for (let key in maps) {
                let map = maps[key];
                let pair = {
                    _id: map._id,
                    title: map.title,
                    ownerUsername: map.ownerUsername,
                    reactions: map.reactions,
                    graphics: map.graphics,
                    isPublic: map.isPublic,
                    publishDate: map.publishDate,
                };
                pairs.push(pair);
            }
            return res.status(200).json({ success: true, idNamePairs: pairs })
        }
    }).catch(err => {return res.status(400).json({ success: false, error: err })})
}

updateMapById = async (req, res) => {
    const body = req.body
    //console.log("updateMapById: " + JSON.stringify(body.map));
    //console.log("req.body.title: " + req.body.title);

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Map.findOne({ _id: req.params.id }).then((map) => {
        //console.log("map found: " + JSON.stringify(map));
        // DOES THIS MAP BELONG TO THIS USER?
        User.findOne({ username: map.ownerUsername }).then((user) => {
            console.log("user._id: " + user._id);
            console.log("username: " + user.username);
            console.log("req.userId: " + req.userId);
            if (user._id == req.userId) {
                console.log("correct user!");
                console.log("req.body.name: " + req.body.name);

                map.title = body.map.title;
                map.reactions = body.map.reactions;
                if(body.map.publishDate)
                    map.publishDate = body.map.publishDate;
                map
                    .save()
                    .then(() => {
                        Graphics.findOne({ _id: map.graphics }).then((graphics) => {
                            graphics = body.map.graphics
                            graphics
                                .save()
                                .then(()=>{
                                    console.log("SUCCESS!!!");
                                    return res.status(200).json({
                                        success: true,
                                        id: map._id,
                                        message: 'Map updated!',
                                    })
                                })
                        })
                    })
                    .catch(error => {
                        console.log("FAILURE: " + JSON.stringify(error));
                        return res.status(404).json({
                            error,
                            message: 'Map not updated!',
                        })
                    })
            }
            else{
                //If not then we can only update likes/dislikes/comments
                map.reactions = body.map.reactions
                map
                    .save()
                    .then(() => {
                        console.log("SUCCESS!!!");
                        return res.status(200).json({
                            success: true,
                            id: map._id,
                            message: 'Map updated!',
                        })
                    })
                    .catch(error => {
                        console.log("FAILURE: " + JSON.stringify(error));
                        return res.status(404).json({
                            error,
                            message: 'Map not updated!',
                        })
                    })
            }
        }).catch((err) => {
            console.log("FAILURE: " + JSON.stringify(err));
            return res.status(404).json({
                err,
                message: 'Map not updated!',
            })
        });
    }).catch((err) =>{
        return res.status(404).json({
            err,
            message: 'Map not found!',
        })
    })
}


module.exports = {
    createMap,
    deleteMap,
    updateMapById,
    getMapById,
    getUserMapIdPairs,
    getPublicMapIdPairs
}