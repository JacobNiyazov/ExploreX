import React from 'react';
import { Square, ColorTextField } from './StyleSheets/ColorSelectorStyles';
import Box from '@mui/material/Box';
import { ChromePicker } from "react-color";
import Popover from '@mui/material/Popover';

const ColorSelector = ({colors, setColors, colorPicker, setColorPicker, anchors, setAnchors, label}) =>{
    const handleClick = (event) => {
        setColorPicker({
            ...colorPicker,
            [label]: !colorPicker[label]
        });
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
    }

    const handleTextColor = (event) => {
        setColors({
            ...colors,
            [label]: "#" + event.target.value
        })
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