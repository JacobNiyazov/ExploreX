import { useContext, useEffect } from "react";
import { useMap} from "react-leaflet";
import L from "leaflet";
import GlobalStoreContext from '../store/index.js';
import * as turf from '@turf/turf'
import * as ReactDOMServer from 'react-dom/server';
import { Box, Typography } from '@mui/material';

const VoronoiMap = ({
    handlePropertyDataLoad, 
    propertyData,
    colors,
    opacities,
    hasStroke,
    hasFill,
    sizes,
}) => {

    /*function getRandomShade(){
        // Generate random values for the red and green components
        const red = Math.floor(Math.random() * 256); // Random red value (0-255)
        const green = Math.floor(Math.random() * 128); // Random green value (0-127)
      
        // Create a random shade of orange-red by combining red and green
        const blue = 0; // Set blue to 0 for shades of orange
        const alpha = 1; // Alpha (opacity) value
      
        // Construct the RGB color string
        const color = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
      
        return color;
    }*/
    // Format geojson: 1 Polygon/Multipolygon and points
    // Polygon will be used as the bounding of the voronoi map
    const { store } = useContext(GlobalStoreContext);
    const map = useMap();
    useEffect(()=>{
        if(store.currentMap.graphics.typeSpecific.voronoiBound === null){
            let geojson = store.currentMap.graphics.geojson;
            var options = {bbox : [0, 0, 0, 0]}

            // Get polygon inside geojson, should only have one
            const polygon = geojson.features.filter(feature=>{
                return feature.geometry.type === "Polygon" || feature.geometry.type === "MultiPolygon"
            })

            let polygonGeo = {"type": "FeatureCollection", "features":[polygon[0]]}

            options.bbox = turf.bbox(polygonGeo)

            const geoPoints = geojson.features.filter(feature=>{
                return feature.geometry.type === "Point"
            })
            let points = {"type": "FeatureCollection", "features": geoPoints}

            let voronoiPolygons = turf.voronoi(points, options);

            var clippedPolygons = {"type":"FeatureCollection", "features": []}
            
            // Only get intersection within the polygon
            voronoiPolygons.features.forEach(feature=>{
                let clipped = turf.intersect(polygon[0], feature)

                // returns null if no intersection exists, so ignore
                if(clipped != null){
                    clippedPolygons.features.push(clipped);
                }
            })

            points.features.forEach(feature=>{
                clippedPolygons.features.push(feature)
            })

            store.updateMapGraphics(null, null, null, null, null, null, null, {voronoiBound: polygonGeo, geojson: clippedPolygons});
        }
        else{
            console.log(store.currentMap.graphics.typeSpecific.voronoiBound)
            let i = 0
            L.geoJSON(store.currentMap.graphics.geojson, {
                onEachFeature: function (feature, layer) {
                    // Customize popup content
                    layer.bindPopup(Object.keys(feature.properties).map(function(k) {
                
                        return (
                        ReactDOMServer.renderToString(
                            <Box sx={{display:'flex', alignItems:'center'}}>
                                <Typography sx={{marginRight:'auto'}}>{k + ':'}</Typography>
                                <input style={{width: "80px", marginLeft:'auto'}} defaultValue={feature.properties[k]}></input>
                            </Box>
                        )
                        )
                    }).join(""), {
                        maxHeight: 200
                    });

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
                    if(feature.geometry.type === 'Polygon'){
                        layer.setStyle({
                            stroke: hasStroke,
                            color: colors.StrokeColor,
                            weight: sizes.StrokeWeight,
                            opacity: opacities.StrokeOpacity,
                            fill: hasFill,
                            fillColor: colors.FillColor,
                            fillOpacity: opacities.FillOpacity,
                          });
                    }
                    /*if(feature.geometry.type === 'Point'){
                        layer.setStyle({
                        fillColor: '#000000',
                        weight: 3,
                        color: '#000000',
                        });}*/
                },
                pointToLayer: function (feature, latlng) {
                    return L.circleMarker(latlng, {
                        radius: 3,
                        fillColor: colors.VoronoiMap,
                        color: "#000",
                        weight: 1,
                        opacity: 1,
                        fillOpacity: 0.8
                    });
                }
            }).addTo(map);
        }

        map.on('click',function(e) {
            L.DomEvent.stopPropagation(e);
            console.log('clicked on map', e);
            // Here we set the index to null
            handlePropertyDataLoad(null)
        });

        return () => {
            map.eachLayer(function (layer) {
                if(!layer._url){
                    map.removeLayer(layer);
                }
            });
            map.off('click')
          };
    }, [map, store.currentMap, colors, sizes, opacities, hasStroke, hasFill, handlePropertyDataLoad])
    
    useEffect(()=>{
        map.fitBounds(L.geoJSON(store.currentMap.graphics.geojson).getBounds());
      }, [map])
    
    useEffect(() =>{
        const propertyLayerGroup = L.featureGroup().addTo(map);
        if(store.currentMap && propertyData.featureIndex !== null){
            let selected = {"type":"FeatureCollection", "features": [store.currentMap.graphics.geojson.features[propertyData.featureIndex]]};
            L.geoJSON(selected, {
            onEachFeature: function (feature, layer) {
                console.log(":(")
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

    return null
}

export default VoronoiMap