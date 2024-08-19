import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { StoreProvider, useStore } from '../StoreContext'; 
import { initialState } from '../../reducers/rootReducer'; 

// Component for testing useStore hook
const TestComponent = () => {
    const { state, dispatch, authActions } = useStore();
  
    return (
        <div>
        <div data-testid="state">{JSON.stringify(state)}</div>
        <div data-testid="authActions">{JSON.stringify(authActions)}</div>
        <button onClick={() => dispatch(authActions.loginSuccess('user', 'token', 'tokenType'))}>
            Test Dispatch
        </button>
        </div>
    );
};

describe('StoreProvider', () => {
    test('provides state, dispatch, and authActions to children', () => {
        render(
        <StoreProvider>
            <TestComponent />
        </StoreProvider>
        );
        
        // Check initial state
        expect(screen.getByTestId('state')).toHaveTextContent(JSON.stringify(initialState));
        
        // Check authActions
        expect(screen.getByTestId('authActions')).toBeDefined();
        
        // Test dispatch action
        const button = screen.getByText('Test Dispatch');
        act(() => {
            button.click();
        });    
        expect(screen.getByTestId('state')).not.toHaveTextContent(JSON.stringify(initialState));
    });
});
