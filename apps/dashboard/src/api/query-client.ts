import { QueryClient, queryOptions } from '@tanstack/react-query';
import { itemService } from '../services/itemServices';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000,
      gcTime: 60 * 60 * 1000,
      retry: 3,
    },
  },
});

const itemKeys = {
  all: ['items'] as const,
  list: () => [...itemKeys.all, 'list'] as const,
};

export function listItemsQueryOptions() {
  return queryOptions({
    queryKey: itemKeys.list(),
    queryFn: itemService.getAll,
  });
}

export default queryClient;
