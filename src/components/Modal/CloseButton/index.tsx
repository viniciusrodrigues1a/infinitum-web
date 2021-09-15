import React from "react";
import { FiX } from "react-icons/fi";

import styles from "./modalCloseButton.module.css";

type CloseButtonProps = {
  closeModal: () => void;
};

export function CloseButton({
  closeModal,
}: CloseButtonProps): React.ReactElement {
  return (
    <button id={styles.closeButton} type="button" onClick={closeModal}>
      <FiX color="#777777" size={48} />
    </button>
  );
}
