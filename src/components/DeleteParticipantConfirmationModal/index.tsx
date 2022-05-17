import React from "react";

import styles from "./DeleteParticipantConfirmationModal.module.scss";

import Modal from "../Modal";
import Title from "../Title";
import Subtitle from "../Subtitle";
import { useLanguage } from "../../contexts/LanguageContext";

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
  const {
    language: {
      components: {
        deleteParticipantConfirmationModal:
          deleteParticipantConfirmationModalLanguage,
      },
    },
  } = useLanguage();

  return (
    <Modal.Container shown={shown} closeModal={closeModal} changeScroll={false}>
      <div id={styles.wrapper}>
        <div id={styles.content}>
          <div id={styles.closeButtonWrapper}>
            <Modal.CloseButton closeModal={closeModal} />
          </div>

          <Title>{deleteParticipantConfirmationModalLanguage.title}</Title>
          <Subtitle>
            <span
              id={styles.emailTextWrapper}
              /* eslint-disable-next-line react/no-danger */
              dangerouslySetInnerHTML={{
                __html:
                  deleteParticipantConfirmationModalLanguage.subtitle(
                    accountEmail
                  ),
              }}
            />
          </Subtitle>

          <div id={styles.buttonsContainer}>
            <button type="button" id={styles.cancelButton} onClick={closeModal}>
              {deleteParticipantConfirmationModalLanguage.cancelButtonText}
            </button>
            <button type="button" id={styles.deleteButton} onClick={onConfirm}>
              {
                deleteParticipantConfirmationModalLanguage.deleteParticipantButtonText
              }
            </button>
          </div>
        </div>
      </div>
    </Modal.Container>
  );
}
