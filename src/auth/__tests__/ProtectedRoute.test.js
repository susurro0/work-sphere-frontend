// src/auth/ProtectedRoute.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
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

  test('redirects to /auth when no token is present', () => {
    // Mock useToken to return no token
    useToken.mockReturnValue({
      getToken: () => ({ token: null }),
    });

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/protected" element={<ProtectedRoute element={<MockComponent />} />} />
          <Route path="/auth" element={<div>Auth Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Auth Page')).toBeInTheDocument();
  });
});
