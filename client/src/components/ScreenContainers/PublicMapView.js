import React, { useState, useContext } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import Box from '@mui/material/Box';
import { GlobalStoreContext } from '../../store';

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

const PublicMapView = ({ map, likes, dislikes, comments }) => {
  const { store } = useContext(GlobalStoreContext);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  /*const handleCommentSubmit = () => {
    // Logic to refresh comments after a new one is added
    // Potentially re-fetch the comments or add the new comment to the state
    store.updateMapReaction(map, likes, dislikes, true, "HELLO")
    console.log(map.reactions.comments)
  };*/

  const handleLikeToggle = (event) => {
    setLiked((prevLiked) => !prevLiked);
    setDisliked(false);
    event.stopPropagation()
    if (!liked) {
      store.updateMapReaction(map, likes + 1, dislikes - (disliked ? 1 : 0), false, null);
      console.log("likes: ",likes)
    } else {
      store.updateMapReaction(map, likes - 1, dislikes, false, null);
    }
  };
  
  const handleDislikeToggle = (event) => {
    setDisliked((prevDisliked) => !prevDisliked);
    setLiked(false);
    event.stopPropagation();
    if (!disliked) {
      store.updateMapReaction(map, likes - (liked ? 1 : 0), dislikes + 1, false, null);
    } else {
      store.updateMapReaction(map, likes, dislikes - 1, false, null);
    }
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
          {map.title}
        </StyledTypography>
        <StyledCardMedia
          component="img"
          image={map.imageUrl}
          alt={`Map titled ${map.title}`}
        />
        <StyledCardContent>
          <StyledTypography variant="subtitle1">
            Author: {map.author}
          </StyledTypography>
          <StyledTypography variant="body1" paragraph>
            {map.description}
          </StyledTypography>
          <StyledBox>
            <ReactionButton data-testid = "map-like-button" selected={liked} onClick={handleLikeToggle}>
              <ThumbUpIcon />
              <ReactionCount data-testid = "map-likes-count">{likes}</ReactionCount>
            </ReactionButton>
            <ReactionButton data-testid = "map-dislike-button" selected={disliked} onClick={handleDislikeToggle}>
              <ThumbDownIcon />
              <ReactionCount data-testid = "map-dislikes-count">{dislikes}</ReactionCount>
            </ReactionButton>
          </StyledBox>
        </StyledCardContent>
        <CommentList map={map} commentsList ={map.reactions.comments} />
        <CommentForm map={map}/>
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
