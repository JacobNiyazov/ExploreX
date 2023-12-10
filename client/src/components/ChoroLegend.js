import React from 'react';
import Box from '@mui/material/Box';
import { LegendBox, LegendTextField }from './StyleSheets/MapEditStyles.js'
import { Square } from "./StyleSheets/ColorSelectorStyles";
import Popover from '@mui/material/Popover';
import ChromePicker from 'react-color';

const ChoroLegend = ({
    legendFields,
    legendAnchors,
    handleLegendClick,
    handleClose,
    handleNewColor,
}) => {

    const generateLegendBoxes = () => {
        const boxes = [];
        for (let i = 0; i < legendFields.length; i++) {
            const label = `label${i}`;
            boxes.push(
                <Box key={label} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Square
                        sx={{
                            backgroundColor: legendFields[i].fieldColor,
                            '&:hover': { backgroundColor: legendFields[i].fieldColor },
                        }}
                        onClick={(e) => handleLegendClick(e, label)}
                    ></Square>
                    <LegendBox
                        variant="standard"
                        value={legendFields[i].fieldText}
                    >{legendFields[i].fieldText}</LegendBox>
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

    return (
        <div>
          
                {generateLegendBoxes()}

        </div>
    );
};

export default ChoroLegend;
