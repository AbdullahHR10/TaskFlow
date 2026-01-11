import Logo from "@/components/Logo";
import SidebarSection from "./SidebarSection";
import SidebarUser from "./SidebarUser";
import { mainNav, utilityNav } from "./SidebarItems";

const Sidebar = () => {
  return (
    <aside className="sticky top-0 h-screen w-64 p-2 bg-background border-divider-r flex flex-col">
      <div className="p-4 border-divider-b">
        <Logo size={2} textSize={1} />
      </div>

      <SidebarSection title="Main" items={mainNav} />
      <SidebarSection title="Utility" items={utilityNav} />

      <div className="mt-auto">
        <SidebarUser />
      </div>
    </aside>
  );
}

export default Sidebar;
