import React, { useCallback, useMemo, useState } from "react";

import { useParams } from "react-router-dom";
import styles from "./CreateIssueModal.module.scss";

import Modal, { ModalProps } from "../../../../components/Modal";
import Title from "../../../../components/Title";
import Subtitle from "../../../../components/Subtitle";
import Form from "../../../../components/Form";
import CreateButton from "../../../../components/CreateButton";
import { useAPIService } from "../../../../contexts/APIServiceContext";
import showToast from "../../../../utils/showToast";
import { useProjects } from "../../../../contexts/ProjectsContext";
import { useLanguage } from "../../../../contexts/LanguageContext";

export default function CreateIssueModal({
  shown,
  closeModal,
}: ModalProps): React.ReactElement {
  const params = useParams<{ projectId: string }>();
  const { getProjectById, fetchProjects } = useProjects();
  const { createIssueService } = useAPIService();
  const {
    language: {
      pages: { project: projectLanguage },
    },
  } = useLanguage();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [issueGroupId, setIssueGroupId] = useState<string>("");
  const [expirationDate, setExpirationDate] = useState("");

  const project = useMemo(
    () => getProjectById(params.projectId),
    [getProjectById, params]
  );

  const clearInputs = useCallback(() => {
    setTitle("");
    setDescription("");
    setExpirationDate("");
  }, []);

  const handleCloseModal = useCallback(() => {
    clearInputs();
    closeModal();
  }, [closeModal, clearInputs]);

  async function handleSubmit() {
    const response = await createIssueService.createIssue({
      title,
      description,
      expiresAt: expirationDate ? new Date(expirationDate) : undefined,
      issueGroupId,
    });

    const toastMsg = response.userFriendlyMessage;
    if (toastMsg) showToast(toastMsg, response.error);
    if (!response.error) {
      handleCloseModal();
      await fetchProjects();
    }
  }

  if (!project) {
    return <h1>Projeto não encontrado!</h1>;
  }

  return (
    <Modal.Container shown={shown} closeModal={handleCloseModal}>
      <div id={styles.wrapper}>
        <div id={styles.content}>
          <div id={styles.closeButtonWrapper}>
            <Modal.CloseButton closeModal={handleCloseModal} />
          </div>

          <div>
            <Title>{projectLanguage.createIssueModal.title}</Title>
            <div id={styles.subtitleWrapper}>
              <Subtitle>{projectLanguage.createIssueModal.subtitle}</Subtitle>
            </div>
          </div>

          <div id={styles.formWrapper}>
            <Form.Container id={styles.form} onSubmit={handleSubmit}>
              <Form.InputWrapper>
                <Form.Label
                  htmlFor="title"
                  titleLabel={projectLanguage.createIssueModal.titleInputLabel}
                  descriptionLabel={
                    projectLanguage.createIssueModal.titleInputDescription
                  }
                />
                <Form.Input
                  id="title"
                  placeholder={
                    projectLanguage.createIssueModal.titleInputPlaceholder
                  }
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.InputWrapper>

              <Form.InputWrapper>
                <Form.Label
                  htmlFor="expiration-date"
                  titleLabel={
                    projectLanguage.createIssueModal.expiringDateInputLabel
                  }
                  descriptionLabel={
                    projectLanguage.createIssueModal
                      .expiringDateInputDescription
                  }
                />
                <Form.Input
                  id="expiration-date"
                  type="date"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                />
              </Form.InputWrapper>

              <div id={styles.selectInputWrapper}>
                <Form.InputWrapper>
                  <Form.Label
                    htmlFor="section"
                    titleLabel={
                      projectLanguage.createIssueModal.sectionInputLabel
                    }
                    descriptionLabel={
                      projectLanguage.createIssueModal.sectionInputDescription
                    }
                  />
                  <Form.Select
                    id="section"
                    placeholder={
                      projectLanguage.createIssueModal.sectionInputPlaceholder
                    }
                    options={project.issueGroups.map((ig) => ({
                      value: ig.issueGroupId,
                      text: ig.title,
                    }))}
                    value={issueGroupId}
                    onChange={(e) => setIssueGroupId(e.target.value)}
                  />
                </Form.InputWrapper>
              </div>

              <div id={styles.descriptionInputWrapper}>
                <Form.InputWrapper>
                  <Form.Label
                    htmlFor="description"
                    titleLabel={
                      projectLanguage.createIssueModal.descriptionInputLabel
                    }
                    descriptionLabel={
                      projectLanguage.createIssueModal
                        .descriptionInputDescription
                    }
                  />
                  <Form.TextArea
                    id="description"
                    placeholder={
                      projectLanguage.createIssueModal
                        .descriptionInputPlaceholder
                    }
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.InputWrapper>
              </div>
            </Form.Container>
          </div>

          <div>
            <CreateButton
              id={styles.submitButton}
              title={projectLanguage.createIssueModal.submitButtonText}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </Modal.Container>
  );
}
