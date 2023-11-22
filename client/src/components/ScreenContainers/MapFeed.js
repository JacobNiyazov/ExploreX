import React, {useContext, useState, useEffect} from 'react';
import MapFeedCard from '../MapFeedCard';
import { Grid } from '@mui/material';
import { StyledMapFeed } from '../StyleSheets/MapFeedStyles';
import { GlobalStoreContext } from '../../store';
import { AuthContext } from '../../auth'
import { useNavigate } from 'react-router-dom';

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
  }, [auth.loggedIn]);

  let mapValues = "";

  if (loading) {
    return <div>Loading...</div>;
  }
  if (store.currentMaps.length !== 0) {
    mapValues = Object.values(store.currentMaps);
  }
  if (store.currentPage === store.currentPageType.mapFeed){
    return (
      <StyledMapFeed>
        {mapValues.length !== 0 && (
          <Grid container spacing={4} direction="column">
            {mapValues.map((map, index) => (
              <Grid item key={index} xs={12}>
                {console.log("MAP BEFORE PASS: ",map)}
                <MapFeedCard id={`map-feed-card-${index}`} map={map} likes={map.reactions.likes} dislikes={map.reactions.dislikes} />
              </Grid>
            ))}
          </Grid>
        )}
      </StyledMapFeed>
    );
  }
  else{
    return <div></div>
  }
};

export default MapFeed;
