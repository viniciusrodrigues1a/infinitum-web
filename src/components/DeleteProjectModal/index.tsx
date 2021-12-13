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

export type DeleteProjectModalProps = {
  shown: boolean;
  closeModal: () => void;
};

export default function DeleteProjectModal({
  shown,
  closeModal,
}: DeleteProjectModalProps): React.ReactElement {
  const params = useParams<{ projectId: string }>();
  const history = useHistory();
  const { deleteProjectService } = useAPIService();
  const { fetchProjects } = useProjects();

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
            <Title>Exclusão do projeto</Title>
          </div>

          <div id={styles.warningContainer}>
            <FiAlertTriangle color="var(--dark)" size={24} />
            <strong>Esta ação não pode ser desfeita</strong>
          </div>

          <p id={styles.description}>
            Isso excluirá permanentemente o projeto <strong>Projeto TCC</strong>
            , tickets criados dentro desse projeto, e removerá todas as
            associações de membros participantes.
          </p>

          <div id={styles.inputContainer}>
            <label htmlFor="deletion-confirmation">
              Digite <span>excluir</span> para confirmar:
              <input
                type="text"
                id="deletion-confirmation"
                placeholder="excluir"
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
              Cancelar
            </button>
            <button
              type="button"
              disabled={confirmationInputValue !== "excluir"}
              id={styles.deleteButton}
              onClick={handleDeletion}
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    </Modal.Container>
  );
}
