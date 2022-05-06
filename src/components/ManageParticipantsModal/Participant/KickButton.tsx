import React from "react";
import { FiXCircle } from "react-icons/fi";

import styles from "./KickButton.module.scss";

type KickButtonProps = {
  onClick: () => void;
};

export default function KickButton({
  onClick,
}: KickButtonProps): React.ReactElement {
  return (
    <div className={styles.listColumn}>
      <button className={styles.kickButton} type="button" onClick={onClick}>
        <FiXCircle color="var(--dark)" size={22} />
      </button>
    </div>
  );
}
