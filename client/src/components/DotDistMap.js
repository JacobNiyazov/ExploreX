import { useContext, useEffect } from "react";
import { useMap} from "react-leaflet";
import L from "leaflet";
import GlobalStoreContext from '../store/index.js';
import * as turf from '@turf/turf'

const DotDistMap = () => {

  const { store } = useContext(GlobalStoreContext);
  const map = useMap();

  useEffect(() => {
    function calculateMedian(values) {
      values.sort((a, b) => a - b);
      var half = Math.floor(values.length / 2);
      if (values.length % 2) {
          return values[half];
      }
      return (values[half - 1] + values[half]) / 2.0;
    }
  
    function getMedianPropertyValue(geojsonData, propertyKey) {
      let propertyValues = geojsonData.features.map(feature => {
          if(!(propertyKey in feature.properties)) return 0;
          let value = feature.properties[propertyKey];
          // Convert string numbers with commas to actual numbers
          let numericValue = value ? Number(value.toString().replace(/,/g, '')) : 0;
          return !isNaN(numericValue) ? numericValue : 0;
      }).filter(v => v > 0); // Exclude non-numeric and zero values
  
      return calculateMedian(propertyValues);
    }
  
    function convertToDotDensity(geojsonData, propertyKey) {
      var points = [];
      var medianValue = getMedianPropertyValue(geojsonData, propertyKey);
      var scale = medianValue / 10;
  
      geojsonData.features.forEach(feature => {
          try{
              if(!(propertyKey in feature.properties)) return 0;
              var value = feature.properties[propertyKey];
              // Convert string numbers with commas to actual numbers
              var numericValue = value ? Number(value.toString().replace(/,/g, '')) : 0;
              var count = 1;
  
              if (!isNaN(numericValue) && numericValue > 0) {
                  count = Math.ceil(numericValue / scale); // Use dynamic scale
              }
  
              if (feature.geometry.type === 'Polygon' || feature.geometry.type === 'MultiPolygon') {
                  if (count === 1) {
                      // Place a single point at the centroid for polygons
                      var centroid = turf.centroid(feature);
                      points.push({
                          type: 'Feature',
                          properties: feature.properties,
                          geometry: centroid.geometry
                      });
                  } else {
                      // Place multiple points randomly within the polygon
                      for (var i = 0; i < count; i++) {
                          var randomPoint = turf.randomPoint(1, { bbox: turf.bbox(feature) }).features[0];
                          if (turf.booleanPointInPolygon(randomPoint, feature)) {
                              points.push(randomPoint);
                          } else {
                              i--; // retry if the point is not in the polygon
                          }
                      }
                  }
              } else if (feature.geometry.type === 'LineString' || feature.geometry.type === 'MultiLineString') {
                  if (count === 1) {
                      // Place a single point at the midpoint for lines
                      var midpoint = turf.midpoint(turf.point(feature.geometry.coordinates[0]), turf.point(feature.geometry.coordinates[feature.geometry.coordinates.length - 1]));
                      points.push({
                          type: 'Feature',
                          properties: feature.properties,
                          geometry: midpoint.geometry
                      });
                  } else {
                      // Place multiple points at regular intervals along the line
                      var totalLength = turf.length(feature);
                      var interval = totalLength / count;
                      for (var j = 0; j < count; j++) {
                          var pointOnLine = turf.along(feature, interval * j);
                          points.push(pointOnLine);
                      }
                  }
              } else if (feature.geometry.type === 'Point') {
                  // For point features, just use the existing point
                  points.push(feature);
              }
          }
          catch(err){
              return 0;
          }
          
      });
  
      return {
          type: 'FeatureCollection',
          features: points
      };
    }
    const dotsLayerGroup = L.featureGroup().addTo(map);

    const updateLayers = (geojsonData, dotDensityData) => {
      // Clear existing layers
      dotsLayerGroup.clearLayers();
      L.geoJSON(dotDensityData, {
        pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng, {
              radius: 3,
              fillColor: "#ff24bd",
              color: "#000",
              weight: 1,
              opacity: 1,
              fillOpacity: 0.8
          })
        },
      }).addTo(dotsLayerGroup);
      L.geoJSON(geojsonData, {
        style: function (feature) {
            switch (feature.geometry.type) {
                case 'Polygon':
                case 'MultiPolygon':
                    return { color: "#555", weight: 2, opacity: 0.6, fillOpacity: 0.1 };
                case 'LineString':
                case 'MultiLineString':
                    return { color: "#f55", weight: 2, opacity: 0.8 };
                default:
                    return {}; // Point geometries, if any, are already handled in dot density layer
            }
        }
      }).addTo(map);
      try{
        map.fitBounds(dotsLayerGroup.getBounds());
      }
      catch (err){
        console.log(err)
      }
    }
    var geojsonData = store.currentMap.graphics.geojson;
    var propertyKey = 'id';
    var dotDensityData = convertToDotDensity(geojsonData, propertyKey);
    updateLayers(geojsonData, dotDensityData);

    return () => {
      dotsLayerGroup.remove();
    };
  }, [map, store.currentMap.graphics.geojson]);

  return null;
}

export default DotDistMap;
