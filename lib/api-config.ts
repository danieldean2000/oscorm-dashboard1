/**
 * API Configuration
 * Centralized configuration for API base URL
 */

export const getApiBaseUrl = (): string => {
  return process.env.NEXT_PUBLIC_API_URL || '';
};

export const getApiUrl = (endpoint: string): string => {
  const baseUrl = getApiBaseUrl();
  // Remove leading slash from endpoint if present
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${baseUrl}/${cleanEndpoint}`;
};

// Common API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: getApiUrl('api/auth/login'),
  },
  USERS: {
    BASE: getApiUrl('api/users'),
    STATS: getApiUrl('api/users/stats'),
  },
  CATEGORIES: {
    BASE: getApiUrl('api/categories'),
  },
  BLOG_POSTS: {
    BASE: getApiUrl('api/blog-posts'),
  },
} as const;

