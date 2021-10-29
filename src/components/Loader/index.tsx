import React from "react";

import styles from "./Loader.module.css";

export default function Loader(): React.ReactElement {
  return (
    <div className={styles.container}>
      <div className={styles.ldsRoller}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}
