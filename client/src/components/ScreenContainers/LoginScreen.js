import React, { useState, useContext } from 'react';
import launchStyle from '../StyleSheets/launchStyle'; 
import image from '../images/splashImage.png';
import { GlobalStoreContext } from '../../store';
import AuthContext from '../../auth'; 

import {
  Typography,
  Button,
  Container,
  Grid,
  Link,
} from '@mui/material';
const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);


  const handleLogin = (e) => {
    e.preventDefault();
    auth.loginUser(username,password)
    .then( 
      (val) => store.setCurrentPage(store.currentPageType.mapFeed))
    .catch(
      (error) => store.displayModal(error.response.data.errorMessage));

  };

  const handleForgot = (e) => {
    store.setCurrentPage(store.currentPageType.forgotPassScreen);
  };

  const handleEnterGuest = (event) => {
    store.setCurrentPage(store.currentPageType.mapFeed);
  };
  
  return (
    <div style = {launchStyle.container}>
      <div style = {launchStyle.leftSide}>
        <Container>
        <form>
          <Typography style={launchStyle.header_text} variant="h5">Welcome, Map Lovers!</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>Username:</Typography>
                <input
                  type="text"
                  id="username"
                  value={username}
                  style = {launchStyle.rounded_input}
                  onChange={(e) => setUsername(e.target.value)}
                />
            </Grid>
            <Grid style={launchStyle.password_container} item xs={12}>
              <Typography style={launchStyle.password}>Password:</Typography>
              <input
                  type="password"
                  id="password"
                  style = {launchStyle.rounded_input}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
            </Grid>
            <Grid style={launchStyle.button_container} item xs={12}>
              <Button style={launchStyle.button} onClick= {handleLogin} variant="contained" color="primary">
                Sign in
              </Button>
              <Button style={launchStyle.button} onClick={ handleEnterGuest } variant="contained" color="secondary" data-testid="guest-button">
                Log in as guest
              </Button>
              <Link style={launchStyle.forgot} onClick={handleForgot}>Forgot your password?</Link>

            </Grid>
          </Grid>
        </form>
      </Container>
      </div>
      <div style = {launchStyle.rightSide}>
        <img src = {image} alt = "" style = {launchStyle.image}> 
        </img>
      </div>
    </div>
  );
};

export default LoginScreen;
