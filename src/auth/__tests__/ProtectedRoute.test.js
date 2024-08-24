// src/auth/ProtectedRoute.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';
import useToken from '../../hooks/useToken';

// Mock the useToken hook
jest.mock('../../hooks/useToken');

const MockComponent = () => <div>Protected Content</div>;

describe('ProtectedRoute Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  test('renders the protected component when a token is present', () => {
    // Mock useToken to return a token
    useToken.mockReturnValue({
      getToken: () => ({ token: 'mockToken' }),
      isTokenExpired: jest.fn(() => false)

    });

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/protected" element={<ProtectedRoute element={<MockComponent />} />} />
          <Route path="/auth" element={<div>Auth Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  test('renders the login  component when a token is expired', () => {
    // Mock useToken to return a token
    useToken.mockReturnValue({
      getToken: () => ({ token: 'mockToken' }),
      isTokenExpired: jest.fn(() => true)

    });

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/protected" element={<ProtectedRoute element={<MockComponent />} />} />
          <Route path="/auth" element={<div>Auth Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });
  test('redirects to /auth when no token is present', async () => {
  
    useToken.mockReturnValue({
      getToken: () => ({ token: null }),
      isTokenExpired: jest.fn(() => true)

    });

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/protected" element={<ProtectedRoute element={<MockComponent />} />} />
          <Route path="/auth" element={<div>Auth Page</div>} />
        </Routes>
      </MemoryRouter>
    );
    
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    
  });
});



