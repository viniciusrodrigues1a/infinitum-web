import React from "react";
import {
  FiAlignLeft,
  FiCalendar,
  FiTriangle,
  FiPlusCircle,
} from "react-icons/fi";

import styles from "./List.module.scss";

export default function List(): React.ReactElement {
  return (
    <div id={styles.container}>
      <div id={styles.infoHeadContainer}>
        <div>
          <FiAlignLeft color="#999999" size={20} />
          <span>Título</span>
        </div>
        <div>
          <FiCalendar color="#999999" size={20} />
          <span>Data de conclusão</span>
        </div>
      </div>

      <div className={styles.issuesSection}>
        <div className={styles.issuesSectionHeader}>
          <FiTriangle
            className={styles.issuesSectionHeaderIcon}
            fill="var(--dark)"
            color="var(--dark)"
            size={12}
          />
          <h1>A fazer</h1>
        </div>

        <div className={styles.issues}>
          {new Array(2).fill(0).map(() => (
            <div className={styles.issue}>
              <span>Projeto TCC</span>
              <span>Set 7, 2021</span>
            </div>
          ))}
          <button type="button" className={styles.newIssueButton}>
            <FiPlusCircle size={18} color="#888888" />
            <span>Adicionar nova tarefa...</span>
          </button>
        </div>
      </div>

      <div className={styles.issuesSection}>
        <div className={styles.issuesSectionHeader}>
          <FiTriangle
            className={styles.issuesSectionHeaderIcon}
            fill="var(--dark)"
            color="var(--dark)"
            size={12}
          />
          <h1>Em andamento</h1>
        </div>

        <div className={styles.issues}>
          {new Array(2).fill(0).map(() => (
            <div className={styles.issue}>
              <span>Projeto TCC</span>
              <span>Set 7, 2021</span>
            </div>
          ))}

          <button type="button" className={styles.newIssueButton}>
            <FiPlusCircle size={18} color="#888888" />
            <span>Adicionar nova tarefa...</span>
          </button>
        </div>

        <button type="button" className={styles.newSectionButton}>
          <FiPlusCircle size={20} color="#888888" />
          <span>Adicionar seção...</span>
        </button>
      </div>
    </div>
  );
}
