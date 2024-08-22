// src/store/reducers/authReducer.js


export const initialAuthState = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
  tokenType: null,
  loading: true,
  error: null,
};

  
  export const authReducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return { 
          ...state,
          isAuthenticated: true,
          user: action.payload.user,
          accessToken: action.payload.accessToken,
          tokenType: action.payload.tokenType,
          loading: false,
          error: null,
        };
      case 'SET_ERROR':
        return {
          ...state,
          isAuthenticated: false,
          user: null,
          accessToken: null,
          tokenType: null,
          loading: false,
          error: action.payload.error,
        };
      case 'LOGOUT':
        return { 
          ...state,
          isAuthenticated: false,
          user: null,
          accessToken: null,
          tokenType: null,
          loading: false,
          error: null
        };
      case 'SET_LOADING':
        return { ...state, loading: true };
      default:
        return state;
    }
  };