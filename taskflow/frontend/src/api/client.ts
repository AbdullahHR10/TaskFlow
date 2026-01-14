/**
 * API client configuration and helpers.
 *
 * Centralizes axios setup, base URL configuration,
 * and CSRF token handling for authenticated requests.
 */
import axios, { AxiosHeaders, AxiosError, type AxiosRequestConfig} from "axios";
import type { ApiResponse, ApiError } from "@/types/api";

/**
 * Base URL for all API requests.
 * Falls back to localhost in development.
 */
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";

/**
 * Cached CSRF token.
 * Fetched once per session and reused for subsequent requests.
 */
let csrfToken: string | null = null;

/**
 * Ensures a valid CSRF token is available.
 *
 * - Fetches the token from the backend if not cached.
 * - Stores it in memory for reuse.
 * - Includes credentials to allow cookie-based auth.
 *
 * @returns CSRF token.
 * @throws Error if the token cannot be fetched.
 */
export async function ensureCsrfToken() {
  if (csrfToken) return csrfToken;

  const res = await axios.get(`${API_BASE_URL}/api/v1/auth/csrf-token`, {
    withCredentials: true,
  });

  csrfToken = res.data.csrf_token;
  return csrfToken;
}

/**
 * Shared Axios instance for all API requests.
 *
 * Handles:
 * - Base URL configuration
 * - Credentials (cookies)
 * - CSRF protection
 * - Consistent error handling
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request interceptor responsible for CSRF protection.
 *
 * - Automatically attaches the CSRF token to all non-idempotent requests.
 * - Skips CSRF injection when `X-Skip-CSRF` header is present.
 * - Cleans up internal headers before sending the request.
 */
api.interceptors.request.use(async (config) => {
  const method = config.method?.toUpperCase();

  if (method && method !== "GET" && !config.headers?.["X-Skip-CSRF"]) {
    const token = await ensureCsrfToken();

    if (token) {
      config.headers = AxiosHeaders.from(config.headers);
      config.headers?.set("X-CSRFToken", token)
    }
  }

  if (config.headers?.has("X-Skip-CSRF")) {
    delete config.headers["X-Skip-CSRF"];
  }

  return config;
});

/**
 * Normalizes Axios errors into a consitent ApiError shape. 
 *
 * @param error Axios error instance
 * @returns Normalized ApiError object
 */
function normalizeAxiosError(error: AxiosError): ApiError {
  const data: any = error.response?.data;

  return {
    status: error.response?.status ?? 500,
    message: data?.message ?? "Something went wrong",
    data: data?.data ?? null,
  }
}

/**
 * More options supported by apiFetch.
 */
type ApiFetchOptions = AxiosRequestConfig & {
  skipCsrf?: boolean;
};

/**
 * Centralized API request helper.
 *
 * - Wraps Axios requests
 * - Preserves ApiResponse<T> typing
 * - Automatically handles CSRF and credentials
 * - Normalizes backend errors
 *
 * @param path API endpoint path
 * @param options Axios request configuration
 * @returns ApiResponse<T>
 * @throws ApiError on request failure
 */
export async function apiFetch<T> (
  path: string,
  options: ApiFetchOptions = {}
): Promise<ApiResponse<T>> {
  const { skipCsrf, headers, ...rest } = options

  try {
    const res = await api.request<ApiResponse<T>>({
      url: path,
      headers: {
        ...headers,
        ...(skipCsrf ? { "X-Skip-CSRF": "1" }: {}),
      },
      ...rest
    });

    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw normalizeAxiosError(err);
    };

    throw err;
  }
}
