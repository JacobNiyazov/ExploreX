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
import { useNavigate } from 'react-router-dom';


const RecoverPasswordScreen = () => {
  const [passwordConfirm, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');

  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    store.setCurrentPage(store.currentPageType.login);
    navigate("/login");

  };


  const handleReset = (event) => {
    // store.setCurrentPage(store.currentPageType.mapFeed);
    let urlString = window.location.href;
    const url = new URL(urlString);
    const searchParams = new URLSearchParams(url.search);
    const token = searchParams.get('token');
    const id = searchParams.get('id');

    if (password !== passwordConfirm) {
      store.displayModal(<div>
        <h4 style={{ color: '#f44336', margin: '0', fontSize: '1.1rem' }}>Try Again</h4>
        <p style={{ margin: '5px 0', fontSize: '1rem', width:'120%' }}> Passwords do not match, try again. </p>
      </div>, false);
    }
    else{
      auth.resetUserPassword(id,token,password)
      .then( 
        (val) => {
          store.setCurrentPage(store.currentPageType.mapFeed);
          navigate("/feed");
        })
      .catch(
        (error) => store.displayModal(<div>
          <h4 style={{ color: '#f44336', margin: '0', fontSize: '1.1rem' }}>Try Again</h4>
          <p style={{ margin: '5px 0', fontSize: '1rem', width:'120%' }}>{error.response.data.errorMessage}</p>
        </div>, false));
    }
     
    // alert("TRY")
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
