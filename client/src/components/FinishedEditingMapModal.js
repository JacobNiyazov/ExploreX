import React from 'react';
import { useContext } from 'react';
import { GlobalStoreContext } from './store';
import { Buttons, ModalStyled, ModalContainer, ButtonContainer, Title} from './StyleSheets/PublishMapModalStyles.js';
import { Grid } from '@mui/material';

const FinshedEditingMapModal = ({open, setOpen}) =>{
    const { store } = useContext(GlobalStoreContext);
    const handleClose = () => setOpen(false);

    // Here we should reroute to home feed and save the map
    const handleSave = () => {
        setOpen(false);
        store.setCurrentPage("ProfileScreen");
    }
    return(
        <ModalStyled
            open={open}
        >
            <ModalContainer open={open}>
                <Title>Finished Editing this map?</Title>
                <ButtonContainer container columns={17} alignItems="center" >
                    <Grid item xs={1}></Grid>
                    <Grid item xs={7}>
                        <Buttons onClick={handleClose}>Cancel</Buttons>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={7}>
                        <Buttons onClick={handleSave}>Save</Buttons> 
                    </Grid>
                    <Grid item xs={1}></Grid>
                </ButtonContainer>
                
            </ModalContainer>
        </ModalStyled>
    )
}

export default FinshedEditingMapModal