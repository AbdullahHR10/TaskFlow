import { useState } from "react";
import type { FormEvent } from "react";
import { useAuth } from "@/features/auth/context/AuthContext"
import { useApiErrors } from "@/hooks/useApiErrors";
import AuthLayout from "@/components/layouts/AuthLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Checkbox from "@/components/ui/Checkbox";;
import { MdError } from "react-icons/md";
import { CiMail, CiLock } from "react-icons/ci";

const Login = () => {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const { errors, handleError, clearErrors } = useApiErrors();

  const switchAuth = (
    <p className="text-sm text-center mt-4 text-muted">
      Don&apos;t have an account?{" "}
      <a href="/signup" className="font-semibold cursor-pointer text-blue-500 hover:underline">
        Sign up
      </a>
    </p>
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearErrors();

    try {
      await login({ email, password, remember });
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Enter your information to access your account"
      switchAuth={switchAuth}
    >
      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
        {errors.length > 0 && (
          <div className="space-y-2">
            {errors.map((error, i) => (
              <p
                key={i}
                className="text-sm text-red-500 flex items-center gap-2"
              >
                <span><MdError size={16} /></span>
                {error}
              </p>
            ))}
          </div>
        )}

        <Input
          id="email"
          label="Email"
          type="email"
          icon={<CiMail />}
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          type="password"
          label="Password"
          icon={<CiLock />}
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Checkbox
          label="Remember me"
          checked={remember}
          className="h-4 w-4"
          onChange={(e) => setRemember(e.target.checked)}
        />

        <Button
          variant="primary"
          type="submit"
          text="Log in"
          disabled={isLoading}
        />
      </form>
    </AuthLayout>
  );
}

export default Login;
