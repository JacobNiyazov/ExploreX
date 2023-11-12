import styled from "@emotion/styled";
import { Select } from "@mui/material";
import {Input} from "@mui/material";
import { Button } from "@mui/material";
import TextField from "@mui/material";
import {InputBase} from "@mui/material";

export const StyledButton = styled(Button)({
  backgroundColor: "#ffb7ce",
  color: "black",
  fontSize: "1.4vh",
  "&:hover": {
      backgroundColor: "#ffd0d7"
  }
})
export const StyledSubmitButton = styled(Button)({
  backgroundColor: "#ffb7ce",
  color: "black",
  fontSize: "2.5vh",
  "&:hover": {
      backgroundColor: "#ffd0d7"
  }
})
export const StyledInput = styled(Input)({
  backgroundColor: "black",
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
  backgroundColor: "black",
  borderRadius: "2vh",
  '& textarea': {
      color:"black",
      fontSize:"3vh",
      backgroundColor:"white",
      borderRadius: "2vh",
      marginRight:"-7vw"
  },
  "&:hover":{
      border:"1px solid #ff24bd"
  },
  width:"37vw",
  height:"50vh",
})

export const StyledInfo = styled(Input)({
  backgroundColor: "black",
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