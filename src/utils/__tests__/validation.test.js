import {validateGrid} from '../validation'

describe('validateGrid', () => {
    test('returns [true, true] when grid contains both 1 and 2', () => {
      const grid = [
        [0, 1, 0],
        [0, 0, 2],
        [0, 0, 0]
      ];
      expect(validateGrid(grid)).toEqual([true, true]);
    });
  
    test('returns [true, false] when grid contains only 1', () => {
      const grid = [
        [1, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ];
      expect(validateGrid(grid)).toEqual([true, false]);
    });
  
    test('returns [false, true] when grid contains only 2', () => {
      const grid = [
        [0, 0, 0],
        [0, 0, 2],
        [0, 0, 0]
      ];
      expect(validateGrid(grid)).toEqual([false, true]);
    });
  
    test('returns [false, false] when grid contains neither 1 nor 2', () => {
      const grid = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ];
      expect(validateGrid(grid)).toEqual([false, false]);
    });
  
    test('returns [true, true] when 1 and 2 are at different positions', () => {
      const grid = [
        [0, 0, 0],
        [1, 0, 0],
        [0, 0, 2]
      ];
      expect(validateGrid(grid)).toEqual([true, true]);
    });
  
    test('returns [false, true] when 2 appears before 1 in the grid', () => {
      const grid = [
        [0, 2, 0],
        [0, 0, 0],
        [1, 0, 0]
      ];
      expect(validateGrid(grid)).toEqual([true, true]);
    });
  });
