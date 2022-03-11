import React, { useState } from "react";

import styles from "./NotificationPreference.module.scss";

type NotificationPreferenceProps = {
  description: string;
  onPushOptionChange: (b: boolean) => void;
  onEmailOptionChange: (b: boolean) => void;
};

export default function NotificationPreference({
  description,
  onPushOptionChange,
  onEmailOptionChange,
}: NotificationPreferenceProps): React.ReactElement {
  const [isPushActive, setIsPushActive] = useState(false);
  const [isEmailActive, setIsEmailActive] = useState(false);

  function onPushClick() {
    onPushOptionChange(!isPushActive);
    setIsPushActive(!isPushActive);
  }

  function onEmailClick() {
    onEmailOptionChange(!isEmailActive);
    setIsEmailActive(!isEmailActive);
  }

  return (
    <div className={styles.preference}>
      <span>{description}</span>
      <div className={styles.preferenceButtons}>
        <button
          type="button"
          className={styles.preferenceButton}
          style={{ color: isPushActive ? "var(--dark)" : "#888888" }}
          onClick={onPushClick}
        >
          Push
        </button>
        <button
          type="button"
          className={styles.preferenceButton}
          style={{ color: isEmailActive ? "var(--dark)" : "#888888" }}
          onClick={onEmailClick}
        >
          Email
        </button>
      </div>
    </div>
  );
}
