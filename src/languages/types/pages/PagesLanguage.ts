import { AcceptInvitationLanguage } from "./AcceptInvitationLanguage";
import { DashboardLanguage } from "./DashboardLanguage";
import { HomeLanguage } from "./HomeLanguage";
import { ProjectLanguage } from "./ProjectLanguage";
import { ProjectsLanguage } from "./ProjectsLanguage";

export type PagesLanguage = {
  home: HomeLanguage;
  dashboard: DashboardLanguage;
  projects: ProjectsLanguage;
  project: ProjectLanguage;
  acceptInvitation: AcceptInvitationLanguage;
};
