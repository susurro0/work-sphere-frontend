// src/auth/ProtectedRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';
import useToken from '../hooks/useToken';

const ProtectedRoute = ({ element, ...rest }) => {
  const { getToken } = useToken()
  const {token} = getToken();  

  if (!token) {
    return <Navigate to="/auth" />;
  }

  return element;
};

export default ProtectedRoute;
