import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import GridComponent from '../GridComponent'; // Adjust the import path as necessary

describe('GridComponent', () => {
  const mockOnCellClick = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers(); // Enable fake timers before tests
  });

  afterEach(() => {
    jest.clearAllTimers(); // Clear any timers after each test
    jest.useRealTimers(); // Reset to real timers after tests
  });
    const setup = (props) => {
        render(<GridComponent {...props} />);
    };

    it('renders the grid correctly', () => {
        const grid = [
            [0, 1],
            [2, -1]
        ];
        const gridSize = 2;

        setup({ grid, onCellClick: mockOnCellClick, gridSize, path: [] });

        expect(screen.getAllByTestId(/^cell-/)).toHaveLength(4);
    });

  it('highlights cells in the animated path', async () => {
    const grid = [
      [0, 1],
      [2, -1]
    ];
    const path = [[0, 1], [1, 1]];
    const gridSize = 2;

    setup({ grid, onCellClick: mockOnCellClick, gridSize, path });

    // Wait for the animation to complete
    await act(async () => {
      jest.advanceTimersByTime(300); // Adjust time based on animation speed
    });

    expect(screen.getAllByTestId(/^cell-/)).toHaveLength(4);
    expect(screen.getByTestId('cell-0-1')).toHaveStyle('background-color: yellow');
    expect(screen.getByTestId('cell-1-1')).toHaveStyle('background-color: yellow');
  });

  it('calls onCellClick when a cell is clicked', () => {
    const grid = [
      [0, 1],
      [2, -1]
    ];
    const gridSize = 2;

    setup({ grid, onCellClick: mockOnCellClick, gridSize, path: [] });

    const cell = screen.getByTestId('cell-0-1');
    fireEvent.click(cell);

    expect(mockOnCellClick).toHaveBeenCalledWith(0, 1);
  });

});
