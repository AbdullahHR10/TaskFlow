export interface ApiResponse<T = unknown> {
  status: "success" | "error";
  message?: string;
  data?: T;
}

export type ApiError = {
  status: number;
  message: string;
  data?: Record<string, string[]>;
};

export interface PaginatedData<T> {
  items: T[];
  total: number;
  pages: number;
  current_page: number;
  per_page: number;
}

export type PaginatedResponse<T> = ApiResponse<PaginatedData<T>>;
