import { useContext, useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import ReactDOMServer from 'react-dom/server';
import GlobalStoreContext from '../store/index.js';
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import "leaflet.heat";

const HeatMap = ({
    handlePropertyDataLoad, 
    propertyData,
    colors,
    sizes,
    opacities,
    hasStroke,
    hasFill,
  }) => {
  const { store } = useContext(GlobalStoreContext);
  const storeRef = useRef(store);
  const map = useMap();
  console.log("radius in heat: ", sizes.radius)
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
      L.DomEvent.stopPropagation(e);
      console.log('clicked on map', e);
      // Here we set the index to null
      handlePropertyDataLoad(null)
    });
    return () => {
      regionLayerGroup.remove();
      map.off('click')
    };


  }, [map, storeRef, colors, sizes, opacities, hasStroke, hasFill, propertyData, handlePropertyDataLoad]);
  useEffect(() => {
    // Extract coordinates and create a heat map layer
     // Helper function to extract coordinates from a Polygon based on a property
    const extractCoordsFromFeature = (feature, property,props) => {
      const propertyValue = feature.properties[property];

      // Skip features without the selected property or with non-numeric property values
      if (propertyValue === undefined || propertyValue === null || isNaN(propertyValue)) {
        console.log("is this property a number?")
        return [];
      }
      let allProps = []
      for(let i = 0; i < props.length; i++){
        allProps.push(props[i].properties[property])
      }
      //console.log("ALL PROPS" , allProps)
      let min = Math.min(...allProps)
      let max = Math.max(...allProps)
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

    console.log("colors: ", colors)
    let heatLayerOptions = {}
    if(heatPoints && heatPoints.length > 0){
      heatLayerOptions = {
        //blur: 25,
        //radius: 15,
        gradient:{
          0.25: colors.lowGradient,
          0.75: colors.mediumGradient,
          1: colors.highGradient
        }
      }
    if(low !== colors.lowGradient||
      med !==colors.mediumGradient ||
      high !== colors.highGradient){
        store.updateMapGraphics(null, null, null, null, null, null, null, null, low, med, high)
    }
  };

  const heatLayer = L.heatLayer(heatPoints, heatLayerOptions);
  heatLayer.addTo(map)

    return () => {
      map.eachLayer(function (layer) {
        if(!layer._url){
            map.removeLayer(layer);
        }
      });
      map.off('click')
    };
  }, [geojsonData, map, property, propertyData, handlePropertyDataLoad]);

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
  }, [map, store.currentMap.graphics.geojson])

  return null;
}

export default HeatMap;


