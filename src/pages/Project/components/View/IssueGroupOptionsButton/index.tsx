import React, { useRef } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { useLanguage } from "../../../../../contexts/LanguageContext";

import styles from "./IssueGroupOptionsButton.module.scss";

type IssueGroupOptionsButtonProps = {
  isDropdownShown: boolean;
  defaultChecked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (e: React.MouseEvent) => void;
};

export default function IssueGroupOptionsButton({
  isDropdownShown,
  defaultChecked,
  onChange,
  onClick,
}: IssueGroupOptionsButtonProps): React.ReactElement {
  const {
    language: {
      pages: { project: projectLanguage },
    },
  } = useLanguage();

  const moreOptionsDropdownRef = useRef<HTMLDivElement>(null);
  const moreOptionsDropdownInputRef = useRef<HTMLInputElement>(null);

  return (
    <button
      type="button"
      className={styles.moreOptionsButton}
      onClick={onClick}
    >
      <FiMoreVertical color="var(--dark)" size={20} />

      {isDropdownShown && (
        <div
          ref={moreOptionsDropdownRef}
          className={styles.moreOptionsDropdown}
        >
          <span>{projectLanguage.updateIssueGroupInputText}</span>
          <input
            ref={moreOptionsDropdownInputRef}
            type="checkbox"
            name="issue-group-final"
            id="issue-group-final"
            defaultChecked={defaultChecked}
            onChange={onChange}
          />
        </div>
      )}
    </button>
  );
}
