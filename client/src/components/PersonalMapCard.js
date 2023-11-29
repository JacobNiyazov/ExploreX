import * as React from 'react';
import { useState, useContext } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { ToggleButton } from '@mui/material';
import {Typography} from '@mui/material';
import { GlobalStoreContext } from '../store';
import DeletePostModal from './DeletePostModal';
import {Button} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useNavigate } from 'react-router-dom';
import maps from '../store/map-request-api';

function PersonalMapCard({ map,id,likes,dislikes }) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const { store } = useContext(GlobalStoreContext);
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);
  const navigate = useNavigate();


  async function handleEditClick (){
    let tempMap;
    let response = await maps.getMapById("6563af3209aa5b8bd7ed0806");
    if(response.data.success){
      tempMap = response.data.map; 
      console.log(tempMap)
    }
    store.setCurrentEditMap(tempMap, "EditMapScreen")
    navigate("/editMap")
  }
  const handleLikeToggle = () => {
    setLiked((prevLiked) => !prevLiked);
    setDisliked(false);
  
    if (!liked) {
      store.updateMapReaction(map, likes + 1, dislikes - (disliked ? 1 : 0), false, null);
    } else {
      store.updateMapReaction(map, likes - 1, dislikes, false, null);
    }
  };
  
  const handleDislikeToggle = () => {
    setDisliked((prevDisliked) => !prevDisliked);
    setLiked(false);
  
    if (!disliked) {
      store.updateMapReaction(map, likes - (liked ? 1 : 0), dislikes + 1, false, null);
    } else {
      store.updateMapReaction(map, likes, dislikes - 1, false, null);
    }
  };
  
  const handlePostClick = () => {
    if (isPost) {
      store.setCurrentPage(store.currentPageType.publicMapView);
      navigate("/map");
    } else {
      store.setCurrentEditMap(map, "EditMapScreen");
      navigate("/editMap")


    }
  };
  const card = {
    height: '34vh',
    maxWidth: '23vw',
    marginTop: '5vh',
    borderRadius: '2.5vh',
  };
  const isPost = id.includes('post');
  return (
    <Card sx={card} data-testid={id}>
      <CardHeader title={map.title} subheader={map.ownerUsername} />
      <CardMedia
        component="img"
        height="160vh"
        image="https://as2.ftcdn.net/v2/jpg/01/11/60/53/1000_F_111605345_4QzFce77L5YnuieLC63lhI3WCdH1UNrP.jpg"
        alt="map test"
        onClick = {handlePostClick}
      />
      <CardActions disableSpacing>
        {isPost ? (
          <>
            <ToggleButton data-testid = "like-button" value="like" selected={liked} onChange={handleLikeToggle} sx={{ border: 'none', display:'none' }}>
              <Typography data-testid = "likes-count" sx={{ marginRight: '0.2vw' }}>{likes}</Typography>
              {liked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
            </ToggleButton>
            <ToggleButton data-testid = "dislike-button" value="dislike" selected={disliked} onChange={handleDislikeToggle} sx={{ border: 'none', display:"none" }}>
              <Typography data-testid = "dislikes-count" sx={{ marginRight: '0.2vw' }}>{dislikes}</Typography>
              {disliked ? <ThumbDownIcon /> : <ThumbDownOutlinedIcon />}
            </ToggleButton>
          </>
        ) : (
          <>
            <Button
              data-testid="delete-button"
              onClick = {handleOpenDelete}
            >
              <DeleteIcon sx={{color:"#FF76D6"}}/>
            </Button>
            <DeletePostModal
                open={openDelete} 
                onClose={handleCloseDelete}
                map = {map}
                />
            <Button
              data-testid="edit-button"
              onClick={handleEditClick}
            >
              <ModeEditIcon sx={{color:"#FF76D6"}}/>
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
}

export default PersonalMapCard;