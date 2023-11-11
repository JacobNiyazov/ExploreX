import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import AccordionSummary from '@mui/material/AccordionSummary';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';


export const SidePanelGrid = styled(Grid)({
  paddingTop: "5px",
  backgroundColor: '#404040',
  height: '100%'
});

export const ButtonContainer = styled(Grid)({
  borderTop: "1px solid white",
  height: '70px'
});

export const AccordianContainer = styled(Grid)({
  maxHeight: '100%', 
  overflow: 'auto',
  scrollbarColor: '#007 #bada55'
});

export const EditAccordion = styled(Accordion)({
  color: "#ff24bd",
  fontSize: "25px",
  backgroundColor: '#404040',
  marginLeft: "7px",
  marginRight: "7px",
  marginBottom: "10px",
});

export const EditAccordionSummary = styled(AccordionSummary)({
  border: "1px solid #ff24bd",
  borderRadius: "0",
});

export const Buttons = styled(Button)({
  backgroundColor: "#000000",
  border: "1px solid #ff24bd",
  borderRadius: "15px",
  textAlign: "center",
  width: "100%",
  height: "50px",
  color: "#ff24bd",
  fontSize: "25px",
  textTransform: 'none'
});

export const ExpandMore = styled(ExpandMoreIcon)({
  color: '#FFFFFF'
});

export const CustomList = styled(List)({
  backgroundColor: '#000000',
  padding: '0px 0px 0px !important' 
});

export const CustomListItem = styled(ListItem)({
  display:'flex'
});


export const TitleTextField = styled(TextField)({
  borderColor: "#ff24bd",
  '&:before':{
    borderColor: "#ff24bd"
  },
  '& label.Mui-focused': {
    color: "#ff24bd"
  },
  '& label': {
    color: "#ff24bd",
    fontSize: "35px"
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: "#ff24bd"
    },
    '&:hover fieldset': {
      borderColor: "#ff24bd",
    },
    '&.Mui-focused fieldset': {
      borderColor: "#ff24bd",
    }
  },
  '& .MuiInputBase-root':{
    color: "#ff24bd",
    fontSize: "35px"
  },
  width: '100%',
  '& fieldset':{
    borderRadius: "25px"
  },
});

export const TitleContainer = styled(Grid)({
  margin: "10px 7px 0px 7px",
  height:"100px"
});


export const FontSelector = styled(TextField)({
  color: "#ff24bd",
  '& label.Mui-focused': {
    color: "#ff24bd"
  },
  '& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon': {
    color: "white"
  },
  '& .css-1mf6u8l-MuiSvgIcon-root-MuiSelect-icon':{
    color:'white'
  },
  '& .MuiInputBase-root':{
    color: "#ff24bd",
  },
  '& .css-v4u5dn-MuiInputBase-root-MuiInput-root:after':{
    borderBottom: "2px solid #ff24bd"
  },
  input:{
      textAlign: 'right'
  },
  width: "120px",
  marginLeft: 'auto',
});

export const NumberSelector = styled(TextField)({
  color: "#ff24bd",
  '& label.Mui-focused': {
    color: "#ff24bd"
  },
  '& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon': {
    color: "white"
  },
  '& .css-1mf6u8l-MuiSvgIcon-root-MuiSelect-icon':{
    color:'white'
  },
  '& .MuiInputBase-root':{
    color: "#ff24bd",
  },
  '& .css-v4u5dn-MuiInputBase-root-MuiInput-root:after':{
    borderBottom: "2px solid #ff24bd"
  },
  input:{
      textAlign: 'right',
  },
  width: "45px",
  marginLeft: 'auto',
});

export const SelectAllCheck = styled(Checkbox)({
  marginLeft: 'auto',
  color: 'white',
  '&.Mui-checked': {
    color: "#ff24bd",
  },
});