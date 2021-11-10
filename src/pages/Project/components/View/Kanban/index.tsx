import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FiMoreVertical, FiPlusCircle } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { useAPIService } from "../../../../../contexts/APIServiceContext";
import { useProjects } from "../../../../../contexts/ProjectsContext";
import { FormattedIssueGroup } from "../../../../../services/type-defs/FormattedProject";
import showToast from "../../../../../utils/showToast";
import styles from "./Kanban.module.scss";

export default function Kanban(): React.ReactElement {
  const params = useParams<{ projectId: string }>();
  const { createIssueService, createIssueGroupService } = useAPIService();
  const { getProjectById, fetchProjects } = useProjects();

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
    [params, getProjectById]
  );

  const handleIssueSubmit = useCallback(async () => {
    if (!isCreatingNewIssueForIssueGroupId) return;
    closeIssueCreationInput();

    const response = await createIssueService.createIssue({
      title: newIssueTitle,
      description: " ",
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
    closeIssueCreationInput();

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

  if (!project) return <h1>Projeto não encontrado</h1>;

  return (
    <div id={styles.containerGrid}>
      <div id={styles.containerWrapper}>
        <div id={styles.container}>
          {project.issueGroups.map((issueGroup: FormattedIssueGroup) => (
            <div className={styles.issueSectionContainer}>
              <div className={styles.issueSectionHeader}>
                <span>{issueGroup.title}</span>

                <div className={styles.issueSectionHeaderButtons}>
                  <button
                    type="button"
                    className={styles.addIssueButton}
                    onClick={() =>
                      setIsCreatingNewIssueForIssueGroupId(
                        issueGroup.issueGroupId
                      )
                    }
                  >
                    <FiPlusCircle color="var(--dark)" size={20} />
                  </button>

                  <button type="button" className={styles.moreOptionsButton}>
                    <FiMoreVertical color="var(--dark)" size={20} />
                  </button>
                </div>
              </div>

              <div className={styles.issueSectionBody}>
                {issueGroup.issues.map((issue) => (
                  <div className={styles.issueCard}>
                    <strong>{issue.title}</strong>
                  </div>
                ))}

                {isCreatingNewIssueForIssueGroupId ===
                issueGroup.issueGroupId ? (
                  <form
                    className={styles.issueCardInputContainer}
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleIssueSubmit();
                    }}
                  >
                    <input
                      ref={newIssueTitleInputRef}
                      type="text"
                      name="card-title"
                      id="card-title"
                      value={newIssueTitle}
                      onChange={(e) => setNewIssueTitle(e.target.value)}
                      placeholder="Título"
                      className={styles.issueCardInput}
                    />
                  </form>
                ) : (
                  <button
                    type="button"
                    className={styles.addCardButton}
                    disabled={!!isCreatingNewIssueForIssueGroupId}
                    onClick={() =>
                      setIsCreatingNewIssueForIssueGroupId(
                        issueGroup.issueGroupId
                      )
                    }
                  >
                    <FiPlusCircle color="#888888" size={20} />
                    <span>Novo card</span>
                  </button>
                )}
              </div>
            </div>
          ))}

          <div
            className={`${styles.issueSectionContainer} ${styles.skeletonIssueGroup}`}
          >
            <div className={styles.issueSectionHeader}>
              {isCreatingNewIssueGroup ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleIssueGroupSubmit();
                  }}
                >
                  <input
                    ref={newIssueGroupTitleInputRef}
                    className={styles.issueGroupInput}
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
                  className={styles.addIssueButton}
                  onClick={() => setIsCreatingNewIssueGroup(true)}
                >
                  <FiPlusCircle color="#888888" size={24} />
                  <span>Nova seção</span>
                </button>
              )}
            </div>

            <div className={styles.issueSectionBody} />
          </div>
        </div>
      </div>
    </div>
  );
}
