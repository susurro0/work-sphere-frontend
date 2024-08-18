import React from 'react';
import { Typography } from '@mui/material';
import BaseLayout from '../layout/BaseLayout'; 

const Home = () => (
  <BaseLayout>
    <Typography variant="h4" data-testid="home-testid">Home Page</Typography>
    <p>This is the Home page content.</p>
  </BaseLayout>
);

export default Home;
