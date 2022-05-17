import React from "react";
import AccountAvatar from "../../AccountAvatar";

import styles from "./Info.module.scss";

type InfoProps = {
  name: string;
  email: string;
  image: string;
};

export default function Info({
  name,
  email,
  image,
}: InfoProps): React.ReactElement {
  return (
    <div className={styles.listColumn}>
      <div className={styles.participantImgContainer}>
        {image ? (
          <img src={image} alt="Participant's profile" />
        ) : (
          <AccountAvatar size="3rem" name={name} />
        )}
      </div>
      <div className={styles.participantInfo}>
        <span className={styles.participantName}>{name}</span>
        <span className={styles.participantEmail}>{email}</span>
      </div>
    </div>
  );
}
