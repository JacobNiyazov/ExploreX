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

  const [liked, setLiked] = useState(map.reactions.likes.includes(auth.user?.username));
  const [disliked, setDisliked] = useState(map.reactions.dislikes.includes(auth.user?.username));
  const [newLiked, setNewLiked] = useState(map.reactions.likes);
  const [newDisliked, setNewDisliked] = useState(map.reactions.dislikes);

  const handleLikeToggle = (event) => {
    event.stopPropagation();

    if (!newLiked.includes(auth.user.username)) {
      const updatedLikes = [...newLiked, auth.user.username];
      const updatedDislikes = newDisliked.filter((name) => name !== auth.user.username);

      setLiked(true);
      setDisliked(false);
      setNewLiked(updatedLikes);
      setNewDisliked(updatedDislikes);

      store.updateMapReaction(map, updatedLikes, updatedDislikes, false, null);
    } else {
      const updatedLikes = newLiked.filter((name) => name !== auth.user.username);

      setLiked(false);
      setNewLiked(updatedLikes);

      store.updateMapReaction(map, updatedLikes, newDisliked, false, null);
    }
  };

  const handleDislikeToggle = (event) => {
    event.stopPropagation();

    if (!newDisliked.includes(auth.user.username)) {
      const updatedDislikes = [...newDisliked, auth.user.username];
      const updatedLikes = newLiked.filter((name) => name !== auth.user.username);

      setLiked(false);
      setDisliked(true);
      setNewLiked(updatedLikes);
      setNewDisliked(updatedDislikes);

      store.updateMapReaction(map, updatedLikes, updatedDislikes, false, null);
    } else {
      const updatedDislikes = newDisliked.filter((name) => name !== auth.user.username);

      setDisliked(false);
      setNewDisliked(updatedDislikes);

      store.updateMapReaction(map, newLiked, updatedDislikes, false, null);
    }
  };

  const handleOpenMap = () => {
    store.setCurrentPage(store.currentPageType.publicMapView, map);
    navigate(`/map?id=${map._id}`);
  };

  let temp;

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
          <StyledBox>
            <ReactionButton data-testid="feed-like-button" selected={liked} onClick={handleLikeToggle}>
              <ThumbUpIcon />
              <ReactionCount data-testid="feed-likes-count">{newLiked.length}</ReactionCount>
            </ReactionButton>
            <ReactionButton data-testid="feed-dislike-button" selected={disliked} onClick={handleDislikeToggle}>
              <ThumbDownIcon />
              <ReactionCount data-testid="feed-dislikes-count">{newDisliked.length}</ReactionCount>
            </ReactionButton>
          </StyledBox>
        </ContentContainer>
      </StyledCardContent>
    </StyledCard>
  );
};

export default MapFeedCard;