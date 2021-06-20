import React from "react";
import styles from "./styles.module.css";

type StarProps = {
  top: number | string;
  left: number | string;
};

export default function Star({ top, left }: StarProps): React.ReactElement {
  return (
    <div id={styles.star} style={{ top, left }}>
      <div />
      <div />
    </div>
  );
}
