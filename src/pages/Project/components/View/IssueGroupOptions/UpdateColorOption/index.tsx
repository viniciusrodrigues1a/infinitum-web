import React from "react";

import styles from "./UpdateColorOption.module.scss";

type UpdateColorOptionProps = {
  onColorChange: (color: string) => void;
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export default function UpdateColorOption({
  onColorChange,
}: UpdateColorOptionProps): React.ReactElement {
  return (
    <div className={styles.container}>
      <button
        type="button"
        style={{ backgroundColor: "#7566ff" }}
        className={styles.color}
        onClick={() => onColorChange("#7566ff")}
      />
      <button
        type="button"
        style={{ backgroundColor: "#ff6e66" }}
        className={styles.color}
        onClick={() => onColorChange("#ff6e66")}
      />
      <button
        type="button"
        style={{ backgroundColor: "#4ac6ff" }}
        className={styles.color}
        onClick={() => onColorChange("#4ac6ff")}
      />
      <button
        type="button"
        style={{ backgroundColor: "#6bff5b" }}
        className={styles.color}
        onClick={() => onColorChange("#6bff5b")}
      />
      <button
        type="button"
        style={{ backgroundColor: "#ffc824" }}
        className={styles.color}
        onClick={() => onColorChange("#ffc824")}
      />
      <button
        type="button"
        style={{ backgroundColor: "#ff981a" }}
        className={styles.color}
        onClick={() => onColorChange("#ff981a")}
      />
    </div>
  );
}
