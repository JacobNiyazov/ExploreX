import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Button, Grid, TextField } from '@mui/material';
import Switch from '@mui/material/Switch';

export const ControlGrid = styled(Box)({
    display:'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gridTemplateRows: '1fr 1fr 1fr 1fr',
    height: '100%',
})

export const UndoRedoContainer = styled(Box)({
    gridColumnStart: '1',
    gridRowStart:'1',
    display: 'flex',
    gap: "10px",
    marginLeft:"5px",
    zIndex:'1000',
})

export const UndoContainer = styled(Box)({
    display:'flex',
    flexDirection:'column',
    alignItems:'center'
})

export const RedoContainer = styled(Box)({
    display:'flex',
    flexDirection:'column',
    alignItems:'center'
})

export const BaseMapSwitch = styled(Switch)({
    '& .MuiSwitch-colorPrimary':{
        color: '#ff24bd',

        "&.Mui-checked": {
            color:'#000000',
        }
    },
    '& .css-5ryogn-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track':{
        backgroundColor:"#ff24bd",
    }
})

export const BaseMapContainer = styled(Box)({
    gridColumnStart: '4',
    gridRowStart:'1',
    marginTop: '10px',
    marginLeft: '33%',
    zIndex:'1000',
})

export const BaseMapBlur = styled(Box)({
    display:'flex', 
    flexDirection: 'column', 
    alignItems:'center',
    backdropFilter: 'blur(10px)',
    height:'min-content',
})

export const LegendContainer = styled(Box)({
    gridColumnStart: '4',
    gridRowStart:'3',
    display: 'flex',
    flexDirection: 'column',
    gap: "10px",
    marginLeft:"5px",
    zIndex:'1000',
    backgroundColor: "black",
    border: "2px solid #ff24bd",
    borderRadius: "10px",
    marginRight: "10px",
    alignItems: 'center',
    overflow: 'auto'
})

export const LegendTextField = styled(TextField)({
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
    input:{
        textAlign: 'center'
    }

});

export const Square = styled(Button)({
    minWidth: "20px",
    height:"20px",
    marginRight: "5px",
});