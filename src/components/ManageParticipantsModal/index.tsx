import React, { useCallback, useEffect, useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";

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
import { useLanguage } from "../../contexts/LanguageContext";
import { ListParticipantsInvitedToProjectServiceResponse } from "../../services/interfaces";
import Participant from "./Participant";

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
  const {
    kickParticipantService,
    updateRoleService,
    listParticipantsInvitedToProjectService,
    revokeInvitationService,
  } = useAPIService();
  const { fetchProjects } = useProjects();
  const {
    language: {
      components: { manageParticipantsModal: manageParticipantsModalLanguage },
    },
  } = useLanguage();

  const [isAddParticipantsModalOpen, setIsAddParticipantsModalOpen] =
    useState(false);
  const [
    deleteParticipantConfirmationModalConfig,
    setDeleteParticipantConfirmationModalConfig,
  ] = useState<DeleteParticipantConfirmationModalConfig>({ shown: false });

  const [pendingInvitations, setPendingInvitations] =
    useState<ListParticipantsInvitedToProjectServiceResponse>([]);

  async function fetchPendingInvitations() {
    const response = await listParticipantsInvitedToProjectService.list({
      projectId: project.projectId,
    });

    if (response.data) {
      setPendingInvitations(response.data);
    }
  }

  useEffect(() => {
    fetchPendingInvitations();
  }, [listParticipantsInvitedToProjectService, project.projectId]);

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

  async function revokeInvitation(email: string) {
    const response = await revokeInvitationService.revokeInvitation({
      accountEmail: email,
      projectId: project.projectId,
    });

    const toastMsg = response.userFriendlyMessage;
    if (response.error && toastMsg) {
      showToast(toastMsg, response.error);
    }
    if (!response.error) {
      fetchPendingInvitations();
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

            <Title>{manageParticipantsModalLanguage.title}</Title>
            <Subtitle>{manageParticipantsModalLanguage.subtitle}</Subtitle>

            <div id={styles.participantsList}>
              <div id={styles.listHeaderContainer}>
                <div className={styles.listColumn}>
                  <span className={styles.listTextHeader}>
                    {manageParticipantsModalLanguage.userTableHeader}
                  </span>
                </div>
                <div className={styles.listColumn}>
                  <span className={styles.listTextHeader}>
                    {manageParticipantsModalLanguage.roleTableHeader}
                  </span>
                </div>
                <div className={styles.listColumn} />
              </div>

              {project.participants.map((participant) => (
                <Participant.Container key={participant.account.email}>
                  <Participant.Info
                    name={participant.account.name}
                    email={participant.account.email}
                    image={participant.account.image}
                  />
                  <Participant.RoleSelect
                    email={participant.account.email}
                    roleName={participant.role.name.value}
                    onChange={(e) =>
                      handleSelectOnChange(e, participant.account.email)
                    }
                  />
                  <Participant.KickButton
                    onClick={() =>
                      setDeleteParticipantConfirmationModalConfig({
                        shown: true,
                        accountEmail: participant.account.email,
                      })
                    }
                  />
                </Participant.Container>
              ))}

              {pendingInvitations.length > 0 && (
                <div className={styles.separator} />
              )}

              {pendingInvitations.map((invitation) => (
                <Participant.Container key={invitation.email}>
                  <Participant.Info
                    name={invitation.name}
                    email={invitation.email}
                    image={invitation.image}
                  />
                  <div className={styles.listColumn}>
                    <span className={styles.pendingText}>
                      {manageParticipantsModalLanguage.pendingText}
                    </span>
                  </div>
                  <Participant.KickButton
                    onClick={() => revokeInvitation(invitation.email)}
                  />
                </Participant.Container>
              ))}
            </div>

            <div>
              <CreateButton
                id={styles.submitButton}
                title={manageParticipantsModalLanguage.inviteMembersButtonText}
                onClick={() => setIsAddParticipantsModalOpen(true)}
              />
            </div>
          </div>
        </div>

        <AddParticipantsModal
          shown={isAddParticipantsModalOpen}
          closeModal={() => {
            setIsAddParticipantsModalOpen(false);
            fetchPendingInvitations();
          }}
          project={project}
        />
        <DeleteParticipantConfirmationModal
          shown={deleteParticipantConfirmationModalConfig.shown}
          closeModal={() => {
            setDeleteParticipantConfirmationModalConfig({ shown: false });
          }}
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
