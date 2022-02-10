import React from "react";

import styles from "../_shared/Input.module.css";

export type TextAreaProps = {
  id: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  cols?: number;
};

TextArea.defaultProps = {
  placeholder: "",
  value: "",
  onChange: () => null,
  rows: 5,
  cols: 30,
};

export default function TextArea({
  id,
  placeholder,
  value,
  onChange,
  rows,
  cols,
}: TextAreaProps): React.ReactElement {
  return (
    <>
      <textarea
        className={styles.input}
        name={id}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        cols={cols}
      />
    </>
  );
}
