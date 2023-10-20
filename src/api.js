import axios from 'axios';

// Create an axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

api.interceptors.request.use(function (config) {
  if (config.url !== '/login' && config.url !== '/token/refresh' && config.url !== '/signup') {
    const token = localStorage.getItem('access_token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
  }
  return config;
});


// Add an interceptor to handle 401 Unauthorized responses
api.interceptors.response.use(
  response => response,
  async error => {
    if (!error.config.bypassInterceptor && error.response && error.response.status === 401) {
        // Attempt to refresh the token
        const res = await refreshToken();
        // Update the access token in localStorage
        localStorage.setItem('access_token', res.data.access_token);
        // Retry the original request with the new token
        const originalRequest = error.config;
        originalRequest.headers['Authorization'] = 'Bearer ' + res.data.access_token;
        return await api(originalRequest);
    }

    return Promise.reject(error);
  }
);

async function refreshToken() {
  const refreshToken = localStorage.getItem('refresh_token');
  if (!refreshToken) {
    // Handle missing refresh token
    console.error('No refresh token found');
    // logout();
    // Redirect to login, etc.
    return Promise.reject(new Error('No refresh token found'));
  }
  try {
    return await api.post('/token/refresh', {}, {
      headers: {
        'Authorization': `Bearer ${refreshToken}`
      }
    });
  } catch (error) {
    console.error('Error refreshing token:', error);
    return await Promise.reject(error);
  }
}


export default api;