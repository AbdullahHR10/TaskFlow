import GuestRoute from "@/router/GuestRoute";
import ProtectedRoute from "@/router/ProtectedRoute";
import ErrorPage from "@/pages/errors/ErrorPage";
import Landing from "@/pages/Landing";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import AppLayout from "@/components/layouts/AppLayout";
import Tasks from "@/pages/app/Tasks";
import { Navigate } from "react-router-dom";
import Dashboard from "@/pages/app/Dashboard";
import PrivacyPolicy from "@/pages/legal/PrivacyPolicy";
import TermsOfService from "@/pages/legal/TermsOfService";

export const routes = [
  { path: "/", element: <Landing />},

  { path: "/privacy-policy", element: <PrivacyPolicy /> },
  { path: "/terms-of-service", element: <TermsOfService /> },

  {
    path: "/login",
    element: <GuestRoute />,
    children: [
      { index: true, element: <Login /> },
    ],
  },

  {
    path: "/signup",
    element: <GuestRoute />,
    children: [
      { index: true, element: <Signup /> },
    ],
  },

  {
    path: "/app",
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: "dashboard", element: <Dashboard />},
          { path: "tasks", element: <Tasks /> },
        ],
      },
    ],
  },

  { path: "/401", element: <ErrorPage code={401} /> },
  { path: "/403", element: <ErrorPage code={403} /> },
  { path: "/500", element: <ErrorPage code={500} /> },
  { path: "*", element: <ErrorPage code={404} /> },
];
