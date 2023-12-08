// client/src/App.js
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import theme from './theme';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

//import axios from 'axios';
import AppBanner from './components/AppBanner';
import Footer from './components/Footer';

import LoginScreen from './components/ScreenContainers/LoginScreen.js';
import RegisterScreen from './components/ScreenContainers/RegisterScreen.js';
import RecoverPasswordScreen from './components/ScreenContainers/RecoverPasswordScreen.js';
import ForgotPasswordScreen from './components/ScreenContainers/ForgotPasswordScreen.js';
import FAQScreen from './components/ScreenContainers/FAQScreen.js';
import EditScreen from './components/ScreenContainers/EditMapScreen.js';
import ProfileScreen from './components/ScreenContainers/ProfileScreen.js'
import EditAccountScreen from './components/ScreenContainers/EditAccountScreen.js'
import MapFeed from './components/ScreenContainers/MapFeed.js';
import PublicMapView from './components/ScreenContainers/PublicMapView.js';

import UniversalModal from './components/UniversalModal'

import { AuthContextProvider } from './auth'
import { GlobalStoreContextProvider } from './store'
import { GlobalMapEditContextProvider } from './mapEdit'

const MainLayout = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
});

function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
          <GlobalStoreContextProvider>
            <GlobalMapEditContextProvider> 
            <MainLayout>
              <ThemeProvider theme={theme}>
                <AppBanner />
                <div style={{flexGrow: 1}}>
                  <UniversalModal/>
                  <Routes>
                    <Route path="/login/" element= {<LoginScreen/>} />
                    <Route path="/register/" element= {<RegisterScreen/>}/>
                    <Route path="/forgotPassword/" element= {<ForgotPasswordScreen/>}/>
                    <Route path="/FAQ/" element= {<FAQScreen/>} />
                    <Route path="/feed/" element= {<MapFeed/>} />
                    <Route path="/profile/" element= {<ProfileScreen/>}/>
                    <Route path="/editMap/" element= {<EditScreen/>}/>
                    <Route path="/editAccount/" element= {<EditAccountScreen/>}/>
                    <Route path="/passwordReset/" element= {<RecoverPasswordScreen/>}/>
                    <Route path="/map/" element= {<PublicMapView/>}/>
                    <Route path="/*" element= {<Navigate to='/login' />} />
                </Routes>
                </div>
                <Footer />
              </ThemeProvider>
            </MainLayout>
            </GlobalMapEditContextProvider>
          </GlobalStoreContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;

