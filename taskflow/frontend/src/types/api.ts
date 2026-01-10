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
