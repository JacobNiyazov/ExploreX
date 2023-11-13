import React from 'react';
import {Grid} from '@mui/material';
import {Typography} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { Button } from '@mui/material';
import { useState } from 'react';

function PublishedPersonalMap(){
    const [activeButton, setActiveButton] = useState(null);

    const handleButtonClick = (buttonName) => {
      setActiveButton(buttonName);
    };
    // I want this one to have the thumbs up and thumbs down and a map image, thats it
    return(
        <Grid container spacing = {2}>
            <Grid item xs = {12} sx = {{marginLeft:"2.5vh"}}>
                <Typography sx = {{ marginTop:"5vh"}}> 
                    This is a sample published map
                </Typography>
            </Grid>
            <Grid item xs = {12}>
                <img src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/girls-nursery-room-watercolor-painting-world-map-silhouette-baby-pink-wall-decor-joanna-szmerdt.jpg" // Replace with your image URL
                alt = "Published Map" style={{height: "30vh", width: "30vh",  borderRadius:"17px"}} />
            </Grid>
            <Grid item xs = {12}>
                <Grid container spacing={2}>
                    <Grid item xs = {1}>
                        <Typography sx = {{paddingLeft:"1vw"}}>
                        1231
                        </Typography>
                    </Grid>
                    <Grid item xs = {5}>
                        <Button
                            sx={{
                                color: activeButton === 'ThumbsUp' ? '#FF76D6' : 'white',
                                marginBottom: "2vw",
                                marginLeft:"-4vw"
                            }}
                            onClick={() => handleButtonClick('ThumbsUp')}
                            >
                            <ThumbUpIcon />
                        </Button>
                    </Grid>
                    <Grid item xs = {1} sx = {{marginLeft:"-36.5vw"}}>
                        <Typography>
                            1231
                        </Typography>
                    </Grid>
                    <Grid item xs = {5}>
                    <Button
                        sx={{
                            color: activeButton === 'ThumbsDown' ? '#FF76D6' : 'white',
                            marginBottom: "2vh",
                            marginLeft: "-12.5vw",
                        }}
                        onClick={() => handleButtonClick('ThumbsDown')}
                        >
                        <ThumbDownIcon />
                    </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
export default PublishedPersonalMap;