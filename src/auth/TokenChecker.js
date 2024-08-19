// src/auth/TokenChecker.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useToken from '../hooks/useToken'; // Import the useToken hook
import { logout } from '../store/actions/authActions';

const TokenChecker = ({ children }) => {
  const { token, isTokenExpired, removeToken } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (isTokenExpired(token)) {
      removeToken();
      logout();
      navigate('/auth?tab=login'); 
    }
  }, [token, isTokenExpired, removeToken, navigate]);

  return <>{children}</>;
};

export default TokenChecker;
