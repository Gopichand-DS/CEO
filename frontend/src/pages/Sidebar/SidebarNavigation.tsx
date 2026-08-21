import SidebarItem from "./SidebarItem";
import { sidebarItems } from "./sidebarItems";

const SidebarNavigation = () => {
  return (
    <nav className="flex-1 space-y-2 px-4 py-6">
      {sidebarItems.map((item) => (
        <SidebarItem
          key={item.path}
          title={item.title}
          path={item.path}
          icon={item.icon}
        />
      ))}
    </nav>
  );
};

export default SidebarNavigation;