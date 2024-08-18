// App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';


describe('App Routing', () => {
  test('renders Home component at / route', () => {
    render(
        <App />
    );
    
    const homeHeading = screen.getByRole('heading', { name: /home/i });
    expect(homeHeading).toBeInTheDocument();  });

  test('renders Pathfinder component at /pathfinder route', () => {
    render(
        <App />
    );
    
    expect(screen.getByText(/Pathfinder/i)).toBeInTheDocument();
  });

});
