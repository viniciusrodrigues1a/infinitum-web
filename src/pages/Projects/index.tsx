import React, { useState } from "react";
import {
  FiTriangle,
  FiClipboard,
  FiPercent,
  FiShield,
  FiCalendar,
} from "react-icons/fi";
import { IconBaseProps } from "react-icons/lib";

import { useHistory } from "react-router-dom";
import styles from "./Projects.module.css";

import { useSidebar } from "../../contexts/SidebarContext";
import { useLanguage } from "../../contexts/LanguageContext";

import Header from "../../components/Header";
import EmptyProjects from "./components/EmptyProjects";
import CreateButton from "../../components/CreateButton";
import Table from "../../components/Table";
import CreateProjectModal from "../../components/CreateProjectModal";
import Loader from "../../components/Loader";

import { ReactComponent as UserOwnerSvg } from "../../assets/user-owner.svg";
import { useProjects } from "../../contexts/ProjectsContext";

export default function Projects(): React.ReactElement {
  const history = useHistory();

  const {
    language: {
      pages: { projects: projectsLanguage },
    },
  } = useLanguage();
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  const { projects, loading } = useProjects();

  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);

  return (
    <>
      <div id={styles.container}>
        <Header
          title={projectsLanguage.headerTitle}
          openSidebar={() => setIsSidebarOpen(true)}
          closeSidebar={() => setIsSidebarOpen(false)}
          isSidebarOpen={isSidebarOpen}
        />

        <main id={styles.main}>
          <div id={styles.mainContent}>
            <div id={styles.mainHeaderWrapper}>
              <div id={styles.mainHeader}>
                <div id={styles.filterContainer}>
                  <span id={styles.filterText}>
                    {projectsLanguage.filter.allProjects}
                  </span>
                  <FiTriangle
                    id={styles.filterIcon}
                    size={8}
                    color="#1974D2"
                    fill="#1974D2"
                  />
                </div>

                <CreateButton
                  title={projectsLanguage.buttonText}
                  onClick={() => setIsCreationModalOpen(true)}
                />
              </div>
            </div>

            {loading ? (
              <div style={{ marginTop: "5rem" }}>
                <Loader />
              </div>
            ) : projects.length === 0 ? (
              <EmptyProjects
                onButtonClick={() => setIsCreationModalOpen(true)}
              />
            ) : (
              <div id={styles.tableWrapper}>
                <Table.Container>
                  <Table.Head>
                    <Table.Row>
                      <Table.Th
                        leftIcon={FiClipboard}
                        text={projectsLanguage.table.projectNameTitle}
                      />
                      <Table.Th
                        align="center"
                        leftIcon={FiPercent}
                        text={projectsLanguage.table.progressTitle}
                      />
                      <Table.Th
                        align="center"
                        leftIcon={FiShield}
                        text="Status"
                      />
                      <Table.Th
                        align="center"
                        leftIcon={(props: IconBaseProps) => (
                          <UserOwnerSvg {...props} />
                        )}
                        text={projectsLanguage.table.ownershipTitle}
                      />
                      <Table.Th
                        align="center"
                        leftIcon={FiCalendar}
                        text={projectsLanguage.table.startDateTitle}
                      />
                      <Table.Th
                        align="right"
                        leftIcon={FiCalendar}
                        text={projectsLanguage.table.endDateTitle}
                      />
                    </Table.Row>
                  </Table.Head>
                  <Table.Body>
                    <>
                      {projects.map((p) => (
                        <Table.Row
                          onClick={() =>
                            history.push(`/project/${p.projectId}`)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <Table.Td>{p.name}</Table.Td>
                          <Table.Td align="center">
                            {p.progressPercentage}%
                          </Table.Td>
                          <Table.Td align="center">
                            {p.archived ? "Arquivado" : "Ativo"}
                          </Table.Td>
                          <Table.Td align="center">{p.ownerName}</Table.Td>
                          <Table.Td align="center">
                            {p.beginsAtFullDate}
                          </Table.Td>
                          <Table.Td align="right">
                            {p.finishesAtFullDate}
                          </Table.Td>
                        </Table.Row>
                      ))}
                    </>
                  </Table.Body>
                </Table.Container>
              </div>
            )}
          </div>
        </main>
      </div>

      <CreateProjectModal
        shown={isCreationModalOpen}
        closeModal={() => setIsCreationModalOpen(false)}
      />
    </>
  );
}
