const togeojson = require("@tmcw/togeojson");
var shapefile = require("shapefile");
const Map = require('../models/map-model')
const Graphics = require('../models/graphics-model')

async function convertShapeFile(shpFile, dbfFile){
    /*const Readable = require('stream').Readable;
    let shp = Readable.from(shpString);
    let dbf = Readable.from(dbfString);*/
    let geojson = await shapefile.read(shpFile.buffer, dbfFile.buffer);
    shpFile.buffer.fill(0);
    dbfFile.buffer.fill(0);
    return geojson
}

function convertKML(kmlFile){
    console.log(kmlFile)
    var enc = new TextDecoder("utf-8");
    let text = enc.decode(kmlFile.buffer)
    const DOMParser = require("xmldom").DOMParser;
    return togeojson.kml((new DOMParser()).parseFromString(text, 'text/xml'));
}

function convertJSON(jsonFile){
    var enc = new TextDecoder("utf-8");
    let text = enc.decode(jsonFile.buffer)
    return JSON.parse(text)
}

function checkGeoJSON(json){
    if (
        json &&
        json.type &&
        json.type === 'FeatureCollection' &&
        Array.isArray(json.features) &&
        json.features.every(feature =>
            feature.type &&
            feature.type === 'Feature' &&
            feature.geometry &&
            feature.geometry.type &&
            feature.geometry.coordinates &&
            feature.properties &&
            Object.keys(feature.properties).length > 0 &&
            Object.keys(feature).every(key =>
                ['type', 'geometry', 'properties', 'id'].includes(key)
            )
        )
    ) {
        return true;
    }

    return false;
}

function checkVoronoiMap(json){
    let polyCount = 0
    let pointCount = 0

    json.features.forEach(feature=>{
        let type = feature.geometry.type
        if(type === "Polygon" || type === "MultiPolygon"){
            polyCount += 1
        }
        else if(type === "Point"){
            pointCount+=1
        }
        else{
            return "Voronoi Map only allows one Polygon/MultiPolygon and Point features in geojson file."
        }
    })

    if(polyCount != 1){
        return "Voronoi Map requires only one Polygon feature."
    }
    if(pointCount <= 0){
        return "Voronoi Map requires atleast one Point"
    }

    return ""
}

function checkNativeFileType(json){
    let tempMap = {...json}
    // Variables a exported Native file would not have by default
    tempMap.graphics = "65628f136d1ae1e57735a687"
    tempMap.ownerUsername = "hello"
    tempMap.publishDate = Date.now()
    tempMap.reactions = {
        comments:[],
        likes:0,
        dislikes:0
    }

    const map = new Map(tempMap)
    const err = map.validateSync()
    if(err){
        return false
    }

    let tempGraphics = {...json.graphics};
    tempGraphics.geojson = Buffer.from("hello there");
    tempGraphics.ownerUsername = "hello"
    const graphic = new Graphics(tempGraphics)
    
    const err2 = graphic.validateSync()
    if(err2){
        return false
    }
    
    return true
}
module.exports = {
    convertKML,
    convertShapeFile,
    convertJSON,
    checkGeoJSON,
    checkVoronoiMap,
    checkNativeFileType
};
