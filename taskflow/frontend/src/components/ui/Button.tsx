import type { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

type ButtonColor = 'white' | 'black';

type ButtonProps = {
  text: string;
  color: ButtonColor;
  className?: string;
  icon?: ReactElement
  onClick?: () => void;
  link?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean
}

const colorMap: Record<ButtonColor, string> = {
  white: 'bg-white text-black shadow-[#FFF]',
  black: 'bg-black text-white shadow-[#000] hover:bg-gray-900'
}

const baseClass = [
  'px-4 py-2.5',
  'flex items-center justify-center gap-2',
  'rounded-md',
  'font-medium text-sm',
  'shadow-xs hover:shadow-none',
  'duration-200 ease-in-out'
].join(' ');

const Button = ({
  text,
  color,
  className = '',
  icon,
  onClick,
  link,
  type = 'button',
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
        colorMap[color],
        disabled
        ? 'opacity-50 cursor-not-allowed'
        : 'hover:shadow-none',
        className
      ].join(' ')}
      onClick={handleClick}
    >
      {icon}
      {text}
    </button>
  );
}

export default Button;