import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import FullPageSpinner from "@/components/ui/FullPageSpinner";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps ) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <FullPageSpinner />;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <>{children}</>
};

export default ProtectedRoute;
