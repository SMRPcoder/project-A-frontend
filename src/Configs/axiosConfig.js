// axiosConfig.js

import axios from 'axios';

const Axios = axios.create({
  // Set your API base URL and other default configurations
  timeout: 10000, // Adjust the timeout as needed
});

// Add an interceptor to handle 401 errors
Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirect to the login page or any other route you desire
      localStorage.clear();
      window.location.href = '/app/login';
      // You can also use React Router's history object to programmatically navigate
      // history.push('/login');
    }
    return Promise.reject(error);
  }
);

export default Axios;
