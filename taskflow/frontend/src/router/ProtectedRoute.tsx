import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import FullPageSpinner from "@/components/ui/FullPageSpinner";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <FullPageSpinner />;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />
};

export default ProtectedRoute;
