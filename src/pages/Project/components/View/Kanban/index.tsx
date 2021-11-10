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

  function closeCreationInput() {
    setIsCreatingNewIssueForIssueGroupId(null);
    setNewIssueTitle("");
  }

  const handleSubmit = useCallback(async () => {
    if (!isCreatingNewIssueForIssueGroupId) return;
    closeCreationInput();

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
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit();
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
