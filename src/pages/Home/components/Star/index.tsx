import React from "react";
import styles from "./star.module.css";
import StarImg from "../../../../assets/estrela.png";

type StarProps = {
  top: number | string;
  left: number | string;
  delay?: number;
};

export default function Star({
  top,
  left,
  delay,
}: StarProps): React.ReactElement {
  return (
    <img
      src={StarImg}
      alt="estrela"
      id={styles.star}
      style={{ top, left, animationDelay: `${delay}s` }}
    />
  );
}

Star.defaultProps = {
  delay: 0,
};
