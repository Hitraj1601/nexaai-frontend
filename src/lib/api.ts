/**
 * API URL helpers.
 *
 * `VITE_API_URL` may be configured as either:
 * - server origin (e.g. https://example.com)
 * - API base (e.g. https://example.com/api)
 *
 * This module normalizes to an API base that contains exactly one trailing `/api`.
 */

const DEFAULT_SERVER_ORIGIN = 'http://localhost:3000';

const stripTrailingSlashes = (value: string): string => value.replace(/\/+$/, '');

export const getApiBaseUrl = (): string => {
  const raw = (import.meta.env.VITE_API_URL as string | undefined)?.trim();

  // Keep existing behavior: if env var is missing, assume local backend.
  // (This avoids surprising 404s against the Vite dev server.)
  const base = stripTrailingSlashes(raw && raw.length > 0 ? raw : DEFAULT_SERVER_ORIGIN);

  // If the user already provided `/api`, don't append it again.
  if (base.endsWith('/api')) return base;
  return `${base}/api`;
};

export const toApiUrl = (path: string): string => {
  const apiBase = getApiBaseUrl();
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${apiBase}${normalizedPath}`;
};
