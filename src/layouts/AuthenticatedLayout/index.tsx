import React from "react";

import styles from "./AuthenticatedLayout.module.css";

import Sidebar from "../../components/Sidebar";
import DrawerMenu from "../../components/DrawerMenu";
import { useSidebar } from "../../contexts/SidebarContext";

type AuthenticatedLayoutProps = {
  children: React.ReactNode;
};

export default function AuthenticatedLayout({
  children,
}: AuthenticatedLayoutProps): React.ReactElement {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();

  return (
    <>
      <div id={styles.container}>
        <div id={styles.sidebar}>
          <Sidebar />
        </div>

        <div id={styles.contentWrapper}>{children}</div>
      </div>

      <DrawerMenu.Container
        shown={isSidebarOpen}
        closeMenu={() => setIsSidebarOpen(false)}
        openFromRight={false}
      >
        <DrawerMenu.Item>
          <p>Hello, world</p>
        </DrawerMenu.Item>
      </DrawerMenu.Container>
    </>
  );
}
