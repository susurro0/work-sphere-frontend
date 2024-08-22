// src/auth/TokenChecker.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useToken from '../hooks/useToken'; // Import the useToken hook
import { logout } from '../store/actions/authActions';

const TokenChecker = ({ children }) => {
  const { isTokenExpired, removeToken } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (isTokenExpired(localStorage.getItem('jwtToken'))) {
      removeToken();
      logout();
      navigate('/auth?tab=login'); 
    }
  }, [localStorage.getItem('jwtToken'), isTokenExpired, removeToken, navigate]);

  return <>{children}</>;
};

export default TokenChecker;
