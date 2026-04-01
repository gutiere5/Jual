import axiosClient from '../api/axios-client';

const ITEMS_CACHE_KEY = 'display_editor_items_cache_v1';
const ITEMS_CACHE_TIME_KEY = 'display_editor_items_cache_time_v1';

// Optional TTL (default 24h). Set to 0 to never expire.
const ITEMS_CACHE_TTL_MS = Number(import.meta.env.VITE_ITEMS_CACHE_TTL_MS ?? 24 * 60 * 60 * 1000);

const readCache = () => {
  try {
    const raw = localStorage.getItem(ITEMS_CACHE_KEY);
    const time = Number(localStorage.getItem(ITEMS_CACHE_TIME_KEY) || 0);
    if (!raw) return null;

    const isExpired = ITEMS_CACHE_TTL_MS > 0 && Date.now() - time > ITEMS_CACHE_TTL_MS;

    if (isExpired) {
      localStorage.removeItem(ITEMS_CACHE_KEY);
      localStorage.removeItem(ITEMS_CACHE_TIME_KEY);
      return null;
    }

    return JSON.parse(raw);
  } catch {
    localStorage.removeItem(ITEMS_CACHE_KEY);
    localStorage.removeItem(ITEMS_CACHE_TIME_KEY);
    return null;
  }
};

const writeCache = (items) => {
  localStorage.setItem(ITEMS_CACHE_KEY, JSON.stringify(items));
  localStorage.setItem(ITEMS_CACHE_TIME_KEY, String(Date.now()));
};

export const menuItemService = {
  getAll: async ({ forceRefresh = false } = {}) => {
    if (!forceRefresh) {
      const cached = readCache();
      if (cached) return cached;
    }

    const response = await axiosClient.get('/item');
    const parsedItems = Array.isArray(response.data) ? response.data : (response.data?.items ?? []);

    writeCache(parsedItems);
    return parsedItems;
  },

  clearCache: () => {
    localStorage.removeItem(ITEMS_CACHE_KEY);
    localStorage.removeItem(ITEMS_CACHE_TIME_KEY);
  },
};
