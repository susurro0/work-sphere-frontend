// src/auth/ProtectedRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';
import useToken from '../hooks/useToken';

const ProtectedRoute = ({ element, ...rest }) => {
  const { getToken } = useToken()

  if (!getToken()) {
    return <Navigate to="/auth" />;
  }

  return element;
};

export default ProtectedRoute;
