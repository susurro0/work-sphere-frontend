import React from 'react';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { BrowserRouter as Router, MemoryRouter, useNavigate } from 'react-router-dom';
import AuthPage from '../AuthPage';

jest.mock('react-router-dom', () => {
    // Import the actual module to use the real implementations
    const actualModule = jest.requireActual('react-router-dom');
  
    return {
      ...actualModule,
      useNavigate: jest.fn(),
    };
  });

const PW_ERROR = 'The password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.';

describe('AuthPage', () => {
    const renderComponent = (initialEntries = ['/auth']) => {
        render(
        <MemoryRouter initialEntries={initialEntries}>
            <AuthPage />
        </MemoryRouter>
        );
    };

    beforeEach(()=>{
        jest.resetAllMocks();
        originalConsoleLog = console.log;
    
        // Mock console.log with a spy
        console.log = jest.fn();
    })

    afterEach(() =>{
        console.log = originalConsoleLog;

        cleanup
    })

    it('renders login form by default', () => {
        renderComponent();

        expect(screen.getByTestId('auth-tab-title-testid')).toBeInTheDocument();
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.queryByLabelText(/email/i)).not.toBeInTheDocument();
        expect(screen.queryByLabelText(/confirm password/i)).not.toBeInTheDocument();
    });

    it('renders sign up form when "Sign Up" tab is selected', async () => {
        renderComponent(['/auth?tab=signup']);
        
        await waitFor(() => {
            expect(screen.getByTestId('username-input-test-id')).toBeInTheDocument();
            expect(screen.getByTestId('email-input-test-id')).toBeInTheDocument();
            expect(screen.getByTestId('password-test-id')).toBeInTheDocument();
            expect(screen.getByTestId('confirm-password-test-id')).toBeInTheDocument();
        });
    });

    it('calls handleLoginSubmit with correct data when login form is submitted', async () => {
        const mockHandleLoginSubmit = jest.fn();
        render(
        <Router>
            <AuthPage />
        </Router>
        );

        const usernameInput = screen.getByTestId('login-username-input-test-id');
        const passwordInput = screen.getByTestId('login-password-input-test-id');

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            expect(console.log).toHaveBeenCalledWith('Login successful');
        });
    });

    it('calls handleSignUpSubmit with correct data when sign up form is submitted', async () => {
        const mockHandleSignUpSubmit = jest.fn();
        renderComponent(['/auth?tab=signup']);

        const usernameInput = screen.getByTestId('username-input-test-id');
        const emailInput = screen.getByTestId('email-input-test-id');

        const passwordInput = screen.getByTestId('password-test-id');
        const confirmInput = screen.getByTestId('confirm-password-test-id');
        
        fireEvent.change(usernameInput, { target: { value: 'newuser' } });
        fireEvent.change(emailInput, { target: { value: 'newuser@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
        fireEvent.change(confirmInput, { target: { value: 'Password123!' } });
        fireEvent.click(screen.getByTestId('signup-button-test-id'));
    

        await waitFor(() => {
            expect(console.log).toHaveBeenCalledWith('Sign-up successful');
        });
    });

    const loginScenariosValidation = [
        {
          username: '',
          password: '',
          expectedErrors: [
            'Username must be a single word without spaces, whitespace, or special characters.',
            "Password is required."
        ]
        },
        {
          username: 'testuser',
          password: '',
          expectedErrors: [
            'Password is required.'
          ]
        },
        {
          username: 'user',
          password: 'Password123',
          expectedErrors: [
            'Username must be at least 5 characters long.',
            PW_ERROR          
            ]
        },
        {
            username: 'user1',
            password: 'PASSWORD1234!',
            expectedErrors: [
              PW_ERROR          
              ]
          },
        {
          username: 'user',
          password: '',
          expectedErrors: [
            'Username must be at least 5 characters long.',
            'Password is required.'
          ]
        },
        {
          username: 'user',
          password: 'pass!',
          expectedErrors: [
            PW_ERROR,
            'Username must be at least 5 characters long.',
          ]
        },
        {
          username: 'user',
          password: 'Password123',
          expectedErrors: [
            PW_ERROR
          ]
        },
        {
          username: 'user',
          password: 'Password!',
          expectedErrors: [
            PW_ERROR
          ]
        },
        {
          username: 'user',
          password: 'pass!',
          expectedErrors: [
            PW_ERROR,
            'Username must be at least 5 characters long.'
          ]
        },
    ];
      
    it.each(loginScenariosValidation)(
        'displays errors when validation fails for username: "$username" and password: "$password"',
        async ({ username, password, expectedErrors }) => {
          renderComponent();
    
          fireEvent.change(screen.getByLabelText(/username/i), { target: { value: username } });
          fireEvent.change(screen.getByLabelText(/password/i), { target: { value: password } });
          fireEvent.click(screen.getByRole('button', { name: /login/i }));
    
          await waitFor(() => {
            expectedErrors.forEach(error => {
              expect(screen.getByText(new RegExp(error, 'i'))).toBeInTheDocument();
            });
          });
        }
    );

    
    const signUpScenariosValidation = [
        {
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          expectedErrors: [
            'Username must be a single word without spaces, whitespace, or special characters',
            'A valid email is required.',
            'Password is required.',
            'Confirm password is required.'
          ]
        },
        {
          username: 'testuser',
          email: '',
          password: 'PASSWORD123!',
          confirmPassword: '',
          expectedErrors: [
            'A valid email is required.',
            'Password must contain at least one lowercase letter.',
            'Confirm password is required.'
          ]
        },
        {
          username: '',
          email: 'test@example.com',
          password: '',
          confirmPassword: '',
          expectedErrors: [
            'Username must be a single word without spaces, whitespace, or special characters.',
            'Password is required.',
            'Confirm password is required.'
          ]
        },
        {
          username: 'user',
          email: '',
          password: 'pass',
          confirmPassword: 'password',
          expectedErrors: [
            'Username must be at least 5 characters long.',
            'A valid email is required.',
            'Password must be at least 8 characters long. Password must contain at least one uppercase letter. Password must contain at least one digit. Password must contain at least one special character.',
            'Passwords do not match.'
          ]
        },
        // Add more scenarios as needed
      ];
      
    it.each(signUpScenariosValidation)(
        'displays errors when validation fails for username: "$username", email: "$email", password: "$password", confirmPassword: "$confirmPassword"',
        async ({ username, email, password, confirmPassword, expectedErrors }) => {
            renderComponent(['/auth?tab=signup']);
        
            fireEvent.change(screen.getByLabelText(/username/i), { target: { value: username } });
            fireEvent.change(screen.getByLabelText(/email/i), { target: { value: email } });
            fireEvent.change(screen.getByTestId('password-test-id'), { target: { value: password } });
            fireEvent.change(screen.getByTestId('confirm-password-test-id'), { target: { value: confirmPassword } });
            fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
        
            await waitFor(() => {
                expectedErrors.forEach(error => {
                expect(screen.getByText(new RegExp(error))).toBeInTheDocument();
                });
            });
        }
    );

    it('updates the URL when tab is changed', async () => {
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);
        render(
            <MemoryRouter> {/* Wrap the component in MemoryRouter */}
              <AuthPage />
            </MemoryRouter>
          );
      

        fireEvent.click(screen.getByTestId('signup-tab-testid'));
        
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/auth?tab=signup');
        });
  });
});
