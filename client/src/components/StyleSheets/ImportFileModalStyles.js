import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {FormLabel, Typography } from '@mui/material';
import Radio from '@mui/material/Radio';

export const StyledButton = styled(Button)({
    backgroundColor: "#FF76D6",
    color: "black",
    fontSize: "2vh",
    marginTop: "2vh",
    "&:hover": {
        backgroundColor: "#ffd0d7"
    }
});
export const StyledImportButton = styled(Button)({
    backgroundColor:"#FF76D6", 
    color: "black", 
    marginTop: "4vh", 
    "&:hover": {
        backgroundColor: "#ffd0d7"
    }  
})
export const StyledCloud = styled(CloudUploadIcon)({
    fontSize:"5vh",  
    color:"#FF76D6",
    marginTop:"2.5vh"
})
export const DescriptionText = styled(Typography)({
    color: "white",
})
export const StyledFormLabel = styled(FormLabel)({
    color:"white",
    '&.Mui-focused': {color: "pink",}
})
export const StyledRadio = styled(Radio)({
    color: "white",
    '&.Mui-checked': {color: "#FF76D6",}
})
