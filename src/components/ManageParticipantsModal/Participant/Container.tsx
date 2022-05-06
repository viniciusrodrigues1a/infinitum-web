import React from "react";

import styles from "./Container.module.scss";

type ContainerProps = {
  key?: string;
  children: React.ReactNode;
};

Container.defaultProps = {
  key: undefined,
};

export default function Container({
  key,
  children,
}: ContainerProps): React.ReactElement {
  return (
    <div className={styles.participantContainer} key={key}>
      {children}
    </div>
  );
}
