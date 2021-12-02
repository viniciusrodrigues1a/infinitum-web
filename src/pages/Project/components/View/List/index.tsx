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
  FiCheckCircle,
} from "react-icons/fi";
import { useParams } from "react-router-dom";

import styles from "./List.module.scss";

import IssueModal from "../../IssueModal";

import { useProjects } from "../../../../../contexts/ProjectsContext";

import {
  FormattedIssue,
  FormattedIssueGroup,
} from "../../../../../services/type-defs/FormattedProject";
import { useAPIService } from "../../../../../contexts/APIServiceContext";
import showToast from "../../../../../utils/showToast";

type IssueModalConfig = {
  shown: boolean;
  issue: FormattedIssue | null;
};

export default function List(): React.ReactElement {
  const params = useParams<{ projectId: string }>();
  const { createIssueService, createIssueGroupService, updateIssueService } =
    useAPIService();
  const { getProjectById, fetchProjects } = useProjects();

  const [issueModalConfig, setIssueModalConfig] = useState<IssueModalConfig>({
    shown: false,
    issue: null,
  });
  const [collapsedSections, setCollapsedSections] = useState<Array<string>>([]);
  const [
    isCreatingNewIssueForIssueGroupId,
    setIsCreatingNewIssueForIssueGroupId,
  ] = useState<string | null>(null);
  const [isCreatingNewIssueGroup, setIsCreatingNewIssueGroup] =
    useState<boolean>(false);
  const [newIssueTitle, setNewIssueTitle] = useState("");
  const [newIssueGroupTitle, setNewIssueGroupTitle] = useState("");

  const newIssueTitleInputRef = useRef<HTMLInputElement>(null);
  const newIssueGroupTitleInputRef = useRef<HTMLInputElement>(null);

  function closeIssueCreationInput() {
    setIsCreatingNewIssueForIssueGroupId(null);
    setNewIssueTitle("");
  }

  function closeIssueGroupCreationInput() {
    setIsCreatingNewIssueGroup(false);
    setNewIssueGroupTitle("");
  }

  const project = useMemo(
    () => getProjectById(params.projectId),
    [getProjectById, params]
  );

  const handleIssueSubmit = useCallback(async () => {
    if (!isCreatingNewIssueForIssueGroupId) return;
    closeIssueCreationInput();

    const response = await createIssueService.createIssue({
      title: newIssueTitle,
      issueGroupId: isCreatingNewIssueForIssueGroupId,
    });

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

  const handleIssueGroupSubmit = useCallback(async () => {
    if (!isCreatingNewIssueGroup) return;
    closeIssueGroupCreationInput();

    const response = await createIssueGroupService.createIssueGroup({
      title: newIssueGroupTitle,
      projectId: project!.projectId,
    });

    const toastMsg = response.userFriendlyMessage;
    if (toastMsg) showToast(toastMsg, response.error);
    if (!response.error) {
      await fetchProjects();
    }
  }, [
    isCreatingNewIssueGroup,
    createIssueGroupService,
    fetchProjects,
    newIssueGroupTitle,
    project,
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
  }, [isCreatingNewIssueForIssueGroupId]);

  useEffect(() => {
    if (newIssueGroupTitleInputRef.current) {
      const elem = newIssueGroupTitleInputRef.current;
      elem.focus();

      elem.addEventListener("blur", closeIssueGroupCreationInput);

      return () => {
        elem.removeEventListener("blur", closeIssueGroupCreationInput);
      };
    }
  }, [isCreatingNewIssueGroup]);

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

  async function updateIssueCompletedStatus(
    issueId: string,
    currentCompletedStatus: boolean
  ) {
    await updateIssueService.updateIssue({
      issueId,
      newAssignedToEmail: "undefined",
      newCompleted: !currentCompletedStatus,
    });

    await fetchProjects();
  }

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
                    onClick={() =>
                      setIssueModalConfig({
                        shown: true,
                        issue,
                      })
                    }
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

      <IssueModal
        shown={issueModalConfig.shown}
        issue={issueModalConfig.issue as FormattedIssue}
        issueGroups={project.issueGroups}
        participants={project.participants}
        closeModal={() =>
          setIssueModalConfig({
            shown: false,
            issue: null,
          })
        }
      />
    </>
  );
}
