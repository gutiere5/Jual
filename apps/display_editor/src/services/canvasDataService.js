import apiClient from '../api/client';

export const canvasDataService = {
  createCanvasData: async ({ name, content }) => {
    const response = await apiClient.post('canvas', {
      name: name,
      content: content,
    });
    return response.data[0];
  },
};
