import styles from "./Sidebar.module.css";

const SidebarFooter = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.userInfo}>
                <div className={styles.avatar}>
                    G
                </div>

                <div>
                    <strong>Gopi</strong>

                    <p>Administrator</p>
                </div>
            </div>

            <button className={styles.logoutButton}>
                Logout
            </button>
        </div>
    );
};

export default SidebarFooter;