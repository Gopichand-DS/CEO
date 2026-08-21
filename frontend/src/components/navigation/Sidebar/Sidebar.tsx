import SidebarHeader from "./SidebarHeader";
import SidebarFooter from "./SidebarFooter";
import SidebarItem from "./SidebarItem";

import { sidebarItems } from "./sidebar.data";

import styles from "./Sidebar.module.css";

const Sidebar = () => {
    return (
        <aside className={styles.sidebar}>
            <SidebarHeader />

            <nav className={styles.navigation}>
                {sidebarItems.map((item) => (
                    <SidebarItem
                        key={item.id}
                        item={item}
                    />
                ))}
            </nav>

            <SidebarFooter />
        </aside>
    );
};

export default Sidebar;