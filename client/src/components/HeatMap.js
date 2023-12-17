import { useContext, useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
//import ReactDOMServer from 'react-dom/server';
import GlobalStoreContext from '../store/index.js';
//import { Box } from "@mui/material";
//import { Typography } from "@mui/material";
import "leaflet.heat";

const HeatMap = ({
    handlePropertyDataLoad, 
    propertyData,
    colors,
    sizes,
    opacities,
    hasStroke,
    hasFill,
    textFont,
    screenFlag
  }) => {
  const { store } = useContext(GlobalStoreContext);
  const storeRef = useRef(store);
  const map = useMap();
  
  const geojsonData = storeRef.current.currentMap.graphics.geojson;
  const property = storeRef.current.currentMap.graphics.typeSpecific.property;
  const low = storeRef.current.currentMap.graphics.typeSpecific.lowGradient;
  const med = storeRef.current.currentMap.graphics.typeSpecific.mediumGradient;
  const high = storeRef.current.currentMap.graphics.typeSpecific.highGradient;
  useEffect(() => {
    const regionLayerGroup = L.featureGroup().addTo(map);
    const updateLayers = (geojsonData) => {
      // Clear existing layers
      regionLayerGroup.clearLayers();
      let i = 0
      L.geoJSON(geojsonData, {
        onEachFeature: function (feature, layer) {
          if(feature.geometry.type === 'Polygon' || feature.geometry.type === 'MultiPolygon'){
              layer.setStyle({
                stroke: hasStroke,
                color: colors.StrokeColor,
                weight: sizes.StrokeWeight,
                opacity: opacities.StrokeOpacity,
                fill: hasFill,
                fillColor: colors.FillColor,
                fillOpacity: opacities.FillOpacity,
              }).bringToBack();
              let tempi = i
              if(screenFlag === "edit"){
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
          }
          i+=1
          },
          pointToLayer: function (feature, latlng) {
            return null;
          }
      }).addTo(regionLayerGroup);
      regionLayerGroup.bringToBack();
    }
    /*map.eachLayer((layer) => {
      if (layer !== regionLayerGroup) {
        layer.bringToFront();
      }
    });*/
    var geojsonData = storeRef.current.currentMap.graphics.geojson;
    updateLayers(geojsonData);

    map.on('click',function(e) {
      if(screenFlag === "edit"){
        L.DomEvent.stopPropagation(e);
        // Here we set the index to null
        handlePropertyDataLoad(null)
      }
    });
    return () => {
      regionLayerGroup.remove();
      map.off('click')
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, storeRef, colors, sizes, opacities, hasStroke, hasFill, textFont]);
  
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
    // Extract coordinates and create a heat map layer
     // Helper function to extract coordinates from a Polygon based on a property
    const extractCoordsFromFeature = (feature, property,props) => {
      const propertyValue = feature.properties[property];

      // Skip features without the selected property or with non-numeric property values
      if (propertyValue === undefined || propertyValue === null || isNaN(propertyValue)) {
        //console.log("is this property a number?")
        return [];
      }
      let allProps = []
      for(let i = 0; i < props.length; i++){
        allProps.push(props[i].properties[property])
      }
      //console.log("ALL PROPS" , allProps)
      const intensity = parseFloat(propertyValue);
      
      // Handle MultiPolygon geometries
      if (feature.geometry.type === "MultiPolygon") {
        return feature.geometry.coordinates.flatMap((polygonCoords) =>
          extractCoordsFromPolygon(polygonCoords, intensity)
        );
      }

      // Handle Polygon geometries
      return extractCoordsFromPolygon(feature.geometry.coordinates, intensity);
    };
    let allProps = geojsonData.features
    const heatPoints = geojsonData?.features?.flatMap((feature) => {
      return extractCoordsFromFeature(feature, property, allProps);
    });

    let heatLayerOptions = {}
    if(heatPoints && heatPoints.length > 0){
      heatLayerOptions = {
        blur: 25,
        radius: 15,
        gradient:{
          0.25: colors.lowGradient,
          0.75: colors.mediumGradient,
          1: colors.highGradient
        }
      }
      // have to do the store update local map here
      store.updateLocalMap(null, null, null, null, null, colors.lowGradient, colors.mediumGradient, colors.highGradient)
      if(low === null|| med === null|| high === null){
          storeRef.current.updateMapGraphics(null, null, null, null, null, null, null, null, colors.lowGradient, colors.mediumGradient, colors.highGradient)
      }
  };

  const heatLayerGroup = L.featureGroup().addTo(map);
  const heatLayer = L.heatLayer(heatPoints, heatLayerOptions);
  heatLayer.addTo(heatLayerGroup)
  heatLayerGroup.bringToFront()
 // map.invalidateSize()
    return () => {
      map.eachLayer(function (layer) {
        if(!layer._url){
            map.removeLayer(layer);
        }
      });
      map.off('click')
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geojsonData, map, property, colors.lowGradient, colors.mediumGradient, colors.highGradient, colors, low, med, high]);

  // Helper function to extract coordinates from a Polygon
  const extractCoordsFromPolygon = (polygonCoords, intensity) => {
  if (!Array.isArray(polygonCoords)) {
    console.error('Invalid polygon coordinates:', polygonCoords);
    return [];
  }
  if(polygonCoords.length === 2){
    const [longitude, latitude] = polygonCoords;
    return [[latitude, longitude, intensity]]; // [Latitude, Longitude, Intensity]
  }
  else{
    return polygonCoords[0].map((coord) => {
      return [coord[1], coord[0], intensity]; // [Latitude, Longitude, Intensity]
    });
  }
};

  useEffect(()=>{
    map.fitBounds(L.geoJSON(store.currentMap.graphics.geojson).getBounds());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map])

  return null;
}
export default HeatMap;


