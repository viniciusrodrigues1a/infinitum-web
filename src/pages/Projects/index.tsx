import React, { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  FiTriangle,
  FiClipboard,
  FiPercent,
  FiShield,
  FiCalendar,
  FiPlusCircle,
} from "react-icons/fi";
import { IconBaseProps } from "react-icons/lib";

import styles from "./Projects.module.css";

import { useSidebar } from "../../contexts/SidebarContext";
import { useLanguage } from "../../contexts/LanguageContext";

import Header from "../../components/Header";

import { ReactComponent as UserOwnerSvg } from "../../assets/user-owner.svg";
import Table from "../../components/Table";
import { useAPIService } from "../../contexts/APIServiceContext";
import { ListProjectsServiceResponse } from "../../services/interfaces";
import { useDateFormatter } from "../../contexts/DateFormatterContext";

export default function Projects(): React.ReactElement {
  const {
    language: {
      pages: { projects: projectsLanguage },
    },
  } = useLanguage();
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  const { listProjectsService } = useAPIService();
  const { formatToFullDate } = useDateFormatter();

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<ListProjectsServiceResponse[]>([]);

  const callService = useCallback(async () => {
    const projects = await listProjectsService.list();

    if (projects.data) {
      setProjects(projects.data);
    }
  }, [listProjectsService]);

  useEffect(() => {
    callService();
  }, [callService]);

  const getOwnerParticipant = useCallback(
    (participants: ListProjectsServiceResponse["participants"]) => {
      const owner = participants.find((p) => p.projectRoleName === "owner");

      if (!owner) return "";

      return owner.name;
    },
    []
  );

  return (
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

              <button type="button" id={styles.newProjectButton}>
                <FiPlusCircle
                  className={styles.buttonIcon}
                  color="var(--dark)"
                  size={18}
                />
                <span className={styles.buttonText}>
                  {projectsLanguage.buttonText}
                </span>
              </button>
            </div>
          </div>

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
                  <Table.Th align="center" leftIcon={FiShield} text="Status" />
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
                {projects.map((p) => (
                  <Table.Row>
                    <Table.Td>{p.name}</Table.Td>
                    <Table.Td align="center">9%</Table.Td>
                    <Table.Td align="center">
                      {p.archived ? "Arquivado" : "Ativo"}
                    </Table.Td>
                    <Table.Td align="center">
                      {getOwnerParticipant(p.participants)}
                    </Table.Td>
                    <Table.Td align="center">
                      {p.beginsAt ? formatToFullDate(p.beginsAt) : ""}
                    </Table.Td>
                    <Table.Td align="right">
                      {p.finishesAt ? formatToFullDate(p.finishesAt) : ""}
                    </Table.Td>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Container>
          </div>
        </div>
      </main>
    </div>
  );
}
