import { useState, React, useContext, useEffect, useRef, useCallback} from "react";
import { MapContainer, TileLayer, ZoomControl, useMap} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import domtoimage from 'dom-to-image';
import { Box, Grid, Typography } from '@mui/material';
import { BaseMapSwitch, ControlGrid, RedoContainer, UndoContainer, UndoRedoContainer, BaseMapContainer, BaseMapBlur, LegendContainer, LegendTextField }from './StyleSheets/MapEditStyles.js'
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import IconButton from '@mui/material/IconButton';
import { Square } from "./StyleSheets/ColorSelectorStyles";
import { ChromePicker } from "react-color";
import Popover from '@mui/material/Popover';
import * as ReactDOMServer from 'react-dom/server';
import GlobalStoreContext from '../store/index.js';
import DotDistMap from './DotDistMap.js';
import SpikeMap from './SpikeMap.js';
import HeatMap from "./HeatMap.js";
import ChloroplethMap from './ChloroplethMap.js';
import VoronoiMap from './VoronoiMap.js';
import ChoroLegend from "./ChoroLegend";

const MapEditInner = ({
    colors,
    sizes,
    opacities,
    hasStroke,
    hasFill,
    }) =>{
    const { store } = useContext(GlobalStoreContext);

    // const map = useMap();
    // const layerRef = useRef(null);
    // useEffect(() => {
    //     if (layerRef.current) {
    //         // If there's an existing layer, remove it
    //         layerRef.current.remove();
    //     }

    //     // Load the new layer
    //     layerRef.current = loadMap(store.currentMap.graphics.geojson, map, colors, sizes, opacities, hasStroke, hasFill);

    //     // Cleanup function to remove the layer when the component unmounts or dependencies change
    //     return () => {
    //         if (layerRef.current) {
    //             layerRef.current.remove();
    //         }
    //     };
    // }, [store, colors, sizes, opacities, hasStroke, hasFill]);

    function loadMap(geojson, map, colors, sizes, opacities, hasStroke, hasFill){
        
        const regionLayer = L.geoJSON(geojson, {
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
                if(feature.geometry.type === 'Polygon' || feature.geometry.type === 'MultiPolygon'){
                    // var shade = getRandomShade();
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
                console.log(feature, layer)
            }
        }).addTo(map);
        map.fitBounds(L.geoJSON(geojson).getBounds());
        return regionLayer;
    }

    if(store.currentMap.type === "Dot Distribution Map"){
        console.log(colors)
        return <DotDistMap 
        colors={colors}
        sizes={sizes}
        opacities={opacities}
        hasStroke={hasStroke}
        hasFill={hasFill}/>
    }
    else if(store.currentMap.type === "Spike Map"){
        return <SpikeMap/>
    }
    else if(store.currentMap.type === "Heat Map"){
        if(store.currentMap.graphics.geojson){
            return <HeatMap geojsonData ={store.currentMap.graphics.geojson} property = {store.currentMap.graphics.typeSpecific.property}/>
        }
    }
    else if(store.currentMap.type === "Choropleth Map"){
        return <ChloroplethMap 
        colors={colors}
        sizes={sizes}
        opacities={opacities}
        hasStroke={hasStroke}
        hasFill={hasFill}/>
    }
    else if(store.currentMap.type === "Voronoi Map"){
        return <VoronoiMap />
    }
    // else{
    //     loadMap(store.currentMap.graphics.geojson);
    // }

    return null;
}

const MapEdit = ({
    colors,
    sizes,
    opacities,
    hasStroke,
    hasFill,
    range,
    hideLegend,
    legendTitle,
    setLegendTitle,
    legendFields,
    setLegendFields,
  }) =>{
    //const { store } = useContext(GlobalStoreContext);
    const [baseMap, setBaseMap] = useState(false)
    const [photo, setPhoto] = useState(false)
    const { store } = useContext(GlobalStoreContext);
    const storeRef = useRef(store);


    const [legendAnchors, setLegendAnchors] = useState(() => {
        if(legendFields){
            const initialAnchors = {};
            legendFields.forEach((_, index) => {
                initialAnchors[`label${index}`] = null;
            });
            return initialAnchors;
        }
    });


    const [legendColorPicker, setLegendColorPicker] = useState(() => {
        if(legendFields){
            const initialColorPickers = {};
            legendFields.forEach((_, index) => {
                initialColorPickers[`label${index}`] = false;
            });
            return initialColorPickers;
        }
    });

    const handleLegendClick = (event, label) => {
        setLegendColorPicker({
            ...legendColorPicker,
            [label]: !legendColorPicker[label]
        });
        setLegendAnchors({
            ...legendAnchors,
            [label]: event.currentTarget
        })
    };

    const handleClose = (label) => {
        setLegendAnchors({
            ...legendAnchors,
            [label]: null
        });
    };

    const handleBaseMap = () =>{
        setBaseMap(!baseMap)
    }

    const handleTextChange = (e, index) => {
        const updatedFields = [...legendFields];
        updatedFields[index].fieldText = e.target.value;
        setLegendFields(updatedFields);
    };

    const handleNewColor = (event, index) => {
        const updatedFields = [...legendFields];
        updatedFields[index].fieldColor = event.hex;
        setLegendFields(updatedFields);
    };

    const handleTitleChange = (event) => {
        setLegendTitle(event.target.value)
    }

    const mapContainerRef = useRef(null);
    const captureMapAsImage = useCallback(async () => {        
        const mapContainer = document.getElementById('map-container'); // Replace 'map-container' with the actual ID or use another method to get the element
            console.log("map container: ",mapContainer)
            if (mapContainer) {
            // Use dom-to-image to convert the MapContainer element to an image
            domtoimage.toPng(mapContainer, {
                width: mapContainer.clientWidth * 1,
                height: mapContainer.clientHeight * 1,
            })
                .then(async function (dataUrl) {
                // 'dataUrl' now contains the image data in base64 format
                // You can send this dataUrl to the backend or use it as needed
                storeRef.current.updateMapGraphics(null, dataUrl)
                })
                .catch(function (error) {
                // Handle any errors that occurred during image conversion
                console.error('Error capturing screenshot:', error);
                });
            } else {
            console.error('MapContainer element not found');
            }
            //console.log("set photo")
            setPhoto(true);

        }, [storeRef]);

      useEffect(() => {
        const waitForMapLoad = async () => {
            if (!mapContainerRef.current) {
                // Wait until authentication check is completed
                await new Promise((resolve) => setTimeout(resolve, 100)); // Adjust time as needed
                waitForMapLoad(); // Re-check status
            } else {
                if(!photo){
                    // setPhoto(true)   
                    captureMapAsImage()

                }
            }
        }

        waitForMapLoad();
      }, [captureMapAsImage, photo ]);

    
      let Legend = <ChoroLegend
        legendFields = {legendFields}
        legendAnchors = {legendAnchors}
        handleLegendClick = {handleLegendClick}
        handleTextChange = {handleTextChange}
        handleClose = {handleClose}
        handleNewColor = {handleNewColor}>
        </ChoroLegend>

      const generateLegendBoxes = () => {
        const boxes = [];
        console.log("FIELDS")
        console.log(legendFields)
        for (let i = 0; i < legendFields.length; i++) {
            const label = `label${i}`;
            console.log(label)
            boxes.push(
            <Box key={label} sx={{ display: 'flex', alignItems: 'center' }}>
              <Square
                sx={{
                  backgroundColor: legendFields[i].fieldColor,
                  '&:hover': { backgroundColor: legendFields[i].fieldColor },
                }}
                onClick={(e) => handleLegendClick(e, label)}
              ></Square>
              <LegendTextField
                variant="standard"
                value={legendFields[i].fieldText}
                onChange={(e) => handleTextChange(e, i)}
              ></LegendTextField>
              <Popover
                open={Boolean(legendAnchors[label])}
                onClose={() => handleClose(label)}
                anchorEl={legendAnchors[label]}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <ChromePicker
                  color={legendFields[i] !== null && legendFields[i].fieldColor}
                  onChange={(e) => handleNewColor(e, i)}
                  disableAlpha
                  renderers={false}
                />
              </Popover>
            </Box>
          );
        }
        return boxes;
      };

    return(
        <Grid item xs = {8}>

            <MapContainer center={[0,0]} zoom={3} style={{ height: '100%'}} zoomControl={false} id = 'map-container' ref ={mapContainerRef}>
                {
                    baseMap ?
                    <TileLayer 
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

                    />
                    :null
                }
                <MapEditInner 
                colors={colors}
                sizes={sizes}
                opacities={opacities}
                hasStroke={hasStroke}
                hasFill={hasFill}
                range={range}
                hideLegend={hideLegend}
                />
                {/*<GeoJSON data={geojson} onEachFeature={onEachFeature} />*/}
                {
                    photo ?
                    <ZoomControl position="bottomleft" />
                    :null
                }
                {
                    photo ?
                        <ControlGrid>
                        <UndoRedoContainer>
                            <Box sx={{backdropFilter: 'blur(10px)', display: 'flex',gap: "10px",height:"min-content"}}>
                                <UndoContainer>
                                    <IconButton sx={{color: "#000000"}}>
                                        <UndoIcon fontSize='large'/>
                                    </IconButton>
                                    <Typography>Undo</Typography>
                                </UndoContainer>
                                <RedoContainer>
                                    <IconButton sx={{color: "#000000"}}>
                                    <RedoIcon fontSize='large' /> 
                                    </IconButton>
                                    <Typography>Redo</Typography>
                                </RedoContainer>
                            </Box>
                        </UndoRedoContainer>
                        <BaseMapContainer >
                            <BaseMapBlur>
                                <BaseMapSwitch onChange={handleBaseMap}></BaseMapSwitch>
                                <Typography>Base Map</Typography>
                            </BaseMapBlur>
                        </BaseMapContainer>
                        <LegendContainer sx={hideLegend ? { zIndex: -100 } : { zIndex: 1000 }} style={{
                            maxHeight: '200px',
                            overflowY: 'auto',
                        }}>
                            <LegendTextField variant="standard" sx={{ '& .MuiInputBase-root': { fontSize: "25px" } }} value={legendTitle} onChange={(e) => handleTitleChange(e)}></LegendTextField>
                            {Legend}
                            </LegendContainer>
                    </ControlGrid>
                    :null
                }
                
            
            </MapContainer>
        </Grid>
    )
}

export default MapEdit