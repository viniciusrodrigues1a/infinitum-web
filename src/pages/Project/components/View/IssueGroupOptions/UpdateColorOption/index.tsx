import React, { useRef } from "react";

import styles from "./UpdateColorOption.module.scss";

type UpdateColorOptionProps = {
  onColorChange: (color: string) => void;
};

export default function UpdateColorOption({
  onColorChange,
}: UpdateColorOptionProps): React.ReactElement {
  const colors = useRef([
    "#7566ff",
    "#ff6e66",
    "#4ac6ff",
    "#6bff5b",
    "#ffc824",
    "#ff981a",
  ]);

  return (
    <div className={styles.container}>
      {colors.current.map((color) => (
        /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
        <button
          key={color}
          type="button"
          style={{ backgroundColor: color }}
          className={styles.color}
          onClick={() => onColorChange(color)}
        />
      ))}
    </div>
  );
}
