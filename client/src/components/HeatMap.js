import { useContext, useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import ReactDOMServer from 'react-dom/server';
import GlobalStoreContext from '../store/index.js';
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import "leaflet.heat";

const HeatMap = ({ geojsonData, property, handlePropertyDataLoad, propertyData}) => {
  const map = useMap();
  const { store } = useContext(GlobalStoreContext);
  //console.log("what is property: ", property)
  
  useEffect(() => {
    // Extract coordinates and create a heat map layer
     // Helper function to extract coordinates from a Polygon based on a property
    const extractCoordsFromFeature = (feature, property) => {
      const propertyValue = feature.properties[property];

      // Skip features without the selected property or with non-numeric property values
      if (propertyValue === undefined || propertyValue === null || isNaN(propertyValue)) {
        //console.log("is this property a number?")
        return [];
      }

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

    const heatPoints = geojsonData.features.flatMap((feature) => {
      return extractCoordsFromFeature(feature, property);
    });
    
    L.heatLayer(heatPoints).addTo(map);


    let i = 0
    // Customize popups
    L.geoJSON(geojsonData, {
      onEachFeature: function (feature, layer) {
        layer.bindPopup(
          Object.keys(feature.properties).map(function (k) {
            return (
              ReactDOMServer.renderToString(
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ marginRight: 'auto' }}>{k + ':'}</Typography>
                  <input style={{ width: "80px", marginLeft: 'auto' }} defaultValue={feature.properties[k]}></input>
                </Box>
              )
            );
          }).join(""), {
            maxHeight: 200
          }
        );

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
            i+=1
      },
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
            radius: 5,
            fillColor: "#00000",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        });
      }
    }).addTo(map);

    map.on('click',function(e) {
      L.DomEvent.stopPropagation(e);
      //console.log('clicked on map', e);
      // Here we set the index to null
      handlePropertyDataLoad(null)
    });

    // Remove default border styles for each region
    map.eachLayer((layer) => {
      if (layer.setStyle) {
        layer.setStyle({fillColor:"transparent",color:"pink" });
      }
    });

    return () => {
      map.eachLayer(function (layer) {
        if(!layer._url){
            map.removeLayer(layer);
        }
      });
      map.off('click')
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geojsonData, map, property, store.currentMap.graphics.geojson]);

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

  /*useEffect(() =>{
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
    
    }, [propertyData, store, map, colors.StrokeColor])*/

  return null;
}

export default HeatMap;


