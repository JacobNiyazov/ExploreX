import React, {useState} from 'react';
import { Box } from '@mui/material';
import {Grid} from '@mui/material';
import {Typography} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { Button } from '@mui/material';

function PublishedPersonalMap(){
    const center = {
        display:"flex", 
        justifyContent:"center", 
        alignItems:"center"
    }
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
                style={{height: "30vh", width: "30vh",  borderRadius:"17px"}} />
            </Grid>
            <Grid item xs = {12}>
                <Grid container spacing={2}>
                    <Grid item xs = {1}>
                        <Typography sx = {{paddingLeft:"1vh"}}>
                        1231
                        </Typography>
                    </Grid>
                    <Grid item xs = {5}>
                       <Button sx = {{color:"black", marginBottom:"2vh"}}>
                            <ThumbUpIcon></ThumbUpIcon>
                        </Button>
                    </Grid>
                    <Grid item xs = {1} sx = {{marginLeft:"-10vh"}}>
                        <Typography>
                            1231
                        </Typography>
                    </Grid>
                    <Grid item xs = {5}>
                        <Button sx = {{color:"black", marginBottom:"2vh", marginLeft:"-15vh"}}>
                            <ThumbDownIcon></ThumbDownIcon>
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
export default PublishedPersonalMap;