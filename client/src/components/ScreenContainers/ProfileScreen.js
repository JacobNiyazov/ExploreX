import React, {useState,useContext, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import { StyledButton, StyledTypography,StyledTypography2 } from '../StyleSheets/ProfileScreenStyles';
import ImportFileModal from '../ImportFileModal';
//import UploadFileModal from '../UploadFilesModal';
import PersonalMapCard from '../PersonalMapCard';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
//import {TabIndicatorProps} from "@mui/material"
import { GlobalStoreContext } from '../../store';
import { AuthContext } from '../../auth'
import { useNavigate } from 'react-router-dom';
import SelectPropModal from '../SelectPropModal';
import CircularProgress from '@mui/material/CircularProgress';

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
    const { auth } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
      const waitForAuthCheck = async () => {
          if (auth.loggedIn === undefined) {
              // Wait until authentication check is completed
              await new Promise((resolve) => setTimeout(resolve, 100)); // Adjust time as needed
              waitForAuthCheck(); // Re-check status
          } else {
              if(!auth.loggedIn){
                  store.setCurrentPage(store.currentPageType.login)
                  navigate("/login");
              }
              setLoading(false);
              
          }
      };
  
      waitForAuthCheck();
    }, [auth, navigate, store]);

    const [files, setFiles] = useState([]);
    const [fileType, setFileType] = useState('');
    const [mapType, setMapType] = useState('');
    const [openImport, setOpenImport] = useState(false);
    const handleOpenImport = () => setOpenImport(true);
    const handleCloseImport = () => setOpenImport(false);
    const [openSelectPropModal, setOpenSelectPropModal] = useState(false);
    const handleOpenSelectPropModal = () => setOpenSelectPropModal(true);
    const handleCloseSelectPropModal = async (selectedProperty) => {
      if(!(typeof selectedProperty === "string")){
        await store.deleteMap(store.currentMap, store.currentPage);
      }
      setOpenSelectPropModal(false)};
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
    let drafts = mapValues.filter((map) => !map.isPublic);
    drafts.sort((a, b) => {
      let dateA = new Date(a.publishDate).getTime();
      let dateB = new Date(b.publishDate).getTime();
    
      return dateA < dateB ? 1 : -1;
    });
    let posted = mapValues.filter((map) => map.isPublic);
    posted.sort((a, b) => {
      let dateA = new Date(a.publishDate).getTime();
      let dateB = new Date(b.publishDate).getTime();
    
      return dateA < dateB ? 1 : -1;
    });
    if (loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height:'100%' }}>
          <CircularProgress style={{'color':'#ff24bd'}}/>
          Loading...
        </Box>
      );
    }
    if (store.currentPage === store.currentPageType.profileScreen){
      return (
        <Grid container spacing = {2}>
            <Grid item xs = {10}>
                <StyledTypography>
                    {auth.user.username}
                </StyledTypography>
            </Grid>
            <Grid item xs = {2}>
                <StyledButton data-testid="AddIcon"
                onClick = {handleOpenImport}>
                  Create Map
                </StyledButton>
                <ImportFileModal open={openImport} onClose={handleCloseImport} openSelectPropModal={handleOpenSelectPropModal}
                  files={files}
                  setFiles={setFiles}
                  fileType={fileType}
                  setFileType={setFileType}
                  mapType={mapType}
                  setMapType={setMapType}
                  />
                <SelectPropModal open={openSelectPropModal} onClose={handleCloseSelectPropModal} files={files} fileType={fileType} mapType={mapType}/>
            </Grid>
            <Grid item xs = {12}>
                <StyledTypography2
                data-testid="bio-text"
                >
                    {auth.user.bio}
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
                        {posted.length === 0 ? (
                          <Typography color="grey" variant='h6' display="flex"
                          flexDirection="column"
                          justifyContent="center"
                          alignItems="center"
                          height="50vh"
                          width="90vw">
                            Nothing to see here. Publish your very first map!
                          </Typography>
                        )
                        : (posted.map((map, index) => (
                          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                            <PersonalMapCard id={`map-posted-${index}`} map={map} likes = {map.reactions.likes} dislikes={map.reactions.dislikes}/>
                          </Grid>
                        )))}
                      </Grid>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                      <Grid id="map-cards" container spacing={1}>
                        {drafts.length === 0 ? (
                          <Typography color="grey" variant='h6' display="flex"
                          flexDirection="column"
                          justifyContent="center"
                          alignItems="center"
                          height="50vh"
                          width="90vw">
                            Nothing to see here. Create a map to get started!
                          </Typography>
                        )
                        : (drafts.map((map, index) => (
                          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                            <PersonalMapCard data-testid = {`map-draft-${index}`} id={`map-draft-${index}`} map={map}/>
                          </Grid>
                        )))}
                      </Grid>
                    </CustomTabPanel>
                </Box>
            </Grid> 
        </Grid>
     );
    }
    else{
      return <div></div>
    }
}
export default ProfileScreen;