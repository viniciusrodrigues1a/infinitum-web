import React from "react";

import styles from "./InputWrapper.module.css";

export type InputWrapperProps = {
  children: React.ReactNode;
};

export default function InputWrapper({
  children,
}: InputWrapperProps): React.ReactElement {
  return <div className={styles.container}>{children}</div>;
}
