import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import FullPageSpinner from "@/components/ui/FullPageSpinner";

interface GuestRouteProps {
  children: ReactNode;
}

const GuestRoute = ({ children }: GuestRouteProps ) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <FullPageSpinner />;

  if (isAuthenticated) return <Navigate to="/" replace />;

  return <>{children}</>
};

export default GuestRoute;
