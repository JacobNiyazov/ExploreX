import { useContext, useEffect, useRef } from "react";
import { useMap} from "react-leaflet";
import L from "leaflet";
import GlobalStoreContext from '../store/index.js';
const turf = require('@turf/turf');


const SpikeMap = () => {

  const { store } = useContext(GlobalStoreContext);
  const storeRef = useRef(store);
  const map = useMap();

  function getRepresentativeValues(geojsonData, propertyKey) {
      // Extract the property values, parse them as numbers, and sort them
      let values = geojsonData.features.map(feature => {
          if(!(propertyKey in feature.properties)) return 0;
          let value = feature.properties[propertyKey];
          return Number(value.toString().replace(/,/g, ''));
      }).filter(v => !isNaN(v)).sort((a, b) => a - b);

      // Calculate quartiles
      let minValue = values[0];
      let firstQuartileValue = values[Math.round(values.length * 0.25)];
      let medianValue = values[Math.round(values.length * 0.5)];
      let thirdQuartileValue = values[Math.round(values.length * 0.75)];
      let maxValue = values[values.length - 1];

      // Return an array with the min, 1st quartile, median, 3rd quartile, and max values
      return [minValue, firstQuartileValue, medianValue, thirdQuartileValue, maxValue];
  }

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
  
    
    function calculateSpikeEndLatLng(latlng, magnitude, map) {
        // Convert magnitude to a length in meters that makes sense at the current map scale
        var lengthInMeters = magnitudeToLength(magnitude, map.getZoom()/75);
  
        // Translate this length to a change in latitude
        var lengthInDegrees = lengthInMeters / 111000; // Simple approximation
  
        // Calculate new latitude based on lengthInDegrees. Assuming northward spike for simplicity.
        var newLat = latlng.lat + lengthInDegrees;
  
        return L.latLng(newLat, latlng.lng);
    }
  
    function magnitudeToLength(magnitude, zoomLevel) {
        // Convert magnitude to a length in meters
        // This conversion will vary greatly depending on the data and desired visual effect
        // As an example, a simple linear scale could be used:
        var zoomFactor = Math.pow(2, 13 - zoomLevel); // Adjust base zoom level to your map's typical zoom
        return magnitude * zoomFactor; // This needs to be tuned to your data's range and unit
    }
    function generateSpikeData(geojsonData, propertyKey) {
      const spikeData = [];
      var medianValue = getMedianPropertyValue(geojsonData, propertyKey);
      var scaleFactor = medianValue / 10;
      console.log(scaleFactor)
  
      geojsonData.features.forEach(feature => {
          try{
              if(!(propertyKey in feature.properties)) return 0;
              let value = feature.properties[propertyKey];
              let numericValue = value ? Number(value.toString().replace(/,/g, '')) : 0;
              let magnitude = !isNaN(numericValue) ? numericValue / scaleFactor : 0;
  
              let basePoint; // Base point of the spike
  
              if (feature.geometry.type === 'Polygon' || feature.geometry.type === 'MultiPolygon') {
                  basePoint = turf.centroid(feature).geometry.coordinates;
              } else if (feature.geometry.type === 'LineString' || feature.geometry.type === 'MultiLineString') {
                  basePoint = turf.midpoint(
                      turf.point(feature.geometry.coordinates[0]), 
                      turf.point(feature.geometry.coordinates[feature.geometry.coordinates.length - 1])
                  ).geometry.coordinates;
              } else if (feature.geometry.type === 'Point') {
                  basePoint = feature.geometry.coordinates;
              }
  
              if (basePoint) {
                  spikeData.push({
                      type: 'Feature',
                      geometry: {
                          type: 'Point',
                          coordinates: basePoint
                      },
                      properties: {
                          magnitude: magnitude
                      }
                  });
              }
          }
          catch(err){
              return 0;
          }
      });
  
      return spikeData;
    }
    function drawSpikes(spikeData) {
        let spikes = []
        spikeData.forEach(spike => {
            var baseLatLng = L.latLng(spike.geometry.coordinates[1], spike.geometry.coordinates[0]);
            var spikeEndLatLng = calculateSpikeEndLatLng(baseLatLng, spike.properties.magnitude, map);

            // Define the three points of the triangle (spike)
            var trianglePoints = [
                baseLatLng, // Base point of the spike
                L.latLng(baseLatLng.lat, baseLatLng.lng - 0.5), // Left point
                spikeEndLatLng, // Top point of the spike (calculated earlier)
                L.latLng(baseLatLng.lat, baseLatLng.lng + 0.5), // Right point
                baseLatLng // Closing the polygon by returning to the base point
            ];
            spikes.push(trianglePoints);     
        });
        return spikes
    }
    const spikeLayerGroup = L.featureGroup().addTo(map);

    const updateLayers = (geojsonData, trianglePoints) => {
      spikeLayerGroup.clearLayers();
      // Create the triangle polygon and add it to the map
      trianglePoints.forEach(spike => {
        L.polygon(spike, {
          color: '#ff24bd',
          fillColor: '#ff24bd',
          fillOpacity: 0.1  // Reduced opacity for more transparency
        }).addTo(spikeLayerGroup);   
      });
  
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
                    return {};
            }
        },
        // Ensure that no default marker is created for point features
        pointToLayer: function (feature, latlng) {
          return null;
        }
      }).addTo(map);
      try{
        map.fitBounds(spikeLayerGroup.getBounds());
      }
      catch (err){
        console.log(err)
      }
    }
    var geojsonData = storeRef.current.currentMap.graphics.geojson;
    var propertyKey = storeRef.current.currentMap.graphics.typeSpecific.property;
    var spikeData = generateSpikeData(geojsonData, propertyKey);
    var trianglePoints = drawSpikes(spikeData);
    var legend = getRepresentativeValues(geojsonData, propertyKey);
    if(storeRef.current.currentMap.graphics.typeSpecific.spikeData === null || storeRef.current.currentMap.graphics.typeSpecific.spikeLegend === null){
      storeRef.current.updateMapGraphics(null, null, null, trianglePoints, legend);
    }
    updateLayers(geojsonData, trianglePoints);

    return () => {
      spikeLayerGroup.remove();
    };
  }, [map, storeRef ]);

  return null;
}

export default SpikeMap;
