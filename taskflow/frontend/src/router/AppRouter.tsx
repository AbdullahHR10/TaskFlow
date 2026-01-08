import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routes } from "./routes"

const AppRouter = () => (
  <Router>
    <Routes>
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  </Router>
);

export default AppRouter;
