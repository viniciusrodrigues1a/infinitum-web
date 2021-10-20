import { DashboardLanguage } from "./DashboardLanguage";
import { HomeLanguage } from "./HomeLanguage";
import { SidebarLanguage } from "./SidebarLanguage";

export type Language = {
  home: HomeLanguage;
  dashboard: DashboardLanguage;
  sidebar: SidebarLanguage;
};
