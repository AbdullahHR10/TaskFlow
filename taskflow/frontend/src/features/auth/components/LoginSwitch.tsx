import { Link } from "react-router-dom";

export const LoginSwitch = () => (
  <p className="text-sm text-center mt-4 text-muted">
    Don&apos;t have an account?{" "}
    <Link to="/signup" className="font-semibold cursor-pointer text-blue-500 hover:underline">
      Sign up
    </Link>
  </p>
);
