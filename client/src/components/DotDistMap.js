import { useContext, useEffect, useRef } from "react";
import { useMap} from "react-leaflet";
import L from "leaflet";
import GlobalStoreContext from '../store/index.js';
import * as turf from '@turf/turf'

const DotDistMap = ({dotDensityData}) => {

  const { store } = useContext(GlobalStoreContext);
  const map = useMap();
  const updateCalled = useRef(false);

  useEffect(() => {
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
    //   L.geoJSON(geojsonData, {
    //     style: function (feature) {
    //         switch (feature.geometry.type) {
    //             case 'Polygon':
    //             case 'MultiPolygon':
    //                 return { color: "#555", weight: 2, opacity: 0.6, fillOpacity: 0.1 };
    //             case 'LineString':
    //             case 'MultiLineString':
    //                 return { color: "#f55", weight: 2, opacity: 0.8 };
    //             default:
    //                 return {}; // Point geometries, if any, are already handled in dot density layer
    //         }
    //     }
    //   }).addTo(map);
      try{
        map.fitBounds(dotsLayerGroup.getBounds());
      }
      catch (err){
        console.log(err)
      }
    }
    updateLayers(store.currentMap.graphics.geojson, dotDensityData);

    return () => {
      dotsLayerGroup.remove();
    };
  }, [map, store.currentMap.graphics.geojson]);

  return null;
}

export default DotDistMap;
