import { BrowserRouter, useRoutes } from "react-router-dom";
import { routes } from "./routes"

const AppRoutes = () => {
  return useRoutes(routes);
}

const AppRouter = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default AppRouter;
