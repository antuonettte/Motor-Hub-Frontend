import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'https://0o85tmys9f.execute-api.us-east-1.amazonaws.com/Main';

// Create an axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token from cookies
apiClient.interceptors.request.use(config => {
  const token = Cookies.get('access_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Add a response interceptor
apiClient.interceptors.response.use(response => {
  return response;
}, error => {
  // Handle token refresh logic, logging out, etc.
  console.log(error)
  return Promise.reject(error);
});

export const fetchUsers = () => apiClient.get('/user-management/users');
export const fetchUserById = (id) => apiClient.get(`/user-management/user/?id=${id}`);
export const createUser = (userData) => apiClient.post('/user-management/user', userData);
export const generateFeed = (user_id) => apiClient.get(`/feed/?user_id=${user_id}`);
export const fetchPostsByUser = (user_id, current_user_id) => apiClient.get(`/post-management/posts?user_id=${user_id}&current_user_id=${current_user_id}`);
export const likePost = (user_id, post_id) => apiClient.post(`/post-management/like?user_id=${user_id}&post_id=${post_id}`)
export const search = (query) => apiClient.get(`/search?query=${query}`)

export default apiClient;
