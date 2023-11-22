const togeojson = require("@tmcw/togeojson");
var shapefile = require("shapefile");

async function convertShapeFile(shp, dbf){
    /*var enc = new TextEncoder(); // always utf-8
    shp = enc.encode(shpString);
    dbf = enc.encode(dbfString)*/
    let geojson = await shapefile.read(shp, dbf);
    return geojson
}

function convertKML(kmlString){
    const DOMParser = require("xmldom").DOMParser;
    return togeojson.kml(new DOMParser().parseFromString(kmlString, "text/xml"));
}

module.exports = {
    convertKML,
    convertShapeFile,
};
