import type { AuthState } from "@/features/auth/types/state";
import type { LoginPayload, SignupPayload } from "@/features/auth/types/payloads";

export interface AuthContextValue extends AuthState {
  login: (data: LoginPayload) => Promise<void>;
  signup: (data: SignupPayload) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}
