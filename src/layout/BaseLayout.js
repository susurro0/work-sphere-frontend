import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Sidebar from './sidebar/Sidebar'; // Adjust the import path if needed
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const MainContent = styled('main')(({ theme }) => ({
  marginLeft: 240, // Width of the sidebar
  marginTop: 58, // Height of the AppBar
  padding: theme.spacing(3),
  height: 'calc(100vh - 58px)', // Adjust based on AppBar height
  overflow: 'auto',
}));

const BaseLayout = ({ children, showSidebar = true }) => (
  <div style={{ display: 'flex', height: '100vh' }}>
    <AppBar position="fixed" style={{ width: '100%', zIndex: 1200 }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          My App
        </Typography>
        <Button color="inherit" component={Link} to="/login">
          Login
        </Button>
      </Toolbar>
    </AppBar>

    {showSidebar && <Sidebar />}

    <MainContent>
      {children}
    </MainContent>
  </div>
);

export default BaseLayout;
