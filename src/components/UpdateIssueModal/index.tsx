import React, { useEffect, useState } from "react";
import { FiXCircle, FiEdit3, FiTrash2 } from "react-icons/fi";

import styles from "./UpdateIssueModal.module.scss";

import Modal from "../Modal";
import Title from "../Title";
import Subtitle from "../Subtitle";
import Form from "../Form";
import CreateButton from "../CreateButton";

import {
  FormattedIssue,
  FormattedIssueGroup,
} from "../../services/type-defs/FormattedProject";
import { useAPIService } from "../../contexts/APIServiceContext";
import showToast from "../../utils/showToast";
import { useProjects } from "../../contexts/ProjectsContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { Participant } from "../../services/type-defs/Project";

type UpdateIssueModalProps = {
  closeModal: () => void;
  shown: boolean;
  issue: FormattedIssue;
  issueGroups: FormattedIssueGroup[];
  participants: Participant[];
  readonly?: boolean;
};

UpdateIssueModal.defaultProps = {
  readonly: false,
};

export default function UpdateIssueModal({
  shown,
  closeModal,
  issue,
  issueGroups,
  participants,
  readonly,
}: UpdateIssueModalProps): React.ReactElement {
  const {
    language: {
      pages: { project: projectLanguage },
    },
  } = useLanguage();
  const {
    updateIssueService,
    moveIssueService,
    deleteIssueService,
    assignIssueToAccountService,
  } = useAPIService();
  const { fetchProjects } = useProjects();

  const [title, setTitle] = useState("");
  const [assignedToEmail, setAssignedToEmail] = useState<string | undefined>(
    undefined
  );
  const [description, setDescription] = useState("");
  const [expirationDate, setExpirationDate] = useState<string | undefined>(
    undefined
  );
  const [issueGroupId, setIssueGroupId] = useState("");

  useEffect(() => {
    if (!issue) return;

    setTitle(issue.title);
    setAssignedToEmail(issue.assignedToEmail);
    setDescription(issue.description);

    const date = issue.expiresAt
      ? new Date(issue.expiresAt).toISOString().split("T")[0]
      : undefined;
    setExpirationDate(date);

    let igId = "";
    issueGroups.forEach((ig) =>
      ig.issues.forEach((i) => {
        if (i.issueId === issue.issueId) {
          igId = ig.issueGroupId;
        }
      })
    );
    setIssueGroupId(igId);
  }, [shown, issue, issueGroups]);

  function handleCloseModal() {
    setTitle("");
    setDescription("");
    setExpirationDate(undefined);
    setIssueGroupId("");
    closeModal();
  }

  async function handleSubmit() {
    await updateIssue();
    await assignIssueToAccount();
    await moveIssue();
    handleCloseModal();
    await fetchProjects();
  }

  async function updateIssue() {
    let date: Date | null = null;
    if (expirationDate) {
      const [year, month, day] = expirationDate
        .split("-")
        .map((e) => Number(e));
      const timezoneOffsetInHours = new Date().getTimezoneOffset() / 60;
      date = new Date(year, month - 1, day, 12 - timezoneOffsetInHours);
    }
    const response = await updateIssueService.updateIssue({
      issueId: issue.issueId,
      newTitle: title,
      newDescription: description,
      newExpiresAt: date,
      newCompleted: issue.completed,
    });

    const toastMsg = response.userFriendlyMessage;
    if (toastMsg) showToast(toastMsg, response.error);
  }

  async function assignIssueToAccount() {
    if (issue.assignedToEmail === assignedToEmail) return;

    const response = await assignIssueToAccountService.assignIssueToAccount({
      issueId: issue.issueId,
      assignedToEmail: assignedToEmail || null,
    });

    const toastMsg = response.userFriendlyMessage;
    if (toastMsg) showToast(toastMsg, response.error);
  }

  async function moveIssue() {
    const response = await moveIssueService.moveIssue({
      issueId: issue.issueId,
      moveToIssueGroupId: issueGroupId,
    });

    const toastMsg = response.userFriendlyMessage;
    if (toastMsg) showToast(toastMsg, response.error);
  }

  async function deleteIssue() {
    const response = await deleteIssueService.deleteIssue({
      issueId: issue.issueId,
    });

    const toastMsg = response.userFriendlyMessage;
    if (toastMsg) showToast(toastMsg, response.error);

    handleCloseModal();
    await fetchProjects();
  }

  return (
    <Modal.Container shown={shown} closeModal={handleCloseModal}>
      <div id={styles.wrapper}>
        <div id={styles.content}>
          <div id={styles.closeButtonWrapper}>
            <Modal.CloseButton closeModal={handleCloseModal} />
          </div>

          <Title>{projectLanguage.issueModal.title}</Title>
          <Subtitle>{projectLanguage.issueModal.subtitle}</Subtitle>

          <Form.Container
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <Form.Input
              id="title"
              placeholder={
                projectLanguage.createIssueModal.titleInputPlaceholder
              }
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={readonly}
            />

            <div className={styles.assignedInputWrapper}>
              <span className={styles.label}>
                {projectLanguage.issueModal.assignedInputLabel}:
              </span>
              <div className={styles.assignedInputFlex}>
                <Form.Select
                  id="participants"
                  placeholder={
                    projectLanguage.issueModal.assignedInputPlaceholder
                  }
                  options={participants.map((participant) => ({
                    value: participant.account.email,
                    text: `${participant.account.name} (${participant.account.email})`,
                  }))}
                  value={assignedToEmail || undefined}
                  onChange={(e) => setAssignedToEmail(e.target.value)}
                  disabled={readonly}
                />
                {!readonly && (
                  <button
                    type="button"
                    className={styles.cancelAssignedInputButton}
                    onClick={() => setAssignedToEmail(undefined)}
                  >
                    <FiXCircle color="var(--dark)" size={20} />
                  </button>
                )}
              </div>
            </div>

            <div className={styles.dateInputWrapper}>
              <span className={styles.label}>
                {projectLanguage.createIssueModal.expiringDateInputLabel}:
              </span>
              <Form.Input
                id="expiration-date"
                type="date"
                value={expirationDate}
                onChange={(e) => {
                  setExpirationDate(e.target.value);
                }}
                disabled={readonly}
              />
            </div>

            <div className={styles.issueGroupSelectWrapper}>
              <span className={styles.label}>
                {projectLanguage.createIssueModal.sectionInputLabel}:
              </span>
              <Form.Select
                id="section"
                placeholder={
                  projectLanguage.createIssueModal.sectionInputPlaceholder
                }
                options={issueGroups.map((ig) => ({
                  value: ig.issueGroupId,
                  text: ig.title,
                }))}
                value={issueGroupId}
                onChange={(e) => setIssueGroupId(e.target.value)}
                disabled={readonly}
              />
            </div>

            <div className={styles.descriptionInputWrapper}>
              <Form.InputWrapper>
                <Form.Label
                  htmlFor="description"
                  titleLabel={
                    projectLanguage.createIssueModal.descriptionInputLabel
                  }
                  descriptionLabel=""
                />
                <Form.TextArea
                  id="description"
                  placeholder={
                    projectLanguage.createIssueModal.descriptionInputPlaceholder
                  }
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={readonly}
                />
              </Form.InputWrapper>
            </div>

            {!readonly && (
              <div id={styles.buttonsWrapper}>
                <CreateButton
                  id={styles.cancelButton}
                  icon={FiTrash2}
                  title={projectLanguage.issueModal.cancelButtonText}
                  onClick={deleteIssue}
                />

                <CreateButton
                  icon={FiEdit3}
                  title={projectLanguage.issueModal.updateButtonText}
                  onClick={handleSubmit}
                />
              </div>
            )}
          </Form.Container>
        </div>
      </div>
    </Modal.Container>
  );
}
