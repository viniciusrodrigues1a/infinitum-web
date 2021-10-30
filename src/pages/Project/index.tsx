import React from "react";
import { FiList, FiLayout } from "react-icons/fi";

import styles from "./Project.module.scss";

import CreateButton from "../../components/CreateButton";
import Header from "../../components/Header";
import ViewOption from "./components/ViewOption";
import View from "./components/View";

import { useSidebar } from "../../contexts/SidebarContext";

export default function Project(): React.ReactElement {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();

  return (
    <div id={styles.container}>
      <div>
        <Header
          title="Jorge"
          openSidebar={() => setIsSidebarOpen(true)}
          closeSidebar={() => setIsSidebarOpen(false)}
          isSidebarOpen={isSidebarOpen}
        />
        <div id={styles.optionsContainer}>
          <CreateButton title="Novo card" />

          <div id={styles.viewOptionsContainer}>
            <ViewOption text="Lista" icon={FiList} active />
            <ViewOption text="Kanban" icon={FiLayout} />
          </div>
        </div>
      </div>

      <main role="main">
        <View.List />
      </main>
    </div>
  );
}
