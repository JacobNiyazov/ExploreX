import React from 'react';
import MapFeedCard from '../MapFeedCard';
import { Grid } from '@mui/material';
import { StyledMapFeed } from '../StyleSheets/MapFeedStyles';

const MapFeed = ({ maps }) => {
  return (
    <StyledMapFeed>
      <Grid container spacing={4} direction="column">
        {maps.map((map, index) => (
          <Grid item key={index} xs={12}>
            <MapFeedCard map={map} />
          </Grid>
        ))}
      </Grid>
    </StyledMapFeed>
  );
};

export default MapFeed;
