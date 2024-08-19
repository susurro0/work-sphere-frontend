import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Sidebar from './sidebar/Sidebar'; // Adjust the import path if needed
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/actions/authActions';
import useToken from '../hooks/useToken';
import TokenChecker from '../auth/TokenChecker';

const MainContent = styled('main')(({ theme }) => ({
  marginLeft: 240, // Width of the sidebar
  marginTop: 58, // Height of the AppBar
  padding: theme.spacing(3),
  height: 'calc(100vh - 58px)', // Adjust based on AppBar height
  overflow: 'auto',
  width: 'calc(100% - 240px)', // Adjust width to account for sidebar

}));

const BaseLayout = ({ children, showSidebar = true }) => {
    const navigate = useNavigate();
    const { token, removeToken } = useToken(); // Get token and removeToken function

    const handleLoginClick = () => {
      navigate('/auth?tab=login');
    };

    const handleSignupClick = () => {
      navigate('/auth?tab=signup');
    };

    const handleLogoutClick = () => {
      removeToken();
      logout(); 
      navigate('/auth?tab=login'); 
    };
    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <TokenChecker>

          <AppBar position="fixed" style={{ width: '100%', zIndex: 1200 }}>
            <Toolbar>
              <Typography variant="h6" style={{ flexGrow: 1 }}>
                My App
              </Typography>
              {token ? (
              <Button color="inherit" onClick={handleLogoutClick}>
                Logout
              </Button>
            ) : (
              <>
                <Button color="inherit" onClick={handleLoginClick}>
                  Login
                </Button>
                <Button color="inherit" onClick={handleSignupClick}>
                  Sign Up
                </Button>
              </>
            )}
            </Toolbar>
          </AppBar>

          {showSidebar && <Sidebar />}

          <MainContent>
            {children}
          </MainContent>
        </TokenChecker>

      </div>
    );
};

export default BaseLayout;
