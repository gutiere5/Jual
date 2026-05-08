import axiosClient from '../api/axios-client';

export const canvasDataService = {
  createCanvas: async (name, content) => {
    const response = await axiosClient.post('canvas', {
      name: name,
      content: content,
    });
    return response.data[0];
  },
  getAll: async () => {
    const response = await axiosClient.get('canvas');
    return response.data;
  },
  deleteById: async (id) => {
    const response = await axiosClient.delete(`canvas/${id}`);
    return response.data;
  },
};
