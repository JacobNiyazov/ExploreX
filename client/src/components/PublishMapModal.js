import React from 'react';
import { useContext } from 'react';
import { Buttons, ModalStyled, ModalContainer, ButtonContainer, Title, SubTitle} from './StyleSheets/PublishMapModalStyles.js';
import { Grid } from '@mui/material';
import GlobalStoreContext from './store';


const PublishMapModal = ({open, setOpen}) =>{
    const { store } = useContext(GlobalStoreContext);
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
                        <Buttons onClick={handlePublish} data-testid="map-publish">Publish</Buttons> 
                    </Grid>
                    <Grid item xs={1}></Grid>
                </ButtonContainer>
                
            </ModalContainer>
        </ModalStyled>
    )
}

export default PublishMapModal