import type { ApiResponse, ApiError } from "@/types/api";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";
let csrfToken: string | null = null;

export async function ensureCsrfToken() {
  if (csrfToken) return csrfToken;

  const res = await fetch(`${API_BASE_URL}/api/v1/auth/csrf-token`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch CSRF token");
  }

  const data = await res.json();
  csrfToken = data.csrf_token;

  return csrfToken;
}

type ApiFetchOptions = RequestInit & {
  skipCsrf?: boolean;
};

export async function apiFetch<T> (
  path: string,
  options: ApiFetchOptions = {}
): Promise<ApiResponse<T>> {
  const { skipCsrf, headers, ...rest } = options

  const finalHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...(headers as Record<string, string>),
  }

  if (!skipCsrf && rest.method && rest.method !== "GET") {
    const token = await ensureCsrfToken();

    if (!token) {
      throw new Error("CSRF token missing");
    }

    finalHeaders["X-CSRFToken"] = token;
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    headers: finalHeaders,
    ...rest
  });

  const data = await res.json()

  if (!res.ok) {
    const apiError: ApiError = {
      status: res.status,
      message: data?.message ?? "Something went wrong",
      data: data?.data?? null,
    };

    throw apiError;
  }

  return data;
}
