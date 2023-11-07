// client/src/App.js
import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import axios from 'axios';
import AppBanner from './components/AppBanner';
import Footer from './components/Footer';
import MapFeed from './components/MapFeed';
import { Container } from '@mui/material';

function App() {
  const maps = [
    {
      title: 'Map 1',
      author: 'Author 1',
      likes: 10,
      dislikes: 2,
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      title: 'Map 2',
      author: 'Author 2',
      likes: 20,
      dislikes: 8,
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      title: 'Map 2',
      author: 'Author 2',
      likes: 20,
      dislikes: 8,
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      title: 'Map 2',
      author: 'Author 2',
      likes: 20,
      dislikes: 8,
      imageUrl: 'https://via.placeholder.com/150',
    },
  ];

  return (
    <div>
      <ThemeProvider theme={theme}>
        <AppBanner />
        <Container>
          <MapFeed maps={maps} />
        </Container>
        <Footer />
      </ThemeProvider>
      
    </div>
  );
}

export default App;