import React from "react";
import { FiFrown } from "react-icons/fi";

import "./EmptyProjects_SvgStyles.css";
import styles from "./EmptyProjects.module.css";

import { ReactComponent as Svg } from "../../../../assets/empty-projects-svg.svg";
import CreateButton from "../../../../components/CreateButton";
import { useLanguage } from "../../../../contexts/LanguageContext";

type EmptyProjectsProps = {
  onButtonClick: () => void;
};

export default function EmptyProjects({
  onButtonClick,
}: EmptyProjectsProps): React.ReactElement {
  const {
    language: {
      pages: { projects: projectsLanguage },
    },
  } = useLanguage();

  return (
    <div className={styles.container}>
      <Svg className={styles.svg} />

      <div className={styles.info}>
        <div className={styles.infoTextContainer}>
          <p className={styles.infoText}>
            {projectsLanguage.emptyProjectsText}
          </p>
          <FiFrown
            className={styles.infoTextIcon}
            color="var(--dark)"
            size={24}
          />
        </div>

        <div className={styles.buttonWrapper}>
          <CreateButton
            title={projectsLanguage.buttonText}
            onClick={onButtonClick}
          />
        </div>
      </div>
    </div>
  );
}
