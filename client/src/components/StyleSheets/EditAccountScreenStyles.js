import styled from "@emotion/styled";
import {Input} from "@mui/material";
import { Button } from "@mui/material";
import {InputBase} from "@mui/material";

export const StyledButton = styled(Button)({
  backgroundColor: "#FF76D6",
  color: "black",
  fontSize: "1.4vh",
  "&:hover": {
      backgroundColor: "#ffd0d7"
  }
})
export const StyledSubmitButton = styled(Button)({
  backgroundColor: "#FF76D6",
  color: "black",
  fontSize: "2.5vh",
  "&:hover": {
      backgroundColor: "#ffd0d7"
  }
})
export const StyledInput = styled(Input)({
  marginBottom: 10,
  backgroundColor: "#242526",
  "& input": {
      color:"white",
  },
  "&:hover":{
      border:"1px solid #ff24bd"
  },
  width:"80vw",
  height: "10vh",
  fontSize:"5vh",
  borderRadius: "2vh",
})
export const StyledBio = styled(InputBase)({
  marginBottom: 10,
  marginTop:15,
  backgroundColor: "#242526",
  borderRadius: "2vh",
  '& textarea': {
      color:"white",
      fontSize:"3.5vh",
      borderRadius: "2vh",
      marginRight:"-7vw",
      lineHeight:"4vh"
  },
  "&:hover":{
      border:"1px solid #ff24bd"
  },
  width:"37vw",
  height:"50vh",
})

export const StyledInfo = styled(Input)({
  marginBottom: 15,
  backgroundColor: "#242526",
  borderRadius: "2vh",
  "& input": {
      color:"white",
  },
  "&:hover":{
      border:"1px solid #ff24bd"
  },
  width:"43vw",
  height: "10vh",
  fontSize:"5vh",
})