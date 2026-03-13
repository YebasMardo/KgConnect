import api from './api';

export const tripService = {
  getAll: async (params = {}) => {
    const response = await api.get('/trips', { params });
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get(`/trips/${id}`);
    return response.data;
  },

  create: async (tripData: any) => {
    const response = await api.post('/trips', tripData);
    return response.data;
  }
};
