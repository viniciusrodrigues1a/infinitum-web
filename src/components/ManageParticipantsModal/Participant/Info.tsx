import React from "react";
import { FiUser } from "react-icons/fi";

import styles from "./Info.module.scss";

type InfoProps = {
  name: string;
  email: string;
};

export default function Info({ name, email }: InfoProps): React.ReactElement {
  return (
    <div className={styles.listColumn}>
      <div className={styles.participantImg}>
        <FiUser color="var(--light)" size={22} />
      </div>
      <div className={styles.participantInfo}>
        <span className={styles.participantName}>{name}</span>
        <span className={styles.participantEmail}>{email}</span>
      </div>
    </div>
  );
}
