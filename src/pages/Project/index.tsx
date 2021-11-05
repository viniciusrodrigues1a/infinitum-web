import React, { useMemo, useState } from "react";
import { FiList, FiLayout, FiSettings } from "react-icons/fi";

import { useParams } from "react-router-dom";
import styles from "./Project.module.scss";

import CreateButton from "../../components/CreateButton";
import Header from "../../components/Header";
import ViewOption from "./components/ViewOption";
import View from "./components/View";
import CreateIssueModal from "./components/CreateIssueModal";
import UpdateProjectModal from "./components/UpdateProjectModal";

import { useSidebar } from "../../contexts/SidebarContext";
import { useProjects } from "../../contexts/ProjectsContext";

export default function Project(): React.ReactElement {
  const params = useParams<{ projectId: string }>();
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  const { getProjectById } = useProjects();

  const project = useMemo(
    () => getProjectById(params.projectId),
    [getProjectById, params]
  );

  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [activeView, setActiveView] = useState<"list" | "kanban">("list");

  if (!project) {
    return <h1>Projeto não encontrado!</h1>;
  }

  return (
    <div id={styles.container}>
      <div>
        <Header
          title={project.name}
          openSidebar={() => setIsSidebarOpen(true)}
          closeSidebar={() => setIsSidebarOpen(false)}
          isSidebarOpen={isSidebarOpen}
        />
        <div id={styles.headerOptions}>
          <div id={styles.optionsContainer}>
            <CreateButton
              title="Novo card"
              onClick={() => setIsCreationModalOpen(true)}
            />

            <div id={styles.viewOptionsContainer}>
              <ViewOption
                text="Lista"
                icon={FiList}
                active={activeView === "list"}
                onClick={() => setActiveView("list")}
              />
              <ViewOption
                text="Kanban"
                icon={FiLayout}
                active={activeView === "kanban"}
                onClick={() => setActiveView("kanban")}
              />
            </div>
          </div>

          <button
            id={styles.updateButton}
            type="button"
            onClick={() => setIsUpdateModalOpen(true)}
          >
            <FiSettings color="var(--dark)" size={20} />
          </button>
        </div>
      </div>

      <main role="main">
        {activeView === "list" && <View.List />}
        {activeView === "kanban" && <View.Kanban />}
      </main>

      <CreateIssueModal
        shown={isCreationModalOpen}
        closeModal={() => setIsCreationModalOpen(false)}
      />
      <UpdateProjectModal
        shown={isUpdateModalOpen}
        closeModal={() => setIsUpdateModalOpen(false)}
      />
    </div>
  );
}
