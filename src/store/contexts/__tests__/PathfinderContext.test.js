import React from 'react';
import { render } from '@testing-library/react';
import { PathfinderContext, PathfinderDispatchContext } from '../PathfinderContext'; // Adjust the import path as needed

describe('Pathfinder Context', () => {
  test('PathfinderContext is created correctly', () => {
    // Render a component that uses the PathfinderContext
    const { container } = render(
      <PathfinderContext.Provider value={null}>
        <div>Test</div>
      </PathfinderContext.Provider>
    );
    // Assert that the context is not null and matches the expected value
    expect(PathfinderContext).toBeDefined();
    expect(container.textContent).toBe('Test');
  });

  test('PathfinderDispatchContext is created correctly', () => {
    // Render a component that uses the PathfinderDispatchContext
    const { container } = render(
      <PathfinderDispatchContext.Provider value={null}>
        <div>Test</div>
      </PathfinderDispatchContext.Provider>
    );
    // Assert that the context is not null and matches the expected value
    expect(PathfinderDispatchContext).toBeDefined();
    expect(container.textContent).toBe('Test');
  });
});
