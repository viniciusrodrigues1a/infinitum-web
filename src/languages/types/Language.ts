import { DashboardLanguage } from "./DashboardLanguage";
import { HomeLanguage } from "./HomeLanguage";
import { SidebarLanguage } from "./SidebarLanguage";
import { ProjectsLanguage } from "./ProjectsLanguage";

export type Language = {
  home: HomeLanguage;
  dashboard: DashboardLanguage;
  sidebar: SidebarLanguage;
  projects?: ProjectsLanguage;
};
