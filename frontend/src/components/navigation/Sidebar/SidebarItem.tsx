import { NavLink } from "react-router-dom";

import type { SidebarMenuItem } from "./sidebar.types";

import styles from "./Sidebar.module.css";

interface SidebarItemProps {
  item: SidebarMenuItem;
}

const SidebarItem = ({
  item,
}: SidebarItemProps) => {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `${styles.item} ${isActive ? styles.active : ""}`
      }
    >
      <Icon size={20} strokeWidth={2} />

      <span>{item.label}</span>
    </NavLink>
  );
};

export default SidebarItem;