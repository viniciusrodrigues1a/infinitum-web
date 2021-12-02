import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FiMoreVertical, FiPlusCircle, FiCheckCircle } from "react-icons/fi";
import { useParams } from "react-router-dom";

import styles from "./Kanban.module.scss";

import { useAPIService } from "../../../../../contexts/APIServiceContext";
import { useProjects } from "../../../../../contexts/ProjectsContext";

import showToast from "../../../../../utils/showToast";
import IssueModal from "../../IssueModal";

import {
  FormattedIssue,
  FormattedIssueGroup,
} from "../../../../../services/type-defs/FormattedProject";
import { useLanguage } from "../../../../../contexts/LanguageContext";

type IssueModalConfig = {
  shown: boolean;
  issue: FormattedIssue | null;
};

export default function Kanban(): React.ReactElement {
  const params = useParams<{ projectId: string }>();
  const {
    createIssueService,
    createIssueGroupService,
    moveIssueService,
    updateIssueGroupFinalStatusService,
  } = useAPIService();
  const { getProjectById, fetchProjects } = useProjects();
  const {
    language: {
      pages: { project: projectLanguage },
    },
  } = useLanguage();

  const [
    isCreatingNewIssueForIssueGroupId,
    setIsCreatingNewIssueForIssueGroupId,
  ] = useState<string | null>(null);
  const [isCreatingNewIssueGroup, setIsCreatingNewIssueGroup] =
    useState<boolean>(false);
  const [newIssueTitle, setNewIssueTitle] = useState("");
  const [newIssueGroupTitle, setNewIssueGroupTitle] = useState("");
  const [issueModalConfig, setIssueModalConfig] = useState<IssueModalConfig>({
    shown: false,
    issue: null,
  });
  const [issueGroupIdBeingUpdated, setIssueGroupIdBeingUpdated] = useState<
    string | undefined
  >(undefined);

  const newIssueTitleInputRef = useRef<HTMLInputElement>(null);
  const newIssueGroupTitleInputRef = useRef<HTMLInputElement>(null);
  const moreOptionsDropdownRef = useRef<HTMLDivElement>(null);
  const moreOptionsDropdownInputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    const cards = document.querySelectorAll(`.${styles.issueCard}`);
    const dropzones = document.querySelectorAll(`.${styles.issueSectionBody}`);

    cards.forEach((card) => {
      card.addEventListener("dragstart", onDragStart);
      card.addEventListener("dragend", onDragEnd);
    });

    function onDragStart(e: any) {
      dropzones.forEach((dropzone) =>
        dropzone.classList.add(styles.dropzoneHighlight)
      );

      if (e.target.classList) {
        e.target.classList.add(styles.cardIsBeingDragged);
      }

      e.dataTransfer.setData("issueId", e.target.dataset.issueId);
    }

    function onDragEnd(e: any) {
      if (e.target.classList) {
        e.target.classList.remove(styles.cardIsBeingDragged);
      }
    }

    dropzones.forEach((dropzone) => {
      dropzone.addEventListener("dragenter", onDragEnter);
      dropzone.addEventListener("dragover", onDragOver);
      dropzone.addEventListener("dragleave", onDragLeave);
      dropzone.addEventListener("drop", onDrop);
    });

    function onDragEnter(e: any) {
      e.preventDefault();
    }

    function onDragOver(e: any) {
      e.preventDefault();

      if (e.target.classList) {
        e.currentTarget.classList.add(styles.dropzoneDragOver);
      }
    }

    function onDragLeave(e: any) {
      if (e.target.classList) {
        e.currentTarget.classList.remove(styles.dropzoneDragOver);
      }
    }

    async function onDrop(e: any) {
      e.stopImmediatePropagation();

      if (e.target.classList) {
        e.currentTarget.classList.remove(styles.dropzoneDragOver);
      }

      const issueId = e.dataTransfer.getData("issueId");

      const response = await moveIssueService.moveIssue({
        issueId,
        moveToIssueGroupId: e.currentTarget.dataset.issueGroupId,
      });

      const toastMsg = response.userFriendlyMessage;
      if (toastMsg) showToast(toastMsg, response.error);
      if (!response.error) {
        await fetchProjects();
      }
    }
  }, [fetchProjects, moveIssueService]);

  useEffect(() => {
    const body = document.querySelector("body");

    if (!body) {
      return;
    }

    function onClick(e: MouseEvent) {
      if (
        e.target !== moreOptionsDropdownRef.current &&
        e.target !== moreOptionsDropdownInputRef.current &&
        issueGroupIdBeingUpdated
      ) {
        setIssueGroupIdBeingUpdated(undefined);
      }
    }

    body.addEventListener("click", onClick);

    return () => body.removeEventListener("click", onClick);
  }, [issueGroupIdBeingUpdated]);

  async function updateIssueGroupFinalStatus(isFinal: boolean) {
    if (issueGroupIdBeingUpdated) {
      await updateIssueGroupFinalStatusService.updateIssueGroupFinalStatus({
        issueGroupId: issueGroupIdBeingUpdated,
        newIsFinal: isFinal,
      });

      setIssueGroupIdBeingUpdated(undefined);
      await fetchProjects();
    }
  }

  if (!project) return <h1>Projeto não encontrado</h1>;

  return (
    <>
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

                    <button
                      type="button"
                      className={styles.moreOptionsButton}
                      onClick={() =>
                        setIssueGroupIdBeingUpdated(issueGroup.issueGroupId)
                      }
                    >
                      <FiMoreVertical color="var(--dark)" size={20} />
                    </button>

                    {issueGroupIdBeingUpdated === issueGroup.issueGroupId && (
                      <div
                        ref={moreOptionsDropdownRef}
                        className={styles.moreOptionsDropdown}
                      >
                        <span>
                          {projectLanguage.kanban.updateIssueGroupText}
                        </span>
                        <input
                          ref={moreOptionsDropdownInputRef}
                          type="checkbox"
                          name="issue-group-final"
                          id="issue-group-final"
                          defaultChecked={
                            issueGroup.shouldUpdateIssuesToCompleted
                          }
                          onChange={(e) =>
                            updateIssueGroupFinalStatus(e.target.checked)
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className={styles.issueSectionBody}
                  data-issue-group-id={issueGroup.issueGroupId}
                >
                  {issueGroup.issues.map((issue) => (
                    <button
                      type="button"
                      className={styles.issueCardWrapper}
                      onClick={() =>
                        setIssueModalConfig({
                          shown: true,
                          issue,
                        })
                      }
                    >
                      <div
                        className={styles.issueCard}
                        data-issue-id={issue.issueId}
                        draggable
                      >
                        <strong>{issue.title}</strong>

                        <FiCheckCircle
                          className={styles.completedIcon}
                          size={16}
                          color={issue.completed ? "#359e76" : "#999999"}
                        />
                      </div>
                    </button>
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
