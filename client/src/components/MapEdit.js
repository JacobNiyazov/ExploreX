import { useState, React} from "react";
import { MapContainer, TileLayer, GeoJSON, ZoomControl, useMap} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import { Box, Grid, Typography } from '@mui/material';
import geojson from '../ExampleData/poland.geojson.json'
import { BaseMapSwitch, ControlGrid, RedoContainer, UndoContainer, UndoRedoContainer, BaseMapContainer, BaseMapBlur, LegendContainer, LegendTextField }from './StyleSheets/MapEditStyles.js'
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import IconButton from '@mui/material/IconButton';
import { Square } from "./StyleSheets/ColorSelectorStyles";
import { ChromePicker } from "react-color";
import Popover from '@mui/material/Popover';

const MapEditInner = () =>{
    const map = useMap();
    map.fitBounds(L.geoJSON(geojson).getBounds());
    return null;
}

const MapEdit = ({
    colors,
    setColors,
    colorPicker,
    setColorPicker,
    anchors,
    setAnchors,
    font,
    setFont,
    size,
    setSize,
    range,
    setRange,
    borderWidth,
    setBorderWidth,
    selectAll,
    setSelectAll,
    hideLegend,
    setHideLegend,
  }) =>{
    const [baseMap, setBaseMap] = useState(false)

    const [legendColor, setLegendColor] = useState({
        label1: "#FF0000",
        label2: "#13412D",
        label3: "#141341"
    })

    const [legendAnchors, setLegendAnchors] = useState({
        label1: null,
        label2: null,
        label3: null
    })

    const [legendColorPicker, setLegendColorPicker] = useState({
        label1: false,
        label2: false,
        label3: false
    })

    const [legendText, setLegendText] = useState({
        title: "Example Title",
        label1: "Field 1",
        label2: "Field 2",
        label3: "Field 3"
    })

    const handleClick = (event, label) => {
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

    const handleNewColor = (event, label) => {
        setLegendColor({
            ...legendColor,
            [label] : event.hex
        })
    }

    const handleBaseMap = () =>{
        setBaseMap(!baseMap)
    }

    const handleTextChange= (event, label) => {
        setLegendText({
            ...legendText,
            [label]: event.target.value
        })
    }
    function getRandomShade(){
        // Generate random values for the red and green components
        const red = Math.floor(Math.random() * 256); // Random red value (0-255)
        const green = Math.floor(Math.random() * 128); // Random green value (0-127)
      
        // Create a random shade of orange-red by combining red and green
        const blue = 0; // Set blue to 0 for shades of orange
        const alpha = 1; // Alpha (opacity) value
      
        // Construct the RGB color string
        const color = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
      
        return color;
    }

    function onEachFeature(feature, layer) {
        
        // Customize popup content
        layer.bindPopup(Object.keys(feature.properties).map(function(k) {
          return k + ": " + feature.properties[k];
        }).join("<br />"), {
          maxHeight: 200
        });
        var shade = getRandomShade();
        layer.setStyle({
          fillColor: shade,
          weight: 3,
          opacity: 1,
          color: shade,
          fillOpacity: 0.5
        });
    }

    return(
        <Grid item xs = {8}>
            <MapContainer center={[0,0]} zoom={3} style={{ height: '100%'}} zoomControl={false}>
                {
                    baseMap ?
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

                    />
                    :null
                }
                <MapEditInner/>
                <GeoJSON data={geojson} onEachFeature={onEachFeature} />
                <ZoomControl position="bottomleft"/>
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
                    <BaseMapContainer>
                        <BaseMapBlur>
                            <BaseMapSwitch onChange={handleBaseMap}></BaseMapSwitch>
                            <Typography>Base Map</Typography>
                        </BaseMapBlur>
                    </BaseMapContainer>
                    <LegendContainer sx={hideLegend? {zIndex:-100} : {zIndex:1000}}>
                        <LegendTextField variant="standard" sx={{'& .MuiInputBase-root':{fontSize:"25px"}}} value={legendText.title} onChange={(e) => handleTextChange(e, "title")}></LegendTextField>
                        <Box sx={{display:'flex', alignItems: 'center'}}>
                            <Square sx={{backgroundColor: legendColor.label1, '&:hover':{backgroundColor: legendColor.label1}}} onClick={(e) => handleClick(e, "label1")}></Square>
                            <LegendTextField variant="standard" value={legendText.label1} onChange={(e) => handleTextChange(e, "label1")}></LegendTextField>
                            <Popover 
                                open={Boolean(legendAnchors.label1)} 
                                onClose={()=>handleClose("label1")}
                                anchorEl={legendAnchors.label1} 
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}>
                                <ChromePicker
                                    color={legendColor !== null && legendColor.label1}
                                    onChange={(e)=>handleNewColor(e, "label1")}
                                    disableAlpha
                                    renderers={false}
                                />
                            </Popover>
                        </Box>
                        <Box sx={{display:'flex', alignItems: 'center'}}>
                            <Square sx={{backgroundColor: legendColor.label2, '&:hover':{backgroundColor: legendColor.label2}}} onClick={(e) => handleClick(e, "label2")}></Square>
                            <LegendTextField variant="standard" value={legendText.label2} onChange={(e) => handleTextChange(e, "label2")}></LegendTextField>
                            <Popover 
                                open={Boolean(legendAnchors.label2)} 
                                onClose={()=>handleClose("label2")}
                                anchorEl={legendAnchors.label2} 
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}>
                                <ChromePicker
                                    color={legendColor !== null && legendColor.label2}
                                    onChange={(e)=>handleNewColor(e,"label2")}
                                    disableAlpha
                                    renderers={false}
                                />
                            </Popover>
                        </Box>
                        <Box sx={{display:'flex', alignItems: 'center'}}>
                            <Square sx={{backgroundColor: legendColor.label3, '&:hover':{backgroundColor: legendColor.label3}}} onClick={(e) => handleClick(e, "label3")}></Square>
                            <LegendTextField variant="standard" value={legendText.label3} onChange={(e) => handleTextChange(e, "label3")}></LegendTextField>
                            <Popover 
                                open={Boolean(legendAnchors.label3)} 
                                onClose={()=>handleClose("label3")}
                                anchorEl={legendAnchors.label3} 
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}>
                                <ChromePicker
                                    color={legendColor !== null && legendColor.label3}
                                    onChange={(e)=>handleNewColor(e,"label3")}
                                    disableAlpha
                                    renderers={false}
                                />
                            </Popover>
                        </Box>
                    </LegendContainer>
                </ControlGrid>
            
            </MapContainer>
        </Grid>
    )
}

export default MapEdit