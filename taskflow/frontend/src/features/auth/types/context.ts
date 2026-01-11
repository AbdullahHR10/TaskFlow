import type { AuthState } from "@/features/auth/types/state";
import type { LoginPayLoad, SignupPayLoad } from "@/features/auth/types/payloads";

export interface AuthContextValue extends AuthState {
  login: (data: LoginPayLoad) => Promise<void>;
  signup: (data: SignupPayLoad) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}
