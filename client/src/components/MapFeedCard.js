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

  const likes = map.reactions.likes;
  const dislikes = map.reactions.dislikes;

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [newLike, setNewLike] = useState(likes.length);
  const [newDislike, setNewDislike] = useState(dislikes.length);

  useEffect(() => {
    // Update the local state when the likes or dislikes prop changes
    setLiked(likes.includes(auth.user.username));
    setDisliked(dislikes.includes(auth.user.username));
    setNewLike(likes.length);
    setNewDislike(dislikes.length);
  }, [likes, dislikes, auth.user.username]);

  const handleLikeToggle = (event) => {
    event.stopPropagation();

    const likeresult = likes.includes(auth.user.username);
    const dislikeresult = dislikes.includes(auth.user.username);

    if (!likeresult) {
      // This means they're able to like
      setLiked(true);
      setDisliked(false);
      const updatedLikes = [...likes, auth.user.username];
      const updatedDislikes = dislikeresult ? dislikes.filter((name) => name !== auth.user.username) : dislikes;

      setNewLike(updatedLikes.length);
      setNewDislike(updatedDislikes.length);

      store.updateMapReaction(map, updatedLikes, updatedDislikes, false, null);
    }
  };

  const handleDislikeToggle = (event) => {
    event.stopPropagation();

    const likeresult = likes.includes(auth.user.username);
    const dislikeresult = dislikes.includes(auth.user.username);

    if (!dislikeresult) {
      // This means they're able to dislike
      setDisliked(true);
      setLiked(false);
      const updatedDislikes = [...dislikes, auth.user.username];
      const updatedLikes = likeresult ? likes.filter((name) => name !== auth.user.username) : likes;

      setNewLike(updatedLikes.length);
      setNewDislike(updatedDislikes.length);

      store.updateMapReaction(map, updatedLikes, updatedDislikes, false, null);
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
            <ReactionButton sx={{display:"none"}} data-testid= "feed-like-button" selected={liked} onClick={handleLikeToggle}>
              <ThumbUpIcon />
              <ReactionCount data-testid= "feed-likes-count">{newLike}</ReactionCount>
            </ReactionButton>
            <ReactionButton sx={{display:"none"}} data-testid= "feed-dislike-button" selected={disliked} onClick={handleDislikeToggle}>
              <ThumbDownIcon />
              <ReactionCount data-testid= "feed-dislikes-count">{newDislike}</ReactionCount>
            </ReactionButton>
          </StyledBox>
        </ContentContainer>
      </StyledCardContent>
    </StyledCard>
  );
};

export default MapFeedCard;