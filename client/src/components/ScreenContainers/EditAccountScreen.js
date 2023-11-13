import React from 'react';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import {FormControl} from '@mui/material';
import {InputLabel} from '@mui/material';
import { StyledButton, StyledInput, StyledBio, StyledInfo, StyledSubmitButton} from '../StyleSheets/EditAccountScreenStyles';
import {InputAdornment} from '@mui/material';

function EditAccountScreen(){
    const center = {
        display:"flex", 
        justifyContent:"center", 
        alignItems:"center"
    }
    const text = {
        fontSize:"5vh",
        paddingTop:"5vh",
    }
    return(
        <Grid container spacing = {3}>
            <Grid item xs = {12} sx = {center}>
                <Typography sx = {text} data-testid="title">
                    Let's make some changes
                </Typography>
            </Grid>
            <Grid item xs = {12} sx = {center}>
                <FormControl>
                    <InputLabel htmlFor="basic-input" 
                    style={{ color: 'white' }}>
                        Username
                    </InputLabel>
                    <StyledInput
                        sx={{padding: "10px"}}
                        disableUnderline
                        id="basic-input"
                        defaultValue="Team Pink"
                        data-testid="username-input"
                        endAdornment={
                            <InputAdornment position="end">
                            <StyledButton>
                                Edit
                            </StyledButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </Grid>
            <Grid item xs = {6} sx = {center}>
            <FormControl>
                <InputLabel htmlFor="basic-input" style={{ color: 'white' }}>
                        Bio
                    </InputLabel>
                    <StyledBio
                        multiline
                        rows={10}
                        fullWidth                                     
                        sx={{padding: "10px"}}
                        disableUnderline
                        id="basic-input"
                        data-testid="bio-input"
                        defaultValue="Hello, welcome to my page thisis where the bio goes. I hope you enjoy all my maps!"
                        endAdornment={
                            <InputAdornment position="end" sx = {{marginTop:"45vh", marginLeft:"3vw"}}>
                            <StyledButton>
                                Edit
                            </StyledButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </Grid>
            <Grid item xs = {6}>
            <FormControl>
                    <InputLabel htmlFor="basic-input" style={{ color: 'white' }}>
                        Email
                    </InputLabel>
                    <StyledInfo
                        sx={{padding: "10px"}}
                        disableUnderline
                        id="basic-input"
                        defaultValue="teampink@stonybrook.edu"
                        data-testid="email-input"
                        endAdornment={
                            <InputAdornment position="end">
                            <StyledButton
                            >
                                Edit
                            </StyledButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="basic-input" style={{ color: 'white' }}>
                        Password
                    </InputLabel>
                    <StyledInfo
                        sx={{padding: "10px"}}
                        disableUnderline
                        id="basic-input"
                        type="password"
                        defaultValue="123123123"
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="basic-input" style={{ color: 'white' }}>
                        Confirm Password
                    </InputLabel>
                    <StyledInfo
                        sx={{padding: "10px"}}
                        disableUnderline
                        id="basic-input"
                        defaultValue="123123123"
                        type="password"
                    />
                </FormControl>
                <StyledSubmitButton sx = {{marginTop:"20vh", marginLeft: "-15vh"}}>
                    Submit
                </StyledSubmitButton>
            </Grid>
        </Grid>
    );
}
export default EditAccountScreen;