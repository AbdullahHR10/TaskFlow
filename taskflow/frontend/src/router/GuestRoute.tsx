import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthContext";
import FullPageSpinner from "@/components/ui/FullPageSpinner";

const GuestRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <FullPageSpinner />;

  if (isAuthenticated) return <Navigate to="/app" replace />;

  return <Outlet />
};

export default GuestRoute;
