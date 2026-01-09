import { apiFetch } from "./client";
import type { LoginPayLoad, SignupPayLoad } from "@/types/auth";
import type { User } from "@/types/user";

const AUTH_API_URL = "/api/v1/auth"

export const authApi = {
  signup: async (data: SignupPayLoad): Promise<void> => {
    const { confirmPassword, ...rest } = data
    await apiFetch(`${AUTH_API_URL}/signup`, {
      method: "POST",
      body: JSON.stringify({
        ...rest,
        confirm_password: confirmPassword
      }),
    });
  },

  login: async (data: LoginPayLoad): Promise<void> => {
    await apiFetch(`${AUTH_API_URL}/login`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  logout: async (): Promise<void> => {
    await apiFetch(`${AUTH_API_URL}/logout`, {
      method: "POST",
    });
  },

  getCurrentUser: async (): Promise<User> => {
    const res = await apiFetch<User>(`${AUTH_API_URL}/user`);

    if (!res.data) {
      throw new Error("User not returned from API")
    }

    return res.data;
  },
}