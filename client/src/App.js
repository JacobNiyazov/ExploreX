// client/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppBanner from './components/AppBanner';
import Footer from './components/Footer';
import Navigator from './components/Navigator.js';
import { GlobalStoreContextProvider } from './components/store'


function App() {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch items from the backend when the component mounts
    console.log(process.env.REACT_APP_SERVER_URL)
    axios.get(process.env.REACT_APP_SERVER_URL + '/api/items')
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddItem = () => {
    // Send a PUT request to add a new item
    axios.put(process.env.REACT_APP_SERVER_URL + '/api/items', { name: inputValue })
      .then((response) => {
        setItems([...items, response.data]);
        setInputValue('');
      })
      .catch((error) => {
        console.error('Error adding item:', error);
      });
  };

  return (
    <GlobalStoreContextProvider>
      <div>
        <AppBanner />
        <Navigator />
        <Footer />
      </div>
    </GlobalStoreContextProvider>
  );
}

export default App;