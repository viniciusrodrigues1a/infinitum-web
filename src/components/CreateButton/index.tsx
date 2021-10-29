import React from "react";
import { FiPlusCircle } from "react-icons/fi";

import styles from "./CreateButton.module.css";

export type CreateButtonProps = {
  title: string;
  onClick?: () => void;
  id?: string;
};

CreateButton.defaultProps = {
  onClick: () => null,
  id: "",
};

export default function CreateButton({
  title,
  onClick,
  id,
}: CreateButtonProps): React.ReactElement {
  return (
    <button
      id={id}
      type="button"
      className={styles.newProjectButton}
      onClick={onClick}
    >
      <FiPlusCircle
        className={styles.buttonIcon}
        color="var(--dark)"
        size={20}
      />
      <span className={styles.buttonText}>{title}</span>
    </button>
  );
}
