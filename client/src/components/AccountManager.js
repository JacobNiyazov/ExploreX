import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import {TextField} from '@mui/material';
import {Input} from '@mui/material';
import {FormControl} from '@mui/material';
import {InputLabel} from '@mui/material';
import { StyledButton, StyledInput, StyledBio, StyledInfo, StyledSubmitButton} from './AccountManagerStyles';
import {InputAdornment} from '@mui/material';
import { InputBase } from '@mui/material';

/*to do for the weekend/tomorrow:
    - change the color/font, do this when pulled
    - make the error modals for the account manage
    - pull the other code, see if footer is sticky
    to the bottom
*/
function AccountManager(){
    const center = {
        display:"flex", 
        justifyContent:"center", 
        alignItems:"center"
    }
    const text = {
        fontSize:"5vh",
        paddingTop:"5vh",
        color:"pink"
    }
    return(
        <Grid container spacing = {3}>
            <Grid item xs = {12} sx = {center}>
                <Typography sx = {text}>
                    Let's make some changes
                </Typography>
            </Grid>
            <Grid item xs = {12} sx = {center}>
                <FormControl>
                    <InputLabel htmlFor="basic-input" style={{ color: 'white' }}>
                        Username
                    </InputLabel>
                    <StyledInput
                        sx={{padding: "10px"}}
                        disableUnderline
                        id="basic-input"
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
                        endAdornment={
                            <InputAdornment position="end">
                            <StyledButton>
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
                        endAdornment={
                            <InputAdornment position="end">
                            <StyledButton>
                                Edit
                            </StyledButton>
                            </InputAdornment>
                        }
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
                        endAdornment={
                            <InputAdornment position="end">
                            <StyledButton>
                                Edit
                            </StyledButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <StyledSubmitButton sx = {{marginTop:"20vh", marginLeft: "-15vh"}}>
                    Submit
                </StyledSubmitButton>
            </Grid>
        </Grid>
    );
}
export default AccountManager;