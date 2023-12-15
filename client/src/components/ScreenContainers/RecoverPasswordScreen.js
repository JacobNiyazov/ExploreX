import React, { useState, useContext, useEffect, useCallback } from 'react';
import launchStyle from '../StyleSheets/launchStyle'; 
import image from '../images/splashImage.png';
import { GlobalStoreContext } from '../../store';
import AuthContext from '../../auth'; 
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import {
  Typography,
  Button,
  Container,
  Grid,
  Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';


const RecoverPasswordScreen = () => {
  const [passwordConfirm, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');

  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleReset = useCallback((e) => {
    // store.setCurrentPage(store.currentPageType.mapFeed);
    let urlString = window.location.href;
    const url = new URL(urlString);
    const searchParams = new URLSearchParams(url.search);
    const token = searchParams.get('token');
    const id = searchParams.get('id');

    if (password.length < 8){
      store.displayModal(<div>
        <h4 style={{ color: '#f44336', margin: '0', fontSize: '1.1rem' }}>Try Again</h4>
        <p style={{ margin: '5px 0', fontSize: '1rem', width:'120%' }}> Password too weak. We require 8 characters or more. </p>
      </div>, false);
    }

    else if (password !== passwordConfirm) {
      store.displayModal(<div>
        <h4 style={{ color: '#f44336', margin: '0', fontSize: '1.1rem' }}>Try Again</h4>
        <p style={{ margin: '5px 0', fontSize: '1rem', width:'120%' }}> Passwords do not match, try again. </p>
      </div>, false);
    }
    else{
      auth.resetUserPassword(id,token,password)
      .then( 
        (val) => {
          navigate("/login");
          store.setModal(<div>
            <h4 style={{ color: 'green', margin: '0', fontSize: '1.1rem' }}>Success!</h4>
            <p style={{ margin: '5px 0', fontSize: '1rem' }}>New Password Set Successfully. Please login again.</p>
          </div>, store.currentPageType.login, false);
        })
      .catch(
        (error) => store.displayModal(<div>
          <h4 style={{ color: '#f44336', margin: '0', fontSize: '1.1rem' }}>Try Again</h4>
          <p style={{ margin: '5px 0', fontSize: '1rem', width:'120%' }}>{error.response.data.errorMessage}</p>
        </div>, false));
    }
     
    // alert("TRY")
  }, [auth, password, passwordConfirm, store, navigate]);


  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleReset(e);
      }
    };
    document.body.addEventListener('keypress', handleKeyPress);
    
    return () => {
      document.body.removeEventListener('keypress', handleKeyPress);
    };
  }, [handleReset]);


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
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height:'100%' }}>
        <CircularProgress style={{'color':'#ff24bd'}}/>
        Loading...
      </Box>
    );
  }

  const handleLogin = (e) => {
    e.preventDefault();
    store.setCurrentPage(store.currentPageType.login);
    navigate("/login");

  };

  
  return (
    <div style = {launchStyle.container}>
      <div style = {launchStyle.leftSide}>
        <Container>
        <form>
          <Typography style={launchStyle.header_text} variant="h5">Reset Password</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>New Password:</Typography>
                <input
                  type="password"
                  id="recover"
                  value={password}
                  style = {launchStyle.rounded_input}
                  onChange={(e) => setPassword(e.target.value)}
                />
            </Grid>
            <Grid style={launchStyle.password_container} item xs={12}>
              <Typography style={launchStyle.password}>Confirm Password:</Typography>
              <input
                  type="password"
                  id="recoverConfirm"
                  style = {launchStyle.rounded_input}
                  value={passwordConfirm}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </Grid>
            <Grid style={launchStyle.button_container} item xs={12}>
              <Button style={launchStyle.button} onClick= {handleReset} variant="contained" color="primary">
                Reset
              </Button>
              <Link style={launchStyle.forgot} onClick={handleLogin}>Return to Login</Link>

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

export default RecoverPasswordScreen;
