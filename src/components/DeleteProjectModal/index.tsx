import React, { useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { useParams, useHistory } from "react-router-dom";

import Modal from "../Modal";
import Title from "../Title";
import { useAPIService } from "../../contexts/APIServiceContext";
import { useProjects } from "../../contexts/ProjectsContext";
import RoutesEnum from "../../routes/type-defs/RoutesEnum";
import showToast from "../../utils/showToast";

import styles from "./DeleteProjectModal.module.scss";
import { useLanguage } from "../../contexts/LanguageContext";
import { FormattedProject } from "../../services/type-defs/FormattedProject";

export type DeleteProjectModalProps = {
  shown: boolean;
  closeModal: () => void;
  project: FormattedProject;
};

export default function DeleteProjectModal({
  shown,
  closeModal,
  project,
}: DeleteProjectModalProps): React.ReactElement {
  const params = useParams<{ projectId: string }>();
  const history = useHistory();
  const { deleteProjectService } = useAPIService();
  const { fetchProjects } = useProjects();
  const {
    language: {
      components: { deleteProjectModal: deleteProjectModalLanguage },
    },
  } = useLanguage();

  const [confirmationInputValue, setConfirmationInputValue] = useState("");

  function handleCloseModal() {
    setConfirmationInputValue("");
    closeModal();
  }

  async function handleDeletion() {
    const response = await deleteProjectService.deleteProject({
      projectId: params.projectId,
    });

    const toastMsg = response.userFriendlyMessage;
    if (toastMsg) showToast(toastMsg, response.error);
    if (!response.error) {
      handleCloseModal();
      history.push(RoutesEnum.PROJECTS);
      await fetchProjects();
    }
  }

  return (
    <Modal.Container
      shown={shown}
      closeModal={handleCloseModal}
      changeScroll={false}
    >
      <div id={styles.wrapper}>
        <div id={styles.content}>
          <div id={styles.titleWrapper}>
            <Title>{deleteProjectModalLanguage.title}</Title>
          </div>

          <div id={styles.warningContainer}>
            <FiAlertTriangle color="var(--dark)" size={24} />
            <strong>{deleteProjectModalLanguage.warningText}</strong>
          </div>

          <p
            id={styles.description}
            /* eslint-disable-next-line react/no-danger */
            dangerouslySetInnerHTML={{
              __html: deleteProjectModalLanguage.description(project.name),
            }}
          />

          <div id={styles.inputContainer}>
            <label htmlFor="deletion-confirmation">
              <div
                /* eslint-disable-next-line react/no-danger */
                dangerouslySetInnerHTML={{
                  __html: deleteProjectModalLanguage.inputConfirmationText,
                }}
              />
              <input
                type="text"
                id="deletion-confirmation"
                placeholder={deleteProjectModalLanguage.inputPlaceholder}
                value={confirmationInputValue}
                onChange={(e) => setConfirmationInputValue(e.target.value)}
              />
            </label>
          </div>

          <div id={styles.buttonsContainer}>
            <button
              type="button"
              id={styles.cancelButton}
              onClick={handleCloseModal}
            >
              {deleteProjectModalLanguage.cancelButtonText}
            </button>
            <button
              type="button"
              disabled={
                confirmationInputValue.toLowerCase() !==
                deleteProjectModalLanguage.inputPlaceholder.toLowerCase()
              }
              id={styles.deleteButton}
              onClick={handleDeletion}
            >
              {deleteProjectModalLanguage.deleteButtonText}
            </button>
          </div>
        </div>
      </div>
    </Modal.Container>
  );
}
