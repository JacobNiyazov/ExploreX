import React, { useState, useContext } from 'react';import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import {FormControl} from '@mui/material';
import {InputLabel} from '@mui/material';
import { StyledInput, StyledBio, StyledInfo, StyledSubmitButton} from '../StyleSheets/EditAccountScreenStyles';
import { GlobalStoreContext } from '../../store'
import { AuthContext } from '../../auth'


function EditAccountScreen(){
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleUsernameChange = (event) => setUsername(event.target.value);
    const handleBioChange = (event) => setBio(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
    const handleConfirmPasswordChange = (event) => setConfirmPassword(event.target.value);

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = () => {
        // TODO: check unique email and unique username

        const invalidEmailMessage = (
            <div>
                <h3 style={{ color: '#f44336', margin: '0', fontSize: '1.5rem' }}>Invalid Email</h3>
                <p style={{ margin: '5px 0', fontSize: '1rem' }}>Please enter a valid email address.</p>
            </div>
        );
        
        const passwordsNotMatchingMessage = (
            <div>
                <h4 style={{ color: '#f44336', margin: '0', fontSize: '1.1rem' }}>Passwords Do Not Match</h4>
                <p style={{ margin: '5px 0', fontSize: '1rem' }}>The entered passwords do not match. Please try again.</p>
            </div>
        );        
        const passwordTooShortMessage = (
            <div>
                <h4 style={{ color: '#f44336', margin: '0', fontSize: '1.1rem' }}>Password Too Short</h4>
                <p style={{ margin: '5px 0', fontSize: '1rem' }}>Your password must be at least 8 characters.</p>
            </div>
        );
        const noUsernameMessage = (
            <div>
                <h4 style={{ color: '#f44336', margin: '0', fontSize: '1.1rem' }}>Username Required</h4>
                <p style={{ margin: '5px 0', fontSize: '1rem' }}>Please enter a unique username.</p>
            </div>
        );      
        if (!isValidEmail(email)) {
            store.displayModal(invalidEmailMessage, false);
        }
        else if (password !== confirmPassword) {
            store.displayModal(passwordsNotMatchingMessage, false);
        }
        else if (password.length < 8) {
            store.displayModal(passwordTooShortMessage, false);
        }
        else if (username.length === 0) {
            store.displayModal(noUsernameMessage, false);
        }
        else{
            store.updateUserInfo(username, email, bio, password);
        }
    };

    if (auth.user !== null && auth.isLoggedIn === true){
        setUsername(auth.user.username);
        setBio(auth.user.bio);
        setEmail(auth.user.email);
    }

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
                    style={{ color: 'white', fontSize:'25px' }}>
                        Username
                    </InputLabel>
                    <StyledInput
                        value={username}
                        onChange={handleUsernameChange}
                        sx={{padding: "10px"}}
                        disableUnderline
                        id="basic-input"
                        data-testid="username-input"
                        // endAdornment={
                        //     <InputAdornment position="end">
                        //     <StyledButton>
                        //         Edit
                        //     </StyledButton>
                        //     </InputAdornment>
                        // }
                    />
                </FormControl>
            </Grid>
            <Grid item xs = {6} sx = {center}>
            <FormControl>
                <InputLabel htmlFor="basic-input" style={{ color: 'white', fontSize:'25px' }}>
                        Bio
                    </InputLabel>
                    <StyledBio
                        value={bio}
                        onChange={handleBioChange}
                        multiline
                        rows={10}
                        fullWidth                                     
                        sx={{padding: "10px"}}
                        disableUnderline
                        id="basic-input"
                        data-testid="bio-input"
                        // endAdornment={
                        //     <InputAdornment position="end" sx = {{marginTop:"45vh", marginLeft:"3vw"}}>
                        //     <StyledButton>
                        //         Edit
                        //     </StyledButton>
                        //     </InputAdornment>
                        // }
                    />
                </FormControl>
            </Grid>
            <Grid item xs = {6}>
            <FormControl>
                    <InputLabel htmlFor="basic-input" style={{ color: 'white', fontSize:'25px' }}>
                        Email
                    </InputLabel>
                    <StyledInfo
                        value={email}
                        onChange={handleEmailChange}
                        sx={{padding: "10px"}}
                        disableUnderline
                        id="basic-input"
                        data-testid="email-input"
                        // endAdornment={
                        //     <InputAdornment position="end">
                        //     <StyledButton
                        //     >
                        //         Edit
                        //     </StyledButton>
                        //     </InputAdornment>
                        // }
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="basic-input" style={{ color: 'white', fontSize:'25px' }}>
                        Password
                    </InputLabel>
                    <StyledInfo
                        value={password}
                        onChange={handlePasswordChange}
                        sx={{padding: "10px"}}
                        disableUnderline
                        id="basic-input"
                        type="password"
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="basic-input" style={{ color: 'white', fontSize:'25px' }}>
                        Confirm Password
                    </InputLabel>
                    <StyledInfo
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        sx={{padding: "10px"}}
                        disableUnderline
                        id="basic-input"
                        type="password"
                    />
                </FormControl>
                <StyledSubmitButton sx = {{marginTop:"20vh", marginLeft: "-15vh"}} onClick={handleSubmit}>
                    Save Changes
                </StyledSubmitButton>
            </Grid>
        </Grid>
    );
}
export default EditAccountScreen;