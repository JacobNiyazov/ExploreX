import { styled } from '@mui/material/styles';
import { Typography } from "@mui/material"
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Button
 } from '@mui/material';
export const DescriptionText = styled(Typography)({
    color: "white",
})
export const StyledError = styled(ErrorOutlineIcon)({
    fontSize:"5vh",  
    color:"#FF76D6",
    marginTop:"1vh"
})
export const StyledButton = styled(Button)({
    backgroundColor: "#FF76D6",
    color: "black",
    fontSize: "1.4vh",
    marginTop:"6.5vh",
    "&:hover": {
        backgroundColor: "#ffd0d7"
    }
})