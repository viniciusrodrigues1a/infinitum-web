import React from "react";

import styles from "./Subtitle.module.css";

export type SubtitleProps = {
  children: React.ReactNode;
};

export default function Subtitle({
  children,
}: SubtitleProps): React.ReactElement {
  return <h2 className={styles.subtitle}>{children}</h2>;
}
