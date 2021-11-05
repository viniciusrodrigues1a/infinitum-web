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
  const { createIssueService } = useAPIService();
  const { getProjectById, fetchProjects } = useProjects();

  const [
    isCreatingNewIssueForIssueGroupId,
    setIsCreatingNewIssueForIssueGroupId,
  ] = useState<string | null>(null);
  const [newIssueTitle, setNewIssueTitle] = useState("");

  const newIssueTitleInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(async () => {
    if (!isCreatingNewIssueForIssueGroupId) return;

    const response = await createIssueService.createIssue({
      title: newIssueTitle,
      description: " ",
      issueGroupId: isCreatingNewIssueForIssueGroupId,
    });
    setIsCreatingNewIssueForIssueGroupId(null);
    setNewIssueTitle("");

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

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  useEffect(() => {
    if (newIssueTitleInputRef.current) {
      const elem = newIssueTitleInputRef.current;
      elem.focus();

      elem.addEventListener("blur", handleSubmit);
      elem.addEventListener("keypress", handleKeyPress);

      return () => {
        elem.removeEventListener("blur", handleSubmit);
        elem.removeEventListener("keypress", handleKeyPress);
      };
    }
  }, [isCreatingNewIssueForIssueGroupId, handleKeyPress, handleSubmit]);

  const project = useMemo(
    () => getProjectById(params.projectId),
    [params, getProjectById]
  );

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
                  issueGroup.issueGroupId && (
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
                )}

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
              </div>
            </div>
          ))}

          <div
            className={`${styles.issueSectionContainer} ${styles.skeletonIssueSection}`}
          >
            <div className={styles.issueSectionHeader}>
              <button
                type="button"
                className={styles.addIssueButton}
                onClick={() => {}}
              >
                <FiPlusCircle color="#888888" size={24} />
                <span>Nova seção</span>
              </button>
            </div>

            <div className={styles.issueSectionBody} />
          </div>
        </div>
      </div>
    </div>
  );
}
