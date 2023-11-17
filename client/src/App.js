// client/src/App.js
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import theme from './theme';
//import axios from 'axios';
import AppBanner from './components/AppBanner';
import Footer from './components/Footer';
import Navigator from './components/Navigator.js';
import UniversalModal from './components/UniversalModal.js';

import { AuthContextProvider } from './auth'
import { GlobalStoreContextProvider } from './components/store'

const MainLayout = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
});

function App() {
  return (
    <AuthContextProvider>
      <GlobalStoreContextProvider>
        <MainLayout>
          <ThemeProvider theme={theme}>
            <AppBanner />
            <div style={{flexGrow: 1}}>
              <UniversalModal/>
              <Navigator />
            </div>
            <Footer />
          </ThemeProvider>
        </MainLayout>
      </GlobalStoreContextProvider>
    </AuthContextProvider>
  );
}

export default App;

