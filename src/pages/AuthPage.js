import React, { useState, useEffect } from 'react';
import { Typography, Tabs, Tab, Container, Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginForm from '../components/forms/LoginForm';
import SignUpForm from '../components/forms/SignUpForm';

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

const PW_ERROR = 'The password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.';
const PaperStyled = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  width: '100%',
  maxWidth: 400,
  marginTop: theme.spacing(8),
  textAlign: 'center',
  boxShadow: theme.shadows[5],
}));

function AuthPage() {
  const [tab, setTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tabFromQuery = queryParams.get('tab');
    if (tabFromQuery) {
      setTab(tabFromQuery);
    }
  }, [location.search]);

  const validateLogin = (username, password) => {
    const newErrors = {};

    // Validate username
    if (!/^\w+$/.test(username)) {
        newErrors.username = 'Username must be a single word without spaces, whitespace, or special characters.';
    } else if (username.length < 5) {
        newErrors.username = 'Username must be at least 5 characters long.';
    }

    // Validate password
    if (!password) {
        newErrors.password = 'Password is required.';
    } else {
        if (password.length < 8) {
            newErrors.password = PW_ERROR;
        }
        if (!/[A-Z]/.test(password)) {
            newErrors.password = PW_ERROR;
        }
        if (!/[a-z]/.test(password)) {
            newErrors.password = PW_ERROR;
        }
        if (!/[0-9]/.test(password)) {
            newErrors.password = PW_ERROR;
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            newErrors.password = PW_ERROR;
        }
    }

    return newErrors;
};

const validateSignup = (username, email, password, confirmPassword) => {
  const newErrors = {};

  // Validate username
  if (!/^\w+$/.test(username)) {
    newErrors.username = 'Username must be a single word without spaces, whitespace, or special characters.';
  } else if (username.length < 5) {
    newErrors.username = 'Username must be at least 5 characters long.';
  }

  // Validate email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    newErrors.email = 'A valid email is required.';
  }

  // Validate password
  if (!password) {
    newErrors.password = 'Password is required.';
  } else {
    const passwordErrors = [];
    if (password.length < 8) {
      passwordErrors.push('Password must be at least 8 characters long.');
    }
    if (!/[A-Z]/.test(password)) {
      passwordErrors.push('Password must contain at least one uppercase letter.');
    }
    if (!/[a-z]/.test(password)) {
      passwordErrors.push('Password must contain at least one lowercase letter.');
    }
    if (!/[0-9]/.test(password)) {
      passwordErrors.push('Password must contain at least one digit.');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      passwordErrors.push('Password must contain at least one special character.');
    }
    if (passwordErrors.length > 0) {
      newErrors.password = passwordErrors.join(' ');
    }
  }

  // Validate confirm password
  if (confirmPassword === '') {
    newErrors.confirmPassword = 'Confirm password is required.';
  } else if (password !== confirmPassword) {
    newErrors.confirmPassword = 'Passwords do not match.';
  }

  return newErrors;
};



  const handleLoginSubmit = async (username, password) => {
    const validationErrors = validateLogin(username, password);
    if (Object.keys(validationErrors).length) {
      setErrors({ ...errors, ...validationErrors });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Uncomment and adjust the API call as needed
      // const response = await postData('/login', { username, password });
      console.log('Login successful');
      navigate('/');
    } catch (error) {
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
      // const response = await postData('/signup', { username, email, password });
      console.log('Sign-up successful');
      navigate('/');
    } catch (error) {
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
