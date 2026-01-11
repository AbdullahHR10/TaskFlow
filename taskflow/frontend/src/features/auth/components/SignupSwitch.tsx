import { Link } from "react-router-dom";

export const SignupSwitch = () => (
  <p className="text-sm text-center mt-4 text-muted">
    Already have an account?{" "}
    <Link to="/login" className="font-semibold text-blue-500 hover:underline">
      Log in
    </Link>
  </p>
);
