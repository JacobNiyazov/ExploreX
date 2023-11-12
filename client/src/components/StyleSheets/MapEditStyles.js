import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import Switch from '@mui/material/Switch';

export const ControlGrid = styled(Box)({
    display:'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gridTemplateRows: '1fr 1fr 1fr 1fr',
    height: '100%'
})

export const UndoRedoContainer = styled(Box)({
    gridColumnStart: '1',
    gridRowStart:'1',
    display: 'flex',
    gap: "10px",
    marginLeft:"5px",
    zIndex: '100'
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
    
})

export const BaseMapContainer = styled(Box)({
    display:'flex', 
    flexDirection: 'column', 
    alignItems:'center',
    gridColumnStart: '4',
    gridRowStart:'1',
    marginTop: '10px',
    marginLeft: '33%',
    zIndex: '100'
})