import React, { useState, useEffect } from 'react';
import { Typography, Tabs, Tab, Container, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginForm from '../components/forms/LoginForm';
import SignUpForm from '../components/forms/SignUpForm';
import { useStore } from '../store/contexts/StoreContext';
import { login, postData } from '../services/apiService';
import useToken from '../hooks/useToken';
import { validateLogin, validateSignup } from '../utils/authValidation'; // Import validation functions

const CenteredContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  marginTop: '10%',
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(2),
  position: 'relative',
  overflow: 'hidden',
}));

const PaperStyled = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  width: '100%',
  maxWidth: 400,
  marginTop: theme.spacing(8),
  textAlign: 'center',
  boxShadow: theme.shadows[5],
}));

function AuthPage() {

  const { state, dispatch, authActions } = useStore();
  const [tab, setTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { storeToken, isTokenExpired } = useToken();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tabFromQuery = queryParams.get('tab');
    if (tabFromQuery) {
      setTab(tabFromQuery);
    }
  }, [location.search]);

  useEffect(() => {
    if (localStorage.getItem('jwtToken') && !isTokenExpired(localStorage.getItem('jwtToken'))) {
      navigate('/');
    }
  }, [localStorage.getItem('jwtToken'), navigate]);

  const handleLoginSubmit = async (username, password) => {
    dispatch(authActions.setLoading());
    const validationErrors = validateLogin(username, password);
    if (Object.keys(validationErrors).length) {
      setErrors({ ...errors, ...validationErrors });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await login(username, password);
      console.log(response);
      const { username: uname, email, role, access_token: token, token_type: tokenType } = response;
      const user = {
        username: uname,
        email: email,
        role: role
      };
      storeToken(token);
      dispatch(authActions.loginSuccess(user, token, tokenType));
      navigate('/');
    } catch (error) {
      dispatch(authActions.setError(`Login failed: ${error}.`));
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpSubmit = async (username, email, password, confirmPassword) => {
    const validationErrors = validateSignup(username, email, password, confirmPassword);
    if (Object.keys(validationErrors).length) {
      setErrors({ ...errors, ...validationErrors });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Uncomment and adjust the API call as needed
      const response = await postData('/register', { username, email, password });
      navigate('/auth?tab=login');
    } catch (error) {
      dispatch(authActions.setError(`Sign-up failed. ${error}.`));
      setErrors({ general: 'Sign-up failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
    navigate(`/auth?tab=${newValue}`);
  };

  return (
    <CenteredContainer>
      <PaperStyled>
        <Typography variant="h4" gutterBottom data-testid="auth-tab-title-testid">
          {tab === 'login' ? 'Login' : 'Sign Up'}
        </Typography>
        <Tabs value={tab} onChange={handleTabChange} centered>
          <Tab label="Login" value="login" data-testid="login-tab-testid"/>
          <Tab label="Sign Up" value="signup" data-testid="signup-tab-testid"/>
        </Tabs>
        {tab === 'login' ? (
          <LoginForm onSubmit={handleLoginSubmit} loading={loading} errors={errors} />
        ) : (
          <SignUpForm onSubmit={handleSignUpSubmit} loading={loading} errors={errors} />
        )}
      </PaperStyled>
    </CenteredContainer>
  );
}

export default AuthPage;
