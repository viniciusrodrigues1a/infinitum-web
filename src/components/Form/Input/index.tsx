import React from "react";

import styles from "../_shared/Input.module.css";

export type InputProps = {
  id: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

Input.defaultProps = {
  placeholder: "",
  type: "text",
  value: "",
  onChange: () => null,
  disabled: false,
};

export default function Input({
  id,
  placeholder,
  type,
  value,
  onChange,
  disabled,
}: InputProps): React.ReactElement {
  return (
    <>
      <input
        className={styles.input}
        type={type}
        name={id}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
    </>
  );
}
