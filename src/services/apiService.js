// Base URL for the API
const BASE_URL = 'http://127.0.0.1:8000'; // TODO change for higher envs

// Helper function to make fetch requests
const makeRequest = async (url, options) => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

// Example function to fetch data from an endpoint
export const fetchData = async (endpoint) => {
  const url = `${BASE_URL}${endpoint}`;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  return makeRequest(url, options);
};

// Example function to post data to an endpoint
export const postData = async (endpoint, data) => {
  const url = `${BASE_URL}${endpoint}`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  
  return makeRequest(url, options);
};

// Function to log in
export const login = async (username, password) => {
  const data = new URLSearchParams({
    username,
    password,
    grant_type: 'password',
  }).toString();

  const url = `${BASE_URL}/login`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: data,
  };

  return makeRequest(url, options);
};