const User = require('../models/user-model')
const Map = require('../models/map-model')
const Graphics = require('../models/graphics-model')
const Convert = require('../map-convert/map-conversion')
const path = require("path");
var zlib = require('zlib');
const mongoose = require('mongoose');

createMap = async (req,res) =>{
    const body = req.query;
    console.log("user id: " + req.userId)
    if (!body) {
        return res.status(400).json({
            success: false,
            errorMessage: 'You must provide a Map File',
        })
    }

    //check file extension for accepted types
    ext = path.extname(req.files[0].originalname)
    if(ext != ".json" && ext != ".shp" && ext != ".kml" && req.files[1] && path.extname(req.files[1].originalname) != ".dbf"){
        return res.status(400).json({
            success: false,
            errorMessage: 'Provided files are of the incorrect type. Only .json, .kml, .shp, and .dbf files!',
        })
    }
    
    let geojsonData = {}
    if(body.fileType == "kml"){
        geojsonData = Convert.convertKML(req.files[0])
    }
    else if(body.fileType == "shapefile"){
        geojsonData = await Convert.convertShapeFile(req.files[0], req.files[1])
    }
    else{
        geojsonData = Convert.convertJSON(req.files[0])
    }

    // deal with native file vs converting shape, kml, geojson
    if(Convert.checkNativeFileType(geojsonData)){
        let nativeFile = {...geojsonData}
        let tempMap = {...geojsonData}
        let geojson = {...nativeFile.graphics.geojson};


        if(!Convert.checkGeoJSON(geojson)){
            return res.status(400).json({
                success: false,
                errorMessage: 'Provided file is not correctly formatted or incorrectly converted. Please try another file!',
            })
        }

        // Check geojson for specific format for type if needed
        if(body.mapType == "Voronoi Map"){
            let message = Convert.checkVoronoiMap(geojson)
            if(message != ""){
                return res.status(400).json({
                    success: false,
                    errorMessage: message,
                })
            }
        }

        if(body.mapType !== body.mapType){
            return res.status(400).json({
                success: false,
                errorMessage: 'Provided Native map type was: ' + body.mapType + ". Selected map tap was: " + body.mapType,
            })
        }

        let graphic = {...nativeFile.graphics}
        var input = new Buffer.from(JSON.stringify(geojson), 'utf8')
        var deflated= zlib.deflateSync(input);

        graphic.geojson = deflated
        graphic.ownerUsername = body.ownerUsername

        const graphics = new Graphics(graphic)
        
        User.findOne({ _id: req.userId }).then( (user) => {
            if(user.username !== body.ownerUsername){
                return res.status(400).json({
                    success:false,
                    errorMessage: 'Authentication Error, please log in again!'
                })
            }
            console.log("user found: " + JSON.stringify(user));
            
            graphics
                .save()
                .then(()=>{
                    // Give file values it wouldn't be exported with
                    nativeFile.graphics = graphics._id
                    nativeFile.ownerUsername = user.username
                    nativeFile.publishDate = Date.now()
                    nativeFile.reactions = {
                        comments:[],
                        likes:[],
                        dislikes:[],
                    }
                    nativeFile.imageBuffer = ""
                    nativeFile.mapType = body.mapType

                    const map = new Map(nativeFile);
                    
                    user.mapsOwned.push(map._id);
                    user
                        .save()
                        .then(() => {
                            map
                                .save()
                                .then(() => {
                                    console.log("map id: " + map._id)
                                    //Show actual geojson data not ID or zipped
                                    tempMap.ownerUsername = user.username
                                    tempMap.publishDate = Date.now()
                                    tempMap.reactions = {
                                        comments:[],
                                        likes:[],
                                        dislikes:[],
                                    }
                                    tempMap.mapType = body.mapType
                                    tempMap._id = map._id
                                    return res.status(201).json({
                                        success: true,
                                        map: tempMap,
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
                        errorMessage: 'Map Not Created. File Size too big or wrong format.'
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

    //Convert other file types.
    else{

        if(!Convert.checkGeoJSON(geojsonData)){
            return res.status(400).json({
                success: false,
                errorMessage: 'Provided file is not correctly formatted or incorrectly converted. Please try another file!',
            })
        }


        // Check geojson for specific format for type if needed
        if(body.mapType == "Voronoi Map"){
            let message = Convert.checkVoronoiMap(geojsonData)
            if(message != ""){
                return res.status(400).json({
                    success: false,
                    errorMessage: message,
                })
            }
        }

        if(body.mapType == "Chloropleth Map"){
            let message = Convert.checkChloroplethMap(geojsonData)
            if(message != ""){
                return res.status(400).json({
                    success: false,
                    errorMessage: message,
                })
            }
        }

        let graphic = {}

        var input = new Buffer.from(JSON.stringify(geojsonData), 'utf8')
        let origSize = Buffer.byteLength(input)
        var deflated= zlib.deflateSync(input);

        let size = Buffer.byteLength(deflated)

        graphic.geojson = deflated
        // Here we give basic properties to the graphics. Here we should give special properties based on the type of map To be done tomorrow
        graphic.legend =
            {
                hideLegend: false,
                legendFillColor: "#FFFFFF",
                legendBorderColor: "#ff24bd",
                legendBorderWidth: 1,
                legendTitle: "Example Title",
                legendFields:[
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
                dotPoints: null,
                dotScale: null,
                property: null,
                spikeData: null,
                spikeLegend: null,
                chloroLegend: null,
        }
        graphic.fill = {
                hasFill: true,
                fillColor: "#B9B0B0",
                fillOpacity: 0.7,
            }
        graphic.stroke = {
            hasStroke: true,
            strokeColor: "#B9B0B0",
            strokeWeight: 3.0,
            strokeOpacity: 1.0,
            }
        graphic.text = {
                textColor: "#B9B0B0",
                textFont: "Nova Square",
                textSize: 12
            }
        graphic.ownerUsername = body.ownerUsername

        
        const graphics = new Graphics(graphic)
        
        User.findOne({ _id: req.userId }).then( (user) => {
            console.log("user found: " + JSON.stringify(user));
            if(user.username !== body.ownerUsername){
                return res.status(400).json({
                    success:false,
                    errorMessage: 'Authentication Error, please log in again!'
                })
            }
            graphics
                .save()
                .then(()=>{
                    //console.log(JSON.parse(zlib.inflateSync(Buffer.from(graphics.geojson)).toString("utf-8")));
                    tempMap = {
                        title: "Map Example",
                        ownerUsername: body.ownerUsername,
                        reactions:{
                            comments:[],
                            likes:[],
                            dislikes:[],
                        },
                        isPublic: false,
                        type: body.mapType,
                        publishDate: body.publishedDate,
                        imageBuffer: ""
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
                                    console.log("map id: " + map._id)
                                    //Show actual geojson data not ID or zipped
                                    graphic.geojson = geojsonData
                                    tempMap.graphics = graphic
                                    tempMap._id = map._id;
                                    return res.status(201).json({
                                        success: true,
                                        map: tempMap,
                                        size: [size, origSize],
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
}
forkMap = async (req, res) =>{
    console.log("Forking Map with id: " + JSON.stringify(req.params.id))

    User.findOne({ _id: req.userId }).then((user) => {
        console.log("User found");
        Map.findById({ _id: req.params.id }).then((map) => {
            console.log("Map found");
            Graphics.findOne({ _id: map.graphics }).then((graphics) => {
                if (graphics) {
                    const copiedGraphics = new Graphics({
                        geojson: graphics.geojson,
                        legend: graphics.legend,
                        typeSpecific: graphics.typeSpecific,
                        region: graphics.region,
                        text: graphics.text,
                        ownerUsername: graphics.ownerUsername,
                    });
                    copiedGraphics.save()
                    .then((newGraphics) => {
                        console.log('New graphics created and saved:', newGraphics);
                        // You can perform further actions here if needed
                        const copiedMap = new Map({
                            title: "Copy of " + map.title,
                            ownerUsername: user.username,
                            reactions: {
                                comments:[],
                                likes:[],
                                dislikes:[],
                            },
                            imageBuffer: map.imageBuffer,
                            graphics: newGraphics._id,
                            isPublic: false,
                            type: map.type,
                        })
                        copiedMap.save()
                            .then((newMap) => {
                                console.log("New Map Created!!!");
                                user.mapsOwned.push(map._id);
                                console.log("Pushed to", user.username)
                                user.save().then(() => {
                                    let tempMap = {...newMap}._doc
                                    tempMap.graphics = {...newGraphics}._doc
                                    tempMap.graphics.geojson = JSON.parse(zlib.inflateSync(Buffer.from(newGraphics.geojson)).toString("utf-8"));
                                    if(tempMap.imageBuffer){
                                        decompressedImage = Buffer.from(newMap.imageBuffer, 'base64');
                                        decompressedImage = zlib.inflateSync(decompressedImage)
                                        decompressedImage = decompressedImage.toString('utf8');
                                        tempMap.imageBuffer = decompressedImage;
                                    }
                                    console.log(tempMap.reactions)
                                    console.log("SUCCESSFUL")
                                    return res.status(200).json({ success: true, map: tempMap })

                                })

                            })
                            .catch((error) => {
                                console.error('Error creating and saving new map:', error);
                                return res.status(400).json({ success: false, error: error })
                            })
                    
                    })
                    .catch((error) => {
                        console.error('Error creating and saving new graphics:', error);
                        return res.status(400).json({ success: false, error: error })

                    });
                }
            })
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
                        console.log("map deleted");
                        Graphics.findOneAndDelete({ _id: map.graphics }).then(() => {
                            console.log("graphics deleted");
                            user.mapsOwned.pull(new mongoose.Types.ObjectId(req.params.id));
                            user.save().then(() => {
                                return res.status(200).json({ success: true });
                            }).catch(err => console.log(err));
                        
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
            tempMap = {...map}._doc;
            tempMap.graphics = {...graphics}._doc
            tempMap.graphics.geojson = JSON.parse(zlib.inflateSync(Buffer.from(graphics.geojson)).toString("utf-8"));
            if(tempMap.imageBuffer){
                decompressedImage = Buffer.from(map.imageBuffer, 'base64');
                decompressedImage = zlib.inflateSync(decompressedImage)
                decompressedImage = decompressedImage.toString('utf8');
                tempMap.imageBuffer = decompressedImage;
            }

            console.log("correct user!");
            return res.status(200).json({ success: true, map: tempMap })
        }).catch((err) => {
            console.log(err)
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
            console.log("find all maps owned by " + username);
            //console.log("Title parameter: " + req.query.title);
            Map.find({ ownerUsername: username}).then((maps) => {
                // console.log("found Maps: " + JSON.stringify(maps));
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
                        let decompressedImage = null;
                        if(map.imageBuffer){
                            decompressedImage = Buffer.from(map.imageBuffer, 'base64');
                            decompressedImage = zlib.inflateSync(decompressedImage)
                            decompressedImage = decompressedImage.toString('utf8');
                            // decompressedImage = 
                        }
        
                        let pair = {
                            _id: map._id,
                            title: map.title,
                            ownerUsername: map.ownerUsername,
                            reactions: map.reactions,
                            graphics: map.graphics,
                            isPublic: map.isPublic,
                            publishDate: map.publishDate,
                            imageBuffer: decompressedImage
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
                let decompressedImage = null;
                if(map.imageBuffer){
                    decompressedImage = Buffer.from(map.imageBuffer, 'base64');
                    decompressedImage = zlib.inflateSync(decompressedImage)
                    decompressedImage = decompressedImage.toString('utf8');
                    // decompressedImage = 
                }

                let pair = {
                    _id: map._id,
                    title: map.title,
                    ownerUsername: map.ownerUsername,
                    reactions: map.reactions,
                    graphics: map.graphics,
                    isPublic: map.isPublic,
                    publishDate: map.publishDate,
                    type: map.type,
                    imageBuffer: decompressedImage
                };
                pairs.push(pair);
            }
            return res.status(200).json({ success: true, idNamePairs: pairs })
        }
    }).catch(err => {return res.status(400).json({ success: false, error: err })})
}
function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}
updateMapById = async (req, res) => {
    const body = req.body
    console.log("BODY")
    // console.log("updateMapById: " + JSON.stringify(body.map));
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
            // console.log("user._id: " + user._id);
            // console.log("username: " + user.username);
            // console.log("req.userId: " + req.userId);
            if (user._id == req.userId) {

                // console.log(map)

                map.title = body.map.title;
                // console.log(body.map.title)

                let temp1 = map.reactions;
                let temp2 = body.map.reactions;

                if (!arraysAreEqual(temp1.comments, temp2.comments) || 
                    !arraysAreEqual(temp1.likes, temp2.likes) || 
                    !arraysAreEqual(temp1.dislikes, temp2.dislikes)) {
                    console.log(temp1)
                    console.log(temp2)
                    // Update map.reactions with body.map.reactions
                    map.reactions = {...body.map.reactions};
                }
                // console.log(map.reactions)
                // console.log(body.map.reactions)
                // console.log(map.reactions == body.map.reactions)

                // let temp = map.imageBuffer;
                map.imageBuffer =  zlib.deflateSync(body.map.imageBuffer).toString('base64');
                map.isPublic = body.map.isPublic;
                
                // let temp2 = zlib.inflateSync(Buffer.from(graphics.geojson)).toString("base64")

                // console.log(temp == temp2)
                // map.imageBuffer = body.map.imageBuffer
                if(body.map.publishDate)
                    map.publishDate = body.map.publishDate;
                if(body.chloro)
                    body.map.graphics.typeSpecific.chloroLegend = body.chloro
                
                map
                    .save()
                    .then(() => {
                        var tempGraphics = {...body.map.graphics};
                        // console.log("------")
                        // console.log(body.map.graphics)
                        // console.log("GRAPHICS") 

                        var input = new Buffer.from(JSON.stringify(body.map.graphics.geojson), 'utf8')
                        var deflated= zlib.deflateSync(input);
                        body.map.graphics.geojson = deflated;
                        Graphics.findByIdAndUpdate(
                            map.graphics,
                            body.map.graphics,
                            // { new: true }
                        ).then(() => {
                            let tempMap = {...map}._doc
                            
                            tempMap.graphics = tempGraphics;
                            tempMap.imageBuffer = body.map.imageBuffer
                            return res.status(200).json({
                                success: true,
                                map: tempMap,
                                message: 'Map updated!',
                            })
                        }).catch(error => {
                            console.log("Graphics FAILURE: " + JSON.stringify(error));
                            return res.status(404).json({
                                error,
                                message: 'Map not updated!',
                            })
                        })
                    })
                    .catch(error => {
                        console.log("FAILURE1: " + JSON.stringify(error));
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
                        console.log("FAILURE2: " + JSON.stringify(error));
                        return res.status(404).json({
                            error,
                            message: 'Map not updated!',
                        })
                    })
            }
        }).catch((err) => {
            console.log("FAILURE3: " + JSON.stringify(err));
            return res.status(404).json({
                err,
                message: 'Map not updated!',
                mapBuffer: map
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
    forkMap,
    updateMapById,
    getMapById,
    getUserMapIdPairs,
    getPublicMapIdPairs
}