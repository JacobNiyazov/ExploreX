import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {DescriptionText, StyledError, StyledButton} from './StyleSheets/DeletePostModalStyles';
import { Grid, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { GlobalStoreContext } from '../store'


function UniversalModal(){
    const { store } = useContext(GlobalStoreContext);
  
    const handleConfirm = () => {
        if(store.modalAction === store.modalActionTypes.publish){
            store.publishMap(store.currentMap, true);
        }
        if(store.modalAction === store.modalActionTypes.save){
            store.publishMap(store.currentMap, false);
        }
        store.closeModal();
    };
    const handleClose = () => {
        store.closeModal();
    };
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
    let confirmButton = ""
    if (store.modalConfirmButton){
      confirmButton = (<Grid item xs = {4} sx = {center}>
                              <StyledButton onClick = {handleConfirm} data-testid="confirm">
                                  Confirm
                              </StyledButton>
                      </Grid>);
    }
    return(
        <Modal
            open={store.modalOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <IconButton onClick={handleClose} sx={closeButtonStyle}>
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
                            {store.modalMessage}
                        </DescriptionText>
                    </Grid>
                    {confirmButton}
                </Grid>
            </Box>
        </Modal>
    )
}
export default UniversalModal;