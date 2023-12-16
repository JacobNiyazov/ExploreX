import { useContext, useEffect } from "react";
import { useMap} from "react-leaflet";
import L from "leaflet";
import GlobalStoreContext from '../store/index.js';
import * as turf from '@turf/turf'
// eslint-disable-next-line react-hooks/exhaustive-deps

const VoronoiMap = ({
    handlePropertyDataLoad, 
    propertyData,
    colors,
    opacities,
    hasStroke,
    hasFill,
    sizes,
    voronoiPointToggle,
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
    
    function alertModal(header, paragraph){
        store.displayModal(<div>
            <h4 style={{ color: '#f44336', margin: '0', fontSize: '1.1rem' }}>{header}</h4>
            <p style={{ margin: '5px 0', fontSize: '1rem', width:'120%' }}>{paragraph}</p>
          </div>, false);
    }
    useEffect(()=>{
        const regionLayerGroup = L.featureGroup().addTo(map);
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

            if(geojson.features.length === 0){
                geojson = {...store.currentMap.graphics.typeSpecific.voronoiBound}
            }

            store.updateMapGraphics(null, null, null, null, null, null, null, {voronoiBound: polygonGeo, geojson: clippedPolygons});
        }
        else{
            let geojson = store.currentMap.graphics.geojson;
            let i = 0
            L.geoJSON(geojson, {
                onEachFeature: function (feature, layer) {
                    // // Customize popup content
                    // layer.bindPopup(Object.keys(feature.properties).map(function(k) {
                
                    //     return (
                    //     ReactDOMServer.renderToString(
                    //         <Box sx={{display:'flex', alignItems:'center'}}>
                    //             <Typography sx={{marginRight:'auto'}}>{k + ':'}</Typography>
                    //             <input style={{width: "80px", marginLeft:'auto'}} defaultValue={feature.properties[k]}></input>
                    //         </Box>
                    //     )
                    //     )
                    // }).join(""), {
                    //     maxHeight: 200
                    // });

                    let tempi = i
                    if(voronoiPointToggle){  
                        layer.on({
                            click: (e) => {
                                let voronoiPoint = turf.point([e.latlng.lng, e.latlng.lat]);
                                L.DomEvent.stopPropagation(e);
                                let geoPoints = geojson.features.filter(feature=>{
                                    return feature.geometry.type === "Point"
                                })

                                let properties = []
                                let currFeatures = store.currentMap.graphics.geojson.features;
                                if(feature.geometry.type !== 'Point'){
                                    
                                    for(i = 0; i < geoPoints.length; i++){
                                        properties.push({...currFeatures[i].properties})
                                    }
                                    geoPoints.push(voronoiPoint)
                                    properties.push({})
                                }
                                else{
                                    for(i = 0; i < geoPoints.length; i++){
                                        if(JSON.stringify(geoPoints[i].geometry.coordinates) !== JSON.stringify(voronoiPoint.geometry.coordinates) && geoPoints[i].geometry.type === "Point"){
                                            properties.push({...currFeatures[i].properties})
                                        }
                                    }
                                    geoPoints = geojson.features.filter(feature=>{
                                        return JSON.stringify(feature.geometry.coordinates) !== JSON.stringify(voronoiPoint.geometry.coordinates) && feature.geometry.type === "Point"
                                    })

                                    // if(geoPoints.length <= 0){
                                    //     alertModal("Removing Last Point", "Voronoi Maps require atleast one point!")
                                    //     return
                                    // }
                                }

                                //console.log(properties)

                                let points = {"type": "FeatureCollection", "features": geoPoints}
                
                                let options = {bbox: turf.bbox(store.currentMap.graphics.typeSpecific.voronoiBound)}
                                let voronoiPolygons = turf.voronoi(points, options);
                                
                                for(i = 0; i < voronoiPolygons.features.length; i++){
                                    voronoiPolygons.features[i].properties = {...properties[i]}
                                }

                                geojson = {"type":"FeatureCollection", "features": []}
                                // Only get intersection within the polygon
                                voronoiPolygons.features.forEach(feature=>{
                                    let clipped = turf.intersect(store.currentMap.graphics.typeSpecific.voronoiBound.features[0], feature)
                                    
                                    // returns null if no intersection exists, so ignore
                                    if(clipped != null){
                                        clipped.properties = {...feature.properties}
                                        geojson.features.push(clipped);
                                    }
                                })

                                
                
                                
                                points.features.forEach(feature=>{
                                    geojson.features.push(feature)
                                })
                                
                                if(geojson.features.length === 0){
                                    geojson = {...store.currentMap.graphics.typeSpecific.voronoiBound}
                                }
                
                                store.updateLocalMap(null, null, null, null, geojson)
                            },
                        })
                    }
                    else{
                        layer.on({
                            click: (e) => {
                                L.DomEvent.stopPropagation(e);
                                if(feature.geometry.type !== 'Point'){
                                    
                                    // Here we set the index to tempi
                                    handlePropertyDataLoad(tempi)
                                }
                            },
                        }) 
                    }
                    
                    i+=1
                    if(feature.geometry.type === 'Polygon'|| feature.geometry.type === 'MultiPolygon'){
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
                            })
                        }
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
                        radius: 4,
                        fillColor: colors.VoronoiMap,
                        color: "#000",
                        weight: 1,
                        opacity: 1,
                        fillOpacity: 0.8
                    });
                }
            }).addTo(regionLayerGroup);
        }

        map.on('click',function(e) {
            // making sure its not buttons on top
            //console.log(e)
            if(e.originalEvent && e.originalEvent.target.id !== "basemapswitch" && e.originalEvent.target.id !== "undobutton" && e.originalEvent.target.id !== "redobutton" && !e.originalEvent.target.id.includes("legend")){
                handlePropertyDataLoad(null)
                //console.log(e.originalEvent.target.id)
                if(voronoiPointToggle){
                    alertModal("Point Out of Bounds", "Inserted Point was outside bounding polygon please click inside the polygon!")
                }
            }
        });

        if(voronoiPointToggle){
            handlePropertyDataLoad(null)
        }

        return () => {
            regionLayerGroup.remove();
            map.off('click')
          };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map, store.currentMap, colors, sizes, opacities, hasStroke, hasFill, voronoiPointToggle])
    
    useEffect(()=>{
        map.fitBounds(L.geoJSON(store.currentMap.graphics.geojson).getBounds());
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [map])
    
    useEffect(() =>{
        const propertyLayerGroup = L.featureGroup().addTo(map);
        //console.log(propertyData.featureIndex)
        if(store.currentMap && propertyData.featureIndex !== null && !voronoiPointToggle){
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
        map.on("layeradd", function (event) {
            propertyLayerGroup.bringToFront();
        });
        return () => {
            propertyLayerGroup.remove();
            map.off("layeradd")
        };
    
    }, [propertyData, store, map, colors.StrokeColor, voronoiPointToggle])

    return null
}

export default VoronoiMap