import React, { useEffect, useState } from 'react';
import { Paper } from '@mui/material';

const GridComponent = ({ grid, onCellClick, gridSize, path }) => {
  const CELL_SIZE = 40;
  const [currentGrid, setCurrentGrid] = useState(grid); // State to manage the grid
  const [animatedPath, setAnimatedPath] = useState([]);

  useEffect(() => {
    setCurrentGrid(grid); 
    if(path.length == 0){
      setAnimatedPath(path)
    }
  }, [grid, path]);

  useEffect(() => {
    if (path.length > 0) {
      animatePath(path);
    }
  }, [path]);

  const animatePath = (path) => {
    path.forEach((cell, index) => {
      setTimeout(() => {
        setAnimatedPath((prevPath) => [...prevPath, cell]);
      }, index * 300); // Adjust the delay time for the speed of animation
    });
  };

  return (
    <Paper
      style={{
        height: `${gridSize * CELL_SIZE}px`,
        width: `${gridSize * CELL_SIZE}px`,
        display: 'grid',
        gridTemplateColumns: `repeat(${gridSize}, ${CELL_SIZE}px)`,
        gridGap: '1px',
        position: 'relative'
      }}
    >
      {currentGrid.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isInPath = animatedPath.some(
            ([pathRow, pathCol]) => pathRow === rowIndex && pathCol === colIndex
          );
          return (
            <div
                data-testid={`cell-${rowIndex}-${colIndex}`}
                key={`${rowIndex}-${colIndex}`}
                style={{
                width: `${CELL_SIZE}px`,
                height: `${CELL_SIZE}px`,
                backgroundColor: isInPath ? 'yellow' : cell === -1 ? 'black' : cell === 1 ? 'green' : cell === 2 ? 'red' : 'white',
                border: '1px solid gray',
                cursor: 'pointer'
              }}
              onClick={() => onCellClick(rowIndex, colIndex)}
            />
          );
        })
      )}
    </Paper>
  );
};

export default GridComponent;
