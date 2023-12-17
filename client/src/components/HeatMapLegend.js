import { React, useContext } from "react";
import { Box, Typography } from '@mui/material';
import GlobalStoreContext from '../store/index.js';

const HeatMapLegend = ({colors}) => {
    const { store } = useContext(GlobalStoreContext);
    let low = colors.lowGradient;
    let med = colors.mediumGradient;
    let high = colors.highGradient;
    let property = store.currentMap.graphics.typeSpecific.property
    let allProps  = []
    for(let i = 0; i < store.currentMap.graphics.geojson.features.length; i++){
        allProps.push(store.currentMap.graphics.geojson.features[i].properties[property])
    }
    let sortedData = [...allProps].sort((a, b) => a - b);
    let min = Math.min(...allProps)
    let max = Math.max(...allProps)
    function findQuartilePositions(sortedData) {
      const n = sortedData.length;
    
      // Calculate Q1 position
      const k1 = Math.floor(n / 4);
    
      // Calculate Q3 position
      const k3 = Math.ceil((3 * n) / 4);
    
      return { k1, k3 };
    }
    let positions = findQuartilePositions(sortedData)
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <Box className="circle" style={{
          width: `20px`, // Diameter of the circle
          height: `20px`, // Diameter of the circle
          backgroundColor: low, // Circle color
          marginRight: '10px', // Space between the circle and the label
        }}></Box>
        <Typography variant="body2">{"("}{min}{", "}{sortedData[positions.k1]}{"]"}</Typography>
        <Box className="circle" style={{
          width: `20px`, // Diameter of the circle
          height: `20px`, // Diameter of the circle
          backgroundColor: med, // Circle color
          marginRight: '10px', // Space between the circle and the label
        }}></Box>
        <Typography variant="body2">{"("}{sortedData[positions.k1]}{", "}{sortedData[positions.k3]}{"]"}</Typography>
        <Box className="circle" style={{
          width: `20px`, // Diameter of the circle
          height: `20px`, // Diameter of the circle
          backgroundColor: high, // Circle color
          marginRight: '10px', // Space between the circle and the label
        }}></Box>
        <Typography variant="body2">{""}{sortedData[positions.k3]}{", "}{max}{"]"}</Typography>
      </Box>
    );
};

export default HeatMapLegend;