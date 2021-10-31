import React from "react";

import styles from "./Input.module.css";

export type SelectProps = {
  id: string;
  options: Array<{ value: string; text: string }>;
  placeholder?: string | null;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

Select.defaultProps = {
  value: "",
  placeholder: null,
};

export default function Select({
  id,
  options,
  value,
  onChange,
  placeholder,
}: SelectProps): React.ReactElement {
  return (
    <>
      <select
        className={styles.input}
        name={id}
        id={id}
        value={value}
        onChange={onChange}
      >
        {placeholder && (
          <option value="" disabled selected>
            {placeholder}
          </option>
        )}

        {options.map((o) => (
          <option value={o.value}>{o.text}</option>
        ))}
      </select>
    </>
  );
}
