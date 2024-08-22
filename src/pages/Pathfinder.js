// Pathfinder.js
import React, { useState } from 'react';
import { Typography, FormControl, FormControlLabel, RadioGroup, Radio, Button, Grid, Paper, Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import BaseLayout from '../layout/BaseLayout';
import GridComponent from '../components/pathfinderGrid/GridComponent';

const GRID_SIZE = 10;

const Pathfinder = () => {
  const [algorithm, setAlgorithm] = useState('');
  const [selectedType, setSelectedType] = useState(''); // 'start', 'end', 'wall', or ''
  const [grid, setGrid] = useState(Array(GRID_SIZE).fill(Array(GRID_SIZE).fill('')));

  const handleAlgorithmChange = (event) => {
    setAlgorithm(event.target.value);
  };

  const handleTypeChange = (event, newType) => {
    if (newType !== null) {
      setSelectedType(newType);
    }
  };

  const handleSubmit = () => {
    console.log(`Selected Algorithm: ${algorithm}`);
  };

  const handleCellClick = (row, col) => {
    const updatedGrid = grid.map((r, rowIndex) =>
      r.map((cell, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          if (selectedType === 'start') {
            if (cell === 'start') return ''; // Clear if already set as start
            return 'start';
          }
          if (selectedType === 'end') {
            if (cell === 'end') return ''; // Clear if already set as end
            return 'end';
          }
          if (selectedType === 'wall') {
            return cell === 'wall' ? '' : 'wall'; // Toggle wall
          }
        }
        if (selectedType === 'start' && cell === 'start' && !(rowIndex === row && colIndex === col)) return '';
        if (selectedType === 'end' && cell === 'end' && !(rowIndex === row && colIndex === col)) return '';
        return cell;
      })
    );
    setGrid(updatedGrid);
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
      <Box marginBottom={2}>
        <ToggleButtonGroup
          value={selectedType}
          exclusive
          onChange={handleTypeChange}
          aria-label="select type"
        >
          <ToggleButton value="start" aria-label="start" style={{ backgroundColor: 'green', color: 'white' }}>
            Start
          </ToggleButton>
          <ToggleButton value="end" aria-label="end" style={{ backgroundColor: 'red', color: 'white' }}>
            End
          </ToggleButton>
          <ToggleButton value="wall" aria-label="wall" style={{ backgroundColor: 'black', color: 'white' }}>
            Wall
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Grid container spacing={2} style={{ marginTop: 20 }}>
        <Grid item xs={12}>
          <Paper style={{ height: GRID_SIZE * 40, width: GRID_SIZE * 40, position: 'relative' }}>
            <GridComponent grid={grid} onCellClick={handleCellClick} gridSize={GRID_SIZE} />
          </Paper>
        </Grid>
      </Grid>
    </BaseLayout>
  );
};

export default Pathfinder;
