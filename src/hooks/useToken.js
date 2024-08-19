// src/hooks/useToken.js
import { useState } from 'react';

import { jwtDecode } from 'jwt-decode';


// Define the token management hook
const useToken = () => {
  // State to hold the current token
  const [token, setToken] = useState(() => localStorage.getItem('jwtToken'));

  // Function to store the token
  const storeToken = (newToken) => {
    localStorage.setItem('jwtToken', newToken);
    setToken(newToken);
  };

  // Function to get the token
  const getToken = () => {
    return localStorage.getItem('jwtToken');
  };

  // Function to remove the token
  const removeToken = () => {
    localStorage.removeItem('jwtToken');
    setToken(null);
  };

  const isTokenExpired = (token) => {
    if (!token) return true;
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000; // Current time in seconds
    return decoded.exp < now;
  };

  // Return functions and state
  return {
    token,
    storeToken,
    getToken,
    removeToken,
    isTokenExpired
  };
};

export default useToken;
