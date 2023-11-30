// src/components/MapFeedCard.js
import React, { useState, useContext } from 'react';
import { Card, CardContent, CardMedia } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { StyledCard, TitleTypography, AuthorTypography, StyledCardMedia, StyledCardContent, ReactionButton, ReactionCount, ContentContainer, TextContainer } from './StyleSheets/MapFeedStyles';
import { StyledBox } from './StyleSheets/PublicMapStyles';
import { GlobalStoreContext } from '../store'
import { useNavigate } from 'react-router-dom';
//import { AuthContext } from '../auth'


const MapFeedCard = ({ map, likes, dislikes,id }) => {
  const { store } = useContext(GlobalStoreContext);
  //const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

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
    store.setCurrentPage(store.currentPageType.publicMapView, map);
    navigate(`/map?id=${map._id}`);
  };
  let temp;
  console.log("map owner: ", map)
  if (map.imageBuffer){
    temp = map.imageBuffer
  }
  return (
    <StyledCard as={Card} onClick={handleOpenMap} data-testid={id}>
      <StyledCardMedia as={CardMedia}
        component="img"
        alt={`${map.title} by ${map.ownerUsername}`}
        image={ map.imageBuffer ? temp : null}
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
            <ReactionButton sx ={{display:"none"}} data-testid= "feed-like-button" selected={liked} onClick={handleLikeToggle}>
              <ThumbUpIcon />
              <ReactionCount data-testid= "feed-likes-count">{likes}</ReactionCount>
            </ReactionButton>
            <ReactionButton sx ={{display:"none"}} data-testid= "feed-dislike-button" selected={disliked} onClick={handleDislikeToggle}>
              <ThumbDownIcon />
              <ReactionCount data-testid= "feed-dislikes-count">{dislikes}</ReactionCount>
            </ReactionButton>
          </StyledBox>
        </ContentContainer>
      </StyledCardContent>
    </StyledCard>
  );
};

export default MapFeedCard;
