import React, {useContext, useState, useEffect} from 'react';
import MapFeedCard from '../MapFeedCard';
import { Grid } from '@mui/material';
import { StyledMapFeed, StyledCreateButton, HeaderBar } from '../StyleSheets/MapFeedStyles';
import { GlobalStoreContext } from '../../store';
import { AuthContext } from '../../auth'
import { useNavigate } from 'react-router-dom';
import SelectPropModal from '../SelectPropModal';
import ImportFileModal from '../ImportFileModal';

//import ImportFileModal from '../ImportFileModal';
//import { StyledButton } from '../StyleSheets/ProfileScreenStyles';

const MapFeed = () => {
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

  let mapValues = "";

  if (loading) {
    return <div>Loading...</div>;
  }
  if (store.currentMaps && store.currentMaps.length !== 0) {
    mapValues = Object.values(store.currentMaps);
    mapValues.sort((a, b) => {
      let dateA = new Date(a.publishDate);
      let dateB = new Date(b.publishDate);
    
      return dateB - dateA;
    });
  }
  if (store.currentPage === store.currentPageType.mapFeed){
    return (
      <div>
        <HeaderBar>
          <StyledCreateButton onClick = {handleOpenImport}>Create Map</StyledCreateButton>
        </HeaderBar>
        <ImportFileModal open={openImport} onClose={handleCloseImport} openSelectPropModal={handleOpenSelectPropModal}
          files={files}
          setFiles={setFiles}
          fileType={fileType}
          setFileType={setFileType}
          mapType={mapType}
          setMapType={setMapType}
          />
        <SelectPropModal open={openSelectPropModal} onClose={handleCloseSelectPropModal} files={files} fileType={fileType} mapType={mapType}/>    
        <StyledMapFeed>
          {mapValues.length !== 0 && (
            <Grid container spacing={4} direction="column">
              {mapValues.map((map, index) => (
                <Grid item key={index} xs={12}>
                  {console.log("MAP BEFORE PASS: ",map)}
                  <MapFeedCard id={`map-feed-card-${index}`} map={map}/>
                </Grid>
              ))}
            </Grid>
          )}
        </StyledMapFeed>
      </div>
    );
  }
  else{
    return <div></div>
  }
};

export default MapFeed;
