import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


export const Square = styled(Button)({
    minWidth: "20px",
    height:"20px",
    marginRight: "5px",
});

export const ColorTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: "#ff24bd"
    },
    '& label': {
      color: "#ff24bd"
    },
    '& .MuiInputBase-root':{
      color: "#ff24bd",
    },
    '& .css-v4u5dn-MuiInputBase-root-MuiInput-root:after':{
      borderBottom: "2px solid #ff24bd"
    },
    '& .MuiInputBase-input':{
      borderBottom: "2px solid #404040"
    },
    width: "65px",
    input:{
        textAlign: 'right'
    }
  });
