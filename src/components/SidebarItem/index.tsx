import React, { DetailedHTMLProps, HTMLAttributes, useMemo } from "react";

import styles from "./SidebarItem.module.css";

import { ReactComponent as SidebarActiveItemOverlaySvg } from "../../assets/sidebar-active-item-overlay.svg";

type IconElementProps = {
  color: string;
  size: number;
};

type SidebarItemProps = {
  icon: (
    data: DetailedHTMLProps<
      HTMLAttributes<HTMLElement | SVGElement>,
      HTMLElement | SVGElement
    > &
      IconElementProps
  ) => React.ReactElement;
  text: string;
  collapse: boolean;
  active?: boolean;
  onClick?: (e: React.MouseEvent) => void;
};

SidebarItem.defaultProps = {
  active: false,
  onClick: () => null,
};

export default function SidebarItem({
  icon: Icon,
  text,
  active,
  collapse,
  onClick,
}: SidebarItemProps): React.ReactElement {
  const containerClasses = useMemo(() => {
    const classes = [styles.container];
    if (active) classes.push(styles.active);
    if (collapse) classes.push(styles.collapsed);

    return classes.join(" ");
  }, [active, collapse]);

  const iconColor = useMemo(() => {
    if (!collapse && active) return "var(--dark)";
    return "var(--light)";
  }, [collapse, active]);

  return (
    <div className={containerClasses}>
      <div className={styles.itemContainer}>
        <div className={styles.buttonWrapper}>
          <button type="button" onClick={onClick} className={styles.button}>
            <Icon className={styles.icon} color={iconColor} size={20} />
            <span className={active ? styles.activeText : ""}>{text}</span>
          </button>
        </div>
      </div>

      {active && (
        <div className={styles.sidebarActiveItemOverlayContainer}>
          <div className={styles.sidebarActiveItemOverlayIndicator} />
          <div className={styles.sidebarActiveItemOverlaySvgWrapper}>
            <SidebarActiveItemOverlaySvg
              className={styles.sidebarActiveItemOverlaySvg}
            />
          </div>
        </div>
      )}
    </div>
  );
}
