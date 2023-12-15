import { React } from "react";
import { Box, Typography } from '@mui/material';
import { ColorTextField } from "./StyleSheets/ColorSelectorStyles.js";

const VoronoiLegend = ({colors, voronoiValue, setVoronoiValue}) => {
    const circleRadius = 10;
  
    return (
        <Box id="voronoilegend">
            <Box id="voronoilegendcontainer" display="flex" flexDirection="row" alignItems="center" justifyContent="center" flexWrap='wrap'>
                <Box id="voronoilegendcircle" className="circle" style={{
                width: `${circleRadius * 2}px`, // Diameter of the circle
                height: `${circleRadius * 2}px`, // Diameter of the circle
                borderRadius: '50%', // Makes the Box a circle
                backgroundColor: colors.VoronoiMap, // Circle color
                marginRight: '10px', // Space between the circle and the label
                }}></Box>
                <Typography id="voronoilegendlabel" variant="body2">{'Points represent'}</Typography>
                
            </Box>
            {
                setVoronoiValue !== null ?
                <ColorTextField id="voronoilegendtextfield" variant='standard' value={voronoiValue} onChange={(e) =>{setVoronoiValue(e.target.value)}} sx={{width:"100%", input:{textAlign:'center'}, marginTop: "10px"}}></ColorTextField>
                : 
                <Typography id="voronoilegendlabel" variant="body2" sx={{width:"100%", textAlign:'center', marginTop: "10px"}}>{voronoiValue}</Typography>
            }
            
        </Box>

      
    );
};

export default VoronoiLegend;
