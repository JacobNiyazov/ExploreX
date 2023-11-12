import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { StyledButton, StyledGrid, StyledTypography,StyledTypography2, StyledButton2 } from './UserProfileStyles';
import ImportFileModal from './ImportFileModal';
import { Dialog } from '@mui/material';
import UploadFileModal from './UploadFilesModal';
import PublishedPersonalMap from './PublishedPersonalMap';

function UserProfile(){
    const [openImport, setOpenImport] = useState(false);
    const handleOpenImport = () => setOpenImport(true);
    const handleCloseImport = () => setOpenImport(false);

    const [openExport, setOpenExport] = useState(false);
    const handleOpenExport = () => setOpenExport(true);
    const handleCloseExport = () => setOpenExport(false);


    const center = {
        display:"flex", 
        justifyContent:"center", 
        alignItems:"center"
    }

    return(
        <Grid container spacing = {2}>
            <Grid item xs = {10}>
                <StyledTypography>
                    Team Pink
                </StyledTypography>
            </Grid>
            <Grid item xs = {2}>
                <StyledButton onClick = {handleOpenImport}>import</StyledButton>
                <StyledButton onClick = {handleOpenExport}>upload</StyledButton>
                <ImportFileModal open={openImport} onClose={handleCloseImport}/>
                <UploadFileModal open = {openExport} onClose = {handleCloseExport}></UploadFileModal>
                
            </Grid>
            <Grid item xs = {12}>
                <StyledTypography2>
                    Hello, welcome to my page this is where the bio goes.
                    I hope you enjoy all my maps!
                </StyledTypography2>
            </Grid>
            <Grid item xs = {12} sx = {{marginLeft:"10vh"}}>
                <StyledButton2>Posts</StyledButton2>
                <StyledButton2>Drafts</StyledButton2>
            </Grid>
            <Grid item xs = {4} sx = {{marginLeft:"10vh"}}>
                <PublishedPersonalMap></PublishedPersonalMap>
            </Grid>
        </Grid>
    );
}
export default UserProfile;