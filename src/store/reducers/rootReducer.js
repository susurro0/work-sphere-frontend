import { authReducer, initialAuthState } from './authReducer';
import { pathfinderReducer, initialPathfinderState } from './pathfinderReducer';

export const initialState = {
  auth: initialAuthState,
  pathfinder: initialPathfinderState,
};

export const rootReducer = (state, action) => ({
  auth: authReducer(state.auth, action),
  pathfinder: pathfinderReducer(state.pathfinder, action)
});
