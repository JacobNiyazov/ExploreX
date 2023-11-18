// src/components/MapFeedCard.js
import React, { useState, useContext } from 'react';
import { Card, CardContent, CardMedia } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { StyledCard, TitleTypography, AuthorTypography, StyledCardMedia, StyledCardContent, ReactionButton, ReactionCount, ContentContainer, TextContainer } from './StyleSheets/MapFeedStyles';
import { StyledBox } from './StyleSheets/PublicMapStyles';
import { GlobalStoreContext } from './store'


const MapFeedCard = ({ map, likes, dislikes }) => {
  const { store } = useContext(GlobalStoreContext);

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLikeToggle = (event) => {
    setLiked((prevLiked) => !prevLiked);
    setDisliked(false);
    event.stopPropagation()
    if (!liked) {
      store.updateMapReaction(map, likes + 1, dislikes - (disliked ? 1 : 0), false, null);
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
  const handleOpenMap = () => {
    store.setCurrentPage(store.currentPageType.publicMapView);
  };

  return (
    <StyledCard as={Card} onClick={handleOpenMap} data-testid='map-feed-card'>
      <StyledCardMedia as={CardMedia}
        component="img"
        alt={`${map.title} by ${map.author}`}
        image={map.imageUrl}
      />
      <StyledCardContent as={CardContent}>
        <ContentContainer>
          <TextContainer>
            <TitleTypography variant="body2" component="div">
              {map.title}
            </TitleTypography>
            <AuthorTypography variant="body2" component="div">
              by {map.author}
            </AuthorTypography>
            </TextContainer>
            <StyledBox>
            <ReactionButton selected={liked} onClick={handleLikeToggle}>
              <ThumbUpIcon />
              <ReactionCount>{likes}</ReactionCount>
            </ReactionButton>
            <ReactionButton selected={disliked} onClick={handleDislikeToggle}>
              <ThumbDownIcon />
              <ReactionCount>{dislikes}</ReactionCount>
            </ReactionButton>
          </StyledBox>
        </ContentContainer>
      </StyledCardContent>
    </StyledCard>
  );
};

export default MapFeedCard;
