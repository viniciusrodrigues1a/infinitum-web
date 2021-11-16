import React, { useEffect, useState } from "react";
import { FiBell } from "react-icons/fi";
import { useSession } from "../../contexts/SessionContext";
import ExpandableHamburger from "../ExpandableHamburger";
import styles from "./Header.module.css";

type HeaderProps = {
  openSidebar: () => void;
  closeSidebar: () => void;
  isSidebarOpen: boolean;
  title: string;
  rightSideComponent?: () => React.ReactElement;
};

Header.defaultProps = {
  rightSideComponent: () => null,
};

export default function Header({
  openSidebar,
  closeSidebar,
  isSidebarOpen,
  title,
  rightSideComponent: RightSideComponent,
}: HeaderProps): React.ReactElement {
  const { clearSession } = useSession();

  const [isDropdownShown, setIsDropdownShown] = useState(false);

  useEffect(() => {
    const body = document.querySelector("body");
    if (!body) {
      return;
    }

    function onClick() {
      if (isDropdownShown) {
        setIsDropdownShown(false);
      }
    }

    body.addEventListener("click", onClick);

    return () => body.removeEventListener("click", onClick);
  }, [isDropdownShown]);

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
        {RightSideComponent && <RightSideComponent />}

        <FiBell id={styles.bellIcon} color="var(--dark)" size={20} />
        <div id={styles.userAvatarWrapper}>
          <button
            aria-label="More options"
            type="button"
            id={styles.userAvatar}
            onClick={() => setIsDropdownShown(!isDropdownShown)}
          />

          {isDropdownShown && (
            <div id={styles.headerDropdown}>
              <button type="button" onClick={clearSession}>
                Encerrar sessão
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
