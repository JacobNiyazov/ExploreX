// client/src/App.js
import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import theme from './theme';
import axios from 'axios';
import AppBanner from './components/AppBanner';
import Footer from './components/Footer';
import Navigator from './components/Navigator.js';
import ModalScreen from './components/ScreenContainers/ModalScreen.js';

import { GlobalStoreContextProvider } from './components/store'

const MainLayout = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
});

function App() {
  return (
    <GlobalStoreContextProvider>
      <MainLayout>
        <ThemeProvider theme={theme}>
          <AppBanner />
          <div style={{flexGrow: 1}}>
            <ModalScreen/>
            <Navigator />
          </div>
          <Footer />
        </ThemeProvider>
      </MainLayout>
    </GlobalStoreContextProvider>
  );
}

export default App;
