import { setGrid, setError, addResult } from '../pathfinderActions'; 

describe('Pathfinder Actions', () => {
  it('should create an action to set the grid', () => {
    const grid = [[0, 1], [1, 0]];
    const expectedAction = {
      type: 'SET_GRID',
      payload: { grid },
    };
    expect(setGrid(grid)).toEqual(expectedAction);
  });

  it('should create an action to set an error', () => {
    const error = 'An error occurred';
    const expectedAction = {
      type: 'SET_ERROR',
      payload: { error },
    };
    expect(setError(error)).toEqual(expectedAction);
  });

  it('should create an action to add a result', () => {
    const result = { path: [0, 1, 2], cost: 10 };
    const expectedAction = {
      type: 'ADD_RESULT',
      payload: { result },
    };
    expect(addResult(result)).toEqual(expectedAction);
  });
});
