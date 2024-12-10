import axios from 'axios';

// Create an instance of Axios with default settings
const Axios = axios.create({
  // baseURL: 'https://playelevens-backend.onrender.com/api',  // Replace with your base URL
  baseURL: 'http://localhost:2005/api',  // Replace with your base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

Axios.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage or wherever you're storing it
    const account_Id = localStorage.getItem('x-token');  // or get it from Redux store

    if (account_Id) {
      // Attach the token to the headers
      config.headers['x-auth-token'] = `${account_Id}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Axios;
