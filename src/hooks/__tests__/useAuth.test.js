import { renderHook, act, waitFor } from '@testing-library/react';
import useAuth from '../useAuth';
import useToken from '../useToken';
import { login } from '../../services/apiService';
import { useNavigate } from 'react-router-dom';

// Mock useToken hook
jest.mock('../useToken', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock login function
jest.mock('../../services/apiService', () => ({
  login: jest.fn(),
}));

// Mock useNavigate hook
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('useAuth hook', () => {
  const mockNavigate = jest.fn();
  const mockStoreToken = jest.fn();
  const mockIsTokenExpired = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
    useToken.mockReturnValue({
      storeToken: mockStoreToken,
      isTokenExpired: mockIsTokenExpired,
    });
  });

  it('should navigate to home if token is present and not expired', () => {
    // Mock implementations
    localStorage.setItem('jwtToken', 'valid-token');
    mockIsTokenExpired.mockReturnValue(false);

    // Render hook
    renderHook(() => useAuth());

    // Expect navigation to home
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('should not navigate if token is not present', () => {
    // Mock implementation
    localStorage.removeItem('jwtToken');

    // Render hook
    renderHook(() => useAuth());

    // Expect no navigation
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('should not navigate if token is expired', () => {
    // Mock implementations
    localStorage.setItem('jwtToken', 'expired-token');
    mockIsTokenExpired.mockReturnValue(true);

    // Render hook
    renderHook(() => useAuth());

    // Expect no navigation
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('should handle successful login', async () => {
    // Mock implementations
    const mockResponse = {
      username: 'testuser',
      email: 'test@example.com',
      role: 'user',
      access_token: 'new-token',
      token_type: 'Bearer',
    };
    login.mockResolvedValue(mockResponse);
    mockStoreToken.mockImplementation(() => {});

    // Render hook
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.handleLogin('testuser', 'password');
    });

    // Expect token to be stored
    expect(mockStoreToken).toHaveBeenCalledWith('new-token');
    // Expect navigation to home
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('should handle login failure', async () => {
    // Mock implementations
    login.mockRejectedValue(new Error('Login failed'));

    // Render hook
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.handleLogin('testuser', 'password');
    });

    // Expect errors to be set
    expect(result.current.errors).toEqual({ general: 'Login failed. Please try again.' });
  });

  it('should set loading state correctly', async () => {
    // Mock implementations
    login.mockResolvedValue({
      username: 'testuser',
      email: 'test@example.com',
      role: 'user',
      access_token: 'new-token',
      token_type: 'Bearer',
    });

    // Render hook
    const { result } = renderHook(() => useAuth());
    await waitFor(() => {
        expect(result.current.loading).toBe(false);

      });

    await act(async () => {
      result.current.handleLogin('testuser', 'password');
    });
  });
});
