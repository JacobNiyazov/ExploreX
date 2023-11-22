import { useState, React} from "react";
import { MapContainer, TileLayer, ZoomControl, useMap} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import { Box, Grid, Typography } from '@mui/material';
import geojson from '../ExampleData/poland.geojson.json'
import kmlFile from "../ExampleData/example1.kml"
import shp from '../ExampleData/USA_adm0.shp'
import dbf from "../ExampleData/USA_adm0.dbf"
import { BaseMapSwitch, ControlGrid, RedoContainer, UndoContainer, UndoRedoContainer, BaseMapContainer, BaseMapBlur, LegendContainer, LegendTextField }from './StyleSheets/MapEditStyles.js'
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import IconButton from '@mui/material/IconButton';
import { Square } from "./StyleSheets/ColorSelectorStyles";
import { ChromePicker } from "react-color";
import Popover from '@mui/material/Popover';
import * as ReactDOMServer from 'react-dom/server';
import * as togeojson from "@tmcw/togeojson"
var shapefile = require("shapefile");

const MapEditInner = ({mapType}) =>{

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

    const map = useMap();

    function loadMap(geojson){
        L.geoJSON(geojson, {
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
                if(feature.geometry.type === 'Polygon'){
                var shade = getRandomShade();
                layer.setStyle({
                fillColor: shade,
                weight: 3,
                opacity: 1,
                color: shade,
                fillOpacity: 0.5
                });}
                console.log(feature, layer)
            }
        }).addTo(map);
        map.fitBounds(L.geoJSON(geojson).getBounds());
    }

    // Function to check the file extension and determine the file type
        
    if (mapType === 'kml'){
        fetch(kmlFile)
        .then((res) => res.text())
        .then((text) => {
            const DOMParser = require("xmldom").DOMParser;
            let geojson = togeojson.kml(new DOMParser().parseFromString(text, "text/xml"));
            console.log(geojson)
            loadMap(geojson);
        })
    }
    else if(mapType === 'geojson'){
        loadMap(geojson);
    }
    else if(mapType === 'shapefile'){
        const loadShapefile = async () => {
            let geojson = await shapefile.read(shp, dbf);
            loadMap(geojson)
        }
        loadShapefile()
    }
    
    return null;
}

const MapEdit = ({
    colors,
    font,
    size,
    range,
    borderWidth,
    selectAll,
    hideLegend,
  }) =>{
    const test = "kml"
    //const { store } = useContext(GlobalStoreContext);
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
                <MapEditInner mapType={test}/>
                {/*<GeoJSON data={geojson} onEachFeature={onEachFeature} />*/}
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
                            <Square sx={{backgroundColor: legendColor.label1, '&:hover':{backgroundColor: legendColor.label1}}} onClick={(e) => handleLegendClick(e, "label1")}></Square>
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
                            <Square sx={{backgroundColor: legendColor.label2, '&:hover':{backgroundColor: legendColor.label2}}} onClick={(e) => handleLegendClick(e, "label2")}></Square>
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
                            <Square sx={{backgroundColor: legendColor.label3, '&:hover':{backgroundColor: legendColor.label3}}} onClick={(e) => handleLegendClick(e, "label3")}></Square>
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