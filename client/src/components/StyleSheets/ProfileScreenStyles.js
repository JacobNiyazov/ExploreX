import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

export const StyledTypography = styled(Typography)({
    fontSize: "5vh",
    padding: "3vh",
    paddingLeft: "4vw"
});
export const StyledTypography2 = styled(Typography)({
    fontSize: "2vh",
    paddingLeft: "4vw"
});
export const StyledTypography3 = styled(Typography)({
    fontSize: "3vh",
    paddingTop: "3vh"
});
export const StyledButton = styled(Button)({
    backgroundColor: "#f57fd9",
    color: "black",
    width:"8vw",
    height:"5vh",
    padding: "1vh",
    marginLeft: "7vw",
    marginTop: "3vh",
    fontSize: "1.7vh",
    borderRadius:"3vh",
    "&:hover": {
        backgroundColor: "#ffd0d7"
    }
});
export const StyledButton2 = styled(Button)({
    backgroundColor: "#f57fd9",
    color: "black",
    fontSize: "2vh",
    padding: "1vh",
    marginLeft: "1vw",
    marginTop: "3vh",
    borderRadius:"2vh",
    "&:hover": {
        backgroundColor: "#ffd0d7"
    }
});