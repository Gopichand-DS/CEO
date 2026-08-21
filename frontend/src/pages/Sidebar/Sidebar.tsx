import SidebarHeader from "./SidebarHeader";
import SidebarNavigation from "./SidebarNavigation";
import SidebarFooter from "./SidebarFooter";

const Sidebar = () => {
  return (
    <aside className="flex h-screen w-72 flex-col border-r bg-white">
      <SidebarHeader />

      <SidebarNavigation />

      <SidebarFooter />
    </aside>
  );
};

export default Sidebar;