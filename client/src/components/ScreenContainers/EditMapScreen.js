import React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import EditSidePanel from '../EditSidePanel.js';
import MapEdit from '../MapEdit.js';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


const EditScreen = () => {
    return (
        <Grid container sx={{height:"100%"}}>
            <EditSidePanel />
            <MapEdit />
        </Grid>
    );
}

export default EditScreen