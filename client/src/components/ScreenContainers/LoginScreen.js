import React, { useState } from 'react';
import launchStyle from '../StyleSheets/launchStyle'; 

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    // Replace this with your actual authentication logic
    if (username === 'yourUsername' && password === 'yourPassword') {
      setLoggedIn(true);
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div>

        <form onSubmit={handleLogin}>
          <h2>Welcome, Map Lovers</h2>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              style = {rounded_input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button type="submit">Sign in</button>
          </div>
          <div>
            <button type="submit">Log in as guest</button>
          </div>
        </form>
    </div>
  );
};

export default LoginPage;
