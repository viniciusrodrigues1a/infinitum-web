import { AddParticipantsModalLanguage } from "./AddParticipantsModalLanguage";
import { DeleteParticipantConfirmationModalLanguage } from "./DeleteParticipantConfirmationModalLanguage";
import { DeleteProjectModalLanguage } from "./DeleteProjectModalLanguage";
import { ManageParticipantsModalLanguage } from "./ManageParticipantsModalLanguage";
import { SidebarLanguage } from "./SidebarLanguage";
import { UpdateProjectModalLanguage } from "./UpdateProjectModalLanguage";

export type ComponentsLanguage = {
  sidebar: SidebarLanguage;
  updateProjectModal: UpdateProjectModalLanguage;
  deleteProjectModal: DeleteProjectModalLanguage;
  manageParticipantsModal: ManageParticipantsModalLanguage;
  deleteParticipantConfirmationModal: DeleteParticipantConfirmationModalLanguage;
  addParticipantsModal: AddParticipantsModalLanguage;
};
