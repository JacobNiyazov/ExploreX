//const User = require('../models/user-model')
const Map = require('../models/map-model')

// i have to use dummy variables rn 
createMap = (req,res) =>{
    const body = req.body;
    console.log("createMap body: " + JSON.stringify(body));
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Map',
        })
    }

    const map = new Map(body);
    /*User.findOne({ _id: req.userId }, (err, user) => {
        console.log("user found: " + JSON.stringify(user));
        user.mapsOwned.push(map._id);
        user
            .save()
            .then(() => {*/
                map
                    .save()
                    .then(() => {
                        return res.status(201).json({
                            map: map
                        })
                    })
                    .catch(error => {
                        console.log(error)
                        return res.status(400).json({
                            errorMessage: 'Map Not Created!'
                        })
                    })
            /*});
    })*/
}
deleteMap = (req, res) =>{
    console.log("delete Map with id: " + JSON.stringify(req.params.id));
    console.log("delete " + req.params.id);
    Map.findById({ _id: req.params.id }).then((map) => {
        console.log("Map found: " + JSON.stringify(map));

        // DOES THIS MAP BELONG TO THIS USER?
        /*async function asyncFindUser(map) {
            User.findOne({ email: map.ownerEmail }, (err, user) => {
                console.log("user._id: " + user._id);
                console.log("req.userId: " + req.userId);
                if (user._id == req.userId) {
                    console.log("correct user!");*/
                    Map.findOneAndDelete({ _id: req.params.id }).then(() => {
                        return res.status(200).json({ success: true });
                    }).catch(err => console.log(err))
                /*}
                else {
                    console.log("incorrect user!");
                    return res.status(400).json({ 
                        errorMessage: "authentication error" 
                    });
                }
            });
        }
        asyncFindUser(map);*/
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
        if(map.published){
            console.log("map is public");
            return res.status(200).json({ success: true, map: map })
        }
        // DOES THIS MAP BELONG TO THIS USER?
        /*async function asyncFindUser(map) {
            await User.findOne({ email: map.ownerEmail }, (err, user) => {
                console.log("user._id: " + user._id);
                console.log("req.userId: " + req.userId);
                if (user._id == req.userId) {
                    console.log("correct user!");*/
                    return res.status(200).json({ success: true, map: map })
                /*}
                else {
                    console.log("incorrect user!");
                    return res.status(400).json({ success: false, description: "authentication error" });
                }
            });
        }
        asyncFindUser(map);*/
    }).catch((err) => {
        console.log(map)
        return res.status(400).json({ success: false, error: err });
    })
}

getUserMapIdPairs = async (req, res) => {
    console.log("getMapPairs");
    /*await User.findOne({ _id: req.userId }, (err, user) => {
        console.log("find user with id " + req.userId);*/
        async function asyncFindMap(username) {
            console.log("find all Playlists owned by " + username);
            await Map.find({ ownerUsername: username, name: {"$regex": req.query.name, "$options": "i"} }, (err, maps) => {
                console.log("found Maps: " + JSON.stringify(maps));
                if (err) {
                    return res.status(400).json({ success: false, error: err })
                }
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
                            publishedDate: map.publishedDate,
                        };
                        pairs.push(pair);
                    }
                    return res.status(200).json({ success: true, idNamePairs: pairs })
                }
            }).catch(err => console.log(err))
        }
        /*asyncFindMap(user.email);
    }).catch(err => console.log(err))*/
}

getPublicMapIdPairs = async (req, res) => {
    console.log("getPublicMapIdPairs:");
    await Map.find({ published: true }, (err, maps) => {
        console.log("found Maps: " + JSON.stringify(maps));
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
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
                    publishedDate: map.publishedDate,
                };
                pairs.push(pair);
            }
            return res.status(200).json({ success: true, idNamePairs: pairs })
        }
    }).catch(err => console.log(err))
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
        /*async function asyncFindUser(map) {
            await User.findOne({ email: map.ownerUsername }, (err, user) => {*/
                //console.log("user._id: " + user._id);
                console.log("req.userId: " + req.userId);
                //if (user._id == req.userId) {
                    //console.log("correct user!");
                    //console.log("req.body.name: " + req.body.name);

                    map.title = body.map.title;
                    map.ownerUsername = body.map.ownerUsername;
                    map.reactions = body.map.reactions;
                    map.graphics = body.map.graphics;
                    if(body.map.publishDate)
                        map.publishDate = body.map.publishDate;
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
                //}\
                /*
                else {
                    //Amy do something here
                    //If not then we can only update likes/dislikes/comments
                    map.reactions.comments = body.map.comments;
                    map.reactions.likes = body.map.likes;
                    map.reactions.dislikes = body.map.dislikes;
                    map
                        .save()
                        .then(() => {
                            console.log("SUCCESS!!!");
                            return res.status(200).json({
                                success: true,
                                id: list._id,
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
                }*/
            /*});
        }
        asyncFindUser(map);*/
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