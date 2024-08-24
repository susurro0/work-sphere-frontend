// src/store/reducers/pathfinderReducer.js


export const initialPathfinderState = {
  grid: [],
  results: [],
  error: null,
};

  
  export const pathfinderReducer = (state, action) => {
    switch (action.type) {
      case 'SET_GRID':
        return { 
          ...state,
          grid: action.payload.grid,
          error: null,
        };
      case 'SET_ERROR':
        return {
          ...state,
          grid: [],
          error: action.payload.error,
        };
      case 'ADD_RESULT':
        return { 
          ...state,
          results: [...state.results, action.payload.result],
          error: null
        };
      default:
        return state;
    }
  };