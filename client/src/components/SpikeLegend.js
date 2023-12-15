import { React, useContext } from "react";
import { Box, Typography } from '@mui/material';
import GlobalStoreContext from '../store/index.js';

const SpikeLegend = ({colors}) => {
    const { store } = useContext(GlobalStoreContext);
    let values = store.currentMap.graphics.typeSpecific.spikeLegend;
    //console.log(colors.SpikeMap)
    const computeHeight = (value) => {
        // Convert value to spike height
        if(value > 200){
            return value / values[2];
        }
        return value
    };

    return (
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
            {values.map((value, index) => (
            <Box key={index} display="flex" flexDirection="column" alignItems="center" mx={1}>
                <Box className="triangle" style={{
                borderBottomWidth: `${computeHeight(value)}px`, // Set the height of the triangle
                borderLeft: '10px solid transparent', // Adjust the size of the triangle
                borderRight: '10px solid transparent', // Adjust the size of the triangle
                borderBottom: `${computeHeight(value)}px solid ${colors.SpikeMap}`, // Triangle color and width
                }}></Box>
            <Typography variant="body2">{value}</Typography>
        </Box>
    ))}
  </Box>
    );
};

export default SpikeLegend;
