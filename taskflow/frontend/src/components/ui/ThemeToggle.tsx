import { useState } from "react";
import { toggleTheme } from "@/theme";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  const handleToggle = () => {
    toggleTheme();
    setIsDark(document.documentElement.classList.contains("dark"));
  };

  return (
    <button
      onClick={handleToggle}
      aria-label="Toggle theme"
      className="p-2 rounded-full hover:bg-[rgb(var(--icon-bg))] transition outline-0 cursor-pointer"
    >
      {isDark ? <FaSun size={18} /> : <FaMoon size={18} />}
    </button>
  );
};

export default ThemeToggle;
