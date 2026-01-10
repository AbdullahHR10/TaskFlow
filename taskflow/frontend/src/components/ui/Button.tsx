import type { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  text: string;
  variant?: ButtonVariant;
  className?: string;
  icon?: ReactElement
  onClick?: () => void;
  link?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean
}

const baseClass = [
  "px-4 py-2.5",
  "flex items-center justify-center gap-2",
  "rounded-md cursor-pointer",
  "font-medium text-sm",
  "transition-all duration-200",
  "focus:ring-2 ring-input",
].join(" ");

const variantMap: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:opacity-90",
  secondary: "bg-card text-foreground border border-divider hover:bg-muted/10",
};

const Button = ({
  text,
  variant = "primary",
  className = "",
  icon,
  onClick,
  link,
  type = "button",
  disabled
}: ButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (disabled) return;

    if (link) {
      navigate(link);
      return;
    }

    onClick?.();
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={[
        baseClass,
        variantMap[variant],
        disabled
        ? "opacity-50 cursor-not-allowed"
        : "",
        className
      ].join(" ")}
      onClick={handleClick}
    >
      {icon}
      {text}
    </button>
  );
}

export default Button;
