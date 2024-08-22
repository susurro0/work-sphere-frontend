// GridComponent.js
import React from 'react';
import { Paper } from '@mui/material';

const GridComponent = ({ grid, onCellClick, gridSize }) => {
  // Define a fixed size for cells to maintain square shape
  const CELL_SIZE = 40;

  return (
    <Paper
      style={{
        height: `${10 * CELL_SIZE}px`,
        width: `${10 * CELL_SIZE}px`,
        display: 'grid',
        gridTemplateColumns: `repeat(${gridSize}, ${CELL_SIZE}px)`,
        gridGap: '1px',
        position: 'relative'
      }}
    >
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            style={{
              width: `${CELL_SIZE}px`,
              height: `${CELL_SIZE}px`,
              backgroundColor: cell === 'wall' ? 'black' : cell === 'start' ? 'green' : cell === 'end' ? 'red' : 'white',
              border: '1px solid gray',
              cursor: 'pointer'
            }}
            onClick={() => onCellClick(rowIndex, colIndex)}
          />
        ))
      )}
    </Paper>
  );
};

export default GridComponent;
