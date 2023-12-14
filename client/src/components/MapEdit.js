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
import * as ReactDOMServer from 'react-dom/server';
import GlobalStoreContext from '../store/index.js';
import DotDistMap from './DotDistMap.js';
import SpikeMap from './SpikeMap.js';
import HeatMap from "./HeatMap.js";
import ChloroplethMap from './ChloroplethMap.js';
import VoronoiMap from './VoronoiMap.js';
import ChoroLegend from "./ChoroLegend";
import SpikeLegend from "./SpikeLegend.js";
import DotDistLegend from "./DotDistLegend.js";
import HeatMapLegend from "./HeatMapLegend.js";
import GlobalMapEditContext, { GlobalMapEditContextProvider } from "../mapEdit/index.js";
import EditMap_Transaction from "../transactions/EditMap_Transaction.js";
import VoronoiLegend from "./VoronoiLegend.js";

const MapEditInner = ({
    colors,
    sizes,
    opacities,
    hasStroke,
    hasFill,
    handlePropertyDataLoad, 
    propertyData,
    chloroData,
    handleNewColors,
    voronoiPointToggle,
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
        return <DotDistMap 
        colors={colors}
        sizes={sizes}
        opacities={opacities}
        hasStroke={hasStroke}
        hasFill={hasFill} 
        handlePropertyDataLoad = {handlePropertyDataLoad} 
        propertyData={propertyData}/>
    }
    else if(store.currentMap.type === "Spike Map"){
        return <SpikeMap
        colors={colors}
        sizes={sizes}
        opacities={opacities}
        hasStroke={hasStroke}
        hasFill={hasFill} 
        handlePropertyDataLoad = {handlePropertyDataLoad} 
        propertyData={propertyData}/>
    }
    else if(store.currentMap.type === "Heat Map"){
        if(store.currentMap.graphics.geojson){
            console.log("colors inside current map type: ", colors)
            return <HeatMap 
            handlePropertyDataLoad = {handlePropertyDataLoad} 
            propertyData={propertyData}
            colors={colors}
            sizes={sizes}
            opacities={opacities}
            hasStroke={hasStroke}
            hasFill={hasFill} 
            />
        }
    }
    else if(store.currentMap.type === "Choropleth Map"){
        return <ChloroplethMap 
        colors={colors}
        sizes={sizes}
        opacities={opacities}
        hasStroke={hasStroke}
        hasFill={hasFill} 
        handlePropertyDataLoad = {handlePropertyDataLoad} 
        propertyData={propertyData}
        chloroProperty={chloroData}
        setChloroProperty = {handleNewColors}/>
    }
    else if(store.currentMap.type === "Voronoi Map"){
        console.log(colors)
        return <VoronoiMap 
        handlePropertyDataLoad = {handlePropertyDataLoad} 
        propertyData={propertyData}
        colors={colors}
        opacities={opacities}
        hasStroke={hasStroke}
        hasFill={hasFill}
        sizes={sizes}
        voronoiPointToggle={voronoiPointToggle}/>
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
    handlePropertyDataLoad,
    propertyData,
    chloroData,
    setChloroData,
    handleNewColors,
    voronoiPointToggle,
    voronoiValue,
    setVoronoiValue,
    photo,
    captureMapAsImage,
    originalStatesRef,
    setTitle,
    setColors,
    setSizes,
    setOpacities,
    setAnchors,
    setTextFont,
    setHasStroke,
    setHasFill,
    setHideLegend
  }) =>{

    
    //const { store } = useContext(GlobalStoreContext);
    const [baseMap, setBaseMap] = useState(false)
    const { store } = useContext(GlobalStoreContext);
    const storeRef = useRef(store);
    const tps = store.currentTps;

    /*const DynamicLegend = ({colors, legendFields, legendAnchors, handleLegendClick, handleTextChange, handleClose, handleNewColor}) => {
        const { store } = useContext(GlobalStoreContext);
    
        if(store.currentMap.type === "Spike Map"){
            return <SpikeLegend colors={colors}/>
        }
        else if(store.currentMap.type === "Dot Distribution Map"){
            return <DotDistLegend colors={colors}/>
        }
        else if(store.currentMap.type === "Choropleth Map"){
            console.log("LEGEND")
            return <ChoroLegend
                legendFields = {legendFields}
                legendAnchors = {legendAnchors}
                handleLegendClick = {handleLegendClick}
                handleTextChange = {handleTextChange}
                handleClose = {handleClose}
                handleNewColor = {handleNewColor}>
                </ChoroLegend>
        }
    }*/
    
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

    const handleBaseMap = (e) =>{
        console.log(e)
        e.stopPropagation();
        setBaseMap(!baseMap)
    }

    function extractFirstNumber(str) {
        const match = str.match(/-?\d+(\.\d+)?/);
        return match ? parseFloat(match[0]) : null;
      }

    const handleNewColor = (event, index) => {
        const updatedFields = [...legendFields];
        updatedFields[index].fieldColor = event.hex;
        setLegendFields(updatedFields);
        if(chloroData.isString){
            let newColor = updatedFields[index].fieldText
            let temp = {...chloroData}
            temp[newColor] = event.hex;

            setChloroData(temp)
            // store.currentMap.graphics.typeSpecific.chloroLegend[newColor] = event.hex
        }
        else{
            let newColor = extractFirstNumber(updatedFields[index].fieldText)
            let temp = {...chloroData}
            temp[newColor] = event.hex;
            setChloroData(temp)

            // store.currentMap.graphics.typeSpecific.chloroLegend[temp] = event.hex

        }
    };

    const handleTitleChange = (event) => {
        setLegendTitle(event.target.value)
    }

    const mapContainerRef = useRef(null);

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
    

      function handleUndo(){
        console.log("undo happening rn")
        tps.undoTransaction()
    }
    function handleRedo(){
        console.log("redo happening rn")
        tps.doTransaction()
    }

    let DynamicLegend = null;

    if(store.currentMap.type === "Spike Map"){
        DynamicLegend = <SpikeLegend colors={colors}/>
    }
    else if(store.currentMap.type === "Dot Distribution Map"){
        DynamicLegend = <DotDistLegend colors={colors}/>
    }
    else if(store.currentMap.type === "Voronoi Map"){
        DynamicLegend = <VoronoiLegend 
                            colors={colors}
                            voronoiValue={voronoiValue}
                            setVoronoiValue={setVoronoiValue}/>
    }
    else if(store.currentMap.type === "Heat Map"){
        DynamicLegend = <HeatMapLegend
            colors = {colors}
        />
    }
    else if(store.currentMap.type === "Choropleth Map"){
        console.log("legendfields")
        console.log(legendFields)
        DynamicLegend = <ChoroLegend
            legendFields = {legendFields}
            legendAnchors = {legendAnchors}
            handleLegendClick = {handleLegendClick}
            handleClose = {handleClose}
            handleNewColor = {handleNewColor}>
            </ChoroLegend>
    }
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
                handlePropertyDataLoad = {handlePropertyDataLoad} 
                propertyData={propertyData}
                chloroData={chloroData}
                handleNewColors = {handleNewColors}
                voronoiPointToggle={voronoiPointToggle}/>
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
                                    {/*please leave id i need for voronoi*/}
                                    <IconButton id="undobutton" sx={{color: "#000000"}} onClick={handleUndo}>
                                        <UndoIcon fontSize='large'/>
                                    </IconButton>
                                    <Typography>Undo</Typography>
                                </UndoContainer>
                                <RedoContainer>
                                    {/*please leave id i need for voronoi*/}
                                    <IconButton id={"redobutton"} sx={{color: "#000000"}} onClick = {handleRedo}>
                                    <RedoIcon fontSize='large' /> 
                                    </IconButton>
                                    <Typography>Redo</Typography>
                                </RedoContainer>
                            </Box>
                        </UndoRedoContainer>
                        <BaseMapContainer >
                            <BaseMapBlur>
                                {/*please leave id i need for voronoi*/}
                                <BaseMapSwitch id={"basemapswitch"} onChange={handleBaseMap}></BaseMapSwitch>
                                <Typography>Base Map</Typography>
                            </BaseMapBlur>
                        </BaseMapContainer>
                        {/*id for voronoi stuff :)*/}
                        <LegendContainer id="legendcontainer" sx={hideLegend? {zIndex:-100} : {zIndex:1000}} style={{
                                maxHeight: '500px',
                                maxWidth: '500px',
                                overflowY: 'auto',
                            }}>
                            <LegendTextField id="legendtitle" variant="standard" sx={{'& .MuiInputBase-root':{fontSize:"25px"}}} value={legendTitle} onChange={(e) => handleTitleChange(e)}></LegendTextField>
                            <div id="legenddiv" style={{ overflow: 'auto' }}>
                            {DynamicLegend}
                            </div>
                            
                        </LegendContainer>
                    </ControlGrid>
                    :null
                }
                
            
            </MapContainer>
        </Grid>
    )
}

export default MapEdit