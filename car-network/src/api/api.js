import axios from 'axios';

const API_BASE_URL = 'https://0o85tmys9f.execute-api.us-east-1.amazonaws.com/Main';

const token = localStorage.getItem('access_token');

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
});




// Add a request interceptor
// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem('access_token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

// Add a response interceptor
apiClient.interceptors.response.use((response) => {
  return response;
}, (error) => {
  // Handle token refresh logic, logging out, etc.
  return Promise.reject(error);
});

export const fetchUsers = () => apiClient.get('/user-management/users');
export const fetchUserById = (id) => apiClient.get(`/user-management/user/${id}`);
export const createUser = (userData) => apiClient.post('/user-management/user', userData);
export const generateFeed = (user_id) => apiClient.get(`/feed${user_id}`);
// Add other API methods as needed
