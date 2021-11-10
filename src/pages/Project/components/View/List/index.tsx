import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
import { useAPIService } from "../../../../../contexts/APIServiceContext";
import showToast from "../../../../../utils/showToast";

export default function List(): React.ReactElement {
  const params = useParams<{ projectId: string }>();
  const { createIssueService } = useAPIService();
  const { getProjectById, fetchProjects } = useProjects();

  const [collapsedSections, setCollapsedSections] = useState<Array<string>>([]);
  const [
    isCreatingNewIssueForIssueGroupId,
    setIsCreatingNewIssueForIssueGroupId,
  ] = useState<string | null>(null);
  const [newIssueTitle, setNewIssueTitle] = useState("");

  const newIssueTitleInputRef = useRef<HTMLInputElement>(null);

  function closeCreationInput() {
    setIsCreatingNewIssueForIssueGroupId(null);
    setNewIssueTitle("");
  }

  const handleSubmit = useCallback(async () => {
    if (!isCreatingNewIssueForIssueGroupId) return;

    const response = await createIssueService.createIssue({
      title: newIssueTitle,
      description: " ",
      issueGroupId: isCreatingNewIssueForIssueGroupId,
    });
    closeCreationInput();

    const toastMsg = response.userFriendlyMessage;
    if (toastMsg) showToast(toastMsg, response.error);
    if (!response.error) {
      await fetchProjects();
    }
  }, [
    isCreatingNewIssueForIssueGroupId,
    createIssueService,
    fetchProjects,
    newIssueTitle,
  ]);

  useEffect(() => {
    if (newIssueTitleInputRef.current) {
      const elem = newIssueTitleInputRef.current;
      elem.focus();

      elem.addEventListener("blur", closeCreationInput);

      return () => {
        elem.removeEventListener("blur", closeCreationInput);
      };
    }
  }, [isCreatingNewIssueForIssueGroupId, handleSubmit]);

  function toggleCollapsedSectionState(sectionIdentifier: string) {
    if (collapsedSections.indexOf(sectionIdentifier) === -1) {
      setCollapsedSections([...collapsedSections, sectionIdentifier]);
    } else {
      setCollapsedSections((prevState) =>
        prevState.filter((p) => p !== sectionIdentifier)
      );
    }
  }

  const isSectionCollapsed = useCallback(
    (sectionIdentifier: string) =>
      collapsedSections.indexOf(sectionIdentifier) !== -1,
    [collapsedSections]
  );

  const project = useMemo(
    () => getProjectById(params.projectId),
    [getProjectById, params]
  );

  if (!project) {
    return <h1>Projeto não encontrado!</h1>;
  }

  return (
    <>
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
            <button
              onClick={() =>
                toggleCollapsedSectionState(issueGroup.issueGroupId)
              }
              type="button"
              className={`${styles.issuesSectionHeaderIconButton} ${
                isSectionCollapsed(issueGroup.issueGroupId)
                  ? styles.issuesSectionHeaderIconButtonCollapsed
                  : ""
              }`}
            >
              <FiTriangle
                className={`${styles.issuesSectionHeaderIcon}`}
                fill="var(--dark)"
                color="var(--dark)"
                size={12}
              />
            </button>
            <h1>{issueGroup.title}</h1>
          </div>

          {!isSectionCollapsed(issueGroup.issueGroupId) && (
            <div className={styles.issues}>
              {issueGroup.issues.map((issue) => (
                <div key={issue.issueId} className={styles.issue}>
                  <span>{issue.title}</span>
                  <span>{issue.expiresAtFullDate}</span>
                </div>
              ))}

              {isCreatingNewIssueForIssueGroupId ===
                issueGroup.issueGroupId && (
                <div className={styles.newIssueInputsContainer}>
                  <form
                    onSubmit={(e) => {
                      console.log("submit");
                      e.preventDefault();
                      handleSubmit();
                    }}
                  >
                    <input
                      ref={newIssueTitleInputRef}
                      type="text"
                      name="title"
                      id="title"
                      placeholder="Título"
                      value={newIssueTitle}
                      onChange={(e) => setNewIssueTitle(e.target.value)}
                    />
                  </form>
                </div>
              )}

              <button
                type="button"
                className={styles.newIssueButton}
                onClick={() =>
                  setIsCreatingNewIssueForIssueGroupId(issueGroup.issueGroupId)
                }
              >
                <FiPlusCircle size={18} color="#888888" />
                <span>Adicionar nova tarefa...</span>
              </button>
            </div>
          )}

          {index === project.issueGroups.length - 1 && (
            <button type="button" className={styles.newSectionButton}>
              <FiPlusCircle size={20} color="#888888" />
              <span>Adicionar seção...</span>
            </button>
          )}
        </div>
      ))}
    </>
  );
}
