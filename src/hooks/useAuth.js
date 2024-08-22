import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useToken from '../hooks/useToken';
import { login } from '../services/apiService';

const useAuth = () => {
  const navigate = useNavigate();
  const { storeToken, isTokenExpired } = useToken();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (localStorage.getItem('jwtToken') && !isTokenExpired(localStorage.getItem('jwtToken'))) {
      navigate('/');
    }
  }, [navigate, isTokenExpired]);

  const handleLogin = async (username, password) => {
    setLoading(true);
    setErrors({});

    try {
      const response = await login(username, password);
      const { username: uname, email, role, access_token: token, token_type: tokenType } = response;
      const user = {
        username: uname,
        email: email,
        role: role
      };
      storeToken(token);
      // Dispatch login success action or handle user state update
      navigate('/');
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    errors,
    handleLogin,
  };
};

export default useAuth;
