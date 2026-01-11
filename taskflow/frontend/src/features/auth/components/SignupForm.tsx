import { useState } from "react";
import type { FormEvent } from "react";
import { useApiErrors } from "@/hooks/useApiErrors";
import { useAuth } from "@/features/auth/context/AuthContext"
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { IoPersonOutline } from "react-icons/io5";
import { MdError } from "react-icons/md";
import { CiMail, CiLock } from "react-icons/ci";

const SignupForm = () => {
  const { signup, isLoading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { errors, handleError, clearErrors } = useApiErrors();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearErrors();

    try {
      await signup({ name, email, password, confirmPassword })
    } catch (err) {
      handleError(err);
    }
  };

  return (
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
        id="name"
        label="Name"
        type="text"
        icon={<IoPersonOutline />}
        placeholder="John Doe"
        value={name}
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
        variant="primary"
        type="submit"
        text="Sign up"
        disabled={isLoading}
      />

    </form>
  );
}

export default SignupForm;
