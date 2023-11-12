// client/src/App.js
import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import axios from 'axios';
import AppBanner from './components/AppBanner';
import Footer from './components/Footer';
import Navigator from './components/Navigator.js';
import ModalScreen from './components/ScreenContainers/ModalScreen.js';

import { GlobalStoreContextProvider } from './components/store'

import MapFeed from './components/ScreenContainers/MapFeed.js';
import { Container } from '@mui/material';

function App() {
  return (
    <GlobalStoreContextProvider>
      <div>
        <ThemeProvider theme={theme}>
          <AppBanner />
          <ModalScreen/>
          <Navigator />
          <Footer />
        </ThemeProvider>
      </div>
    </GlobalStoreContextProvider>
  );
}

export default App;
