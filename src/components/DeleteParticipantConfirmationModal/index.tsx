import React from "react";

import styles from "./DeleteParticipantConfirmationModal.module.scss";

import Modal from "../Modal";
import Title from "../Title";
import Subtitle from "../Subtitle";

type DeleteParticipantConfirmationModalProps = {
  shown: boolean;
  onConfirm: () => void;
  closeModal: () => void;
  accountEmail: string;
};

export default function DeleteParticipantConfirmationModal({
  shown,
  onConfirm,
  closeModal,
  accountEmail,
}: DeleteParticipantConfirmationModalProps): React.ReactElement {
  return (
    <Modal.Container shown={shown} closeModal={closeModal} changeScroll={false}>
      <div id={styles.wrapper}>
        <div id={styles.content}>
          <div id={styles.closeButtonWrapper}>
            <Modal.CloseButton closeModal={closeModal} />
          </div>

          <Title>Remover usuário do projeto?</Title>
          <Subtitle>
            O usuário <span id={styles.emailText}>{accountEmail}</span> será
            removido do projeto
          </Subtitle>

          <div id={styles.buttonsContainer}>
            <button type="button" id={styles.cancelButton} onClick={closeModal}>
              Cancelar
            </button>
            <button type="button" id={styles.deleteButton} onClick={onConfirm}>
              Excluir
            </button>
          </div>
        </div>
      </div>
    </Modal.Container>
  );
}
