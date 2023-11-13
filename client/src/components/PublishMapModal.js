import React from 'react';
import Modal from '@mui/material/Modal';
import { Buttons, ModalStyled, ModalContainer, ButtonContainer, Title, SubTitle} from './StyleSheets/PublishMapModalStyles.js';
import { Grid, Typography } from '@mui/material';
import { Button } from '@mui/base';
import GlobalStoreContext from './store';


const PublishMapModal = ({open, setOpen}) =>{
    const { store } = React.useContext(GlobalStoreContext);
    const handleClose = () => setOpen(false);

    // Here we should reroute to home feed and publishing the map
    const handlePublish = () =>{
        setOpen(false);
        store.setCurrentPage("PublicMapView")
    } 
    return(
        <ModalStyled
            open={open}
        >
            <ModalContainer open={open}>
                <Title>Ready to Publish this Map?</Title>
                <SubTitle>After Publishing, you are unable to edit this map.</SubTitle>
                <ButtonContainer container columns={17} alignItems="center" >
                    <Grid item xs={1}></Grid>
                    <Grid item xs={7}>
                        <Buttons onClick={handleClose}>Cancel</Buttons>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={7}>
                        <Buttons onClick={handlePublish}>Publish</Buttons> 
                    </Grid>
                    <Grid item xs={1}></Grid>
                </ButtonContainer>
                
            </ModalContainer>
        </ModalStyled>
    )
}

export default PublishMapModal