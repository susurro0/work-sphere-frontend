import { loginSuccess, loginFailure, logout, setLoading } from '../authActions'; 

describe('Auth Actions', () => {
  test('loginSuccess returns the correct action object', () => {
    const user = { username: 'testuser', email: 'test@example.com' };
    const token = 'fake_token';
    const tokenType = 'bearer';

    const expectedAction = {
      type: 'LOGIN_SUCCESS',
      payload: { user, token, tokenType },
    };

    expect(loginSuccess(user, token, tokenType)).toEqual(expectedAction);
  });

  test('loginFailure returns the correct action object', () => {
    const error = 'Invalid credentials';

    const expectedAction = {
      type: 'LOGIN_FAILURE',
      payload: { error },
    };

    expect(loginFailure(error)).toEqual(expectedAction);
  });

  test('logout returns the correct action object', () => {
    const expectedAction = {
      type: 'LOGOUT',
    };

    expect(logout()).toEqual(expectedAction);
  });

  test('setLoading returns the correct action object', () => {
    const expectedAction = {
      type: 'SET_LOADING',
    };

    expect(setLoading()).toEqual(expectedAction);
  });
});
