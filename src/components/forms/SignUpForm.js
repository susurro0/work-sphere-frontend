// src/components/forms/SignUpForm.js

import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const SignUpForm = ({ onSubmit, loading, errors }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(username, email, password, confirmPassword);
  };

  return (
    <form noValidate autoComplete="off" style={{ width: '100%' }} onSubmit={handleSubmit}>
      <TextField
        inputProps={{ 'data-testid': 'username-input-test-id' }}
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
        inputProps={{ 'data-testid': 'email-input-test-id' }}
        label="Email"
        type="email"
        variant="outlined"
        fullWidth
        margin="normal"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        inputProps={{ 'data-testid': 'password-test-id' }}
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
      <TextField
        inputProps={{ 'data-testid': 'confirm-password-test-id' }}
        label="Confirm Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword}
      />
      {errors.general && <Typography color="error">{errors.general}</Typography>}
      <Box mt={2}>
        <Button data-testid='signup-button-test-id' variant="contained" color="primary" fullWidth type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </Button>
      </Box>
    </form>
  );
};

export default SignUpForm;
