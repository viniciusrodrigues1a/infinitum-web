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
import IssueGroupOptions from "../IssueGroupOptions";

import { useViewsState } from "../../../../../contexts/ViewsContext";
import { useLanguage } from "../../../../../contexts/LanguageContext";
import { ParticipantRoleValue } from "../../../../../services/type-defs/Project";
import getDraggableElementsInBetween from "../getDraggableElementsInBetween";

type ListProps = {
  project: FormattedProject;
  loggedInUserRole: ParticipantRoleValue;
};

type IndicatorState = {
  position: "before" | "after";
  issueID: string;
} | null;

export default function List({
  project,
  loggedInUserRole,
}: ListProps): React.ReactElement {
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
    updateIssueCompletedStatus,
    updateIssueGroupFinalStatus,
    deleteIssueGroup,
    moveIssue,
  } = useViewsState();

  const [collapsedSections, setCollapsedSections] = useState<Array<string>>([]);
  const [newIssueTitle, setNewIssueTitle] = useState("");
  const [newIssueGroupTitle, setNewIssueGroupTitle] = useState("");
  const [showIndicator, setShowIndicator] = useState<IndicatorState>(null);

  const newIssueButtonRef = useRef<HTMLButtonElement>(null);

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

  useEffect(() => {
    if (loggedInUserRole === "espectator") return;
    const issues = document.querySelectorAll(
      `.${styles.issueWrapper}:not(${styles.issueWrapperPlaceholder})`
    );
    const dropzones = document.querySelectorAll(`.${styles.issuesSection}`);

    issues.forEach((issue) => {
      issue.addEventListener("dragstart", onDragStart);
      issue.addEventListener("dragend", onDragEnd);
    });

    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    function onDragStart(e: any) {
      dropzones.forEach((dropzone) =>
        dropzone.classList.add(styles.dropzoneHighlight)
      );

      if (e.target.classList) {
        e.target.classList.add(styles.issueIsBeingDragged);
      }

      e.dataTransfer.setData("issueId", e.target.dataset.issueId);
    }

    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    function onDragEnd(e: any) {
      if (e.target.classList) {
        e.target.classList.remove(styles.issueIsBeingDragged);
      }
    }

    dropzones.forEach((dropzone) => {
      dropzone.addEventListener("dragenter", onDragEnter);
      dropzone.addEventListener("dragover", onDragOver);
      dropzone.addEventListener("dragleave", onDragLeave);
      dropzone.addEventListener("drop", onDragDrop);
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

      const elems = [
        ...e.currentTarget.querySelectorAll(
          `.${styles.issueWrapper}:not(.${styles.issueIsBeingDragged})`
        ),
      ];
      const elemsInBetween = getDraggableElementsInBetween(elems, e.clientY);

      const draggable = document.querySelector(
        `.${styles.issueIsBeingDragged}`
      ) as HTMLElement;

      if (!draggable) return;

      const issuesElem = e.currentTarget.querySelector(`.${styles.issues}`);
      const lastButOneChildren =
        issuesElem.children[issuesElem.children.length - 2];

      const { next, prev } = elemsInBetween;

      console.log(next, prev);
      if (!prev && next && issuesElem.firstChild !== draggable) {
        setShowIndicator({
          issueID: next.dataset.issueId as string,
          position: "before",
        });
      } else if (!next && prev && lastButOneChildren !== draggable) {
        setShowIndicator({
          issueID: prev.dataset.issueId as string,
          position: "after",
        });
      } else if (next && prev && draggable.nextSibling !== next) {
        setShowIndicator({
          issueID: next.dataset.issueId as string,
          position: "before",
        });
      } else {
        setShowIndicator(null);
      }
    }

    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    function onDragLeave(e: any) {
      setShowIndicator(null);

      if (e.target.classList) {
        e.currentTarget.classList.remove(styles.dropzoneDragOver);
      }
    }

    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    async function onDragDrop(e: any) {
      e.stopImmediatePropagation();

      if (e.target.classList) {
        e.currentTarget.classList.remove(styles.dropzoneDragOver);
      }

      const elems = [
        ...e.currentTarget.querySelectorAll(
          `.${styles.issueWrapper}:not(.${styles.issueIsBeingDragged})`
        ),
      ];
      const elemsInBetween = getDraggableElementsInBetween(elems, e.clientY);

      const issueId = e.dataTransfer.getData("issueId");
      let orderBefore: string | undefined;
      let orderAfter: string | undefined;

      if (elemsInBetween.prev) {
        orderBefore = elemsInBetween.prev.dataset.order;
      }
      if (elemsInBetween.next) {
        orderAfter = elemsInBetween.next.dataset.order;
      }

      setShowIndicator(null);

      await moveIssue({
        issueId,
        moveToIssueGroupId: e.currentTarget.dataset.issueGroupId,
        orderBefore,
        orderAfter,
      });
    }
  }, [loggedInUserRole, moveIssue, project]);

  const addIndicatorClassName = useCallback(
    (issueID: string) => {
      if (!showIndicator) return "";

      if (showIndicator.issueID === issueID) {
        if (showIndicator.position === "before") return styles.indicatorBefore;
        if (showIndicator.position === "after") return styles.indicatorAfter;
      }

      return "";
    },
    [showIndicator]
  );

  return (
    <div id={styles.container}>
      <div id={styles.infoHeadContainer}>
        <div>
          <FiAlignLeft color="#999999" size={20} />
          <span>{projectLanguage.views.list.titleTableHeader}</span>
        </div>
        <div>
          <FiCalendar color="#999999" size={20} />
          <span>{projectLanguage.views.list.conclusionDateTableHeader}</span>
        </div>
      </div>

      {project.issueGroups.map((issueGroup: FormattedIssueGroup, index) => (
        <div
          key={issueGroup.issueGroupId}
          className={styles.issuesSection}
          data-issue-group-id={issueGroup.issueGroupId}
        >
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

            {(loggedInUserRole === "owner" || loggedInUserRole === "admin") && (
              <IssueGroupOptions.Container
                isDropdownShown={
                  issueGroupIdBeingUpdated === issueGroup.issueGroupId
                }
                onClick={() =>
                  setIssueGroupIdBeingUpdated(issueGroup.issueGroupId)
                }
              >
                <IssueGroupOptions.FlexContainer>
                  <IssueGroupOptions.UpdateIsFinalOption
                    defaultChecked={issueGroup.shouldUpdateIssuesToCompleted}
                    onChange={(e) =>
                      updateIssueGroupFinalStatus(e.target.checked)
                    }
                  />
                  <IssueGroupOptions.DeleteButton
                    loggedInUserRole={loggedInUserRole}
                    style={{ marginLeft: "0.75rem" }}
                    onClick={() => deleteIssueGroup(issueGroup.issueGroupId)}
                  />
                </IssueGroupOptions.FlexContainer>
              </IssueGroupOptions.Container>
            )}
          </div>

          {!isSectionCollapsed(issueGroup.issueGroupId) && (
            <div className={styles.issues}>
              {issueGroup.issues.map((issue) => (
                <div
                  key={issue.issueId}
                  className={`${styles.issueWrapper} ${addIndicatorClassName(
                    issue.issueId
                  )}`}
                  data-issue-id={issue.issueId}
                  data-order={issue.order}
                  draggable
                >
                  {loggedInUserRole !== "espectator" && (
                    <button
                      type="button"
                      onClick={() =>
                        updateIssueCompletedStatus(
                          issue.issueId,
                          issue.completed
                        )
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
                  )}
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
                      placeholder={
                        projectLanguage.views.list.newIssuePlaceholder
                      }
                      value={newIssueTitle}
                      onChange={(e) => setNewIssueTitle(e.target.value)}
                    />
                  </form>
                </div>
              ) : (
                <>
                  {loggedInUserRole !== "espectator" && (
                    <button
                      ref={newIssueButtonRef}
                      type="button"
                      className={styles.newIssueButton}
                      onClick={() =>
                        setIsCreatingNewIssueForIssueGroupId(
                          issueGroup.issueGroupId
                        )
                      }
                    >
                      <FiPlusCircle size={18} color="#888888" />
                      <span>{projectLanguage.views.list.newIssue}</span>
                    </button>
                  )}
                </>
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
                    placeholder={
                      projectLanguage.views.list.newSectionPlaceholder
                    }
                    value={newIssueGroupTitle}
                    onChange={(e) => setNewIssueGroupTitle(e.target.value)}
                  />
                </form>
              ) : (
                <>
                  {loggedInUserRole !== "espectator" && (
                    <button
                      type="button"
                      className={styles.newSectionButton}
                      onClick={() => setIsCreatingNewIssueGroup(true)}
                    >
                      <FiPlusCircle size={20} color="#888888" />
                      <span>{projectLanguage.views.list.newSection}</span>
                    </button>
                  )}
                </>
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
        readonly={loggedInUserRole === "espectator"}
      />
    </div>
  );
}
