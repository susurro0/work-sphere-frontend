import React from 'react';
import { Link } from 'react-router-dom'
import { List, ListItem, ListItemText, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

const SidebarContainer = styled('div')(({ theme }) => ({
  width: 240, // Adjust this value based on your design
  height: 'calc(100vh - 58px)', // Ensure sidebar height accounts for the AppBar height
  position: 'fixed',
  top: 58, // Ensure sidebar starts below the AppBar; adjust this value to match the height of the AppBar
  left: 0,
  backgroundColor: theme.palette.background.paper,
  overflowY: 'auto', // Allows scrolling if content exceeds the viewport height
  boxShadow: theme.shadows[5],
  zIndex: 1100, // Ensure this is lower than AppBar
}));

const Sidebar = () => {
  return (
    <SidebarContainer>
      <List>
        <ListItem component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to="/pathfinder">
          <ListItemText primary="Pathfinder" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary="About" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary="Contact" />
        </ListItem>
      </List>
    </SidebarContainer>
  );
};

export default Sidebar;
