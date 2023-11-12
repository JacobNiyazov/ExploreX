import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {DescriptionText, StyledCloud, StyledButton} from './UploadFileStyles';
import { Grid } from '@mui/material';


function UploadFileModal({open,onClose}){
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 450,
        height:90,
        bgcolor: 'black',
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
    return(
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <Grid container spacing = {2}>
                <Grid item xs = {12}>
                    <DescriptionText id="modal-modal-title" variant="h6" component="h2">
                        Upload an ExploreX Map file:
                    </DescriptionText>
                </Grid>
                <Grid item xs = {2}>
                    <Button>
                        <StyledCloud></StyledCloud>
                    </Button>
                </Grid>
                <Grid item xs = {6} sx = {{marginTop:"1vh"}}>
                    <DescriptionText id="modal-modal-description">
                        name_of_file.json
                    </DescriptionText>
                </Grid>
                <Grid item xs = {4} sx = {center}>
                        <StyledButton >
                            Create Map
                        </StyledButton>
                </Grid>
            </Grid>
            </Box>
        </Modal>
    )
}
export default UploadFileModal;