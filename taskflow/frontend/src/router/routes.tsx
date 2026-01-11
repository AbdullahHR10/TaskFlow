import GuestRoute from "@/router/GuestRoute";
import ProtectedRoute from "@/router/ProtectedRoute";
import ErrorPage from "@/pages/errors/ErrorPage";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import AppLayout from "@/components/layouts/AppLayout";
import Tasks from "@/pages/app/Tasks";
import { Navigate } from "react-router-dom";

export const routes = [
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
          { index: true, element: <Navigate to="tasks" replace /> },
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
