import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import LoginForm from '../LoginForm';

describe('LoginForm', () => {
  const mockOnSubmit = jest.fn();
  const defaultProps = {
    onSubmit: mockOnSubmit,
    loading: false,
    errors: {},
  };

  afterEach(() => {
    mockOnSubmit.mockClear();
  });

  test('renders the form correctly', () => {
    act(() => {
      render(<LoginForm {...defaultProps} />);
    });
    
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('handles input changes', () => {
    render(<LoginForm {...defaultProps} />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    act(() => {
      fireEvent.change(usernameInput, { target: { value: 'testuser' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
    });

    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('password123');
  });

  test('shows validation errors', () => {
    act(() => {
      const errorProps = {
        ...defaultProps,
        errors: { username: 'Username is required', password: 'Password is required' },
      };
      render(<LoginForm {...errorProps} />);
    });

    expect(screen.getByText(/username is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });

  test('submits the form with correct values', () => {
    render(<LoginForm {...defaultProps} />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    act(() => {
      fireEvent.change(usernameInput, { target: { value: 'testuser' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);
    });

    expect(mockOnSubmit).toHaveBeenCalledWith('testuser', 'password123');
  });

  test('handles loading state', () => {
    act(() => {
      const loadingProps = { ...defaultProps, loading: true };
      render(<LoginForm {...loadingProps} />);
    });

    const submitButton = screen.getByRole('button', { name: /logging in.../i });
    expect(submitButton).toBeDisabled();
  });

  test('displays general error message', () => {
    act(() => {
      const errorProps = {
        ...defaultProps,
        errors: { general: 'Invalid username or password' },
      };
      render(<LoginForm {...errorProps} />);
    });

    expect(screen.getByText(/invalid username or password/i)).toBeInTheDocument();
  });
});
