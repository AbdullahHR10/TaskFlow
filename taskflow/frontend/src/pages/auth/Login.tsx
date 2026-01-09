import { useState } from "react";
import type { FormEvent } from "react";
import { useAuth } from "@/context/AuthContext"
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
  const [error, setError] = useState<string | null>(null);

  const switchAuth = (
    <p className="text-sm text-center mt-4 text-gray-700">
      Don&apos;t have an account?{" "}
      <a href="/signup" className="font-semibold cursor-pointer text-blue-500 hover:underline">
        Sign up
      </a>
    </p>
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await login({ email, password, remember });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Enter your information to access your account"
      switchAuth={switchAuth}
    >
      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
        {error && (
          <p className="text-sm text-red-500 flex items-center gap-2">
            <span><MdError size={16} /></span>
            {error}
          </p>
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
          color="black"
          type="submit"
          text="Log in"
          disabled={isLoading}
        />
      </form>
    </AuthLayout>
  );
}

export default Login;
