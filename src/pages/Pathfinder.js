import React, { useState, useEffect } from 'react';
import { Typography, FormControl, FormControlLabel, RadioGroup, Radio, Button, Grid, Paper, Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import BaseLayout from '../layout/BaseLayout';
import GridComponent from '../components/pathfinderGrid/GridComponent';
import { validateGrid } from '../utils/validation';
import { postData } from '../services/apiService';
import { useStore } from '../store/contexts/StoreContext';

const GRID_SIZE = 10;

const Pathfinder = () => {
  const { state, dispatch, pathfinderActions } = useStore();
  const { pathfinder } = state;
  const [algorithm, setAlgorithm] = useState('a-star');
  const [selectedType, setSelectedType] = useState('start'); // 'start', 'end', 'wall', or ''
  const [grid, setGrid] = useState(Array(GRID_SIZE).fill(Array(GRID_SIZE).fill(0)));
  const [path, setPath] = useState([]); // Store the path returned from the API
  const [initialGrid, setInitialGrid] = useState(grid); // Save the initial grid state

  useEffect(() => {
    setInitialGrid(grid); // Save initial grid state whenever grid is updated
  }, [grid]);

  const handleAlgorithmChange = (event) => {
    setAlgorithm(event.target.value);
    resetGrid(initialGrid); 
  };

  const handleTypeChange = (event, newType) => {
    if (newType !== null){ 
      setSelectedType(newType);
    }
  };
  const typeToValue = {
    start: 1,
    end: 2,
    wall: -1,
    default: 0
  };

  const handleSubmit = () => {
    const [hasStart, hasEnd] = validateGrid(grid);

    if (hasStart && hasEnd) {
      postData('/api/pathfinder/', { algorithm, grid })
        .then((response) => {
          setPath(response.path); 
        })
        .catch((err) => {
          dispatch(pathfinderActions.setError(err))
        });
    } else {
      if (!hasStart) {
        dispatch(pathfinderActions.setError('START POINT IS MISSING'))
      } if (!hasEnd) {
        dispatch(pathfinderActions.setError('END POINT IS MISSING'))
      }
    }
  };

  const findPosition = (value) => {
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col] === value) {
          return { row, col };
        }
      }
    }
    return null;
  };


  const handleCellClick = (row, col) => {
    const newValue = typeToValue[selectedType];

    const startPos = findPosition(1);
    const endPos = findPosition(2);

    const newMatrix = grid.map((r, rowIndex) =>
      r.map((value, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          return newValue;
        }
        return value;
      })
    );

    if (newValue === 1 && startPos && (startPos.row !== row || startPos.col !== col)) {
      newMatrix[startPos.row][startPos.col] = 0;
    }
    if (newValue === 2 && endPos && (endPos.row !== row || endPos.col !== col)) {
      newMatrix[endPos.row][endPos.col] = 0;
    }

    dispatch(pathfinderActions.setGrid(newMatrix));
    setGrid(newMatrix);
  };

  const resetGrid = (gridType) => {
    setGrid(gridType);
    setPath([]); 
    dispatch(pathfinderActions.setGrid(gridType))
  };


  const getButtonStyles = (type, selectedType) => {
    const isSelected = type === selectedType;
    return {
      backgroundColor: type === 'start' ? 'green' : type === 'end' ? 'red' : 'black',
      color: 'white',
      border: isSelected ? '2px solid' : 'none',
      fontWeight: isSelected ? 'bold' : 'normal',
    };
  };
  
  return (
    <BaseLayout>
      <Typography variant="h4">Pathfinder Page</Typography>
      <Box display="flex" alignItems="center" marginBottom={2}>
        <FormControl component="fieldset">
          <RadioGroup row value={algorithm} onChange={handleAlgorithmChange}>
            <FormControlLabel value="a-star" control={<Radio />} label="A*" />
            <FormControlLabel value="dijkstra" control={<Radio />} label="Dijkstra" />
            <FormControlLabel value="dfs" control={<Radio />} label="DFS" />
            <FormControlLabel value="bfs" control={<Radio />} label="BFS" />
          </RadioGroup>
        </FormControl>
        <Box marginLeft="auto">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Run Algorithm
          </Button>
        </Box>
      </Box>
      <Box marginBottom={2} display="flex" alignItems="center">
        <ToggleButtonGroup
          value={selectedType}
          exclusive
          onChange={handleTypeChange}
          aria-label="select type"
        >
          <ToggleButton value="start" aria-label="start" style={getButtonStyles('start', selectedType)}>
            Start
          </ToggleButton>
          <ToggleButton value="end" aria-label="end" style={getButtonStyles('end', selectedType)}>
            End
          </ToggleButton>
          <ToggleButton value="wall" aria-label="wall" style={getButtonStyles('wall', selectedType)}>
            Wall
          </ToggleButton>
        </ToggleButtonGroup>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => resetGrid(Array(GRID_SIZE).fill(Array(GRID_SIZE).fill(0)))}
          style={{ marginLeft: '16px' }} // Adjust spacing as needed
        >
          Reset Grid
        </Button>
      </Box>
      <Grid container spacing={2} style={{ marginTop: 20 }}>
        <Grid item xs={12}>
          <Paper style={{ height: GRID_SIZE * 40, width: GRID_SIZE * 40, position: 'relative' }}>
            <GridComponent grid={grid} onCellClick={handleCellClick} gridSize={GRID_SIZE} path={path} />
          </Paper>
        </Grid>
      </Grid>
    </BaseLayout>
  );
};

export default Pathfinder;
