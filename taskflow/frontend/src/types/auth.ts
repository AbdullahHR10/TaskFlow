import type { User } from "./user";

export interface LoginPayLoad {
  email: string;
  password: string;
  remember?: boolean;
}

export interface SignupPayLoad {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface AuthUserResponse {
  user: User;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthContextValue extends AuthState {
  login: (data: LoginPayLoad) => Promise<void>;
  signup: (data: SignupPayLoad) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}
