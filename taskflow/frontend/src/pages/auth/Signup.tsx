import AuthLayout from "@/components/layouts/AuthLayout";
import SignupForm from "@/features/auth/components/SignupForm";
import { SignupSwitch } from "@/features/auth/components/SignupSwitch";
import { Legal } from "@/features/auth/components/Legal";

const Signup = () => {
  return (
    <AuthLayout
      title="Create an account"
      subtitle="Enter your information to get started with TaskFlow"
      switchAuth={<SignupSwitch />}
      legal={<Legal />}
    >
      <SignupForm />
    </AuthLayout>
  );
}

export default Signup;
