import React from "react";

import styles from "../_shared/Input.module.scss";

export type TextAreaProps = {
  id: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  cols?: number;
  disabled?: boolean;
};

TextArea.defaultProps = {
  placeholder: "",
  value: "",
  onChange: () => null,
  rows: 5,
  cols: 30,
  disabled: false,
};

export default function TextArea({
  id,
  placeholder,
  value,
  onChange,
  rows,
  cols,
  disabled,
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
        disabled={disabled}
      />
    </>
  );
}
