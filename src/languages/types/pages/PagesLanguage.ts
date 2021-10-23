import { DashboardLanguage } from "./DashboardLanguage";
import { HomeLanguage } from "./HomeLanguage";
import { ProjectsLanguage } from "./ProjectsLanguage";

export type PagesLanguage = {
  home: HomeLanguage;
  dashboard: DashboardLanguage;
  projects: ProjectsLanguage;
};
