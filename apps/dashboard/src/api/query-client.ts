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
  details: (id: number) => [...itemKeys.all, 'details', id] as const,
};

export function listItemsQueryOptions() {
  return queryOptions({
    queryKey: itemKeys.list(),
    queryFn: itemService.getAll,
  });
}

export function itemQueryOptions(id: number) {
  return queryOptions({
    queryKey: itemKeys.details(id),
    queryFn: () => itemService.getById(id),
  });
}

export default queryClient;
