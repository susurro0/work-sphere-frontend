import { authReducer, initialAuthState } from '../authReducer'; 

describe('authReducer', () => {
  test('should handle LOGIN_SUCCESS', () => {
    const action = {
      type: 'LOGIN_SUCCESS',
      payload: {
        user: { username: 'testuser' },
        accessToken: 'some-token',
        tokenType: 'bearer',
      },
    };

    const expectedState = {
      ...initialAuthState,
      isAuthenticated: true,
      user: action.payload.user,
      accessToken: action.payload.accessToken,
      tokenType: action.payload.tokenType,
      loading: false,
      error: null,
    };

    expect(authReducer(initialAuthState, action)).toEqual(expectedState);
  });

  test('should handle LOGIN_FAILURE', () => {
    const action = {
      type: 'SET_ERROR',
      payload: {
        error: 'Invalid credentials',
      },
    };

    const expectedState = {
      ...initialAuthState,
      isAuthenticated: false,
      user: null,
      accessToken: null,
      tokenType: null,
      loading: false,
      error: action.payload.error,
    };

    expect(authReducer(initialAuthState, action)).toEqual(expectedState);
  });

  test('should handle LOGOUT', () => {
    const action = {
      type: 'LOGOUT',
    };

    const expectedState = {
      isAuthenticated: false,
      user: null,
      accessToken: null,
      tokenType: null,
      loading: false,
      error: null,
    };

    // Assuming you have a different initialState for authReducer, update the line below
    expect(authReducer({
      isAuthenticated: false,
      user: null,
      accessToken: null,
      tokenType: null,
      loading: false,
      error: null,
    }, action)).toEqual(expectedState);
  });

  test('should handle SET_LOADING', () => {
    const action = {
      type: 'SET_LOADING',
    };

    const expectedState = {
      ...initialAuthState,
      loading: true,
    };

    expect(authReducer({
      ...initialAuthState,
      loading: false,
    }, action)).toEqual(expectedState);
  });

  test('should return the current state for unknown action types', () => {
    const action = {
      type: 'UNKNOWN_ACTION',
    };

    expect(authReducer(initialAuthState, action)).toEqual(initialAuthState);
  });
});
