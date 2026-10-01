import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global error handling, e.g. redirect on 401
    if (error.response?.status === 401) {
      // Do not trigger global redirect if we are just checking auth status
      if (error.config?.url === '/api/v1/auth/me') {
        return Promise.reject(error);
      }
      
      if (typeof window !== 'undefined') {
        const path = window.location.pathname;
        // Don't redirect if already on a login/register page
        const isAuthPage = path.startsWith('/account/login') || path.startsWith('/account/register') || path.startsWith('/login') || path.startsWith('/admin-login');
        
        if (!isAuthPage) {
          if (path.startsWith('/superadmin') || path.startsWith('/admin')) {
            window.location.href = '/admin-login';
          } else if (path.startsWith('/dashboard') || path.startsWith('/payment')) {
            window.location.href = '/account/login';
          }
          // Note: Public pages like '/' shouldn't force redirect on general 401s
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
