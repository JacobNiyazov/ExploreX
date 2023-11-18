import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {DescriptionText, StyledError, StyledButton} from './StyleSheets/DeletePostModalStyles';
import { Grid, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


function DeletePostModal({open,onClose}){
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 450,
        height:90,
        bgcolor: '#242526',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius:"5vh"
      };
      const center = {
        display:"flex", 
        justifyContent:"center", 
        alignItems:"center"
    }
    const closeButtonStyle = {
        position: 'absolute',
        right: 8,
        top: 8,
        color: 'white',
    };
    return(
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <IconButton onClick={onClose} sx={closeButtonStyle}>
                    <CloseIcon />
                </IconButton>
                <Grid container spacing = {2}>
                    <Grid item xs = {2}>
                        <Button>
                            <StyledError></StyledError>
                        </Button>
                    </Grid>
                    <Grid item xs = {6} sx = {{marginTop:"1vh"}}>
                        <DescriptionText id="modal-modal-description">
                            Are you sure you want to delete this map?
                            This action is <span style={{ fontWeight: 'bold', fontStyle: 'italic',textDecoration: 'underline' }}>
                                PERMANENT</span>
                        </DescriptionText>
                    </Grid>
                    <Grid item xs = {4} sx = {center}>
                            <StyledButton >
                                Confirm
                            </StyledButton>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )
}
export default DeletePostModal;