import axios from 'axios';

// Base URL for the API
const BASE_URL = 'http://127.0.0.1:8000'; // TODO change for higher envs

// Create an axios instance with default configurations
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // You can set other default headers here
  },
});

// API service functions

// Example function to fetch data from an endpoint
export const fetchData = async (endpoint) => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

// Example function to post data to an endpoint
export const postData = async (endpoint, data) => {
  try {
    const response = await apiClient.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

// Add more API functions as needed

