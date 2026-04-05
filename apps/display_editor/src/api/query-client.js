import { mutationOptions, QueryClient, queryOptions } from '@tanstack/react-query';
import { r2Service } from '../services/r2-service';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

export function listImageQueryOptions() {
  return queryOptions({
    queryKey: ['listImages'],
    queryFn: r2Service.listObjects,
  });
}

export function uploadFileQueryOptions() {
  return mutationOptions({
    mutationKey: ['uploadFile'],
    mutationFn: ({ fileName, fileContent }) => r2Service.uploadObject({ fileName, fileContent }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['listImages'] });
    },
  });
}

export function deleteFileMutationOptions() {
  return mutationOptions({
    mutationKey: ['deleteImage'],
    mutationFn: ({ imageUrl }) => r2Service.deleteObject({ imageUrl }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['listImages'] });
    },
  });
}

export default queryClient;
