import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {FormLabel, Typography } from '@mui/material';
import Radio from '@mui/material/Radio';

export const StyledButton = styled(Button)({
    backgroundColor: "#ffb7ce",
    color: "black",
    fontSize: "2vh",
    marginTop: "3vh",
    "&:hover": {
        backgroundColor: "#ffd0d7"
    }
});
export const StyledCloud = styled(CloudUploadIcon)({
    fontSize:"5vh",  
    color:"#ffb7ce",
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
    '&.Mui-checked': {color: "pink",}
})
