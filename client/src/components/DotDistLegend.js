import { React, useContext } from "react";
import { Box, Typography } from '@mui/material';
import GlobalStoreContext from '../store/index.js';

const DotDistLegend = ({colors}) => {
    const { store } = useContext(GlobalStoreContext);
    let value = store.currentMap.graphics.typeSpecific.dotScale;
    const circleRadius = 10;
  
    return (
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
        <Box className="circle" style={{
          width: `${circleRadius * 2}px`, // Diameter of the circle
          height: `${circleRadius * 2}px`, // Diameter of the circle
          borderRadius: '50%', // Makes the Box a circle
          backgroundColor: colors.DotMap, // Circle color
          marginRight: '10px', // Space between the circle and the label
        }}></Box>
        <Typography variant="body2">{'1 Dot = ' + value}</Typography>
      </Box>
    );
};

export default DotDistLegend;
