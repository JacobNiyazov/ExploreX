import React, { useState, useContext, useEffect, useCallback } from 'react';
import launchStyle from '../StyleSheets/launchStyle'; 
import image from '../images/splashImage.png';
import { GlobalStoreContext } from '../../store';
import AuthContext from '../../auth'; 
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import {
  Typography,
  Button,
  Container,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleRegister = useCallback((e) => {
    e.preventDefault();
    //alert(email + " " + username  + " " + password + " " + confirmPassword)
    auth.registerUser(email, username,password,confirmPassword)
    .then((val) => {
      navigate("/feed");

      store.setModal(<div>
        <h4 style={{ color: 'green', margin: '0', fontSize: '1.1rem' }}>Welcome to ExploreX!</h4>
        <p style={{ margin: '5px 0', fontSize: '1rem' }}>Not sure where to get started? Check out the FAQ found in the profile menu!</p>
      </div>, store.currentPageType.mapFeed, false);
    })
    .catch(
      (error) => {
        store.displayModal(<div>
          <h4 style={{ color: '#f44336', margin: '0', fontSize: '1.1rem' }}>Try Again</h4>
          <p style={{ margin: '5px 0', fontSize: '1rem', width:'120%' }}>{error.response.data.errorMessage}</p>
        </div>, false);
      } 
    )
  }, [auth, email, confirmPassword, username, password, store, navigate]);
  

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
        handleRegister(e);
      }
    };
    document.body.addEventListener('keypress', handleKeyPress);
    
    return () => {
      document.body.removeEventListener('keypress', handleKeyPress);
    };
  }, [handleRegister]);


  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height:'100%' }}>
        <CircularProgress style={{'color':'#ff24bd'}}/>
        Loading...
      </Box>
    );
  }

  
  return (
    <div style = {launchStyle.container}>
      <div style = {launchStyle.leftSide}>
        <Container>
        <form onSubmit={handleRegister}>
          <Typography style={launchStyle.header_text}>Let's Get Started</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>Email:</Typography>
                <input
                  type="text"
                  id="email"
                  value={email}
                  style = {launchStyle.rounded_input}
                  onChange={(e) => setEmail(e.target.value)}
                />
            </Grid>
            <Grid style={launchStyle.password_container} item xs={129}>
              <Typography>Username:</Typography>
                <input
                  type="text"
                  id="username"
                  value={username}
                  style = {launchStyle.rounded_input}
                  onChange={(e) => setUsername(e.target.value)}
                />
            </Grid>
            <Grid style={launchStyle.password_container} item xs={129}>
              <Typography>Password:</Typography>
              <input
                  type="password"
                  id="password"
                  style = {launchStyle.rounded_input}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
            </Grid>
            <Grid style={launchStyle.password_container} item xs={12}>
              <Typography style={launchStyle.confirmPassword}>Confirm Password:</Typography>
              <input
                  type="password"
                  id="passwordConfirm"
                  style = {launchStyle.rounded_input}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </Grid>
            <Grid style={launchStyle.button_container} item xs={12}>
              <Button style={launchStyle.button} variant="contained" type="submit">
                Create Account
              </Button>

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

export default RegisterScreen;