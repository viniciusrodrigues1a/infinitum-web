import React, { useRef } from "react";
import { useLanguage } from "../../../../../../contexts/LanguageContext";

import styles from "./UpdateIsFinalOption.module.scss";

type IssueGroupOptionsButtonProps = {
  defaultChecked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function IssueGroupOptionsButton({
  defaultChecked,
  onChange,
}: IssueGroupOptionsButtonProps): React.ReactElement {
  const {
    language: {
      pages: { project: projectLanguage },
    },
  } = useLanguage();

  const moreOptionsDropdownInputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <span className={styles.text}>
        {projectLanguage.updateIssueGroupInputText}
      </span>
      <input
        className={styles.input}
        ref={moreOptionsDropdownInputRef}
        type="checkbox"
        name="issue-group-final"
        id="issue-group-final"
        defaultChecked={defaultChecked}
        onChange={onChange}
      />
    </div>
  );
}
