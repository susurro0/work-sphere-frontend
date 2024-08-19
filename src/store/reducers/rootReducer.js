import { authReducer, initialAuthState } from './authReducer';

export const initialState = {
  auth: initialAuthState,
};

export const rootReducer = (state, action) => ({
  auth: authReducer(state.auth, action),
});
