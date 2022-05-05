import { AcceptInvitationLanguage } from "./AcceptInvitationLanguage";
import { DashboardLanguage } from "./DashboardLanguage";
import { HomeLanguage } from "./HomeLanguage";
import { NotificationSettingsLanguage } from "./NotificationSettingsLanguage";
import { ProfileLanguage } from "./ProfileLanguage";
import { ProjectLanguage } from "./ProjectLanguage";
import { ProjectsLanguage } from "./ProjectsLanguage";
import { RevokeInvitationLanguage } from "./RevokeInvitationLanguage";

export type PagesLanguage = {
  home: HomeLanguage;
  dashboard: DashboardLanguage;
  projects: ProjectsLanguage;
  project: ProjectLanguage;
  acceptInvitation: AcceptInvitationLanguage;
  revokeInvitation: RevokeInvitationLanguage;
  profile: ProfileLanguage;
  notificationSettings: NotificationSettingsLanguage;
};
