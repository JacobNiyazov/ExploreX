import React from 'react';
import Box from '@mui/material/Box';
import { LegendBox }from './StyleSheets/MapEditStyles.js'
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
                            onChangeComplete={(e) => handleNewColor(e, i)}
                            disableAlpha
                            renderers={false}
                        />
                    </Popover>
                </Box>
            );
        }
        return boxes;
    };

    const generatePMVLegendBoxes = () => {
        const boxes = [];
        let chloroInfo = legendFields.isString
        let flag = true;
        let previous = ""
        const keys = Object.keys(legendFields)
            .filter(key => key !== "isString")
            .reverse();
        const temp = keys.map(key => {
            if (chloroInfo) {
                return {
                    fieldColor: legendFields[key],
                    fieldText: key,
                };
            } else {
                if(flag){
                    flag = false;
                    previous = key;
                    return {
                        fieldColor: legendFields[key],
                        fieldText: ">" + key,
                    };
                }
                let temp = previous;
                previous = key;
        
                return {
                    fieldColor: legendFields[key],
                    fieldText: "(" + key + "," + temp + "]",
                };
            }
        });

        legendFields = temp;
        
        for (let i = 0; i < legendFields.length; i++) {
            const label = `label${i}`;

            boxes.push(
                <Box key={label} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Square
                        sx={{
                            backgroundColor: legendFields[i].fieldColor,
                            '&:hover': { backgroundColor: legendFields[i].fieldColor },
                            pointerEvents: 'none',
                        }}
                    ></Square>
                    <LegendBox
                        variant="standard"
                        value={legendFields[i].fieldText}
                    >{legendFields[i].fieldText}</LegendBox>
                </Box>
            );
            //console.log("box made")
        }
        return boxes;
    };
    return (
        <div>

                {legendAnchors === null?
                generatePMVLegendBoxes() : generateLegendBoxes()}

        </div>
    );
};

export default ChoroLegend;
