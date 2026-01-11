import ThemeToggle from "@/components/ui/ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { FiLogOut } from "react-icons/fi";

const SidebarUser = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="mt-auto p-3 border-divider-t flex items-center justify-between gap-2">
      <div className="flex items-center gap-3 min-w-0">
        <div className="h-9 w-9 rounded-full bg-icon flex items-center justify-center text-icon font-semibold">
          {user.name?.[0]?.toUpperCase() ?? "U"}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate" title={user.name}>
            {user.name}
          </p>
          <p className="text-xs text-muted truncate" title={user.email}>
            {user.email}
          </p>
        </div>

        <button
          onClick={logout}
          className="p-2 rounded-full hover:bg-[rgb(var(--icon-bg))] transition hover:cursor-pointer "
          aria-label="Logout"
        >
          <FiLogOut size={16} />
        </button>
      </div>
      <ThemeToggle />

    </div>
  );
}

export default SidebarUser;
