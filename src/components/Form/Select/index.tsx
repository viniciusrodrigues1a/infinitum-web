import React from "react";

import styles from "../_shared/Input.module.scss";

export type SelectProps = {
  id: string;
  options: Array<{ value: string; text: string }>;
  placeholder?: string | null;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
};

Select.defaultProps = {
  value: "",
  placeholder: null,
  disabled: false,
};

export default function Select({
  id,
  options,
  value,
  onChange,
  placeholder,
  disabled,
}: SelectProps): React.ReactElement {
  return (
    <>
      <select
        className={styles.input}
        name={id}
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
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
