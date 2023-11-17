import React, {useContext} from 'react';
import {Grid} from '@mui/material';
import {Typography} from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import { GlobalStoreContext } from '../store';

function DraftPersonalMap(map){
    const { store } = useContext(GlobalStoreContext);
    let deleteMessage = (
        <div>
            Are you sure you want to delete this map?
            This action is <span style={{ fontWeight: 'bold', fontStyle: 'italic',textDecoration: 'underline' }}>
                PERMANENT</span>
        </div>
    )
    const handleOpenDelete = () => store.displayModal(deleteMessage, true);

    function handleEditClick (){
        store.setCurrentEditMap(map.map, "EditMapScreen")
    }
    return(
        <Grid container spacing = {2}>
            <Grid item xs = {12} sx = {{marginLeft:"2.5vh"}}>
                <Typography sx = {{ marginTop:"5vh"}}> 
                    This is a draft map
                </Typography>
            </Grid>
            <Grid item xs = {12}>
                <img src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/girls-nursery-room-watercolor-painting-world-map-silhouette-baby-pink-wall-decor-joanna-szmerdt.jpg" 
                alt = "Draft Map" style={{height: "30vh", width: "30vh",  borderRadius:"17px"}} />
            </Grid>
            <Grid item xs = {6}>
                <Button
                    sx = {{marginBottom: "2vh",
                    marginLeft: "3vw", color: "white"}}
                    data-testid="EditScreenButton"
                    onClick={handleEditClick}
                    >
                        <ModeEditIcon></ModeEditIcon>
                </Button>
            </Grid>
            <Grid item xs = {6}>
                <Button
                sx = {{marginBottom: "2vh",
                marginLeft: "-5vw",color:"white"}}
                onClick = {handleOpenDelete}
                >
                    <DeleteIcon></DeleteIcon>
                </Button>
            </Grid>
        </Grid>
    );
}
export default DraftPersonalMap;
