import { mutationOptions, QueryClient, queryOptions } from '@tanstack/react-query';
import { r2Service } from '../services/r2-service';
import { menuItemService } from '../services/menuItemService';
import { canvasDataService } from '../services/canvasDataService';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
      retry: 3,
    },
  },
});

const imageKeys = {
  all: ['images'],
  list: () => [...imageKeys.all, 'list'],
  upload: () => [...imageKeys.all, 'upload'],
  delete: () => [...imageKeys.all, 'delete'],
};

const menuItemKeys = {
  all: ['menuItems'],
  list: () => [...menuItemKeys.all, 'list'],
};

const canvasDataKeys = {
  all: ['canvasData'],
  list: () => [...canvasDataKeys.all, 'list'],
};

export function listImageQueryOptions() {
  return queryOptions({
    queryKey: imageKeys.list(),
    queryFn: r2Service.listObjects,
  });
}

export function uploadFileQueryOptions() {
  return mutationOptions({
    mutationKey: imageKeys.upload(),
    mutationFn: ({ fileName, fileContent }) => r2Service.uploadObject({ fileName, fileContent }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: imageKeys.all,
      });
    },
  });
}

export function deleteFileMutationOptions() {
  return mutationOptions({
    mutationKey: imageKeys.delete(),
    mutationFn: ({ imageUrl }) => r2Service.deleteObject({ imageUrl }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: imageKeys.all,
      });
    },
  });
}

export function listMenuItemsQueryOptions() {
  return queryOptions({
    queryKey: menuItemKeys.list(),
    queryFn: menuItemService.getAll,
  });
}

export function listCanvasDataQueryOptions() {
  return queryOptions({
    queryKey: canvasDataKeys.list(),
    queryFn: canvasDataService.getAll,
  });
}

export default queryClient;
