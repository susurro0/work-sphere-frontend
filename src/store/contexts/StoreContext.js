import React, { createContext, useReducer, useContext } from 'react';
import { rootReducer, initialState } from '../reducers/rootReducer';
import * as authActions from '../actions/authActions'

// Create the context
const StoreContext = createContext();

// Create the provider component
export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return (
    <StoreContext.Provider
      value={{
        state,
        dispatch,
        authActions: authActions,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

// Custom hook to use the store
export const useStore = () => useContext(StoreContext);
