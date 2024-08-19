import React from 'react';
import { render, screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import useToken from '../../hooks/useToken';
import { logout } from '../../store/actions/authActions';
import TokenChecker from '../TokenChecker';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../../hooks/useToken');
jest.mock('../../store/actions/authActions', () => ({
  logout: jest.fn(),
}));

describe('TokenChecker', () => {
  let mockNavigate;

  beforeEach(() => {
    mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call removeToken, logout, and navigate to login when the token is expired', () => {
    const mockRemoveToken = jest.fn();
    useToken.mockReturnValue({
      token: 'expired-token',
      isTokenExpired: jest.fn(() => true),
      removeToken: mockRemoveToken,
    });

    render(
      <TokenChecker>
        <div>Protected Content</div>
      </TokenChecker>
    );

    expect(mockRemoveToken).toHaveBeenCalled();
    expect(logout).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/auth?tab=login');
  });

  it('should render children and not call removeToken, logout, or navigate when the token is valid', () => {
    useToken.mockReturnValue({
      token: 'valid-token',
      isTokenExpired: jest.fn(() => false),
      removeToken: jest.fn(),
    });

    render(
      <TokenChecker>
        <div>Protected Content</div>
      </TokenChecker>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
    expect(useToken().removeToken).not.toHaveBeenCalled();
    expect(logout).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
