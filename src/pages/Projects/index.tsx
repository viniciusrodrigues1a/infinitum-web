import React from "react";
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

export default function Projects(): React.ReactElement {
  const { language } = useLanguage();
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();

  return (
    <div id={styles.container}>
      <Header
        title={language.dashboard.headerTitle}
        openSidebar={() => setIsSidebarOpen(true)}
        closeSidebar={() => setIsSidebarOpen(false)}
        isSidebarOpen={isSidebarOpen}
      />

      <main id={styles.main}>
        <div id={styles.mainHeaderWrapper}>
          <div id={styles.mainHeader}>
            <div id={styles.filterContainer}>
              <span id={styles.filterText}>Todos os projetos</span>
              <FiTriangle
                id={styles.filterIcon}
                size={8}
                color="#1974D2"
                fill="#1974D2"
              />
            </div>

            <button type="button" id={styles.newProjectButton}>
              <FiPlusCircle color="var(--dark)" size={18} />
              <span className={styles.buttonText}>Novo projeto</span>
            </button>
          </div>
        </div>

        <div id={styles.tableWrapper}>
          <Table.Container>
            <Table.Head>
              <Table.Row>
                <Table.Th leftIcon={FiClipboard} text="Nome do projeto" />
                <Table.Th
                  align="center"
                  leftIcon={FiPercent}
                  text="Progresso"
                />
                <Table.Th align="center" leftIcon={FiShield} text="Status" />
                <Table.Th
                  align="center"
                  leftIcon={(props: IconBaseProps) => (
                    <UserOwnerSvg {...props} />
                  )}
                  text="Dono"
                />
                <Table.Th
                  align="center"
                  leftIcon={FiCalendar}
                  text="Data de início"
                />
                <Table.Th
                  align="right"
                  leftIcon={FiCalendar}
                  text="Data de término"
                />
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {new Array(30).fill(0).map(() => (
                <Table.Row>
                  <Table.Td>Projeto TCC</Table.Td>
                  <Table.Td align="center">9%</Table.Td>
                  <Table.Td align="center">Ativo</Table.Td>
                  <Table.Td align="center">Jorge</Table.Td>
                  <Table.Td align="center">Set 7, 2021</Table.Td>
                  <Table.Td align="right">Set 10, 2021</Table.Td>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Container>
        </div>
      </main>
    </div>
  );
}
