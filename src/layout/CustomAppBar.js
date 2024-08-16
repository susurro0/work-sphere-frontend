import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const CustomAppBar = () => (
  <AppBar position="fixed" style={{ width: '100%', zIndex: 1200 }}>
    <Toolbar>
      <Typography variant="h6" style={{ flexGrow: 1 }}>
        My App
      </Typography>
      <Button color="inherit">Login</Button>
    </Toolbar>
  </AppBar>
);

export default CustomAppBar;
