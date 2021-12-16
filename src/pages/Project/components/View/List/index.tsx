import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FiAlignLeft,
  FiCalendar,
  FiPlusCircle,
  FiTriangle,
  FiCheckCircle,
} from "react-icons/fi";

import styles from "./List.module.scss";

import {
  FormattedIssue,
  FormattedIssueGroup,
  FormattedProject,
} from "../../../../../services/type-defs/FormattedProject";

import UpdateIssueModal from "../../../../../components/UpdateIssueModal";
import IssueGroupOptionsButton from "../IssueGroupOptionsButton";

import { useViewsState } from "../../../../../contexts/ViewsContext";

type ListProps = {
  project: FormattedProject;
};

export default function List({ project }: ListProps): React.ReactElement {
  const {
    issueBeingUpdated,
    setIssueBeingUpdated,
    issueGroupIdBeingUpdated,
    setIssueGroupIdBeingUpdated,
    isCreatingNewIssueForIssueGroupId,
    setIsCreatingNewIssueForIssueGroupId,
    isCreatingNewIssueGroup,
    setIsCreatingNewIssueGroup,
    createIssue,
    createIssueGroup,
    updateIssueCompletedStatus,
    updateIssueGroupFinalStatus,
  } = useViewsState();

  const [collapsedSections, setCollapsedSections] = useState<Array<string>>([]);
  const [newIssueTitle, setNewIssueTitle] = useState("");
  const [newIssueGroupTitle, setNewIssueGroupTitle] = useState("");

  const newIssueTitleInputRef = useRef<HTMLInputElement>(null);
  const newIssueGroupTitleInputRef = useRef<HTMLInputElement>(null);

  const closeIssueCreationInput = useCallback(() => {
    setIsCreatingNewIssueForIssueGroupId(null);
    setNewIssueTitle("");
  }, [setIsCreatingNewIssueForIssueGroupId]);

  const closeIssueGroupCreationInput = useCallback(async () => {
    setIsCreatingNewIssueGroup(false);
    setNewIssueGroupTitle("");
  }, [setIsCreatingNewIssueGroup]);

  const handleIssueSubmit = useCallback(async () => {
    if (!isCreatingNewIssueForIssueGroupId) return;
    closeIssueCreationInput();

    await createIssue({
      title: newIssueTitle,
      issueGroupId: isCreatingNewIssueForIssueGroupId,
    });
  }, [
    isCreatingNewIssueForIssueGroupId,
    newIssueTitle,
    createIssue,
    closeIssueCreationInput,
  ]);

  const handleIssueGroupSubmit = useCallback(async () => {
    if (!isCreatingNewIssueGroup) return;
    closeIssueGroupCreationInput();

    await createIssueGroup({
      title: newIssueGroupTitle,
      projectId: project.projectId,
    });
  }, [
    isCreatingNewIssueGroup,
    createIssueGroup,
    newIssueGroupTitle,
    project,
    closeIssueGroupCreationInput,
  ]);

  useEffect(() => {
    if (newIssueTitleInputRef.current) {
      const elem = newIssueTitleInputRef.current;
      elem.focus();

      elem.addEventListener("blur", closeIssueCreationInput);

      return () => {
        elem.removeEventListener("blur", closeIssueCreationInput);
      };
    }
  }, [isCreatingNewIssueForIssueGroupId, closeIssueCreationInput]);

  useEffect(() => {
    if (newIssueGroupTitleInputRef.current) {
      const elem = newIssueGroupTitleInputRef.current;
      elem.focus();

      elem.addEventListener("blur", closeIssueGroupCreationInput);

      return () => {
        elem.removeEventListener("blur", closeIssueGroupCreationInput);
      };
    }
  }, [isCreatingNewIssueGroup, closeIssueGroupCreationInput]);

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

  useEffect(() => {
    const body = document.querySelector("body");

    if (!body) {
      return;
    }

    function onClick() {
      if (issueGroupIdBeingUpdated) {
        setIssueGroupIdBeingUpdated(null);
      }
    }

    body.addEventListener("click", onClick);

    return () => body.removeEventListener("click", onClick);
  }, [issueGroupIdBeingUpdated, setIssueGroupIdBeingUpdated]);

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
            <div className={styles.issueSectionHeaderTitle}>
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

            <IssueGroupOptionsButton
              isDropdownShown={
                issueGroupIdBeingUpdated === issueGroup.issueGroupId
              }
              defaultChecked={issueGroup.shouldUpdateIssuesToCompleted}
              onClick={() =>
                setIssueGroupIdBeingUpdated(issueGroup.issueGroupId)
              }
              onChange={(e) => updateIssueGroupFinalStatus(e.target.checked)}
            />
          </div>

          {!isSectionCollapsed(issueGroup.issueGroupId) && (
            <div className={styles.issues}>
              {issueGroup.issues.map((issue) => (
                <div className={styles.issueWrapper}>
                  <button
                    type="button"
                    onClick={() =>
                      updateIssueCompletedStatus(issue.issueId, issue.completed)
                    }
                  >
                    <FiCheckCircle
                      className={
                        issue.completed
                          ? styles.checkCircleIconCompleted
                          : styles.checkCircleIcon
                      }
                      color={issue.completed ? "#359e76" : "#999999"}
                      size={20}
                    />
                  </button>
                  <button
                    onClick={() => setIssueBeingUpdated(issue)}
                    type="button"
                    key={issue.issueId}
                    className={styles.issue}
                  >
                    <span>{issue.title}</span>
                    <span>{issue.expiresAtFullDate}</span>
                  </button>
                </div>
              ))}

              {isCreatingNewIssueForIssueGroupId === issueGroup.issueGroupId ? (
                <div className={styles.newIssueInputsContainer}>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleIssueSubmit();
                    }}
                  >
                    <input
                      ref={newIssueTitleInputRef}
                      type="text"
                      name="issue-title"
                      id="issue-title"
                      placeholder="Título do ticket"
                      value={newIssueTitle}
                      onChange={(e) => setNewIssueTitle(e.target.value)}
                    />
                  </form>
                </div>
              ) : (
                <button
                  type="button"
                  className={styles.newIssueButton}
                  onClick={() =>
                    setIsCreatingNewIssueForIssueGroupId(
                      issueGroup.issueGroupId
                    )
                  }
                >
                  <FiPlusCircle size={18} color="#888888" />
                  <span>Adicionar nova tarefa...</span>
                </button>
              )}
            </div>
          )}

          {index === project.issueGroups.length - 1 && (
            <>
              {isCreatingNewIssueGroup ? (
                <form
                  className={styles.newIssueGroupInputContainer}
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleIssueGroupSubmit();
                  }}
                >
                  <input
                    ref={newIssueGroupTitleInputRef}
                    type="text"
                    name="issue-group-title"
                    id="issue-group-title"
                    placeholder="Título da seção"
                    value={newIssueGroupTitle}
                    onChange={(e) => setNewIssueGroupTitle(e.target.value)}
                  />
                </form>
              ) : (
                <button
                  type="button"
                  className={styles.newSectionButton}
                  onClick={() => setIsCreatingNewIssueGroup(true)}
                >
                  <FiPlusCircle size={20} color="#888888" />
                  <span>Adicionar seção...</span>
                </button>
              )}
            </>
          )}
        </div>
      ))}

      <UpdateIssueModal
        shown={!!issueBeingUpdated}
        issue={issueBeingUpdated as FormattedIssue}
        issueGroups={project.issueGroups}
        participants={project.participants}
        closeModal={() => setIssueBeingUpdated(null)}
      />
    </>
  );
}
