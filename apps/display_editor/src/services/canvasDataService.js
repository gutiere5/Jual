import apiClient from '../api/client';

export const canvasDataService = {
  createCanvasData: async ({ name, content }) => {
    try {
      const response = await apiClient.post('canvas', {
        name: name,
        content: content,
      });
      return response.data[0];
    } catch (error) {
      throw error;
    }
  },
};
