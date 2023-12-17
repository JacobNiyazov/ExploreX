import React,{useContext} from 'react';
import { Square, ColorTextField } from './StyleSheets/ColorSelectorStyles';
import Box from '@mui/material/Box';
import { ChromePicker } from "react-color";
import Popover from '@mui/material/Popover';
import { GlobalMapEditContext } from '../mapEdit'
import GlobalStoreContext from '../store/index.js';
import EditMap_Transaction from '../transactions/EditMap_Transaction.js';

const ColorSelector = ({originalStatesRef, 
    label,
    colors,
    setColors,
    anchors,
    setAnchors, 
    setTitle,
    setSizes,
    setOpacities,
    setTextFont,
    setHasStroke,
    setHasFill,
    setHideLegend,
    setLegendTitle,
    setLegendFields
}) =>{
    const { mapEdit } = useContext(GlobalMapEditContext);
    const { store } = useContext(GlobalStoreContext);
    let tps = store.currentTps
    function newTransaction(hex){
        console.log("title in new map: ", originalStatesRef.current.title)
        let newMapData = {
            //title: originalStatesRef.current.title,
            colors:{
                StrokeColor: label === "StrokeColor"? hex:colors.StrokeColor,
                FillColor: label === "FillColor" ? hex:colors.FillColor,
                TextColor: label === "TextColor" ? hex:colors.TextColor,
                DotMap: label === "DotMap"?hex:colors.DotMap,
                SpikeMap: label === "SpikeMap"?hex:colors.SpikeMap,
                lowGradient: label === "lowGradient"?hex:colors.lowGradient,
                mediumGradient: label === "mediumGradient"?hex:colors.mediumGradient,
                highGradient: label === "highGradient"?hex:colors.highGradient
            },
            sizes:{
                TextSize: originalStatesRef.current.sizes.TextSize,
                StrokeWeight: originalStatesRef.current.sizes.StrokeWeight,
            },
            opacities:{
                StrokeOpacity: originalStatesRef.current.opacities.StrokeOpacity,
                fillOpacity: originalStatesRef.current.opacities.FillOpacity,
            },
            hasStroke: originalStatesRef.current.hasStroke,
            hasFill: originalStatesRef.current.hasFill,
            hideLegend: originalStatesRef.current.hideLegend,
            textFont: originalStatesRef.current.textFont,
            legendTitle: originalStatesRef.current.legendTitle,
            legendFields: originalStatesRef.current.legendFields,
            chloroData: mapEdit.chloroData,
        }
        let transaction = new EditMap_Transaction(originalStatesRef.current, 
            newMapData,
            //setTitle, 
            setLegendTitle, 
            setLegendFields, 
            setColors, 
            setSizes,
            setOpacities,
            setAnchors,
            setTextFont,
            setHasStroke, 
            setHasFill,
            setHideLegend,
            //originalStatesRef
            )
            
        // get tps from the store
        tps.addTransaction(transaction)
        // set the originalStatesRef to the newMapData
        originalStatesRef.current = {...newMapData}
    }
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
        setColors({
            ...colors,
            [label] : event.hex
        })
        newTransaction(event.hex)
    }

    const handleTextColor = (event) => {
        setColors({
            ...colors,
            [label]: "#" + event.target.value
        })
       newTransaction("#"+event.target.value)
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
                    onChangeComplete={handleNewColor}
                    disableAlpha
                    renderers={false}
                />
            </Popover>
            <ColorTextField sx={{paddingLeft:"10px"}} onChange={handleTextColor} variant="standard" value={colors[label].substring(1)} error={!(/^[0-9A-F]{6}$/i.test(colors[label].substring(1)))} data-testid="color-text"></ColorTextField>
        </Box>
    )
}

export default ColorSelector