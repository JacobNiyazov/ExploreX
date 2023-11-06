// src/components/MapFeedCard.js
import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { StyledCard, TitleTypography, AuthorTypography, StyledCardMedia, StyledCardContent, ReactionButton, ReactionCount, ContentContainer, TextContainer } from './MapFeedStyles';

const MapFeedCard = ({ map }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLike = () => {
    setLiked(prevLiked => !prevLiked);
    setDisliked(false);  // Reset disliked state
  };

  const handleDislike = () => {
    setDisliked(prevDisliked => !prevDisliked);
    setLiked(false);  // Reset liked state
  };

  return (
    <StyledCard as={Card}>
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
            <div style={{ display: 'flex', alignItems: 'center' }}>
            <ReactionButton selected={liked} onClick={handleLike}>
              <ThumbUpIcon />
            </ReactionButton>
            <ReactionCount>{map.likes}</ReactionCount>
            <ReactionButton selected={disliked} onClick={handleDislike}>
              <ThumbDownIcon />
            </ReactionButton>
            <ReactionCount>{map.dislikes}</ReactionCount>
          </div>
        </ContentContainer>
      </StyledCardContent>
    </StyledCard>
  );
};

export default MapFeedCard;
