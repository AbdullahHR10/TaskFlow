import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const AppRouter: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<h1>Test</h1>} />
    </Routes>
  </Router>
);

export default AppRouter;