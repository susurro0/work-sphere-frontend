import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import BaseLayout from '../BaseLayout';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('BaseLayout', () => {
  it('renders correctly with sidebar', () => {
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

  it('navigates to login when Login button is clicked', () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

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
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

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
});
