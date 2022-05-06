import React from "react";
import { useLanguage } from "../../../contexts/LanguageContext";

import styles from "./RoleSelect.module.scss";

type RoleSelectProps = {
  roleName: string;
  email: string;
  onChange(event: React.ChangeEvent<HTMLSelectElement>, email: string): void;
};

export default function RoleSelect({
  roleName,
  email,
  onChange,
}: RoleSelectProps): React.ReactElement {
  const {
    language: {
      components: { manageParticipantsModal: manageParticipantsModalLanguage },
    },
  } = useLanguage();

  return (
    <div className={styles.listColumn}>
      <div className={styles.participantRoleContainer}>
        {roleName === "owner" ? (
          <span className={styles.participantRole}>
            {manageParticipantsModalLanguage.ownerRole}
          </span>
        ) : (
          <select
            className={styles.participantRole}
            value={roleName}
            onChange={(event) => onChange(event, email)}
          >
            <option value="espectator">
              {manageParticipantsModalLanguage.espectatorRole}
            </option>
            <option value="member">
              {manageParticipantsModalLanguage.memberRole}
            </option>
            <option value="admin">
              {manageParticipantsModalLanguage.adminRole}
            </option>
          </select>
        )}
      </div>
    </div>
  );
}
