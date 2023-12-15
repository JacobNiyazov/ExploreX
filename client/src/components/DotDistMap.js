import { useContext, useEffect, useRef } from "react";
import { useMap} from "react-leaflet";
import L from "leaflet";
import GlobalStoreContext from '../store/index.js';
import * as turf from '@turf/turf'
import { color } from "@mui/system";

const DotDistMap = ({
  colors,
  sizes,
  opacities,
  hasStroke,
  hasFill,
  handlePropertyDataLoad,
  propertyData
}) => {

  const { store } = useContext(GlobalStoreContext);
  const storeRef = useRef(store);
  const map = useMap();

  useEffect(() => {
    const regionLayerGroup = L.featureGroup().addTo(map);
    const updateLayers = (geojsonData) => {
      // Clear existing layers
      regionLayerGroup.clearLayers();
      let i = 0;
      L.geoJSON(geojsonData, {
        onEachFeature: function (feature, layer) {
          if(feature.geometry.type === 'Polygon' || feature.geometry.type === 'MultiPolygon'){
            if(hasFill){
              layer.setStyle({
                stroke: hasStroke,
                color: colors.StrokeColor,
                weight: sizes.StrokeWeight,
                opacity: opacities.StrokeOpacity,
                fill: true,
                fillColor: colors.FillColor,
                fillOpacity: opacities.FillOpacity,
              });
            }
            else{
              layer.setStyle({
                stroke: hasStroke,
                color: colors.StrokeColor,
                weight: sizes.StrokeWeight,
                opacity: opacities.StrokeOpacity,
                fill: true,
                fillColor: colors.FillColor,
                fillOpacity: 0.01,
              });
            }
            

            let tempi = i
            layer.on({
                click: (e) => {
                    if(feature.geometry.type !== 'Point'){
                        L.DomEvent.stopPropagation(e);
                        // Here we set the index to tempi
                        handlePropertyDataLoad(tempi)
                    }
                },
              })
            }
            i+=1
          },
          pointToLayer: function (feature, latlng) {
            return null;
          }
      }).addTo(regionLayerGroup);
      regionLayerGroup.bringToBack();
      //try{
      //  map.fitBounds(L.geoJSON(geojsonData).getBounds());
      //}
      //catch (err){
      //  //console.log(err)
      //}
    }
    
    var geojsonData = storeRef.current.currentMap.graphics.geojson;
    updateLayers(geojsonData);
    map.on('click',function(e) {
      L.DomEvent.stopPropagation(e);
      //console.log('clicked on map', e);
      // Here we set the index to null
      handlePropertyDataLoad(null)
    });
    return () => {
      
      // dotsLayerGroup.remove();
      regionLayerGroup.remove();
      //map.eachLayer(function (layer) {map.removeLayer(layer);});
      map.off('click')
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, storeRef, colors, sizes, opacities, hasStroke, hasFill, store.currentMap.graphics.geojson]);
  
  useEffect(() =>{
    const propertyLayerGroup = L.featureGroup().addTo(map);
    if(store.currentMap && propertyData.featureIndex !== null){
      let selected = {"type":"FeatureCollection", "features": [store.currentMap.graphics.geojson.features[propertyData.featureIndex]]};
      L.geoJSON(selected, {
        onEachFeature: function (feature, layer) {
          //console.log(":(")
          if(colors.StrokeColor === '#000000'){
            layer.setStyle({
              color: "#FFFFFF",
              weight: '6',
              opacity: '1',
            });
          }
          else{
            layer.setStyle({
              color: "#000000",
              weight: '6',
              opacity: '1',
            });
          }
        }
      }).addTo(propertyLayerGroup);
    }
    propertyLayerGroup.bringToFront();
    return () => {
      propertyLayerGroup.remove();
    };
    
  }, [propertyData, store, map, colors.StrokeColor])

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
              if (isNaN(numericValue) || numericValue <= 0) {
                count = 0;
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
      if(isNaN(scale)){
        scale = 0;
      }

  
      return {
          type: 'FeatureCollection',
          features: points,
          scale: scale
      };
    }
    const dotsLayerGroup = L.featureGroup().addTo(map);

    const updateLayers = (geojsonData, dotDensityData) => {
      // Clear existing layers
      dotsLayerGroup.clearLayers();
      // regionLayerGroup.clearLayers();
      L.geoJSON(dotDensityData, {
        pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng, {
              radius: 3,
              fillColor: colors.DotMap,
              color: "#000",
              weight: 1,
              opacity: 1,
              fillOpacity: 0.8
          }).bringToFront();
        },
      }).addTo(dotsLayerGroup);
      dotsLayerGroup.bringToFront();
    }
    var geojsonData = store.currentMap.graphics.geojson;
    var propertyKey = storeRef.current.currentMap.graphics.typeSpecific.property;
    var dotDensityData = convertToDotDensity(geojsonData, propertyKey);
    var scale = dotDensityData.scale;
    delete dotDensityData['scale'];
    store.updateLocalMap(dotDensityData['features'], scale);
    if(storeRef.current.currentMap.graphics.typeSpecific.dotPoints === null || storeRef.current.currentMap.graphics.typeSpecific.dotScale === null){
      storeRef.current.updateMapGraphics(null, null, dotDensityData['features'], scale, null, null);
    }
    updateLayers(geojsonData, dotDensityData);

    return () => {
      dotsLayerGroup.remove();
      // regionLayerGroup.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, store.currentMap.graphics.geojson, colors.DotMap]);

  

  useEffect(()=>{
    map.fitBounds(L.geoJSON(storeRef.current.currentMap.graphics.geojson).getBounds());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map])
  return null;
}

export default DotDistMap;