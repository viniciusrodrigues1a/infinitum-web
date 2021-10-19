import React from "react";
import { FiMenu, FiChevronRight, FiChevronLeft } from "react-icons/fi";

import styles from "./ExpandableHamburger.module.css";

type ExpandableHamburgerProps = {
  onExpand: () => void;
  onCollapse: () => void;
  isCollapsed: boolean;
  theme?: "dark" | "light";
};

ExpandableHamburger.defaultProps = {
  theme: "dark",
};

export default function ExpandableHamburger({
  onExpand,
  onCollapse,
  isCollapsed,
  theme,
}: ExpandableHamburgerProps): React.ReactElement {
  return (
    <button
      type="button"
      id={styles.container}
      className={isCollapsed ? styles.collapsed : styles.expanded}
      onClick={isCollapsed ? onExpand : onCollapse}
    >
      <div id={styles.iconContainer}>
        <FiMenu className={styles.icon} color={`var(--${theme})`} size={24} />
        <div className={styles.chevronContainer}>
          {!isCollapsed ? (
            <FiChevronLeft
              className={styles.chevron}
              color={`var(--${theme})`}
              size={21}
            />
          ) : (
            <FiChevronRight
              className={styles.chevron}
              color={`var(--${theme})`}
              size={21}
            />
          )}
        </div>
      </div>
    </button>
  );
}
