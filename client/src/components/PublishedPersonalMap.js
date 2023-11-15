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
import { GlobalStoreContext } from './store';
import DeletePostModal from './DeletePostModal';
import {Button} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import ModeEditIcon from '@mui/icons-material/ModeEdit';

function PublishedPersonalMap({ map,id, onEditClick, onDeleteClick }) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const { store } = useContext(GlobalStoreContext);
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  function handleEditClick (map){
      //store.setCurrentMap(map.map)
      store.setCurrentEditMap(map.map, "EditMapScreen")
  }
  const handleLikeToggle = () => {
    setLiked((prevLiked) => !prevLiked);
    setDisliked(false);
  };

  const handleDislikeToggle = () => {
    setDisliked((prevDisliked) => !prevDisliked);
    setLiked(false);
  };

  const card = {
    maxHeight: '45vh',
    maxWidth: '20vw',
    marginTop: '5vh',
    borderRadius: '2.5vh',
  };
  const isPost = id.includes('post');
  return (
    <Card sx={card}>
      <CardHeader title="map test" subheader="team pink" />
      <CardMedia
        component="img"
        height="194"
        image="https://as2.ftcdn.net/v2/jpg/01/11/60/53/1000_F_111605345_4QzFce77L5YnuieLC63lhI3WCdH1UNrP.jpg"
        alt="map test"
      />
      <CardActions disableSpacing>
        {isPost ? (
          <>
            <ToggleButton value="like" selected={liked} onChange={handleLikeToggle} sx={{ border: 'none' }}>
              <Typography sx={{ marginRight: '0.2vw' }}>123</Typography>
              {liked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
            </ToggleButton>
            <ToggleButton value="dislike" selected={disliked} onChange={handleDislikeToggle} sx={{ border: 'none' }}>
              <Typography sx={{ marginRight: '0.2vw' }}>123</Typography>
              {disliked ? <ThumbDownIcon /> : <ThumbDownOutlinedIcon />}
            </ToggleButton>
          </>
        ) : (
          <>
            <Button
              onClick = {handleOpenDelete}
            >
              <DeleteIcon sx={{color:"#FF76D6"}}/>
            </Button>
            <DeletePostModal
                open={openDelete} onClose={handleCloseDelete}/>
            <Button
              data-testid="EditScreenButton"
              onClick={() => onEditClick(map)}
            >
              <ModeEditIcon sx={{color:"#FF76D6"}}/>
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
}

export default PublishedPersonalMap;