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

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);


  const handleRecover = (e) => {
    // store.setModal("Password recovery email sent","Login");
    auth.recoverPassword(email);
  };

  const tempHandler = (e) => {
    store.setCurrentPage(store.currentPageType.resetPasswordScreen);  
  };

  const handleLogin = (e) => {
    store.setCurrentPage(store.currentPageType.login);  
  };
  
  return (
    <div style = {launchStyle.container}>
      <div style = {launchStyle.leftSide}>
        <Container>
        <form onSubmit={handleLogin}>
          <Typography style={launchStyle.header_text}>Forgot your password?</Typography>
          <Typography style={launchStyle.sub_header_text} >No worries, it isn’t the end of the world.</Typography>

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
            <Grid style={launchStyle.button_container} item xs={12}>

              <Button style={launchStyle.button} onClick = {handleRecover} variant="contained">
                Recover
              </Button>
              <Button style={launchStyle.button} onClick = {tempHandler} variant="contained">
                temp password reset
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

export default ForgotPasswordScreen;
