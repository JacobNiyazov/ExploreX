import React, { useState, useContext } from 'react';
import launchStyle from '../StyleSheets/launchStyle'; 
import image from '../images/splashImage.png';
import { GlobalStoreContext } from '../store';
import AuthContext from '../../auth'; 

import {
  Typography,
  Button,
  Container,
  Grid,
  Link,
} from '@mui/material';
const RecoverPasswordScreen = () => {
  const [passwordConfirm, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');

  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);


  const handleLogin = (e) => {
    e.preventDefault();
    store.setCurrentPage(store.currentPageType.login);


  };


  const handleReset = (event) => {
    // store.setCurrentPage(store.currentPageType.mapFeed);
    let userId = "6556363042ac2c664845227b"
    let token = "126de3f85a98646dc950ac8cfba9a1d32e27965b7d825073ac1927f116ceda0c"
    let password = "coolman123"
    auth.resetUserPassword(userId, token, password);
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
                  type="text"
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
