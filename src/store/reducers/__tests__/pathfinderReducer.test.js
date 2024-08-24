import { pathfinderReducer, initialPathfinderState } from '../pathfinderReducer';

describe('pathfinderReducer', () => {
  it('should return the initial state when an unknown action type is provided', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const state = pathfinderReducer(initialPathfinderState, unknownAction);
    expect(state).toEqual(initialPathfinderState);
  });

  it('should handle SET_GRID action', () => {
    const grid = [[0, 1], [1, 0]];
    const action = {
      type: 'SET_GRID',
      payload: { grid },
    };
    const expectedState = {
      ...initialPathfinderState,
      grid,
      error: null,
    };
    const state = pathfinderReducer(initialPathfinderState, action);
    expect(state).toEqual(expectedState);
  });

  it('should handle SET_ERROR action', () => {
    const error = 'An error occurred';
    const action = {
      type: 'SET_ERROR',
      payload: { error },
    };
    const expectedState = {
      ...initialPathfinderState,
      grid: [],
      error,
    };
    const state = pathfinderReducer(initialPathfinderState, action);
    expect(state).toEqual(expectedState);
  });

  it('should handle ADD_RESULT action', () => {
    const result = { path: [0, 1, 2], cost: 10 };
    const action = {
      type: 'ADD_RESULT',
      payload: { result },
    };
    const expectedState = {
      ...initialPathfinderState,
      results: [result],
      error: null,
    };
    const state = pathfinderReducer(initialPathfinderState, action);
    expect(state).toEqual(expectedState);
  });

  it('should handle multiple ADD_RESULT actions', () => {
    const result1 = { path: [0, 1, 2], cost: 10 };
    const result2 = { path: [2, 3, 4], cost: 20 };

    let state = pathfinderReducer(initialPathfinderState, {
      type: 'ADD_RESULT',
      payload: { result: result1 },
    });

    state = pathfinderReducer(state, {
      type: 'ADD_RESULT',
      payload: { result: result2 },
    });

    expect(state.results).toEqual([result1, result2]);
  });
});
