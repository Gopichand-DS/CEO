import styles from "./Sidebar.module.css";

const SidebarHeader = () => {
    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                MC
            </div>

            <div>
                <h2>Mini CEO</h2>

                <p>Executive Intelligence</p>
            </div>
        </div>
    );
};

export default SidebarHeader;