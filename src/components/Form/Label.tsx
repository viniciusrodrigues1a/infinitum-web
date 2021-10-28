import React from "react";

import styles from "./Label.module.css";

export type LabelProps = {
  titleLabel: string;
  descriptionLabel: string;
  htmlFor: string;
};

export default function Label({
  titleLabel,
  descriptionLabel,
  htmlFor,
}: LabelProps): React.ReactElement {
  return (
    <>
      <label className={styles.titleLabel} htmlFor={htmlFor}>
        {titleLabel}
      </label>
      <span className={styles.descriptionLabel}>{descriptionLabel}</span>
    </>
  );
}
