// src/components/MapFeedCard.js
import React, { useState, useContext, useEffect } from 'react';
import { Card, CardContent, CardMedia } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { StyledCard, TitleTypography, AuthorTypography, StyledCardMedia, StyledCardContent, ReactionButton, ReactionCount, ContentContainer, TextContainer } from './StyleSheets/MapFeedStyles';
import { StyledBox } from './StyleSheets/PublicMapStyles';
import { GlobalStoreContext } from '../store'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth'


const MapFeedCard = ({ map, id }) => {
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOpenMap = () => {
    store.setCurrentPage(store.currentPageType.publicMapView, map);
    navigate(`/map?id=${map._id}`);
  };

  let temp;
  console.log("map owner: ", map);
  if (map.imageBuffer) {
    temp = map.imageBuffer;
  }

  return (
    <StyledCard as={Card} onClick={handleOpenMap} data-testid={id}>
      <StyledCardMedia
        as={CardMedia}
        component="img"
        alt={`${map.title} by ${map.ownerUsername}`}
        image={map.imageBuffer ? temp : null}
      />
      <StyledCardContent as={CardContent}>
        <ContentContainer>
          <TextContainer>
            <TitleTypography variant="body2" component="div">
              {map.title}
            </TitleTypography>
            <AuthorTypography variant="body2" component="div">
              by {map.ownerUsername}
            </AuthorTypography>
          </TextContainer>
        </ContentContainer>
      </StyledCardContent>
    </StyledCard>
  );
};

export default MapFeedCard;