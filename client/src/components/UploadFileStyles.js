import { styled } from '@mui/material/styles';
import { Typography } from "@mui/material"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button
 } from '@mui/material';
export const DescriptionText = styled(Typography)({
    color: "white",
    marginTop:"1vh"
})
export const StyledCloud = styled(CloudUploadIcon)({
    fontSize:"5vh",  
    color:"#ffb7ce"
})
export const StyledButton = styled(Button)({
    backgroundColor: "#ffb7ce",
    color: "black",
    fontSize: "1.4vh",
    marginTop:"1vh",
    "&:hover": {
        backgroundColor: "#ffd0d7"
    }
})