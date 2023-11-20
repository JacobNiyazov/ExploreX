import React, {useState,useContext} from 'react';
import Grid from '@mui/material/Grid';
import { StyledButton, StyledTypography,StyledTypography2 } from '../StyleSheets/ProfileScreenStyles';
import ImportFileModal from '../ImportFileModal';
//import UploadFileModal from '../UploadFilesModal';
import PersonalMapCard from '../PersonalMapCard';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
//import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
//import {TabIndicatorProps} from "@mui/material"
import { GlobalStoreContext } from '../../store';
import AddIcon from '@mui/icons-material/Add';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
           <Grid container spacing={1}>
                {children}
            </Grid>
        )}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
function ProfileScreen(){
    const { store } = useContext(GlobalStoreContext);
    const [openImport, setOpenImport] = useState(false);
    const handleOpenImport = () => setOpenImport(true);
    const handleCloseImport = () => setOpenImport(false);

    /*const [openUpload, setOpenUpload] = useState(false);
    const handleOpenUpload = () => setOpenUpload(true);
    const handleCloseUpload = () => setOpenUpload(false);

    const [activeButton, setActiveButton] = useState('Posts');

    const handleButtonClick = (buttonName) => {
      setActiveButton(buttonName);
    };*/
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    let mapValues = ""
    if (store.currentMaps) {
      mapValues = Object.values(store.currentMaps);
    }
    const drafts = mapValues.filter((map) => !map.isPublic);
    const posted = mapValues.filter((map) => map.isPublic);
    
    return(
        <Grid container spacing = {2}>
            <Grid item xs = {10}>
                <StyledTypography>
                    Team Pink
                </StyledTypography>
            </Grid>
            <Grid item xs = {2}>
                <StyledButton data-testid="import-button"
                onClick = {handleOpenImport}>
                  <AddIcon></AddIcon>
                </StyledButton>
                <ImportFileModal open={openImport} onClose={handleCloseImport}/>
            </Grid>
            <Grid item xs = {12}>
                <StyledTypography2
                data-testid="bio-text"
                >
                    Hello, welcome to my page this is where the bio goes.
                    I hope you enjoy all my maps!
                </StyledTypography2>
            </Grid>
            <Grid item xs = {12} sx = {{marginLeft:"4vw"}}>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" 
                        TabIndicatorProps={{style: {background:'#FF76D6'}}}
                        textColor="inherit" >
                        <Tab data-testid="posts-tab" label="Posts" {...a11yProps(0)} sx = {{color: value === 0 ? '#FF76D6' : 'white'}}
                        />
                        <Tab data-testid="drafts-tab" label="Drafts" {...a11yProps(1)} sx = {{color: value === 1 ? '#FF76D6' : 'white'}}/>
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                      <Grid id="map-cards" container spacing={1}>
                        {posted.map((map, index) => (
                          <Grid item key={index} xs={3}>
                            <PersonalMapCard id={`map-posted-${index}`} map={map} likes = {map.reactions.likes} dislikes={map.reactions.dislikes}/>
                          </Grid>
                        ))}
                      </Grid>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                      <Grid id="map-cards" container spacing={1}>
                        {drafts.map((map, index) => (
                          <Grid item key={index} xs={3}>
                            <PersonalMapCard data-testid = {`map-draft-${index}`} id={`map-draft-${index}`} map={map}/>
                          </Grid>
                        ))}
                      </Grid>
                    </CustomTabPanel>
                </Box>
            </Grid> 
        </Grid>
    );
}
export default ProfileScreen;