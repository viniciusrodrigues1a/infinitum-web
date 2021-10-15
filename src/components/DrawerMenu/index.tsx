import React, { MouseEvent, useRef } from "react";

import styles from "./DrawerMenu.module.css";

type ContainerProps = {
  shown: boolean;
  closeMenu: () => void;
  children: React.ReactNode;
};

function Container({
  shown,
  closeMenu,
  children,
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
    >
      <div id={styles.drawerMenu}>{children}</div>
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
