// src/actions/authActions.js

export const loginSuccess = (user, token, tokenType) => ({
    type: 'LOGIN_SUCCESS',
    payload: { user, token, tokenType },
  });
  
  export const setError = (error) => ({
    type: 'SET_ERROR',
    payload: { error },
  });
  
  export const logout = () => ({
    type: 'LOGOUT',
  });
  
  export const setLoading = () => ({
    type: 'SET_LOADING',
  });
  