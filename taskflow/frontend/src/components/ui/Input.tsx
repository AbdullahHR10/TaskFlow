import type { ReactElement, InputHTMLAttributes } from "react";

const inputBase =
  "h-10 w-full bg-input text-foreground text-sm px-8 rounded-md \
  border border-input focus:border-[rgb(var(--input-focus))] focus:outline-none"

const inputError = "border-danger focus:ring-red-500"

const labalBase = "text-sm font-semibold"

const iconBase = "absolute top-1/2 left-2 -translate-y-1/2 text-icon"

const errorText = "text-sm text-red-500"

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactElement;
  error?: string;
}

const Input = ({ label, icon, error, className, ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className={labalBase}>{label}</label>}

      <div className="relative">
        {icon && <span className={iconBase}>{icon}</span>}

        <input
          className={[inputBase, error && inputError, className]
            .filter(Boolean).join(" ")}
          {...props}
        />
      </div>

      {error && <p className={errorText}>{error}</p>}
    </div>
  );
}

export default Input;
