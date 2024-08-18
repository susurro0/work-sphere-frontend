import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SignUpForm from '../SignUpForm';

describe('SignUpForm', () => {
  const mockOnSubmit = jest.fn();
  const defaultProps = {
    onSubmit: mockOnSubmit,
    loading: false,
    errors: {},
  };

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders all input fields correctly', () => {
    render(<SignUpForm {...defaultProps} />);
  
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByTestId('password-test-id')).toBeInTheDocument();
    expect(screen.getByTestId('confirm-password-test-id')).toBeInTheDocument();
    expect(screen.getByTestId('signup-button-test-id')).toBeInTheDocument();
  });
  

  it('calls onSubmit with correct data when form is submitted', () => {
    render(<SignUpForm {...defaultProps} />);

    const usernameInput = screen.getByTestId('username-input-test-id');
    const emailInput = screen.getByTestId('email-input-test-id');

    const passwordInput = screen.getByTestId('password-test-id');
    const confirmInput = screen.getByTestId('confirm-password-test-id');
    
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmInput, { target: { value: 'password123' } });
    fireEvent.click(screen.getByTestId('signup-button-test-id'));

    expect(mockOnSubmit).toHaveBeenCalledWith('testuser', 'test@example.com', 'password123', 'password123');
  });

  it('displays errors for invalid fields', () => {
    const errors = {
      username: 'Username is required',
      email: 'Email is invalid',
      password: 'Password is too short',
      confirmPassword: 'Passwords do not match',
    };

    render(<SignUpForm {...defaultProps} errors={errors} />);

    expect(screen.getByText(errors.username)).toBeInTheDocument();
    expect(screen.getByText(errors.email)).toBeInTheDocument();
    expect(screen.getByText(errors.password)).toBeInTheDocument();
    expect(screen.getByText(errors.confirmPassword)).toBeInTheDocument();
  });

  it('displays general error message', () => {
    const errors = {
      general: 'Something went wrong, please try again',
    };

    render(<SignUpForm {...defaultProps} errors={errors} />);

    expect(screen.getByText(errors.general)).toBeInTheDocument();
  });

  it('disables the submit button when loading', () => {
    render(<SignUpForm {...defaultProps} loading={true} />);

    const button = screen.getByRole('button', { name: /signing up/i });
    expect(button).toBeDisabled();
  });

  it('shows "Signing up..." when loading', () => {
    render(<SignUpForm {...defaultProps} loading={true} />);

    expect(screen.getByRole('button')).toHaveTextContent(/signing up/i);
  });
});
