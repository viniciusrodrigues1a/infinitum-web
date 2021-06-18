import React from "react";
import styles from "./styles.module.css";

type StarProps = {
  top: number;
  left: number;
};

export default function Star({ top, left }: StarProps): React.ReactElement {
  return (
    <div className={styles.star} style={{ top, left }}>
      <div />
      <div />
      <div />
    </div>
  );
}
