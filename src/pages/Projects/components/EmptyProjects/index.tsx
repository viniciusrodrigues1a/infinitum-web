import React from "react";
import { FiFrown } from "react-icons/fi";

import "./EmptyProjects_SvgStyles.css";
import styles from "./EmptyProjects.module.css";

import { ReactComponent as Svg } from "../../../../assets/empty-projects-svg.svg";
import CreateButton from "../../../../components/CreateButton";

type EmptyProjectsProps = {
  onButtonClick: () => void;
};

export default function EmptyProjects({
  onButtonClick,
}: EmptyProjectsProps): React.ReactElement {
  return (
    <div className={styles.container}>
      <Svg className={styles.svg} />

      <div className={styles.info}>
        <div className={styles.infoTextContainer}>
          <p className={styles.infoText}>
            Você não possui nenhum projeto ainda
          </p>
          <FiFrown
            className={styles.infoTextIcon}
            color="var(--dark)"
            size={24}
          />
        </div>

        <div className={styles.buttonWrapper}>
          <CreateButton title="New project" onClick={onButtonClick} />
        </div>
      </div>
    </div>
  );
}
