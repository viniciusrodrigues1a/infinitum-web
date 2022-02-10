import React, { SVGProps, useMemo, useState } from "react";
import { FiList, FiLayout, FiSettings } from "react-icons/fi";

import { useParams, useHistory } from "react-router-dom";

import RoutesEnum from "../../routes/type-defs/RoutesEnum";

import styles from "./Project.module.scss";

import CreateButton from "../../components/CreateButton";
import Header from "../../components/Header";
import View from "./components/View";
import CreateIssueModal from "../../components/CreateIssueModal";
import UpdateProjectModal from "../../components/UpdateProjectModal";
import ManageParticipantsModal from "../../components/ManageParticipantsModal";
import EmptyList from "../../components/EmptyList";

import { ReactComponent as ProjectNotFoundSvg } from "../../assets/project-not-found.svg";

import { ViewsProvider } from "../../contexts/ViewsContext";
import { useSidebar } from "../../contexts/SidebarContext";
import { useProjects } from "../../contexts/ProjectsContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { ParticipantRoleValue } from "../../services/type-defs/Project";

export default function Project(): React.ReactElement {
  const history = useHistory();
  const params = useParams<{ projectId: string }>();

  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  const { getProjectById, getLoggedInUserRoleInProject } = useProjects();
  const {
    language: {
      pages: { project: projectLanguage },
    },
  } = useLanguage();

  const [project, loggedInUserRole] = useMemo(() => {
    const project = getProjectById(params.projectId);
    if (project) {
      const loggedInUserRole = getLoggedInUserRoleInProject(
        project
      ) as ParticipantRoleValue;
      return [project, loggedInUserRole];
    }
    return [project, "espectator" as ParticipantRoleValue];
  }, [getProjectById, getLoggedInUserRoleInProject, params]);

  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isParticipantsModalOpen, setIsParticipantsModalOpen] = useState(false);
  const [activeView, setActiveView] = useState<"list" | "kanban">("list");

  if (!project) {
    return (
      <EmptyList
        text={projectLanguage.projectNotFoundText}
        svg={(props: SVGProps<SVGSVGElement>) => (
          <ProjectNotFoundSvg {...props} />
        )}
        buttonComponent={() => (
          <button
            type="button"
            id={styles.emptyListButton}
            onClick={() => history.push(RoutesEnum.PROJECTS)}
          >
            {projectLanguage.projectNotFoundButtonText}
          </button>
        )}
      />
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
            <>
              {(loggedInUserRole === "owner" ||
                loggedInUserRole === "admin") && (
                <button
                  id={styles.membersButton}
                  type="button"
                  onClick={() => setIsParticipantsModalOpen(true)}
                >
                  {projectLanguage.membersButtonText}
                </button>
              )}
            </>
          )}
        />
        <div id={styles.headerOptions}>
          <div id={styles.optionsContainer}>
            {loggedInUserRole !== "espectator" && (
              <div id={styles.createButtonWrapper}>
                <CreateButton
                  title={projectLanguage.newCardButtonText}
                  onClick={() => setIsCreationModalOpen(true)}
                />
              </div>
            )}

            <div id={styles.viewOptionsContainer}>
              <View.Option
                text={projectLanguage.views.list.option}
                icon={FiList}
                active={activeView === "list"}
                onClick={() => setActiveView("list")}
              />
              <View.Option
                text={projectLanguage.views.kanban.option}
                icon={FiLayout}
                active={activeView === "kanban"}
                onClick={() => setActiveView("kanban")}
              />
            </div>
          </div>

          {(loggedInUserRole === "owner" || loggedInUserRole === "admin") && (
            <button
              id={styles.updateButton}
              type="button"
              onClick={() => setIsUpdateModalOpen(true)}
            >
              <FiSettings color="var(--dark)" size={20} />
            </button>
          )}
        </div>
      </div>

      <main role="main">
        <ViewsProvider>
          {activeView === "list" && (
            <View.List project={project} loggedInUserRole={loggedInUserRole} />
          )}
          {activeView === "kanban" && (
            <View.Kanban
              project={project}
              loggedInUserRole={loggedInUserRole}
            />
          )}
        </ViewsProvider>
      </main>

      {loggedInUserRole !== "espectator" && (
        <CreateIssueModal
          shown={isCreationModalOpen}
          closeModal={() => setIsCreationModalOpen(false)}
        />
      )}

      {(loggedInUserRole === "owner" || loggedInUserRole === "admin") && (
        <>
          <UpdateProjectModal
            shown={isUpdateModalOpen}
            closeModal={() => setIsUpdateModalOpen(false)}
            project={project}
          />
          <ManageParticipantsModal
            shown={isParticipantsModalOpen}
            closeModal={() => setIsParticipantsModalOpen(false)}
            project={project}
          />
        </>
      )}
    </div>
  );
}
