import React from "react";

import styles from "./Container.module.scss";

type ContainerProps = {
  children: React.ReactNode;
};

export default function Container({
  children,
  ...rest
}: ContainerProps): React.ReactElement {
  return (
    <div className={styles.participantContainer} {...rest}>
      {children}
    </div>
  );
}
