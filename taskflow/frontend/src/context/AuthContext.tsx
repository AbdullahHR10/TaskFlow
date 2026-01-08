import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { AuthContextValue, LoginPayLoad, SignupPayLoad } from "@/types/auth";
import type { User } from "@/types/user";
import { authApi } from "@/api/auth";

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode}) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  const refreshUser = async () => {
    try {
      const user = await authApi.getCurrentUser();
      setUser(user);
    } catch {
      setUser(null);
    }
  };

  const login = async(data: LoginPayLoad) => {
    await authApi.login(data);
    await refreshUser();
  };

  const signup = async (data: SignupPayLoad) => {
    await authApi.signup(data);
    await refreshUser();
  };

  const logout = async () => {
    await authApi.logout();
    setUser(null);
  };

  useEffect(() => {
    refreshUser().finally(() => setIsLoading(false));
  }, []);

  const value: AuthContextValue = {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) throw new Error("useAuth must be used within AuthProvider");

  return ctx
}
