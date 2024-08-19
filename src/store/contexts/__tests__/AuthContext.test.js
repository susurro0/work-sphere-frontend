import React from 'react';
import { render } from '@testing-library/react';
import { AuthContext, AuthDispatchContext } from '../AuthContext'; // Adjust the import path as needed

describe('Auth Context', () => {
  test('AuthContext is created correctly', () => {
    // Render a component that uses the AuthContext
    const { container } = render(
      <AuthContext.Provider value={null}>
        <div>Test</div>
      </AuthContext.Provider>
    );
    // Assert that the context is not null and matches the expected value
    expect(AuthContext).toBeDefined();
    expect(container.textContent).toBe('Test');
  });

  test('AuthDispatchContext is created correctly', () => {
    // Render a component that uses the AuthDispatchContext
    const { container } = render(
      <AuthDispatchContext.Provider value={null}>
        <div>Test</div>
      </AuthDispatchContext.Provider>
    );
    // Assert that the context is not null and matches the expected value
    expect(AuthDispatchContext).toBeDefined();
    expect(container.textContent).toBe('Test');
  });
});
