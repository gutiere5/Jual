import { QueryClient, queryOptions } from '@tanstack/react-query';
import { canvasObjectService } from '../services/canvas-service';
import { CanvasObject } from '@repo/types/canvasObject.schema';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 60 * 1000,
      gcTime: 60 * 60 * 1000,
      retry: 3,
    },
  },
});

const canvasKeys = {
  all: ['canvas'] as const,
  list: () => [...canvasKeys.all, 'list'] as const,
  canvas: (id: string) => [...canvasKeys.list(), id] as const,
};

export function listCanvasQueryOptions() {
  return queryOptions({
    queryKey: canvasKeys.list(),
    queryFn: canvasObjectService.getAll,
  });
}

export function canvasQueryOptions(id: string) {
  return queryOptions({
    queryKey: canvasKeys.canvas(id),
    queryFn: () => canvasObjectService.getById(id),
    initialData: () => {
      const canvases = queryClient.getQueryData<CanvasObject[]>(canvasKeys.list());
      return canvases?.find((canvas: CanvasObject) => canvas.id === Number(id));
    },
  });
}

export default queryClient;
