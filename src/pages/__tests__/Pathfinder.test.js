import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Pathfinder from '../Pathfinder';
import { useStore } from '../../store/contexts/StoreContext';
import { postData } from '../../services/apiService';
import { validateGrid } from '../../utils/validation';
import { MemoryRouter, useNavigate } from 'react-router-dom';

jest.mock('../../store/contexts/StoreContext');
jest.mock('../../services/apiService');
jest.mock('../../utils/validation');

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
  }));

const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route); // Mock route if needed
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };

describe('Pathfinder Component', () => {
    let dispatchMock;
    let pathfinderActionsMock;
    let stateMock;
    let navigate;
    let setGrid = jest.fn();
    let setError = jest.fn();
    let addResult = jest.fn();

    beforeEach(() => {
        navigate = jest.fn();
        useNavigate.mockReturnValue(navigate);
        dispatchMock = jest.fn();
        pathfinderActionsMock = {
            setGrid: jest.fn(),
            setError:jest.fn()
        };
        stateMock = {
        pathfinder: {
            grid: Array(10).fill(Array(10).fill(0)),
        },
        };
        useStore.mockReturnValue({
            state: { pathfinder: { grid: [], results: [], error: null } },
            dispatch: dispatchMock,
            pathfinderActions: {
                setGrid: setGrid,
                setError: setError,
                addResult: addResult,
            },
        });

    });

    it('renders the Pathfinder component', () => {
        renderWithRouter(<Pathfinder />);
        expect(screen.getByText('Pathfinder Page')).toBeInTheDocument();
    });

    it('allows the user to select an algorithm', () => {
        renderWithRouter(<Pathfinder />);

        const dijkstraRadio = screen.getByLabelText(/Dijkstra/i);
        fireEvent.click(dijkstraRadio);

        expect(dijkstraRadio).toBeChecked();
    });

    it('allows the user to change the selected type', () => {
        renderWithRouter(<Pathfinder />);

        const endButton = screen.getByLabelText('end');
        fireEvent.click(endButton);

        expect(endButton).toHaveStyle('font-weight: bold');
    });

    it('allows the user to change the algorithm type', () => {
        renderWithRouter(<Pathfinder />);

        const dijkstraRadio = screen.getByLabelText(/Dijkstra/i);;
        fireEvent.click(dijkstraRadio);

        expect(dijkstraRadio).toBeChecked();
    });

    it('allows the user to reset the grid', () => {
        renderWithRouter(<Pathfinder />);

        const resetButton = screen.getByText('Reset Grid');
        fireEvent.click(resetButton);

        expect(dispatchMock).toHaveBeenCalledWith(pathfinderActionsMock.setGrid(Array(10).fill(Array(10).fill(0))));
    });

    it('calls handleSubmit and triggers postData when start and end points are present', async () => {
        validateGrid.mockReturnValue([true, true]);
        postData.mockResolvedValue({ path: [[0, 0], [1, 1]] });
    
        await act(async () => {
            renderWithRouter(<Pathfinder />);       
        });
    
        const submitButton = screen.getByText('Run Algorithm');
        
        await act(async () => {
            fireEvent.click(submitButton);
        });
    
        expect(postData).toHaveBeenCalledWith('/api/pathfinder/', expect.any(Object));
        
    });

    it('should fail postData on handleSumbmit', async () => {
        validateGrid.mockReturnValue([true, true]);
        postData.mockRejectedValue(new Error('Something went wrong.'));

        await act(async () => {
            renderWithRouter(<Pathfinder />);       
        });
    
        const submitButton = screen.getByText('Run Algorithm');
        
        await act(async () => {
            fireEvent.click(submitButton);
        });
    
        expect(postData).toHaveBeenCalledWith('/api/pathfinder/', expect.any(Object));
        expect(dispatchMock).toHaveBeenCalledWith(pathfinderActionsMock.setError('Error: Something went wrong.'));
        
    });

    it('displays an error message if the end point is missing', async () => {
        validateGrid.mockReturnValue([true, false]);    
        await act(async () => {
            renderWithRouter(<Pathfinder />);
        });
    
        const submitButton = screen.getByText('Run Algorithm');
        
        await act(async () => {
            fireEvent.click(submitButton);
        });
        expect(dispatchMock).toHaveBeenCalledWith(pathfinderActionsMock.setError('END POINT IS MISSING'));
    });
    it('add an error message if grid is not valid', async () => {
        validateGrid.mockReturnValue([false, false]);    
        await act(async () => {
            renderWithRouter(<Pathfinder />);
        });
    
        const submitButton = screen.getByText('Run Algorithm');
        
        await act(async () => {
            fireEvent.click(submitButton);
        });
        expect(dispatchMock).toHaveBeenCalledWith(pathfinderActionsMock.setError('START POINT IS MISSING'));
        expect(dispatchMock).toHaveBeenCalledWith(pathfinderActionsMock.setError('END POINT IS MISSING'));
    });
    it('displays an error message if the start point is missing', async () => {
        validateGrid.mockReturnValue([false, true]);
    
        await act(async () => {
            renderWithRouter(<Pathfinder />);
        });
    
        const submitButton = screen.getByText('Run Algorithm');
        
        await act(async () => {
            fireEvent.click(submitButton);
        });
        expect(dispatchMock).toHaveBeenCalledWith(pathfinderActionsMock.setError('START POINT IS MISSING'));

    });

      it('calls handleCellClick and updates the grid when a cell is clicked to set it as end', () => {
        const initialGrid = Array(10).fill(Array(10).fill(0));
        const updatedGrid = Array(10).fill(Array(10).fill(0));
        updatedGrid[1][1] = 2; // Set the clicked cell as end
        
        renderWithRouter(<Pathfinder />);
      
        const endButton = screen.getByLabelText('end');
        fireEvent.click(endButton);
      
        const gridCell = screen.getByTestId('cell-1-1');
        fireEvent.click(gridCell);
      
        expect(dispatchMock).toHaveBeenCalledWith(pathfinderActionsMock.setGrid(updatedGrid));
      
        // Testing clearing the end cell
        updatedGrid[1][1] = 0; // Clear the end cell
        fireEvent.click(gridCell);
        expect(dispatchMock).toHaveBeenCalledWith(pathfinderActionsMock.setGrid(updatedGrid));
      });
      
      it('calls handleCellClick and updates the grid when a cell is clicked to set it as start', () => {
        const initialGrid = Array(10).fill(Array(10).fill(0));
        const updatedGrid = Array(10).fill(Array(10).fill(0));
        updatedGrid[1][1] = 1; // Set the clicked cell as end
        
        renderWithRouter(<Pathfinder />);
      
        const startButton = screen.getByText('Start');
        fireEvent.click(startButton);
      
        const gridCell = screen.getByTestId('cell-1-1');
        fireEvent.click(gridCell);
      
        expect(dispatchMock).toHaveBeenCalledWith(pathfinderActionsMock.setGrid(updatedGrid));
      
        // Testing clearing the end cell
        updatedGrid[1][1] = 0; // Clear the end cell
        fireEvent.click(gridCell);
        expect(dispatchMock).toHaveBeenCalledWith(pathfinderActionsMock.setGrid(updatedGrid));
      });
      

      it('calls handleCellClick and updates the grid when a cell is clicked to set it as wall', () => {
        const initialGrid = Array(10).fill(Array(10).fill(0));
        const updatedGrid = Array(10).fill(Array(10).fill(0));
        updatedGrid[1][1] = -1; 
      
        renderWithRouter(<Pathfinder />);
      
        const wallButton = screen.getByText('Wall');
        fireEvent.click(wallButton);
      
        const gridCell = screen.getByTestId('cell-1-1');
        fireEvent.click(gridCell);
      
        expect(dispatchMock).toHaveBeenCalledWith(pathfinderActionsMock.setGrid(updatedGrid));
      
        updatedGrid[1][1] = 0; 
        fireEvent.click(gridCell);
        expect(dispatchMock).toHaveBeenCalledWith(pathfinderActionsMock.setGrid(updatedGrid));

        updatedGrid[1][1] = -2; 
        fireEvent.click(gridCell);
        expect(dispatchMock).toHaveBeenCalledWith(pathfinderActionsMock.setGrid(updatedGrid));
      });
      

      it('clears other start cells when setting a new start cell', () => {
        const initialGrid = Array(10).fill(Array(10).fill(0));
        initialGrid[0][0] = 1; // Existing start cell
        const updatedGrid = Array(10).fill(Array(10).fill(0));
        updatedGrid[1][1] = 1; // New start cell
      
        renderWithRouter(<Pathfinder />);
      
        const startButton = screen.getByLabelText('start');
        fireEvent.click(startButton);
      
        const oldStartCell = screen.getByTestId('cell-0-0');
        fireEvent.click(oldStartCell);
        expect(dispatchMock).toHaveBeenCalledWith(pathfinderActionsMock.setGrid(initialGrid));

        const newStartCell = screen.getByTestId('cell-1-1');
        fireEvent.click(newStartCell);
      
        expect(dispatchMock).toHaveBeenCalledWith(pathfinderActionsMock.setGrid(updatedGrid));
        
        fireEvent.click(newStartCell);
        updatedGrid[1][1] = 0; 
      
        expect(dispatchMock).toHaveBeenCalledWith(pathfinderActionsMock.setGrid(updatedGrid));
      });
      

      it('clears other end cells when setting a new end cell', () => {
        const initialGrid = Array(10).fill(Array(10).fill(0));
        initialGrid[0][0] = 2; // Existing end cell
        const updatedGrid = Array(10).fill(Array(10).fill(0));
        updatedGrid[1][1] = 2; // New end cell
      
        renderWithRouter(<Pathfinder />);
      
        const endButton = screen.getByLabelText('end');
        fireEvent.click(endButton);
      
        const oldEndCell = screen.getByTestId('cell-0-0');
        fireEvent.click(oldEndCell);
      
        const newEndCell = screen.getByTestId('cell-1-1');
        fireEvent.click(newEndCell);
      
        expect(dispatchMock).toHaveBeenCalledWith(pathfinderActionsMock.setGrid(updatedGrid));
      });

      it('sets or clears a cell as start based on its current state', () => {
        const updatedGrid = Array(10).fill(Array(10).fill(0));
        updatedGrid[2][3] = 1; // Set cell (2,3) as start

        renderWithRouter(<Pathfinder />);

        // Simulate setting a cell as start
        const startButton = screen.getByLabelText('start');
        fireEvent.click(startButton);

        const gridCell = screen.getByTestId('cell-2-3');
        fireEvent.click(gridCell);

        // Expect the grid to have the cell (2,3) set as start
        expect(dispatchMock).toHaveBeenCalledWith(pathfinderActionsMock.setGrid(updatedGrid));

        // Simulate clearing the start cell
        updatedGrid[2][3] = 0; // Clear the start cell
        fireEvent.click(gridCell);

        // Expect the grid to have the cell (2,3) cleared
        expect(dispatchMock).toHaveBeenCalledWith(pathfinderActionsMock.setGrid(updatedGrid));
        });


});
