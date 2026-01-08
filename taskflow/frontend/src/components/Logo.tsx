import logoWhite from "@/assets/logo-white.svg";
import logoBlack from "@/assets/logo-black.svg";

interface LogoProps {
  size?: number;
  text?: boolean;
  textSize?: number;
  stacked?: boolean;
}

const Logo = ({ size = 3, text = true, textSize, stacked }: LogoProps) => {
  return (
    <div className={`flex items-center gap-2 ${stacked ? "flex-col" : "flex-row"}`}>
      <img
        src={logoWhite}
        className="hidden dark:block"
        style={{ height: `${size}rem`, width: `${size}rem` }}
        alt="TaskFlow logo (dark mode)"
      />
      <img
        src={logoBlack}
        className="block dark:hidden"
        style={{ height: `${size}rem`, width: `${size}rem` }}
        alt="TaskFlow logo (light mode)"
      />
      {text && (
        <h1
          className="font-bold leading-9"
          style={{ fontSize: textSize ? `${textSize}rem` : undefined }}
        >
          TaskFlow
        </h1>
      )}
    </div>
  );
};

export default Logo;
