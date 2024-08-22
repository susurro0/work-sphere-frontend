// src/auth/ProtectedRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';
import useToken from '../hooks/useToken';

const ProtectedRoute = ({ element, ...rest }) => {
  const { getToken, isTokenExpired } = useToken()

  if (!getToken() || isTokenExpired(getToken())) {
    return <Navigate to="/auth?tab=login" />;
  }

  return element;
};

export default ProtectedRoute;
