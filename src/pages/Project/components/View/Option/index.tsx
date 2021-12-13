import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import { IconBaseProps } from "react-icons/lib";

import styles from "./Option.module.scss";

export type ViewOptionProps = {
  text: string;
  active?: boolean;
  onClick?: () => void;
  icon: (
    props: DetailedHTMLProps<
      HTMLAttributes<HTMLElement | SVGElement>,
      HTMLElement | SVGElement
    > &
      IconBaseProps
  ) => React.ReactElement;
};

ViewOption.defaultProps = {
  active: false,
  onClick: () => null,
};

export default function ViewOption({
  icon: Icon,
  text,
  active,
  onClick,
}: ViewOptionProps): React.ReactElement {
  return (
    <button
      type="button"
      className={`${styles.container} ${active ? styles.active : ""}`}
      onClick={onClick}
    >
      <Icon
        className={styles.icon}
        color={`${active ? "var(--dark)" : "#777777"}`}
        size={20}
      />
      <span>{text}</span>

      {active && <div className={styles.selectedIndicator} />}
    </button>
  );
}
