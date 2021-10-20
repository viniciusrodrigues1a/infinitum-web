import React from "react";
import { FiBell } from "react-icons/fi";
import ExpandableHamburger from "../ExpandableHamburger";
import styles from "./Header.module.css";

type HeaderProps = {
  openSidebar: () => void;
  closeSidebar: () => void;
  isSidebarOpen: boolean;
  title: string;
};

export default function Header({
  openSidebar,
  closeSidebar,
  isSidebarOpen,
  title,
}: HeaderProps): React.ReactElement {
  return (
    <div id={styles.container}>
      <div className={styles.flexAlignedRow}>
        <div id={styles.hamburgerWrapper}>
          <div
            className={
              isSidebarOpen ? styles.animatedHamburger : styles.hamburger
            }
          >
            <ExpandableHamburger
              isCollapsed={!isSidebarOpen}
              onExpand={openSidebar}
              onCollapse={closeSidebar}
              theme={isSidebarOpen ? "light" : "dark"}
            />
          </div>
        </div>
        <span id={styles.title}>{title}</span>
      </div>

      <div className={styles.flexAlignedRow}>
        <FiBell id={styles.bellIcon} color="var(--dark)" size={20} />
        <div id={styles.userAvatar} />
      </div>
    </div>
  );
}
