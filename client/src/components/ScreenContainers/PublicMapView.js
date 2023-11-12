import React, { useState } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import Box from '@mui/material/Box';

import {
  StyledCard,
  StyledCardMedia,
  StyledCardContent,
  StyledTypography,
  StyledBox,
  StyledForkButton,
} from '../StyleSheets/PublicMapStyles';
import { ReactionButton, ReactionCount } from '../StyleSheets/MapFeedStyles'; // adjust the import path as needed
import CommentList from '../CommentList';
import CommentForm from '../CommentForm';

const PublicMapView = ({ map }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleCommentSubmit = () => {
    // Logic to refresh comments after a new one is added
    // Potentially re-fetch the comments or add the new comment to the state
  };

  const handleLike = () => {
    setLiked(prevLiked => !prevLiked);
    setDisliked(false);  // Reset disliked state
  };

  const handleDislike = () => {
    setDisliked(prevDisliked => !prevDisliked);
    setLiked(false);  // Reset liked state
  };

  return (
    <Box data-testid='public-map-view' sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'start', 
      position: 'relative', // Added to position the button relative to this box
      mt: 2
  }}>
      <StyledCard>
        <StyledTypography variant="h4" component="div">
          {map.name}
        </StyledTypography>
        <StyledCardMedia
          component="img"
          image={map.imageUrl}
          alt={`Map titled ${map.name}`}
        />
        <StyledCardContent>
          <StyledTypography variant="subtitle1">
            Author: {map.author}
          </StyledTypography>
          <StyledTypography variant="body1" paragraph>
            {map.description}
          </StyledTypography>
          <StyledBox>
            <ReactionButton selected={liked} onClick={handleLike} data-testid={'like-button'}>
              <ThumbUpIcon />
              <ReactionCount>{map.likes}</ReactionCount>
            </ReactionButton>
            <ReactionButton selected={disliked} onClick={handleDislike} data-testid={'dislike-button'}>
              <ThumbDownIcon />
              <ReactionCount>{map.dislikes}</ReactionCount>
            </ReactionButton>
          </StyledBox>
        </StyledCardContent>
        <CommentList mapId={map._id} />
        <CommentForm mapId={map._id} onCommentSubmit={handleCommentSubmit} />
      </StyledCard>
      <StyledForkButton sx={{ 
          position: 'absolute', 
          top: 0, 
          right: 0 
      }}>
        <CallSplitIcon />
        <StyledTypography variant="h5">
          Fork
        </StyledTypography>
      </StyledForkButton>
    </Box>
  );
};

export default PublicMapView;