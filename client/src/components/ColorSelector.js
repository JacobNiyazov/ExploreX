import React,{useContext} from 'react';
import { Square, ColorTextField } from './StyleSheets/ColorSelectorStyles';
import Box from '@mui/material/Box';
import { ChromePicker } from "react-color";
import Popover from '@mui/material/Popover';
import { GlobalMapEditContext } from '../mapEdit'
import GlobalStoreContext from '../store/index.js';

const ColorSelector = ({colors, setColors, anchors, setAnchors, label}) =>{
    const { mapEdit } = useContext(GlobalMapEditContext);
    const { store } = useContext(GlobalStoreContext);
    /*function newTransaction(oldMapData, hex){
        console.log("colors should have changed: ", colors.highGradient)
        let newMapData = {
            id: store.currentMap._id,
            title: mapEdit.title,
            hasStroke: mapEdit.hasStroke,
            strokeColor: label === "StrokeColor"? hex:colors.StrokeColor,
            strokeWeight: mapEdit.strokeWeight,
            strokeOpacity: mapEdit.strokeOpacity,
            hasFill: mapEdit.hasFill,
            fillColor: label === "FillColor" ? hex:colors.FillColor,
            fillOpacity: mapEdit.fillOpacity,
            textColor: label === "TextColor" ? hex:colors.TextColor,
            textSize: mapEdit.TextSize,
            textFont: mapEdit.textFont,
            legendTitle: mapEdit.legendTitle,
            legendFields: mapEdit.legendFields,
            chloroData: mapEdit.chloroData,
            dotColor: label === "DotMap"?hex:colors.DotMap,
            spikeColor: label === "SpikeMap"?hex:colors.SpikeMap,
            lowGradient: label === "lowGradient"?hex:colors.lowGradient,
            mediumGradient: label === "mediumGradient"?hex:colors.mediumGradient,
            highGradient: label === "highGradient"?hex:colors.highGradient
        }
        mapEdit.addUpdateMapTransaction(oldMapData, newMapData)
    }*/
    const handleClick = (event) => {
        setAnchors({
            ...anchors,
            [label]: event.currentTarget
        })
    };

    const handleClose = () => {
        setAnchors({
            ...anchors,
            [label]: null
        });
    };

    const handleNewColor = (event) => {
        /*let oldMapData = {
            id: store.currentMap._id,
            title: mapEdit.title,
            hasStroke: mapEdit.hasStroke,
            strokeColor: colors.StrokeColor,
            strokeWeight: mapEdit.strokeWeight,
            strokeOpacity: mapEdit.strokeOpacity,
            hasFill: mapEdit.hasFill,
            fillColor: colors.FillColor,
            fillOpacity: mapEdit.fillOpacity,
            textColor: colors.TextColor,
            textSize: mapEdit.TextSize,
            textFont: mapEdit.textFont,
            legendTitle: mapEdit.legendTitle,
            legendFields: mapEdit.legendFields,
            chloroData: mapEdit.chloroData,
            dotColor: colors.DotMap,
            spikeColor: colors.SpikeMap,
            lowGradient: colors.lowGradient,
            mediumGradient: colors.mediumGradient,
            highGradient: colors.highGradient
        }*/
        setColors({
            ...colors,
            [label] : event.hex
        })
        console.log("event.hex: ", event.hex)
        //newTransaction(oldMapData, event.hex)
    }

    const handleTextColor = (event) => {
        /*let oldMapData = {
            id: store.currentMap._id,
            title: mapEdit.title,
            hasStroke: mapEdit.hasStroke,
            strokeColor: colors.StrokeColor,
            strokeWeight: mapEdit.strokeWeight,
            strokeOpacity: mapEdit.strokeOpacity,
            hasFill: mapEdit.hasFill,
            fillColor: colors.FillColor,
            fillOpacity: mapEdit.fillOpacity,
            textColor: colors.TextColor,
            textSize: mapEdit.TextSize,
            textFont: mapEdit.textFont,
            legendTitle: mapEdit.legendTitle,
            legendFields: mapEdit.legendFields,
            chloroData: mapEdit.chloroData,
            dotColor: colors.DotMap,
            spikeColor: colors.SpikeMap,
            lowGradient: colors.lowGradient,
            mediumGradient: colors.mediumGradient,
            highGradient: colors.highGradient
        }*/
        setColors({
            ...colors,
            [label]: "#" + event.target.value
        })
       // newTransaction(oldMapData, "#"+event.target.value)
    }
    return (
        <Box sx={{marginLeft:'auto', display:'flex', alignItems: 'center'}}>
            <Square sx={{backgroundColor: colors[label], '&:hover':{backgroundColor: colors[label]}}} onClick={handleClick} data-testid="color-box"></Square>
            <Popover data-testid="color-picker"
                open={Boolean(anchors[label])} 
                onClose={handleClose}
                anchorEl={anchors[label]} 
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}>
                <ChromePicker
                    color={colors !== null && colors[label]}
                    onChange={handleNewColor}
                    disableAlpha
                    renderers={false}
                />
            </Popover>
            <ColorTextField sx={{paddingLeft:"10px"}} onChange={handleTextColor} variant="standard" value={colors[label].substring(1)} error={!(/^[0-9A-F]{6}$/i.test(colors[label].substring(1)))} data-testid="color-text"></ColorTextField>
        </Box>
    )
}

export default ColorSelector