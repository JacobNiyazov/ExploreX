import React, { useState, useContext, useEffect } from 'react';
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

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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
  const handleRecover = (e) => {
    auth.recoverPassword(email).then( 
      (val) => {
        navigate("/login");
        
        store.setModal(<div>
          <h4 style={{ color: 'green', margin: '0', fontSize: '1.1rem' }}>Woosh...</h4>
          <p style={{ margin: '5px 0', fontSize: '1rem' }}>Please check your email for a password recovery link.</p>
        </div>, store.currentPageType.login, false);
      })
    .catch(
      (error) => store.displayModal(<div>
        <h4 style={{ color: '#f44336', margin: '0', fontSize: '1.1rem' }}>Try Again</h4>
        <p style={{ margin: '5px 0', fontSize: '1rem' }}>{error.response.data.errorMessage}</p>
      </div>, false));
  };


  const handleLogin = (e) => {
    store.setCurrentPage(store.currentPageType.login);  
    navigate("/login");
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
