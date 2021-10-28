import React from "react";
import { FiPlusCircle } from "react-icons/fi";

import styles from "./CreateButton.module.css";

export type CreateButtonProps = {
  title: string;
  onClick?: () => void;
};

CreateButton.defaultProps = {
  onClick: () => null,
};

export default function CreateButton({
  title,
  onClick,
}: CreateButtonProps): React.ReactElement {
  return (
    <button type="button" className={styles.newProjectButton} onClick={onClick}>
      <FiPlusCircle
        className={styles.buttonIcon}
        color="var(--dark)"
        size={18}
      />
      <span className={styles.buttonText}>{title}</span>
    </button>
  );
}
