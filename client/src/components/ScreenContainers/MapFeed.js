import React, {useContext} from 'react';
import MapFeedCard from '../MapFeedCard';
import { Grid } from '@mui/material';
import { StyledMapFeed } from '../StyleSheets/MapFeedStyles';
import { GlobalStoreContext } from '../../store';
import ImportFileModal from '../ImportFileModal';
import { StyledButton } from '../StyleSheets/ProfileScreenStyles';

const MapFeed = () => {
  const { store } = useContext(GlobalStoreContext);
  let mapValues = Object.values(store.currentMaps)
  return (
      <StyledMapFeed>
        <Grid container spacing={4} direction="column">
          {mapValues.map((map, index) => (
            <Grid item key={index} xs={12}>
              <MapFeedCard id = {`map-feed-card-${index}`}map={map} likes = {map.reactions.likes} dislikes = {map.reactions.dislikes}/>
            </Grid>
          ))}
        </Grid>
      </StyledMapFeed>
  );
}; 

export default MapFeed;
