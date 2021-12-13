import React, { useCallback, useState } from "react";
import { FiXCircle, FiUser } from "react-icons/fi";

import styles from "./ManageParticipantsModal.module.scss";

import Modal from "../Modal";
import Title from "../Title";
import Subtitle from "../Subtitle";
import CreateButton from "../CreateButton";
import AddParticipantsModal from "../AddParticipantsModal";

import { useAPIService } from "../../contexts/APIServiceContext";

import { FormattedProject } from "../../services/type-defs/FormattedProject";
import showToast from "../../utils/showToast";
import { useProjects } from "../../contexts/ProjectsContext";
import DeleteParticipantConfirmationModal from "../DeleteParticipantConfirmationModal";

export type ManageParticipantsModalProps = {
  shown: boolean;
  closeModal: () => void;
  project: FormattedProject;
};

type DeleteParticipantConfirmationModalConfig = {
  shown?: boolean;
  accountEmail?: string;
} & ({ shown: false } | { shown: true; accountEmail: string });

export default function ManageParticipantsModal({
  closeModal,
  shown,
  project,
}: ManageParticipantsModalProps): React.ReactElement {
  const { kickParticipantService, updateRoleService } = useAPIService();
  const { fetchProjects } = useProjects();

  const [isAddParticipantsModalOpen, setIsAddParticipantsModalOpen] =
    useState(false);
  const [
    deleteParticipantConfirmationModalConfig,
    setDeleteParticipantConfirmationModalConfig,
  ] = useState<DeleteParticipantConfirmationModalConfig>({ shown: false });

  const handleCloseModal = useCallback(() => {
    closeModal();
    setIsAddParticipantsModalOpen(false);
  }, [closeModal]);

  async function handleKickButtonClick(accountEmail: string) {
    const response = await kickParticipantService.kickParticipant({
      projectId: project.projectId,
      accountEmail,
    });

    const toastMsg = response.userFriendlyMessage;
    if (toastMsg) showToast(toastMsg, response.error);
    if (!response.error) {
      setDeleteParticipantConfirmationModalConfig({ shown: false });
      await fetchProjects();
    }
  }

  async function handleSelectOnChange(
    e: React.ChangeEvent<HTMLSelectElement>,
    accountEmail: string
  ) {
    const roleName = e.currentTarget.value;

    const response = await updateRoleService.updateRole({
      roleName,
      projectId: project.projectId,
      accountEmail,
    });

    const toastMsg = response.userFriendlyMessage;
    if (toastMsg) showToast(toastMsg, response.error);
    if (!response.error) {
      await fetchProjects();
    }
  }

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
                <div
                  className={styles.participantContainer}
                  key={participant.account.email}
                >
                  <div className={styles.listColumn}>
                    <div className={styles.participantImg}>
                      <FiUser color="var(--light)" size={22} />
                    </div>
                    <div className={styles.participantInfo}>
                      <span className={styles.participantName}>
                        {participant.account.name}
                      </span>
                      <span className={styles.participantEmail}>
                        {participant.account.email}
                      </span>
                    </div>
                  </div>
                  <div className={styles.listColumn}>
                    <div className={styles.participantRoleContainer}>
                      {participant.role.name.value === "owner" ? (
                        <span className={styles.participantRole}>Dono</span>
                      ) : (
                        <select
                          className={styles.participantRole}
                          value={participant.role.name.value}
                          onChange={(e) =>
                            handleSelectOnChange(e, participant.account.email)
                          }
                        >
                          <option value="espectator">Espectador</option>
                          <option value="member">Membro</option>
                          <option value="admin">Admin</option>
                        </select>
                      )}
                    </div>
                  </div>
                  <div className={styles.listColumn}>
                    <button
                      className={styles.kickButton}
                      type="button"
                      onClick={() =>
                        setDeleteParticipantConfirmationModalConfig({
                          shown: true,
                          accountEmail: participant.account.email,
                        })
                      }
                    >
                      <FiXCircle color="var(--dark)" size={22} />
                    </button>
                  </div>
                </div>
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
          project={project}
        />
        <DeleteParticipantConfirmationModal
          shown={deleteParticipantConfirmationModalConfig.shown}
          closeModal={() =>
            setDeleteParticipantConfirmationModalConfig({ shown: false })
          }
          accountEmail={
            deleteParticipantConfirmationModalConfig.accountEmail as string
          }
          onConfirm={() =>
            handleKickButtonClick(
              deleteParticipantConfirmationModalConfig.accountEmail as string
            )
          }
        />
      </>
    </Modal.Container>
  );
}
