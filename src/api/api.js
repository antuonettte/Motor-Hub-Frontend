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
export const updateUrl = (media_key, post_id) => apiClient.patch(`/media/update-url`, {"media_key": media_key, "post_id": post_id})
export const processMedia = (media_key, post_id, user_id) => apiClient.post('/media', {
  "media_key":media_key,
    "post_id":post_id,
    "user_id":user_id
  })
export const postComment = (post_id, user_id, username, content) => apiClient.post(`/comments`, 
  {"post_id": post_id, 
    "user_id": user_id, 
    "content": content,
    "username": username

  });
export const createPost = (user_id, username, post_text, media) => apiClient.post("/post-management/post", {
  "user_id": user_id,
  "username":username,
  "post_text":post_text,
  "media_files": media
})

export const uploadFile = (file, url) => {
  return axios.put(url, file, {
    headers: {
      'Content-Type': file.type,
    },
  });
};

export const uploadFilesToUrls = async (response, files) => {
  console.log('Response: ', response)
  const { upload_urls, media_keys } = response;

  if (upload_urls.length !== files.length || upload_urls.length !== media_keys.length) {
    throw new Error('The number of files, URLs, and media keys must match');
  }

  const uploadPromises = files.map((file, index) => {
    const url = upload_urls[index];
    return uploadFile(file, url);
  });

  try {
    await Promise.all(uploadPromises);
    console.log('All files uploaded successfully');
  } catch (error) {
    console.error('Error uploading files:', error);
  }
};

export const processMediaUpload = async (response, user_id) => {
  console.log('Response: ', response)
  const { media_keys, post_id } = response;


  const mediaProcessingPromise = media_keys.map((media_key, index) => {
    return processMedia(media_key, post_id, user_id)
  });

  try {
    await Promise.all(mediaProcessingPromise);
    console.log('All files processed successfully');
  } catch (error) {
    console.error('Error processing files:', error);
  }
};

export default apiClient;
