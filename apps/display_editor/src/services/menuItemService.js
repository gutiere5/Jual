import axiosClient from '../api/axios-client';

export const menuItemService = {
  getAll: async () => {
    const response = await axiosClient.get('/item');
    const parsedItems = Array.isArray(response.data) ? response.data : (response.data?.items ?? []);

    return parsedItems;
  },
};
