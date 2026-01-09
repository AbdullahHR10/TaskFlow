import type { InputHTMLAttributes } from "react"

const labelBase = "flex items-center gap-3 cursor-pointer text-sm font-medium text-gray-700"

interface CheckboxProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox = ({ label, className, ...props }: CheckboxProps) => {
  return (
    <label className={labelBase}>
      <input
        type="checkbox"
        className={["accent-black", className].filter(Boolean).join(" ")}
        {...props}
      />
      {label && <span>{label}</span>}
    </label>
  );
}

export default Checkbox;
