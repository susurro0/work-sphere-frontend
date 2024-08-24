// src/actions/pathfinderActions.js

export const setGrid = (grid) => ({
    type: 'SET_GRID',
    payload: { grid },
  });
  
  export const setError = (error) => ({
    type: 'SET_ERROR',
    payload: { error },
  });
  
  export const addResult = (result) => ({
    type: 'ADD_RESULT',
    payload: { result },
  });
  
  