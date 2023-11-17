import React, { useState, useContext } from 'react';
import launchStyle from '../StyleSheets/launchStyle'; 
import image from '../images/splashImage.png';
import { GlobalStoreContext } from '../../store';
import {
  Typography,
  Button,
  Container,
  Grid,
} from '@mui/material';
const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { store } = useContext(GlobalStoreContext);

  
  const handleRegister = (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      const passwordsNotMatchingMessage = (
        <div>
            <h4 style={{ color: '#f44336', margin: '0', fontSize: '1.1rem' }}>Passwords Do Not Match</h4>
            <p style={{ margin: '5px 0', fontSize: '1rem' }}>The entered passwords do not match. Please try again.</p>
        </div>
      );  
      store.displayModal(passwordsNotMatchingMessage, false);
    }
    else{
      const welcomeMessage = (
        <div>
            <h4 style={{ color: 'green', margin: '0', fontSize: '1.1rem' }}>Welcome to ExploreX!</h4>
            <p style={{ margin: '5px 0', fontSize: '1rem' }}>Verify your email and then log in here.</p>
        </div>
      );  
      store.setModal(welcomeMessage,"Login",false);
    }

  }

  
  return (
    <div style = {launchStyle.container}>
      <div style = {launchStyle.leftSide}>
        <Container>
        <form onSubmit={handleRegister}>
          <Typography style={launchStyle.header_text}>Let's Get Started</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>Username or email:</Typography>
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
