import React, { useCallback, useState } from "react";
import { FiChevronDown, FiXCircle } from "react-icons/fi";

import styles from "./ManageParticipantsModal.module.scss";

import Modal from "../../../../components/Modal";
import Title from "../../../../components/Title";
import Subtitle from "../../../../components/Subtitle";
import CreateButton from "../../../../components/CreateButton";
import AddParticipantsModal from "../AddParticipantsModal";

import { FormattedProject } from "../../../../services/type-defs/FormattedProject";

export type ManageParticipantsModalProps = {
  shown: boolean;
  closeModal: () => void;
  project: FormattedProject;
};

export default function ManageParticipantsModal({
  closeModal,
  shown,
  project,
}: ManageParticipantsModalProps): React.ReactElement {
  const [isAddParticipantsModalOpen, setIsAddParticipantsModalOpen] =
    useState(false);

  const handleCloseModal = useCallback(() => {
    closeModal();
    setIsAddParticipantsModalOpen(false);
  }, [closeModal]);

  return (
    <Modal.Container shown={shown} closeModal={handleCloseModal}>
      <>
        <div id={styles.wrapper}>
          <div id={styles.content}>
            <div id={styles.closeButtonWrapper}>
              <Modal.CloseButton closeModal={handleCloseModal} />
            </div>

            <Title>Gerenciamento de membros</Title>
            <Subtitle>
              Gerencie as permissões dos membros do seu projeto
            </Subtitle>

            <div id={styles.participantsList}>
              <div id={styles.listHeaderContainer}>
                <div className={styles.listColumn}>
                  <span className={styles.listTextHeader}>Usuário</span>
                </div>
                <div className={styles.listColumn}>
                  <span className={styles.listTextHeader}>Função</span>
                </div>
                <div className={styles.listColumn} />
              </div>

              {project.participants.map((participant) => (
                <>
                  <div className={styles.participantContainer}>
                    <div className={styles.listColumn}>
                      <div className={styles.participantImg} />
                      <div className={styles.participantInfo}>
                        <span className={styles.participantName}>
                          {participant.name}
                        </span>
                        <span className={styles.participantEmail}>
                          {participant.email}
                        </span>
                      </div>
                    </div>
                    <div className={styles.listColumn}>
                      <span className={styles.participantRole}>
                        {participant.projectRoleName}
                        <FiChevronDown
                          color="#444444"
                          size={18}
                          className={styles.participantRoleIcon}
                        />
                      </span>
                    </div>
                    <div className={styles.listColumn}>
                      <FiXCircle color="var(--dark)" size={22} />
                    </div>
                  </div>
                </>
              ))}
            </div>

            <div>
              <CreateButton
                id={styles.submitButton}
                title="Convidar outros usuários"
                onClick={() => setIsAddParticipantsModalOpen(true)}
              />
            </div>
          </div>
        </div>

        <AddParticipantsModal
          shown={isAddParticipantsModalOpen}
          closeModal={() => setIsAddParticipantsModalOpen(false)}
        />
      </>
    </Modal.Container>
  );
}
