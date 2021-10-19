import React, { MouseEvent, useRef } from "react";

import styles from "./DrawerMenu.module.css";

type ContainerProps = {
  shown: boolean;
  closeMenu: () => void;
  children: React.ReactNode;
  openFromRight?: boolean;
};

Container.defaultProps = {
  openFromRight: true,
};

function Container({
  shown,
  closeMenu,
  children,
  openFromRight,
}: ContainerProps): React.ReactElement {
  const drawerMenuOutsideRef = useRef<HTMLDivElement>(null);

  function handleClickOutsideMenu(event: MouseEvent<HTMLDivElement>) {
    if (event.target === drawerMenuOutsideRef.current) {
      closeMenu();
    }
  }

  if (!shown) return <></>;

  return (
    /* eslint-disable-next-line */
    <div
      role="button"
      id={styles.drawerMenuOutside}
      ref={drawerMenuOutsideRef}
      onClick={handleClickOutsideMenu}
      className={openFromRight ? styles.flexEnd : styles.flexStart}
    >
      <div
        id={styles.drawerMenu}
        className={
          openFromRight
            ? styles.animateEnteringFromRight
            : styles.animateEnteringFromLeft
        }
      >
        {children}
      </div>
    </div>
  );
}

type ItemProps = {
  children: React.ReactNode;
};

function Item({ children }: ItemProps): React.ReactElement {
  return <div className={styles.drawerItem}>{children}</div>;
}

const DrawerMenu = { Container, Item };

export default DrawerMenu;
