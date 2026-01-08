import ErrorPage from "../pages/errors/ErrorPage";

export const routes = [
  { path: "/401", element: <ErrorPage code={401} /> },
  { path: "/403", element: <ErrorPage code={403} /> },
  { path: "/500", element: <ErrorPage code={500} /> },
  { path: "*", element: <ErrorPage code={404} /> },
];
