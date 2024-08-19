import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import BaseLayout from '../BaseLayout';
import useToken from '../../hooks/useToken'; // Adjust the import path for your useToken hook

// Mock useToken hook
jest.mock('../../hooks/useToken', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock navigate function
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('BaseLayout', () => {
  let navigate;

  beforeEach(() => {
    navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
  });

  it('renders correctly with sidebar and no token', () => {
    useToken.mockReturnValue({
      token: null,
      storeToken: jest.fn(),
      getToken: jest.fn(),
      removeToken: jest.fn(),
      isTokenExpired: jest.fn(() => false)
    });

    render(
      <MemoryRouter>
        <BaseLayout showSidebar={true}>
          <div>Test Content</div>
        </BaseLayout>
      </MemoryRouter>
    );

    // Check if the AppBar and title are rendered
    expect(screen.getByText('My App')).toBeInTheDocument();

    // Check if the Login and Sign Up buttons are rendered
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();

    // Check if the Sidebar is rendered
    expect(screen.getByText('Home')).toBeInTheDocument(); // Assuming Home is in the Sidebar

    // Check if the main content area is rendered
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders Logout button when a token is present', () => {
    useToken.mockReturnValue({
      token: 'mock-token',
      storeToken: jest.fn(),
      getToken: jest.fn(),
      removeToken: jest.fn(),
      isTokenExpired: jest.fn(() => false)
    });

    render(
      <MemoryRouter>
        <BaseLayout showSidebar={true}>
          <div>Test Content</div>
        </BaseLayout>
      </MemoryRouter>
    );

    // Check if the Logout button is rendered
    expect(screen.getByText('Logout')).toBeInTheDocument();

    // Check that Login and Sign Up buttons are not rendered
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
    expect(screen.queryByText('Sign Up')).not.toBeInTheDocument();
  });

  it('navigates to login when Login button is clicked', () => {
    useToken.mockReturnValue({
      token: null,
      storeToken: jest.fn(),
      getToken: jest.fn(),
      removeToken: jest.fn(),
      isTokenExpired: jest.fn(() => false)

    });

    render(
      <MemoryRouter>
        <BaseLayout>
          <div>Test Content</div>
        </BaseLayout>
      </MemoryRouter>
    );

    // Click the Login button
    fireEvent.click(screen.getByText('Login'));

    // Check if navigate was called with the correct path
    expect(navigate).toHaveBeenCalledWith('/auth?tab=login');
  });

  it('navigates to signup when Sign Up button is clicked', () => {
    useToken.mockReturnValue({
      token: null,
      storeToken: jest.fn(),
      getToken: jest.fn(),
      removeToken: jest.fn(),
      isTokenExpired: jest.fn(() => false)

    });

    render(
      <MemoryRouter>
        <BaseLayout>
          <div>Test Content</div>
        </BaseLayout>
      </MemoryRouter>
    );

    // Click the Sign Up button
    fireEvent.click(screen.getByText('Sign Up'));

    // Check if navigate was called with the correct path
    expect(navigate).toHaveBeenCalledWith('/auth?tab=signup');
  });

  it('hides the sidebar when showSidebar is false', () => {
    useToken.mockReturnValue({
      token: null,
      storeToken: jest.fn(),
      getToken: jest.fn(),
      removeToken: jest.fn(),
      isTokenExpired: jest.fn(() => false)

    });

    render(
      <MemoryRouter>
        <BaseLayout showSidebar={false}>
          <div>Test Content</div>
        </BaseLayout>
      </MemoryRouter>
    );

    // Check if the Sidebar is not rendered
    expect(screen.queryByText('Home')).not.toBeInTheDocument(); // Assuming Home is in the Sidebar
  });

  it('removes token and navigates when Logout button is clicked', () => {
    const removeToken = jest.fn();
    useToken.mockReturnValue({
      token: 'mock-token',
      storeToken: jest.fn(),
      getToken: jest.fn(),
      removeToken,
      isTokenExpired: jest.fn(() => false)

    });

    render(
      <MemoryRouter>
        <BaseLayout>
          <div>Test Content</div>
        </BaseLayout>
      </MemoryRouter>
    );

    // Click the Logout button
    fireEvent.click(screen.getByText('Logout'));

    // Check if removeToken was called
    expect(removeToken).toHaveBeenCalled();

    // Check if navigate was called with the correct path
    expect(navigate).toHaveBeenCalledWith('/auth?tab=login');
  });
});
