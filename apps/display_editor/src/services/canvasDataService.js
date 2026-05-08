import axiosClient from '../api/axios-client';

export const canvasDataService = {
  createCanvasData: async ({ name, content }) => {
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
};
