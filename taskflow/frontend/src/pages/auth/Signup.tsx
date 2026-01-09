import { useState } from "react";
import type { FormEvent } from "react";
import { useAuth } from "@/context/AuthContext"
import AuthLayout from "@/components/layouts/AuthLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { IoPersonOutline } from "react-icons/io5";
import { MdError } from "react-icons/md";
import { CiMail, CiLock } from "react-icons/ci";


const Signup = () => {
  const { signup, isLoading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const switchAuth = (
    <p className="text-sm text-center mt-4 text-gray-700">
      Already have an account?{" "}
      <a href="/login" className="font-semibold cursor-pointer text-blue-500 hover:underline">
        Log in
      </a>
    </p>
  );

  const legal = (
    <p className="text-xs text-gray-500 mt-4 text-center">
      By signing up, you agree to our <a href="/privacy-policy" className="font-semibold text-blue-500 hover:underline">Privacy Policy</a> and <a href="/terms-of-service" className="font-semibold text-blue-500 hover:underline">Terms of Service</a>.
    </p>
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await signup({ name, email, password, confirmPassword })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Sign up failed");
    }
  };

  return (
    <AuthLayout
      title="Create an account"
      subtitle="Enter your information to get started with TaskFlow"
      switchAuth={switchAuth}
      legal={legal}
    >
      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
        {error && (
          <p className="text-sm text-red-500 flex items-center gap-2">
            <span><MdError size={16} /></span>
            {error}
          </p>
        )}

        <Input
          id="name"
          label="Name"
          type="text"
          icon={<IoPersonOutline />}
          placeholder="John Doe"
          onChange={(e) => setName(e.target.value)}
          required
        />

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

        <Input
          type="password"
          label="Confirm Password"
          icon={<CiLock />}
          placeholder="********"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <Button
          color="black"
          type="submit"
          text="Sign up"
          disabled={isLoading}
        />

      </form>
    </AuthLayout>
  );
}

export default Signup;
