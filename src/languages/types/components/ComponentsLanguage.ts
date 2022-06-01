import { AddParticipantsModalLanguage } from "./AddParticipantsModalLanguage";
import { DeleteParticipantConfirmationModalLanguage } from "./DeleteParticipantConfirmationModalLanguage";
import { DeleteProjectModalLanguage } from "./DeleteProjectModalLanguage";
import { HeaderLanguage } from "./HeaderLanguage";
import { InvitationNotificationLanguage } from "./InvitationNotificationLanguage";
import { ManageParticipantsModalLanguage } from "./ManageParticipantsModalLanguage";
import { SidebarLanguage } from "./SidebarLanguage";
import { UpdateProjectModalLanguage } from "./UpdateProjectModalLanguage";

export type ComponentsLanguage = {
  header: HeaderLanguage;
  sidebar: SidebarLanguage;
  updateProjectModal: UpdateProjectModalLanguage;
  deleteProjectModal: DeleteProjectModalLanguage;
  manageParticipantsModal: ManageParticipantsModalLanguage;
  deleteParticipantConfirmationModal: DeleteParticipantConfirmationModalLanguage;
  addParticipantsModal: AddParticipantsModalLanguage;
  invitationNotification: InvitationNotificationLanguage;
};
