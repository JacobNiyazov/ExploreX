import React, { useState, useContext, useEffect, useCallback } from 'react';
import launchStyle from '../StyleSheets/launchStyle'; 
import image from '../images/splashImage.png';
import { GlobalStoreContext } from '../../store';
import AuthContext from '../../auth'; 
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  const handleLogin = useCallback((e) => {
    e.preventDefault();
    auth.loginUser(username, password)
      .then((val) => {
        store.setCurrentPage(store.currentPageType.mapFeed);
        navigate("/feed");
      })
      .catch((error) => store.displayModal(
        <div>
          <h4 style={{ color: '#f44336', margin: '0', fontSize: '1.1rem' }}>Try Again</h4>
          <p style={{ margin: '5px 0', fontSize: '1rem', width: '120%' }}>{error.response.data.errorMessage}</p>
        </div>, false
      ));
  }, [auth, username, password, store, navigate]);


  useEffect(() => {
    const waitForAuthCheck = async () => {
        if (auth.loggedIn === undefined) {
            // Wait until authentication check is completed
            await new Promise((resolve) => setTimeout(resolve, 100)); // Adjust time as needed
            waitForAuthCheck(); // Re-check status
        } else {
            if(auth.loggedIn && auth.user !== null){
                store.setCurrentPage(store.currentPageType.mapFeed)
                navigate("/feed");
            }   
            setLoading(false);
            
        }
    };

    waitForAuthCheck();
  }, [auth, navigate, store]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
       e.preventDefault();
        handleLogin(e);
      }
    };
  
    document.body.addEventListener('keypress', handleKeyPress);
    
    return () => {
      document.body.removeEventListener('keypress', handleKeyPress);
    };
  }, [handleLogin]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height:'100%' }}>
        <CircularProgress style={{'color':'#ff24bd'}}/>
        Loading...
      </Box>
    );
  }


  const handleForgot = (e) => {
    store.setCurrentPage(store.currentPageType.forgotPassScreen);
    navigate("/forgotPassword")

  };

  const handleEnterGuest = (event) => {
    store.setCurrentPage(store.currentPageType.mapFeed);
    navigate("/feed");
    auth.guestLogin();
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
                  data-testid="username-field"
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
                  data-testid="password-field"
                  type="password"
                  id="password"
                  style = {launchStyle.rounded_input}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
            </Grid>
            <Grid style={launchStyle.button_container} item xs={12}>
              <Button style={launchStyle.button} onClick= {handleLogin} variant="contained" color="primary" data-testid="login-button">
                Log in
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
