import api from './api';

export const authService = {
  login: async (credentials: any) => {
    const response = await api.post('/login_check', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  register: async (userData: any) => {
    const response = await api.post('/register', userData);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/me');
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  }
};
