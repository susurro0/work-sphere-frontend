// src/hooks/useToken.test.js
import { renderHook, act } from '@testing-library/react';
import useToken from '../useToken';
import { jwtDecode } from 'jwt-decode';

jest.mock('jwt-decode', () => ({
  jwtDecode: jest.fn(),
}));

describe('useToken Hook', () => {
  let tokenHook;

  beforeEach(() => {
    localStorage.clear();
    tokenHook = renderHook(() => useToken()).result.current;

  });

  test('should store and retrieve a token', () => {
    const { result } = renderHook(() => useToken());

    act(() => {
      result.current.storeToken('testToken123');
    });

    expect(localStorage.getItem('jwtToken')).toBe('testToken123');
    expect(result.current.getToken()).toBe('testToken123');
  });

  test('should remove a token', () => {
    const { result } = renderHook(() => useToken());

    act(() => {
      result.current.storeToken('testToken123');
      result.current.removeToken();
    });

    expect(localStorage.getItem('jwtToken')).toBeNull();
    expect(result.current.getToken()).toBeNull();
  });

  test('should initialize with the token from localStorage', () => {
    localStorage.setItem('jwtToken', 'existingToken');
    const { result } = renderHook(() => useToken());

    expect(result.current.token).toBe('existingToken');
  });

  test('should update token state when storeToken is called', () => {
    const { result } = renderHook(() => useToken());

    act(() => {
      result.current.storeToken('newToken');
    });

    expect(result.current.token).toBe('newToken');
  });

  it('should return false for a valid token that is not expired', () => {
    const validToken = {
      exp: Math.floor(Date.now() / 1000) + 60 // Expires in 60 seconds
    };
    
    jwtDecode.mockReturnValue(validToken);

    expect(tokenHook.isTokenExpired('validToken')).toBe(false);
  });

  it('should return true for a valid token that is expired', () => {
    const expiredToken = {
      exp: Math.floor(Date.now() / 1000) - 60 // Expired 60 seconds ago
    };

    jwtDecode.mockReturnValue(expiredToken);

    expect(tokenHook.isTokenExpired('expiredToken')).toBe(true);
  });

  it('should return true if no token is provided', () => {
    expect(tokenHook.isTokenExpired(null)).toBe(true);
  });
});
