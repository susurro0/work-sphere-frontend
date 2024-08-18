// src/components/forms/LoginForm.js

import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const LoginForm = ({ onSubmit, loading, errors }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(username, password);
  };

  return (
    <form noValidate autoComplete="off" style={{ width: '100%' }} onSubmit={handleSubmit}>
      <TextField
        inputProps={{ 'data-testid': 'login-username-input-test-id' }}
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={!!errors.username}
        helperText={errors.username}
      />
      <TextField
        inputProps={{ 'data-testid': 'login-password-input-test-id' }}
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!errors.password}
        helperText={errors.password}
      />
      {errors.general && <Typography color="error">{errors.general}</Typography>}
      <Box mt={2}>
        <Button variant="contained" color="primary" fullWidth type="submit" disabled={loading} data-testid="login-button-test-id">
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </Box>
    </form>
  );
};

export default LoginForm;
