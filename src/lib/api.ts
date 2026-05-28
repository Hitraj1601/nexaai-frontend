/**
 * API URL helpers.
 *
 * `VITE_API_BASE_URL` may be configured as either:
 * - server origin (e.g. https://example.com)
 * - API base (e.g. https://example.com/api)
 *
 * This module normalizes to an API base that contains exactly one trailing `/api`.
 */

const stripTrailingSlashes = (value: string): string => value.replace(/\/+$/, '');

const DEFAULT_API_BASE_URL = import.meta.env.PROD
  ? 'https://nexaai-backend.onrender.com/api'
  : 'http://localhost:3000/api';

const normalizeToApiBase = (value: string): string => {
  const base = stripTrailingSlashes(value);
  return base.endsWith('/api') ? base : `${base}/api`;
};

// Required by the app: Vite env var (baked at build time)
const RAW_API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim();
// Backward compatible alias (older env files)
const RAW_API_URL = (import.meta.env.VITE_API_URL as string | undefined)?.trim();

const RESOLVED_API_BASE_URL = normalizeToApiBase(
  (RAW_API_BASE_URL && RAW_API_BASE_URL.length > 0
    ? RAW_API_BASE_URL
    : RAW_API_URL && RAW_API_URL.length > 0
      ? RAW_API_URL
      : DEFAULT_API_BASE_URL)
);

export const API_BASE_URL = RESOLVED_API_BASE_URL;

export const getApiBaseUrl = (): string => {
  return RESOLVED_API_BASE_URL;
};

export const toApiUrl = (path: string): string => {
  const apiBase = RESOLVED_API_BASE_URL;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${apiBase}${normalizedPath}`;
};
