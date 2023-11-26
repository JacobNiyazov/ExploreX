const togeojson = require("@tmcw/togeojson");
var shapefile = require("shapefile");

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
            feature.properties
        )
    ) {
        return true;
    }

    return false;
}

module.exports = {
    convertKML,
    convertShapeFile,
    convertJSON,
    checkGeoJSON
};
