import React, { useRef } from "react";
import { FiMoreVertical } from "react-icons/fi";

import styles from "./Container.module.scss";

type ContainerProps = {
  isDropdownShown: boolean;
  onClick: (e: React.MouseEvent) => void;
  children: React.ReactNode;
};

export default function Container({
  isDropdownShown,
  onClick,
  children,
}: ContainerProps): React.ReactElement {
  const moreOptionsDropdownRef = useRef<HTMLDivElement>(null);

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
          {children}
        </div>
      )}
    </button>
  );
}
