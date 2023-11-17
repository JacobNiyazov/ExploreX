// src/components/MapFeedCard.js
import React, { useState, useContext } from 'react';
import { Card, CardContent, CardMedia } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { StyledCard, TitleTypography, AuthorTypography, StyledCardMedia, StyledCardContent, ReactionButton, ReactionCount, ContentContainer, TextContainer } from './StyleSheets/MapFeedStyles';
import { StyledBox } from './StyleSheets/PublicMapStyles';
import { GlobalStoreContext } from '../store'


const MapFeedCard = ({ map }) => {
  const { store } = useContext(GlobalStoreContext);

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLike = (event) => {
    event.stopPropagation();
    setLiked(prevLiked => !prevLiked);
    setDisliked(false);  // Reset disliked state
  };

  const handleDislike = (event) => {
    event.stopPropagation();
    setDisliked(prevDisliked => !prevDisliked);
    setLiked(false);  // Reset liked state
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
            <ReactionButton selected={liked} onClick={handleLike}>
              <ThumbUpIcon />
              <ReactionCount>{map.likes}</ReactionCount>
            </ReactionButton>
            <ReactionButton selected={disliked} onClick={handleDislike}>
              <ThumbDownIcon />
              <ReactionCount>{map.dislikes}</ReactionCount>
            </ReactionButton>
          </StyledBox>
        </ContentContainer>
      </StyledCardContent>
    </StyledCard>
  );
};

export default MapFeedCard;
