import api from './api';

export const reservationService = {
  getAll: async (params = {}) => {
    const response = await api.get('/reservations', { params });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/reservations/${id}`);
    return response.data;
  },

  create: async (reservationData: any) => {
    const response = await api.post('/reservations', reservationData);
    return response.data;
  }
};
