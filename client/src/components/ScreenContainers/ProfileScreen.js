import React, {useState} from 'react';
import Grid from '@mui/material/Grid';
import { StyledButton, StyledTypography,StyledTypography2, StyledButton2 } from '../StyleSheets/ProfileScreenStyles';
import ImportFileModal from '../ImportFileModal';
import UploadFileModal from '../UploadFilesModal';
import PublishedPersonalMap from '../PublishedPersonalMap';
import DraftPersonalMap from '../DraftPersonalMap';

function ProfileScreen(){
    const [openImport, setOpenImport] = useState(false);
    const handleOpenImport = () => setOpenImport(true);
    const handleCloseImport = () => setOpenImport(false);

    const [openUpload, setOpenUpload] = useState(false);
    const handleOpenUpload = () => setOpenUpload(true);
    const handleCloseUpload = () => setOpenUpload(false);

    const [activeButton, setActiveButton] = useState('Posts');

    const handleButtonClick = (buttonName) => {
      setActiveButton(buttonName);
    };

    return(
        <Grid container spacing = {2}>
            <Grid item xs = {10}>
                <StyledTypography>
                    Team Pink
                </StyledTypography>
            </Grid>
            <Grid item xs = {2}>
                <StyledButton data-testid="import-button"
                onClick = {handleOpenImport}>import</StyledButton>
                <StyledButton onClick = {handleOpenUpload}>upload</StyledButton>
                <ImportFileModal data-testid="import-modal" open={openImport} onClose={handleCloseImport}/>
                <UploadFileModal open = {openUpload} onClose = {handleCloseUpload}></UploadFileModal>
                
            </Grid>
            <Grid item xs = {12}>
                <StyledTypography2
                data-testid="bio-text"
                >
                    Hello, welcome to my page this is where the bio goes.
                    I hope you enjoy all my maps!
                </StyledTypography2>
            </Grid>
            <Grid item xs = {12} sx = {{marginLeft:"10vh"}}>
                <StyledButton2
            onClick={() => handleButtonClick('Posts')}
            style={{ backgroundColor: activeButton === 'Posts' ? '#FF76D6' : 'white', color: 'black' }}
            data-testid="posts-tab"
            >
            Posts
                </StyledButton2>
                <StyledButton2
            onClick={() => handleButtonClick('Drafts')}
            style={{ backgroundColor: activeButton === 'Drafts' ? '#FF76D6' : 'white', color: 'black' }}
            data-testid="drafts-tab"
            >
            Drafts
                </StyledButton2>
            </Grid> 
            <Grid item xs = {12} sx = {{marginLeft:"5vw", marginRight:"3vw"}} >
                {activeButton === 'Posts' ? <Grid container space = {2}>
                    <Grid item xs = {3}>
                    <PublishedPersonalMap class = "post"></PublishedPersonalMap>
                    </Grid>
                    <Grid item xs = {3}>
                    <PublishedPersonalMap class = "post"></PublishedPersonalMap>
                    </Grid>
                </Grid> : 
                <Grid container space = {2}>
                    <Grid item xs = {3}>
                    <PublishedPersonalMap class = "draft"></PublishedPersonalMap>
                    </Grid>
                </Grid>
                }
            </Grid>
        </Grid>
    );
}
export default ProfileScreen;