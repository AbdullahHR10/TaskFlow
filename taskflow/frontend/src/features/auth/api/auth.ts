/**
 * Authentication API requests handler.
 */
import { apiFetch } from "../../../api/client";
import type { SignupPayload, LoginPayload } from "@/features/auth/types/payloads";
import type { User } from "@/types/user";

/**
 * Base path for authentication-related endpoints.
 */
const AUTH_API_URL = "/api/v1/auth"

/**
 * Authentication API wrapper.
 *
 * Handles:
 * - User signup.
 * - Login & logout.
 * - Fetching the currently authenticated user.
 */
export const authApi = {
  /**
   * Registers a new user.
   *
   * - Maps `confirmPassword` to backend-required `confirm_password`.
   * - Uses cookie-based authentication.
   *
   * @param data Signup payload.
   */
  signup: async (data: SignupPayload): Promise<void> => {
    const { confirmPassword, ...rest } = data;

    await apiFetch(`${AUTH_API_URL}/signup`, {
      method: "POST",
      data: {
        ...rest,
        confirm_password: confirmPassword,
      }
    });
  },

  /**
   * Logs in a user using provided credentials.
   *
   * @param data Login payload.
   */
  login: async (data: LoginPayload): Promise<void> => {
    await apiFetch(`${AUTH_API_URL}/login`, {
      method: "POST",
      data,
    });
  },

  /**
   * Logs out the current user.
   */
  logout: async (): Promise<void> => {
    await apiFetch(`${AUTH_API_URL}/logout`, {
      method: "POST",
    });
  },

  /**
   * Retrieves the currently authenticated user.
   *
   * @returns User object.
   * @throws Error if the API does not return a user.
   */
  getCurrentUser: async (): Promise<User> => {
    const res = await apiFetch<User>(`${AUTH_API_URL}/user`);

    if (!res.data) {
      throw new Error("User not returned from API")
    }

    return res.data;
  },
}
