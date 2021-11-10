import React from "react";

import { useHistory } from "react-router-dom";
import styles from "./AuthenticatedLayout.module.css";

import Sidebar from "../../components/Sidebar";
import DrawerMenu from "../../components/DrawerMenu";
import { useSidebar } from "../../contexts/SidebarContext";
import RoutesEnum from "../../routes/type-defs/RoutesEnum";

type AuthenticatedLayoutProps = {
  children: React.ReactNode;
};

export default function AuthenticatedLayout({
  children,
}: AuthenticatedLayoutProps): React.ReactElement {
  const history = useHistory();
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
          <div id={styles.drawerContainer}>
            <button
              type="button"
              className={styles.drawerButton}
              onClick={() => {
                setIsSidebarOpen(false);
                history.push(RoutesEnum.DASHBOARD);
              }}
            >
              Início
            </button>
            <button
              type="button"
              className={styles.drawerButton}
              onClick={() => {
                setIsSidebarOpen(false);
                history.push(RoutesEnum.PROJECTS);
              }}
            >
              Projetos
            </button>
          </div>
        </DrawerMenu.Item>
      </DrawerMenu.Container>
    </>
  );
}
