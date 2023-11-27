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

    console.log(body)

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
                        likes:0,
                        dislikes:0,
                    }
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
                                        likes:0,
                                        dislikes:0,
                                    }
                                    tempMap.mapType = body.mapType
                                    tempMap._id = map._id
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
                dotPoints: null,
                dotScale: null,
                property: null,
                spikeData: null,
            spikeLegend: null
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
                                    console.log("map id: " + map._id)
                                    //Show actual geojson data not ID or zipped
                                    graphic.geojson = geojsonData
                                    tempMap.graphics = graphic
                                    tempMap._id = map._id;
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
            console.log(tempMap)

            // console.log(graphics.geojson)
            delete tempMap.graphics.geojson
            let poland = {"type":"FeatureCollection", "features": [
                {"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[19.4698,50.9154],[19.4628,50.91],[19.4642,50.8963],[19.4711,50.8859],[19.4863,50.8797],[19.5092,50.8811],[19.5251,50.8941],[19.5523,50.9001],[19.5697,50.9083],[19.5867,50.9053],[19.6139,50.8773],[19.618,50.8805],[19.6422,50.8788],[19.6616,50.8744],[19.6578,50.8633],[19.6701,50.8487],[19.6829,50.8452],[19.7279,50.8433],[19.7411,50.852],[19.7471,50.866],[19.7923,50.8508],[19.8194,50.8385],[19.8257,50.825],[19.8186,50.8207],[19.8205,50.8076],[19.8095,50.8036],[19.7842,50.8178],[19.7761,50.7995],[19.7954,50.7837],[19.7705,50.7773],[19.7417,50.7547],[19.7266,50.771],[19.721,50.7631],[19.7058,50.7618],[19.7044,50.7523],[19.7195,50.733],[19.7129,50.7292],[19.755,50.716],[19.7788,50.7217],[19.7937,50.7206],[19.8108,50.7254],[19.8083,50.7059],[19.8474,50.7018],[19.8504,50.6906],[19.8717,50.693],[19.873,50.683],[19.8616,50.6795],[19.8587,50.671],[19.8445,50.6668],[19.8352,50.6514],[19.8571,50.6459],[19.8829,50.6453],[19.8888,50.6366],[19.9098,50.642],[19.9222,50.6394],[19.909,50.6299],[19.8984,50.616],[19.8619,50.6217],[19.851,50.6122],[19.8445,50.5986],[19.8409,50.5907],[19.8249,50.5829],[19.8175,50.5735],[19.804,50.5656],[19.7897,50.5685],[19.7887,50.5545],[19.8417,50.5551],[19.8548,50.5439],[19.8828,50.5425],[19.9022,50.5393],[19.9117,50.5118],[19.9392,50.5026],[19.95,50.5048],[19.9523,50.4942],[19.964,50.4887],[19.9612,50.4768],[19.9397,50.4789],[19.9271,50.475],[19.9005,50.4735],[19.8921,50.4662],[19.903,50.4568],[19.8969,50.4524],[19.853,50.4474],[19.8535,50.4351],[19.8254,50.438],[19.8071,50.4361],[19.8,50.4439],[19.782,50.4401],[19.7695,50.4443],[19.7487,50.4421],[19.7318,50.4443],[19.7248,50.4409],[19.7019,50.4482],[19.6943,50.4351],[19.6776,50.4339],[19.6652,50.4237],[19.6717,50.4158],[19.6366,50.4094],[19.6271,50.4146],[19.6167,50.4062],[19.6058,50.4042],[19.5953,50.409],[19.5785,50.4072],[19.5688,50.4115],[19.5501,50.4128],[19.536,50.4203],[19.5185,50.4167],[19.5045,50.4011],[19.4876,50.397],[19.4917,50.366],[19.4603,50.3729],[19.4594,50.3634],[19.4822,50.3569],[19.4876,50.3473],[19.4806,50.3336],[19.4839,50.3236],[19.4595,50.3228],[19.451,50.3189],[19.4153,50.3317],[19.4147,50.3228],[19.4044,50.3144],[19.4106,50.3026],[19.3881,50.2892],[19.3816,50.273],[19.3615,50.2641],[19.3492,50.2656],[19.324,50.2588],[19.3401,50.2496],[19.3931,50.2334],[19.4111,50.2333],[19.4287,50.2255],[19.442,50.2266],[19.4025,50.2019],[19.3832,50.1997],[19.3637,50.1905],[19.337,50.1897],[19.3392,50.1816],[19.3518,50.177],[19.3451,50.1647],[19.3538,50.1539],[19.3316,50.1442],[19.2883,50.1404],[19.2706,50.1437],[19.2778,50.1197],[19.2592,50.117],[19.2494,50.1307],[19.2247,50.0973],[19.2232,50.0881],[19.2133,50.0741],[19.2224,50.0648],[19.1959,50.0652],[19.1779,50.0572],[19.1693,50.0604],[19.1461,50.0463],[19.1494,50.041],[19.1362,50.0332],[19.1429,50.0284],[19.1363,50.0191],[19.119,50.0092],[19.1181,49.9822],[19.1243,49.9664],[19.12,49.9607],[19.0981,49.9522],[19.1063,49.9427],[19.1186,49.9389],[19.1617,49.9395],[19.1688,49.9466],[19.1849,49.9501],[19.1865,49.9192],[19.1945,49.9133],[19.1945,49.886],[19.1729,49.8799],[19.1571,49.8651],[19.1709,49.853],[19.1969,49.8604],[19.2026,49.8716],[19.2371,49.8648],[19.2709,49.8607],[19.2892,49.8505],[19.2866,49.8164],[19.3033,49.7959],[19.3158,49.7845],[19.3168,49.7779],[19.3499,49.7714],[19.366,49.7778],[19.373,49.7707],[19.3867,49.7696],[19.3995,49.7617],[19.4202,49.7722],[19.4364,49.7571],[19.446,49.7426],[19.4446,49.7349],[19.4287,49.7275],[19.4293,49.7195],[19.4105,49.7101],[19.4004,49.7108],[19.3907,49.6984],[19.3738,49.6926],[19.3895,49.6843],[19.3918,49.6773],[19.4071,49.6786],[19.4138,49.6728],[19.4411,49.6805],[19.4594,49.6764],[19.465,49.6679],[19.4778,49.6608],[19.4689,49.648],[19.4808,49.6244],[19.4674,49.6138],[19.443,49.6092],[19.4446,49.6005],[19.4096,49.5918],[19.4076,49.5808],[19.4002,49.5742],[19.3714,49.5674],[19.3666,49.5537],[19.3686,49.545],[19.3624,49.5361],[19.347,49.5359],[19.3188,49.5311],[19.3156,49.5366],[19.2929,49.5332],[19.2815,49.5353],[19.2643,49.5324],[19.261,49.5273],[19.2336,49.5109],[19.237,49.5017],[19.2316,49.4878],[19.2209,49.475],[19.2283,49.4637],[19.219,49.4486],[19.2077,49.4518],[19.1965,49.4469],[19.1857,49.4347],[19.1974,49.4146],[19.1876,49.4097],[19.1773,49.414],[19.1534,49.4038],[19.1375,49.41],[19.1224,49.4026],[19.1073,49.4037],[19.0915,49.416],[19.0727,49.418],[19.0539,49.4152],[19.0447,49.4004],[19.027,49.394],[18.9896,49.3984],[18.9799,49.3952],[18.9712,49.4021],[18.9687,49.4133],[18.9857,49.4218],[18.9883,49.4318],[18.9778,49.4405],[18.9739,49.4517],[18.9608,49.4547],[18.9702,49.4768],[18.9605,49.4828],[18.9716,49.5043],[18.9417,49.5189],[18.9128,49.5176],[18.8971,49.5144],[18.8691,49.519],[18.843,49.5185],[18.8373,49.5236],[18.8441,49.5341],[18.8575,49.5379],[18.8592,49.5507],[18.8376,49.5622],[18.8293,49.5949],[18.8232,49.6041],[18.8243,49.6145],[18.8063,49.6513],[18.8101,49.671],[18.8046,49.6789],[18.7806,49.6854],[18.7641,49.6846],[18.7512,49.6769],[18.7355,49.6824],[18.7192,49.6838],[18.7065,49.7044],[18.6937,49.7066],[18.6682,49.7034],[18.6526,49.7077],[18.6252,49.7224],[18.6288,49.7263],[18.6291,49.7473],[18.6149,49.7534],[18.6101,49.7711],[18.5971,49.7847],[18.6,49.7894],[18.593,49.8017],[18.5827,49.8091],[18.5823,49.8181],[18.5694,49.8344],[18.5893,49.8455],[18.5837,49.8523],[18.6039,49.8571],[18.6024,49.8647],[18.5719,49.8722],[18.566,49.8831],[18.5801,49.9055],[18.5745,49.915],[18.559,49.918],[18.5448,49.9259],[18.535,49.9003],[18.5081,49.9028],[18.4847,49.9092],[18.4679,49.9156],[18.4642,49.9218],[18.4443,49.9234],[18.4327,49.9285],[18.4308,49.9382],[18.3921,49.934],[18.3677,49.9368],[18.356,49.9441],[18.3409,49.9257],[18.3333,49.9276],[18.3217,49.9159],[18.2992,49.9238],[18.2792,49.9401],[18.2818,49.9505],[18.278,49.9635],[18.2338,49.971],[18.2206,49.9689],[18.2065,49.9979],[18.1932,49.9946],[18.183,50.0004],[18.168,49.9985],[18.169,49.9864],[18.1538,49.9824],[18.1469,49.9916],[18.1311,49.9981],[18.117,49.9942],[18.1048,50.0009],[18.0933,50.015],[18.103,50.0226],[18.0859,50.0317],[18.0894,50.0441],[18.066,50.0481],[18.0617,50.0591],[18.0498,50.0584],[18.035,50.0658],[18.0575,50.0878],[18.0591,50.0963],[18.0723,50.1098],[18.0608,50.1159],[18.068,50.1295],[18.0502,50.1381],[18.0661,50.157],[18.0566,50.1607],[18.0778,50.174],[18.099,50.1772],[18.1105,50.1673],[18.1335,50.1844],[18.148,50.1817],[18.1624,50.1891],[18.1855,50.1869],[18.2051,50.1903],[18.2492,50.1926],[18.2352,50.202],[18.2359,50.2135],[18.2512,50.2226],[18.2718,50.2207],[18.2752,50.2249],[18.3084,50.2313],[18.313,50.2407],[18.3262,50.2412],[18.3469,50.2473],[18.3621,50.2473],[18.362,50.2566],[18.3766,50.2539],[18.4059,50.2547],[18.4259,50.249],[18.4205,50.2608],[18.427,50.2687],[18.4061,50.2771],[18.4076,50.2899],[18.3932,50.3054],[18.3921,50.3134],[18.409,50.3172],[18.3947,50.3378],[18.3733,50.3463],[18.3577,50.3566],[18.3728,50.3611],[18.3768,50.3803],[18.3906,50.3854],[18.3936,50.3915],[18.3781,50.4135],[18.3699,50.4158],[18.3698,50.4158],[18.3699,50.4158],[18.3698,50.4158],[18.3656,50.4245],[18.3872,50.4323],[18.3874,50.4453],[18.3818,50.449],[18.3838,50.4612],[18.3796,50.4788],[18.3838,50.4836],[18.4097,50.4746],[18.44,50.4807],[18.4526,50.4769],[18.452,50.4626],[18.4813,50.4583],[18.486,50.4699],[18.475,50.4731],[18.4672,50.4887],[18.4665,50.4995],[18.4479,50.4994],[18.4382,50.5272],[18.4299,50.5316],[18.4356,50.5447],[18.4779,50.5527],[18.506,50.5492],[18.5365,50.5423],[18.559,50.5401],[18.5727,50.5481],[18.5883,50.5472],[18.6054,50.5527],[18.6162,50.5692],[18.598,50.5686],[18.5908,50.5778],[18.6017,50.6045],[18.5901,50.6064],[18.5873,50.6138],[18.5174,50.6255],[18.5168,50.6396],[18.5064,50.6413],[18.5133,50.6581],[18.4941,50.6643],[18.4994,50.6895],[18.4839,50.7083],[18.5069,50.7132],[18.509,50.7261],[18.5483,50.732],[18.5492,50.7491],[18.5705,50.7447],[18.581,50.7525],[18.55,50.7596],[18.5272,50.7801],[18.5199,50.7963],[18.5219,50.8024],[18.5622,50.8089],[18.5629,50.8197],[18.558,50.8341],[18.5882,50.8516],[18.6161,50.8536],[18.637,50.8927],[18.6545,50.9147],[18.6488,50.9313],[18.6303,50.9312],[18.6124,50.9551],[18.6222,50.9656],[18.63,50.9638],[18.6483,50.969],[18.6483,50.9693],[18.6636,50.9706],[18.6682,50.989],[18.6562,51.005],[18.678,51.008],[18.6954,51.0157],[18.672,51.0491],[18.673,51.0569],[18.7029,51.0644],[18.7315,51.0664],[18.7494,51.0623],[18.7811,51.0658],[18.8029,51.0634],[18.8179,51.0682],[18.863,51.0727],[18.8835,51.059],[18.8955,51.0666],[18.9009,51.08],[18.9189,51.098],[18.9324,51.0931],[18.9554,51.0902],[18.9699,51.0806],[18.9931,51.0762],[19.0116,51.0664],[19.0157,51.0527],[19.0511,51.0426],[19.0563,51.0348],[19.0727,51.0355],[19.0954,51.0311],[19.1044,51.0263],[19.1108,51.0121],[19.1236,50.9996],[19.1327,51.0108],[19.1497,51.0096],[19.1449,51.0018],[19.1617,51.0006],[19.165,50.9946],[19.2065,50.9855],[19.2242,50.9859],[19.2407,50.9904],[19.2562,51.0063],[19.2439,51.0249],[19.245,51.0375],[19.2605,51.0311],[19.2918,51.0455],[19.3227,51.0462],[19.3314,51.0388],[19.3185,51.0282],[19.3186,51.0201],[19.3292,51.0132],[19.3474,51.0109],[19.3622,51.0039],[19.3562,50.9926],[19.3746,50.9944],[19.3867,51.0001],[19.4021,50.994],[19.4018,50.9885],[19.4132,50.9751],[19.4322,50.9649],[19.438,50.9439],[19.4633,50.9259],[19.4698,50.9154]]]},"properties":{"id":1,"nazwa":"śląskie"},"id":0},
                ]}
            // tempMap.graphics.geojson = JSON.parse(zlib.inflateSync(Buffer.from(graphics.geojson)).toString("utf-8"));
            tempMap.graphics.geojson = poland;
            // console.log(tempMap)
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
            // console.log("user._id: " + user._id);
            // console.log("username: " + user.username);
            // console.log("req.userId: " + req.userId);
            if (user._id == req.userId) {
                console.log("correct user!");

                map.title = body.map.title;
                map.reactions = body.map.reactions;
                if(body.map.publishDate)
                    map.publishDate = body.map.publishDate;
                map
                    .save()
                    .then(() => {
                        var tempGraphics = {...body.map.graphics};
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