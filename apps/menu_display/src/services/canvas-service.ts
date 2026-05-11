import { z } from 'zod';
import AxiosClient from '../api/axios-client';
import { CanvasObjectSchema, CanvasObject } from '@repo/types/canvasObject.schema';

export const canvasObjectService = {
  getAll: async (): Promise<CanvasObject[]> => {
    const response = await AxiosClient.get<CanvasObject[]>('canvas');
    const parsed = z.array(CanvasObjectSchema).safeParse(response.data);

    if (!parsed.success) {
      const errorDetails = z.prettifyError(parsed.error);
      throw new Error(`Schema validation failed:\n${errorDetails}`);
    }

    return parsed.data;
  },

  // getById: async (id: number): Promise<CanvasObject> => {
  //   const response = await AxiosClient.get<CanvasObject>(`canvas/${id}`);

  //   console.log(response);
  //   return response.data;
  //   // const parsed = CanvasObjectSchema.safeParse(response.data);

  //   // if (!parsed.success) {
  //   //   const errorDetails = z.prettifyError(parsed.error);
  //   //   throw new Error(`Schema validation failed:\n${errorDetails}`);
  //   // }

  //   // return parsed.data;
  // },
};

// Axios Client Mocked
// Maybe Mock zod
// Mock axios return
// mock zod parse
// Verify axios and zod called

// throw error if validation went wrong
