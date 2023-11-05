// client/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppBanner from './components/AppBanner';
import Footer from './components/Footer';

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
    <div>
      <AppBanner />
      <h1>ExploreX</h1>
      <input
        type="text"
        placeholder="Enter an item"
        value={inputValue}
        onChange={handleInputChange}
        name = "textField"
      />
      <button name = "backend" type = "submit" onClick={handleAddItem}>Add</button>
      <ul>
        {items.map((item) => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
      <Footer />
    </div>
  );
}

export default App;
