import React, { useEffect, useState } from "react";
import { FiXCircle, FiEdit3 } from "react-icons/fi";

import styles from "./IssueModal.module.scss";

import Modal from "../../../../components/Modal";
import Title from "../../../../components/Title";
import Subtitle from "../../../../components/Subtitle";
import Form from "../../../../components/Form";
import CreateButton from "../../../../components/CreateButton";

import {
  FormattedIssue,
  FormattedIssueGroup,
} from "../../../../services/type-defs/FormattedProject";
import { useAPIService } from "../../../../contexts/APIServiceContext";
import showToast from "../../../../utils/showToast";
import { useProjects } from "../../../../contexts/ProjectsContext";
import { useLanguage } from "../../../../contexts/LanguageContext";

type IssueModalProps = {
  closeModal: () => void;
  shown: boolean;
  issue: FormattedIssue;
  issueGroups: FormattedIssueGroup[];
};

export default function IssueModal({
  shown,
  closeModal,
  issue,
  issueGroups,
}: IssueModalProps): React.ReactElement {
  const {
    language: {
      pages: { project: projectLanguage },
    },
  } = useLanguage();
  const { updateIssueService, moveIssueService } = useAPIService();
  const { fetchProjects } = useProjects();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expirationDate, setExpirationDate] = useState<string | undefined>(
    undefined
  );
  const [issueGroupId, setIssueGroupId] = useState("");

  useEffect(() => {
    if (!issue) return;

    setTitle(issue.title);
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
    await moveIssue();
    handleCloseModal();
    await fetchProjects();
  }

  async function updateIssue() {
    const response = await updateIssueService.updateIssue({
      issueId: issue.issueId,
      newTitle: title,
      newDescription: description,
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
            />

            <div className={styles.dateInputWrapper}>
              <span className={styles.label}>
                {projectLanguage.createIssueModal.expiringDateInputLabel}:
              </span>
              <Form.Input
                id="expiration-date"
                type="date"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
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
              />
            </div>

            <div id={styles.descriptionInputWrapper}>
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
                />
              </Form.InputWrapper>
            </div>

            <div id={styles.buttonsWrapper}>
              <CreateButton
                id={styles.cancelButton}
                icon={FiXCircle}
                title={projectLanguage.issueModal.cancelButtonText}
                onClick={handleCloseModal}
              />

              <CreateButton
                icon={FiEdit3}
                title={projectLanguage.issueModal.updateButtonText}
                onClick={handleSubmit}
              />
            </div>
          </Form.Container>
        </div>
      </div>
    </Modal.Container>
  );
}