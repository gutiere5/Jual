import axiosClient from '../api/axios-client';

export const canvasDataService = {
  createCanvasData: async ({ name, content }) => {
    const response = await axiosClient.post('canvas', {
      name: name,
      content: content,
    });
    return response.data[0];
  },
};
