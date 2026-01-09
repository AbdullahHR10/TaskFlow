import GuestRoute from "@/router/GuestRoute";

import ErrorPage from "@/pages/errors/ErrorPage";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";

export const routes = [
  {
    path: "/login",
    element: (
      <GuestRoute>
        <Login />
      </GuestRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <GuestRoute>
        <Signup />
      </GuestRoute>
    ),
  },

  { path: "/401", element: <ErrorPage code={401} /> },
  { path: "/403", element: <ErrorPage code={403} /> },
  { path: "/500", element: <ErrorPage code={500} /> },
  { path: "*", element: <ErrorPage code={404} /> },
];
