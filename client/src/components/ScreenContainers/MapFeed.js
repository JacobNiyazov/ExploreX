import React, {useContext} from 'react';
import MapFeedCard from '../MapFeedCard';
import { Grid } from '@mui/material';
import { StyledMapFeed } from '../StyleSheets/MapFeedStyles';
import { GlobalStoreContext } from '../store';

const MapFeed = () => {
  const { store } = useContext(GlobalStoreContext);
  let mapValues = Object.values(store.currentMaps)
  return (
    <StyledMapFeed>
      <Grid container spacing={4} direction="column">
        {mapValues.map((map, index) => (
          <Grid item key={index} xs={12}>
            <MapFeedCard map={map} likes = {map.reactions.likes} dislikes = {map.reactions.dislikes}/>
          </Grid>
        ))}
      </Grid>
    </StyledMapFeed>
  );
}; 

export default MapFeed;
