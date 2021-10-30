import React, { useMemo } from "react";
import {
  FiAlignLeft,
  FiCalendar,
  FiPlusCircle,
  FiTriangle,
} from "react-icons/fi";
import { useParams } from "react-router-dom";

import styles from "./List.module.scss";

import { useProjects } from "../../../../../contexts/ProjectsContext";

import { FormattedIssueGroup } from "../../../../../services/type-defs/FormattedProject";

export default function List(): React.ReactElement {
  const params = useParams<{ projectId: string }>();
  const { getProjectById } = useProjects();

  const project = useMemo(
    () => getProjectById(params.projectId),
    [getProjectById, params]
  );

  if (!project) {
    return <h1>Projeto não encontrado!</h1>;
  }

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

      {project.issueGroups.map((issueGroup: FormattedIssueGroup, index) => (
        <div key={issueGroup.issueGroupId} className={styles.issuesSection}>
          <div className={styles.issuesSectionHeader}>
            <FiTriangle
              className={styles.issuesSectionHeaderIcon}
              fill="var(--dark)"
              color="var(--dark)"
              size={12}
            />
            <h1>{issueGroup.title}</h1>
          </div>

          <div className={styles.issues}>
            {issueGroup.issues.map((issue) => (
              <div key={issue.issueId} className={styles.issue}>
                <span>{issue.title}</span>
                <span>{issue.expiresAtFullDate}</span>
              </div>
            ))}
            <button type="button" className={styles.newIssueButton}>
              <FiPlusCircle size={18} color="#888888" />
              <span>Adicionar nova tarefa...</span>
            </button>
          </div>

          {index === project.issueGroups.length - 1 && (
            <button type="button" className={styles.newSectionButton}>
              <FiPlusCircle size={20} color="#888888" />
              <span>Adicionar seção...</span>
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
