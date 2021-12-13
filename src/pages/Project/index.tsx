import React, { useMemo, useState } from "react";
import { FiList, FiLayout, FiSettings } from "react-icons/fi";

import { useParams } from "react-router-dom";
import styles from "./Project.module.scss";

import CreateButton from "../../components/CreateButton";
import Header from "../../components/Header";
import View from "./components/View";
import CreateIssueModal from "../../components/CreateIssueModal";
import UpdateProjectModal from "../../components/UpdateProjectModal";
import ManageParticipantsModal from "../../components/ManageParticipantsModal";

import { useSidebar } from "../../contexts/SidebarContext";
import { useProjects } from "../../contexts/ProjectsContext";
import { useLanguage } from "../../contexts/LanguageContext";
import Loader from "../../components/Loader";

export default function Project(): React.ReactElement {
  const params = useParams<{ projectId: string }>();
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  const { getProjectById } = useProjects();
  const {
    language: {
      pages: { project: projectLanguage },
    },
  } = useLanguage();

  const project = useMemo(
    () => getProjectById(params.projectId),
    [getProjectById, params]
  );

  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isParticipantsModalOpen, setIsParticipantsModalOpen] = useState(false);
  const [activeView, setActiveView] = useState<"list" | "kanban">("list");

  if (!project) {
    return (
      <div
        style={{
          marginTop: "5rem",
        }}
      >
        <Loader />
      </div>
    );
  }

  return (
    <div id={styles.container}>
      <div>
        <Header
          title={project.name}
          openSidebar={() => setIsSidebarOpen(true)}
          closeSidebar={() => setIsSidebarOpen(false)}
          isSidebarOpen={isSidebarOpen}
          rightSideComponent={() => (
            <button
              id={styles.membersButton}
              type="button"
              onClick={() => setIsParticipantsModalOpen(true)}
            >
              {projectLanguage.membersButtonText}
            </button>
          )}
        />
        <div id={styles.headerOptions}>
          <div id={styles.optionsContainer}>
            <CreateButton
              title={projectLanguage.newCardButtonText}
              onClick={() => setIsCreationModalOpen(true)}
            />

            <div id={styles.viewOptionsContainer}>
              <View.Option
                text={projectLanguage.viewOptionList}
                icon={FiList}
                active={activeView === "list"}
                onClick={() => setActiveView("list")}
              />
              <View.Option
                text={projectLanguage.viewOptionKanban}
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
      <ManageParticipantsModal
        shown={isParticipantsModalOpen}
        closeModal={() => setIsParticipantsModalOpen(false)}
        project={project}
      />
    </div>
  );
}
