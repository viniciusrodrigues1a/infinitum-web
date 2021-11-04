import React, { useCallback, useEffect, useState } from "react";
import { FiHome, FiClipboard } from "react-icons/fi";
import { useHistory, useLocation } from "react-router-dom";

import styles from "./Sidebar.module.css";

import ExpandableHamburger from "../ExpandableHamburger";
import SidebarItem from "../SidebarItem";

import { useSidebar } from "../../contexts/SidebarContext";

import logoImg from "../../assets/logo.png";
import RoutesEnum from "../../routes/type-defs/RoutesEnum";
import { useLanguage } from "../../contexts/LanguageContext";

type SidebarItemNames = "home" | "projects" | "settings" | null;

export default function Sidebar(): React.ReactElement {
  const {
    language: {
      components: { sidebar: sidebarLanguage },
    },
  } = useLanguage();
  const location = useLocation();
  const history = useHistory();

  const getSidebarActiveItem = useCallback(() => {
    if (location.pathname === RoutesEnum.DASHBOARD) return "home";
    if (location.pathname === RoutesEnum.PROJECTS) return "projects";
    return null;
  }, [location]);

  const { isCollapsed, setIsCollapsed } = useSidebar();
  const [sidebarActiveItem, setSidebarActiveItem] = useState<SidebarItemNames>(
    getSidebarActiveItem()
  );

  useEffect(() => {
    setSidebarActiveItem(getSidebarActiveItem());
  }, [getSidebarActiveItem]);

  return (
    <div
      id={styles.containerWrapper}
      className={isCollapsed ? styles.collapsed : ""}
    >
      <div id={styles.container}>
        <span id={styles.logoText}>Infinitum</span>

        <div id={styles.sidebarContent}>
          <div id={styles.sidebarHeader}>
            <img id={styles.logo} src={logoImg} alt="Infinitum" />

            <ExpandableHamburger
              isCollapsed={isCollapsed}
              onExpand={() => setIsCollapsed(false)}
              onCollapse={() => setIsCollapsed(true)}
              theme="light"
            />
          </div>

          <div id={styles.sidebarItems}>
            <SidebarItem
              onClick={() => history.push(RoutesEnum.DASHBOARD)}
              collapse={isCollapsed}
              text={sidebarLanguage.homeItemName}
              active={sidebarActiveItem === "home"}
              icon={FiHome}
            />
            <SidebarItem
              onClick={() => history.push(RoutesEnum.PROJECTS)}
              collapse={isCollapsed}
              text={sidebarLanguage.projectsItemName}
              active={sidebarActiveItem === "projects"}
              icon={FiClipboard}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
