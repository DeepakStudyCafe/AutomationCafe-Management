import { redisClient } from '../config/redis';

export const invalidateCache = async (pattern: string) => {
  try {
    const keys = await redisClient.keys(pattern);
    if (keys.length > 0) {
      await redisClient.del(keys);
    }
  } catch (error) {
    console.error('Failed to invalidate cache:', error);
  }
};

export const CACHE_KEYS = {
  DASHBOARD_STATS: 'dashboard:stats',
  PUBLIC_PLANS: 'public:plans',
  BLOGS_LIST: 'public:blogs',
};
