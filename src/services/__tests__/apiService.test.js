import { fetchData, postData, login } from '../apiService'; // Adjust the import path

describe('API Service Tests', () => {
    let mockConsoleError;

  // Set up fetch mock
    beforeEach(() => {
        mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
        global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({}),
            ok: true,
        })
        );
    });
  
    afterEach(() => {
        jest.resetAllMocks();
        mockConsoleError.mockRestore();
      });
    test('fetchData fetches data successfully', async () => {
        // Set up mock response
        global.fetch.mockImplementationOnce(() =>
        Promise.resolve({
            json: () => Promise.resolve({ data: 'test data' }),
            ok: true,
        })
        );
    
        const data = await fetchData('/test-endpoint');
        expect(data).toEqual({ data: 'test data' });
        expect(fetch).toHaveBeenCalledWith('http://127.0.0.1:8000/test-endpoint', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        });
    });
  
    test('postData posts data successfully', async () => {
        // Set up mock response
        global.fetch.mockImplementationOnce(() =>
        Promise.resolve({
            json: () => Promise.resolve({ success: true }),
            ok: true,
        })
        );
    
        const response = await postData('/test-endpoint', { key: 'value' });
        expect(response).toEqual({ success: true });
        expect(fetch).toHaveBeenCalledWith('http://127.0.0.1:8000/test-endpoint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key: 'value' }),
        });
    });
  
    test('login logs in successfully', async () => {
        // Set up mock response
        global.fetch.mockImplementationOnce(() =>
        Promise.resolve({
            json: () => Promise.resolve({
            username: 'testuser',
            email: 'test@example.com',
            role: 'user',
            access_token: 'sampleAccessToken',
            token_type: 'bearer',
            }),
            ok: true,
        })
        );
    
        const response = await login('dcingoez', 'Asdf1234!');
        expect(response).toEqual({
        username: 'testuser',
        email: 'test@example.com',
        role: 'user',
        access_token: 'sampleAccessToken',
        token_type: 'bearer',
        });
        expect(fetch).toHaveBeenCalledWith('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            username: 'dcingoez',
            password: 'Asdf1234!',
            grant_type: 'password',
        }).toString(),
        });
    });

    test('fetchData handles errors properly', async () => {
        // Set up mock response with an error
        global.fetch.mockImplementationOnce(() =>
          Promise.resolve({
            ok: false,
            status: 500,
            text: () => Promise.resolve('Internal Server Error'),
          })
        );
      
        await expect(fetchData('/test-endpoint')).rejects.toThrow('HTTP error! status: 500, message: Internal Server Error');
      });
      
      test('postData handles errors properly', async () => {
        // Set up mock response with an error
        global.fetch.mockImplementationOnce(() =>
          Promise.resolve({
            ok: false,
            status: 400,
            text: () => Promise.resolve('Bad Request'),
          })
        );
      
        await expect(postData('/test-endpoint', { key: 'value' })).rejects.toThrow('HTTP error! status: 400, message: Bad Request');
      });
      
      test('login handles errors properly', async () => {
        // Set up mock response with an error
        global.fetch.mockImplementationOnce(() =>
          Promise.resolve({
            ok: false,
            status: 401,
            text: () => Promise.resolve('Unauthorized'),
          })
        );
      
        await expect(login('dcingoez', 'Asdf1234!')).rejects.toThrow('HTTP error! status: 401, message: Unauthorized');
      });
});