import { NavLink } from "react-router-dom";
import clsx from "clsx";

interface SidebarItemProps {
  title: string;
  path: string;
  icon: React.ElementType;
}

const SidebarItem = ({
  title,
  path,
  icon: Icon,
}: SidebarItemProps) => {
  const isDashboard = path === "/dashboard";

  return (
    <NavLink
      to={path}
      end={isDashboard}
      className={({ isActive }) =>
        clsx(
          "flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200",
          isActive
            ? "bg-blue-600 text-white shadow-md"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
        )
      }
    >
      <Icon size={20} />

      <span className="font-medium">
        {title}
      </span>
    </NavLink>
  );
};

export default SidebarItem;