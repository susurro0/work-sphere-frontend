// App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import useToken from '../hooks/useToken';

// Mock useToken hook
jest.mock('../hooks/useToken', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('App Routing', () => {
  beforeEach(() =>{
    useToken.mockReturnValue({
      token: null,
      storeToken: jest.fn(),
      getToken: jest.fn(),
      removeToken: jest.fn(),
      isTokenExpired: jest.fn(() => false)
    });
  }); 
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
