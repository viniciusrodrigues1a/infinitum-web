import React from "react";

import styles from "./Title.module.css";

export type TitleProps = {
  children: React.ReactNode;
};

export default function Title({ children }: TitleProps): React.ReactElement {
  return <h1 className={styles.title}>{children}</h1>;
}
