import { beforeEach, vi, describe, it, expect } from 'vitest';
import { canvasObjectService } from './canvas-service';

const canvasObject = {
  id: 1,
  name: 'Sample Canvas',
  content: {
    items: [],
    canvasSettings: {
      width: 1920,
      height: 1080,
      backgroundColor: '#ffffff',
      showGrid: true,
      gridSize: 20,
    },
  },
  createdAt: '2026-05-09T00:00:00.000Z',
  updatedAt: '2026-05-09T00:00:00.000Z',
};

describe('canvasObjectService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getAll returns validated canvas objects', async () => {
    await expect(canvasObjectService.getAll()).resolves.toEqual([canvasObject]);
  });
});
