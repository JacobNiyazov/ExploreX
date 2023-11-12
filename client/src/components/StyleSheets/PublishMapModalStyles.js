import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button, Modal, Typography } from '@mui/material';

export const ModalStyled = styled(Modal)({
    position: 'absolute',
    width: "500px",
    height: "300px",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'transparent'
})

export const ModalContainer = styled(Box)({
    border: "5px solid #ff24bd",
    width: "500px",
    height: "300px",
    backgroundColor: "#000000",
    display:'flex',
    flexDirection:'column',
    alignItems: 'center',
    padding: "20px",
    justifyContent: 'space-between',
    borderRadius: "10px",
})

export const ButtonContainer = styled(Grid)({
    height:'70px'
})

export const Buttons = styled(Button)({
    backgroundColor: "#FFFFFF",
    borderRadius: "10px",
    textAlign: "center",
    width: "100%",
    height: "30px",
    color: "#000000",
    fontSize: "20px",
    textTransform: 'none',
    '&:hover': {
        backgroundColor: '#D3D3D3',
    },
    fontStyle: 'inherit',
});

export const Title = styled(Typography)({
    color: 'white',
    fontSize: '50px',
    fontStyle: 'inherit',
    textAlign: 'center',
})

export const SubTitle = styled(Typography)({
    color: 'white',
    fontSize: '20px',
    fontStyle: 'inherit',
    textAlign: 'center',
})