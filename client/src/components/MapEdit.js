import { useRef, useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, ZoomControl, useMap} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import { Box, Grid, Typography } from '@mui/material';
import geojson from '../ExampleData/poland.geojson.json'
import Switch from '@mui/material/Switch';
import { BaseMapSwitch, ControlGrid, RedoContainer, UndoContainer, UndoRedoContainer, BaseMapContainer }from './StyleSheets/MapEditStyles.js'
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import IconButton from '@mui/material/IconButton';

const MapEditInner = () =>{
    const map = useMap();
    map.fitBounds(L.geoJSON(geojson).getBounds());
    return null;
}

const MapEdit = () =>{
    const [baseMap, setBaseMap] = useState(false)

    const handleBaseMap = () =>{
        setBaseMap(!baseMap)
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
                    </UndoRedoContainer>
                    <BaseMapContainer>
                        <BaseMapSwitch onChange={handleBaseMap}></BaseMapSwitch>
                        <Typography>Base Map</Typography>
                    </BaseMapContainer>
                    
                </ControlGrid>
            
            </MapContainer>
        </Grid>
    )
}

export default MapEdit