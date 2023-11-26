import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import ReactDOMServer from 'react-dom/server';
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import "leaflet.heat";

const HeatMap = ({ geojsonData, property }) => {
  const map = useMap();

  useEffect(() => {
    // Extract coordinates and create a heat map layer
    const heatPoints = geojsonData.features.flatMap((feature) => {
      return extractCoordsFromFeature(feature, property);
    });
    
    L.heatLayer(heatPoints).addTo(map);

    // Customize popups
    var geojsonLayer = L.geoJSON(geojsonData, {
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
      },
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
            radius: 5,
            fillColor: "#000000",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        });
      }
    }).addTo(map);

    // Fit the map to the heat layer bounds
    map.fitBounds(geojsonLayer.getBounds());

    // Remove default border styles for each region
    map.eachLayer((layer) => {
      if (layer.setStyle) {
        layer.setStyle({ fillOpacity: 0, color: 'transparent' });
      }
    });
  }, [geojsonData, map, property]);

  // Helper function to extract coordinates from a Polygon based on a property
  const extractCoordsFromFeature = (feature, property) => {
    const propertyValue = feature.properties[property];

    // Skip features without the selected property or with non-numeric property values
    if (propertyValue === undefined || propertyValue === null || isNaN(propertyValue)) {
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

  // Helper function to extract coordinates from a Polygon
  const extractCoordsFromPolygon = (polygonCoords, intensity) => {
  if (!Array.isArray(polygonCoords)) {
    console.error('Invalid polygon coordinates:', polygonCoords);
    return [];
  }
  if(polygonCoords.length == 2){
    const [longitude, latitude] = polygonCoords;
    return [[latitude, longitude, intensity]]; // [Latitude, Longitude, Intensity]
  }
  else{
    return polygonCoords[0].map((coord) => {
      return [coord[1], coord[0], intensity]; // [Latitude, Longitude, Intensity]
    });
  }
};


  return null;
}

export default HeatMap;


