import React from "react";
import { FiX } from "react-icons/fi";

import styles from "./modalCloseButton.module.css";

type CloseButtonProps = {
  closeModal: () => void;
  size?: number;
};

CloseButton.defaultProps = {
  size: 48,
};

export function CloseButton({
  closeModal,
  size,
}: CloseButtonProps): React.ReactElement {
  return (
    <button id={styles.closeButton} type="button" onClick={closeModal}>
      <FiX color="#777777" size={size} />
    </button>
  );
}
