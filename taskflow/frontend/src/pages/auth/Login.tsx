import AuthLayout from "@/components/layouts/AuthLayout";
import LoginForm from "@/features/auth/components/LoginForm";
import { LoginSwitch } from "@/features/auth/components/LoginSwitch";

const Login = () => {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Enter your information to access your account"
      switchAuth={<LoginSwitch />}
    >
      <LoginForm />
    </AuthLayout>
  );
}

export default Login;
