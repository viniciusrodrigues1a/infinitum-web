import React, { useCallback, useEffect, useRef, useState } from "react";
import { FiPlusCircle, FiCheckCircle } from "react-icons/fi";

import styles from "./Kanban.module.scss";

import UpdateIssueModal from "../../../../../components/UpdateIssueModal";

import IssueGroupOptions from "../IssueGroupOptions";

import {
  FormattedIssue,
  FormattedIssueGroup,
  FormattedProject,
} from "../../../../../services/type-defs/FormattedProject";
import { useViewsState } from "../../../../../contexts/ViewsContext";
import { useLanguage } from "../../../../../contexts/LanguageContext";
import { ParticipantRoleValue } from "../../../../../services/type-defs/Project";

type KanbanProps = {
  project: FormattedProject;
  loggedInUserRole: ParticipantRoleValue;
};

export default function Kanban({
  project,
  loggedInUserRole,
}: KanbanProps): React.ReactElement {
  const {
    language: {
      pages: { project: projectLanguage },
    },
  } = useLanguage();
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
    moveIssue,
    updateIssueGroupFinalStatus,
    updateIssueGroupColor,
    deleteIssueGroup,
  } = useViewsState();

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
    closeIssueCreationInput,
    createIssue,
    newIssueTitle,
  ]);

  const handleIssueGroupSubmit = useCallback(async () => {
    if (!isCreatingNewIssueGroup) return;
    closeIssueGroupCreationInput();

    await createIssueGroup({
      title: newIssueGroupTitle,
      projectId: project.projectId,
    });
  }, [
    closeIssueGroupCreationInput,
    newIssueGroupTitle,
    project,
    createIssueGroup,
    isCreatingNewIssueGroup,
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

  useEffect(() => {
    if (loggedInUserRole === "espectator") return;
    const cards = document.querySelectorAll(`.${styles.issueCardWrapper}`);
    const dropzones = document.querySelectorAll(
      `.${styles.issueSectionBody}:not(.issue-section-placeholder)`
    );

    cards.forEach((card) => {
      card.addEventListener("dragstart", onDragStart);
      card.addEventListener("dragend", onDragEnd);
    });

    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    function onDragStart(e: any) {
      dropzones.forEach((dropzone) =>
        dropzone.classList.add(styles.dropzoneHighlight)
      );

      if (e.target.classList) {
        e.target.classList.add(styles.cardIsBeingDragged);
      }

      e.dataTransfer.setData("issueId", e.target.dataset.issueId);
    }

    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
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

    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    function onDragEnter(e: any) {
      e.preventDefault();
    }

    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    function onDragOver(e: any) {
      e.preventDefault();

      if (e.target.classList) {
        e.currentTarget.classList.add(styles.dropzoneDragOver);
      }
    }

    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    function getDraggableElementsInBetween(container: any, y: any) {
      const elems = [
        ...container.querySelectorAll(
          `.${styles.issueCardWrapper}:not(.${styles.cardIsBeingDragged})`
        ),
      ];

      const reduced = elems.reduce(
        (closest, elem) => {
          const box = elem.getBoundingClientRect();
          const offset = y - box.top - box.height / 2;
          if (offset < 0 && offset > closest.nextOffset) {
            return { ...closest, nextOffset: offset, nextElement: elem };
          }
          if (offset > 0 && offset < closest.prevOffset) {
            return { ...closest, prevOffset: offset, prevElement: elem };
          }
          return closest;
        },
        {
          nextOffset: Number.NEGATIVE_INFINITY,
          prevOffset: Number.POSITIVE_INFINITY,
        }
      );

      return { next: reduced.nextElement, prev: reduced.prevElement };
    }

    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    function onDragLeave(e: any) {
      if (e.target.classList) {
        e.currentTarget.classList.remove(styles.dropzoneDragOver);
      }
    }

    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    async function onDrop(e: any) {
      e.stopImmediatePropagation();

      if (e.target.classList) {
        e.currentTarget.classList.remove(styles.dropzoneDragOver);
      }

      const elemsInBetween = getDraggableElementsInBetween(
        e.currentTarget,
        e.clientY
      );

      const issueId = e.dataTransfer.getData("issueId");
      let orderBefore: string | undefined;
      let orderAfter: string | undefined;

      if (elemsInBetween.prev) {
        orderBefore = elemsInBetween.prev.dataset.order;
      }
      if (elemsInBetween.next) {
        orderAfter = elemsInBetween.next.dataset.order;
      }

      await moveIssue({
        issueId,
        moveToIssueGroupId: e.currentTarget.dataset.issueGroupId,
        orderBefore,
        orderAfter,
      });
    }
  }, [moveIssue, loggedInUserRole]);

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

  async function onColorChange(color: string) {
    const sanitizedColor = color.replace("#", "");
    await updateIssueGroupColor(sanitizedColor);
  }

  return (
    <>
      <div id={styles.containerGrid}>
        <div id={styles.containerWrapper}>
          <div id={styles.container}>
            {project.issueGroups.map((issueGroup: FormattedIssueGroup) => (
              <div
                className={styles.issueSectionContainer}
                key={issueGroup.issueGroupId}
              >
                <div className={styles.issueSectionHeader}>
                  <div
                    className={styles.issueSectionHeaderColor}
                    style={{ backgroundColor: `#${issueGroup.color}` }}
                  />

                  <span>{issueGroup.title}</span>

                  <div className={styles.issueSectionHeaderButtons}>
                    {loggedInUserRole !== "espectator" && (
                      <>
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

                        <IssueGroupOptions.Container
                          isDropdownShown={
                            issueGroupIdBeingUpdated === issueGroup.issueGroupId
                          }
                          onClick={() =>
                            setIssueGroupIdBeingUpdated(issueGroup.issueGroupId)
                          }
                        >
                          <IssueGroupOptions.UpdateColorOption
                            onColorChange={onColorChange}
                          />
                          <IssueGroupOptions.Separator />
                          <IssueGroupOptions.UpdateIsFinalOption
                            defaultChecked={
                              issueGroup.shouldUpdateIssuesToCompleted
                            }
                            onChange={(e) =>
                              updateIssueGroupFinalStatus(e.target.checked)
                            }
                          />
                          <IssueGroupOptions.DeleteButton
                            style={{
                              marginTop: "1.5rem",
                              width: "100%",
                            }}
                            onClick={() =>
                              deleteIssueGroup(issueGroup.issueGroupId)
                            }
                            loggedInUserRole={loggedInUserRole}
                          />
                        </IssueGroupOptions.Container>
                      </>
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
                      key={issue.issueId}
                      className={styles.issueCardWrapper}
                      onClick={() => setIssueBeingUpdated(issue)}
                      data-issue-id={issue.issueId}
                      data-order={issue.order}
                      draggable
                    >
                      <div className={styles.issueCard}>
                        <strong>{issue.title}</strong>

                        {loggedInUserRole !== "espectator" && (
                          <FiCheckCircle
                            className={styles.completedIcon}
                            size={16}
                            color={issue.completed ? "#359e76" : "#999999"}
                          />
                        )}
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
                        placeholder={
                          projectLanguage.views.kanban.newIssuePlaceholder
                        }
                        className={styles.issueCardInput}
                      />
                    </form>
                  ) : (
                    <>
                      {loggedInUserRole !== "espectator" && (
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
                          <span>{projectLanguage.views.kanban.newIssue}</span>
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}

            {loggedInUserRole !== "espectator" && (
              <div
                className={`${styles.issueSectionContainer} ${styles.skeletonIssueGroup}`}
              >
                <div className={styles.issueSectionHeader}>
                  <div
                    className={styles.issueSectionHeaderColor}
                    style={{ backgroundColor: "rgba(68, 68, 68, 0.5)" }}
                  />
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
                        placeholder={
                          projectLanguage.views.kanban.newSectionPlaceholder
                        }
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
                      <FiPlusCircle color="#888888" size={24} />
                      <span>{projectLanguage.views.kanban.newSection}</span>
                    </button>
                  )}
                </div>

                <div
                  className={`${styles.issueSectionBody} issue-section-placeholder`}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <UpdateIssueModal
        shown={!!issueBeingUpdated}
        issue={issueBeingUpdated as FormattedIssue}
        issueGroups={project.issueGroups}
        participants={project.participants}
        closeModal={() => setIssueBeingUpdated(null)}
        readonly={loggedInUserRole === "espectator"}
      />
    </>
  );
}
