import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import { IconBaseProps } from "react-icons/lib";

import styles from "./ViewOption.module.scss";

export type ViewOptionProps = {
  text: string;
  active?: boolean;
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
};

export default function ViewOption({
  icon: Icon,
  text,
  active,
}: ViewOptionProps): React.ReactElement {
  return (
    <button
      type="button"
      className={`${styles.container} ${active ? styles.active : ""}`}
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
