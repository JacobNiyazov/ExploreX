const Graphics = require('../models/graphics-model')
const User = require('../models/user-model')

createGraphics = (req,res) =>{
    const body = req.body;
    //console.log("createGraphics body: " + JSON.stringify(body));
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Map Graphic',
        })
    }

    const graphics = new Graphics(body);
    User.findOne({ _id: req.userId }).then( (user) => {
        console.log("user found: " + JSON.stringify(user));
        graphics
            .save()
            .then(() => {
                return res.status(201).json({
                    graphics: graphics
                })
            })
            .catch(error => {
                console.log(error)
                return res.status(400).json({
                    errorMessage: 'Map Graphics Not Created!'
                })
            })
    }).catch(error => {
        console.log(error)
        return res.status(400).json({
            errorMessage: 'User not found and Map Graphics Not Created!'
        })
    })
}
deleteGraphics = (req, res) =>{
    console.log("delete Map Graphics with id: " + JSON.stringify(req.params.id));
    console.log("delete " + req.params.id);
    Graphics.findById({ _id: req.params.id }).then((graphics) => {
        //console.log("Map Graphics found: " + JSON.stringify(graphics));

        // DOES THIS MAP GRAPHICS BELONG TO THIS USER?
        async function asyncFindUser(graphics) {
            User.findOne({ username: graphics.ownerUsername }).then((user) => {
                console.log("user._id: " + user._id);
                console.log("req.userId: " + req.userId);
                if (user._id == req.userId) {
                    console.log("correct user!");
                    Graphics.findOneAndDelete({ _id: req.params.id }).then(() => {
                        return res.status(200).json({ success: true });
                    }).catch(err => console.log(err))
                }
                else {
                    console.log("incorrect user!");
                    return res.status(400).json({ 
                        errorMessage: "authentication error" 
                    });
                }
            });
        }
        asyncFindUser(graphics);
    }).catch((err) => {
        return res.status(404).json({
            errorMessage: 'Map Graphics not found!',
        })
    })
}

getGraphicsById = async (req, res) => {
    console.log("Find Map Graphics with id: " + JSON.stringify(req.params.id));

    
    Graphics.findById({ _id: req.params.id }).then((graphics) => {
        //console.log("Found map graphics: " + JSON.stringify(graphics));
        // DOES THIS MAP BELONG TO THIS USER?
        /*async function asyncFindUser(map) {
            await User.findOne({ email: map.ownerEmail }, (err, user) => {
                console.log("user._id: " + user._id);
                console.log("req.userId: " + req.userId);
                if (user._id == req.userId) {
                    console.log("correct user!");*/
                    return res.status(200).json({ success: true, graphics: graphics })
                /*}
                else {
                    console.log("incorrect user!");
                    return res.status(400).json({ success: false, description: "authentication error" });
                }
            });
        }
        asyncFindUser(map);*/
    }).catch((err) => {
        console.log(graphics)
        return res.status(400).json({ success: false, error: err });
    })
}

updateGraphicsById = async (req, res) => {
    const body = req.body
    //console.log("updateMapById: " + JSON.stringify(body.map));
    //console.log("req.body.title: " + req.body.title);

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Graphics.findOne({ _id: req.params.id }).then((graphics) => {
        //console.log("map found: " + JSON.stringify(map));
        // DOES THIS MAP BELONG TO THIS USER?
        async function asyncFindUser(graphics) {
            User.findOne({ username: graphics.ownerUsername }).then((user) => {
                //console.log("user._id: " + user._id);
                console.log("req.userId: " + req.userId);
                if (user._id == req.userId) {
                    //console.log("correct user!");
                    //console.log("req.body.name: " + req.body.name);

                    graphics.type = body.graphics.type;
                    graphics.ownerUsername = body.graphics.ownerUsername;
                    graphics.features = body.graphics.features;
                    graphics
                        .save()
                        .then(() => {
                            console.log("SUCCESS!!!");
                            return res.status(200).json({
                                success: true,
                                id: graphics._id,
                                message: 'Map Graphics updated!',
                            })
                        })
                        .catch(error => {
                            console.log("FAILURE: " + JSON.stringify(error));
                            return res.status(404).json({
                                error,
                                message: 'Map Graphics not updated!',
                            })
                        })
                }
                else {
                    console.log("incorrect user!");
                    return res.status(400).json({ success: false, description: "authentication error" });
                }
            });
        }
        asyncFindUser(graphics);
    }).catch((err) =>{
        return res.status(404).json({
            err,
            message: 'Map Graphics not found!',
        })
    })
}


module.exports = {
    createGraphics,
    deleteGraphics,
    updateGraphicsById,
    getGraphicsById,
}