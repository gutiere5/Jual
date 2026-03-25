import apiClient from '../api/client';
import { CanvasFileData } from '@repo/types/canvasItem.schema';
import { z } from 'zod';

export const canvasDataService = {
  getAllCanvasData: async () => {
    try {
      const response = await apiClient.get<{ canvasData: CanvasFileData[] }>('canvas');
      const parsed = z.array(CanvasFileData).safeParse(response.data.canvasData);
      if (!parsed.success) {
        const errorDetails = z.prettifyError(parsed.error);
        throw new Error(`Schema validation failed:\n${errorDetails}`);
      }

      return response.data.canvasData;
    } catch (error) {
      throw new Error(
        `Failed to fetch canvas data from service ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  },
};
