import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface NavItem {
  label: string;
  icon: ReactNode;
  href: string;
}

interface SidebarSectionProps {
  title: string;
  items: NavItem[];
}

const SidebarSection = ({ title, items }: SidebarSectionProps) => {
  return (
    <div className="flex flex-col gap-3 p-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">
        {title}
      </p>

      <ul className="flex flex-col gap-1">
        {items.map(({ label, icon, href}) => (
          <li key={label}>
            <NavLink
              to={href}
              className={({ isActive }) =>
                `
                flex items-center gap-3 p-2 rounded-md text-sm font-medium transition
                ${isActive ? "bg-input" : "bg-muted text-foreground"}
                `
              }
            >
              {icon}
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SidebarSection;
