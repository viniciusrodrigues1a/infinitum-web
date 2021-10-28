import React from "react";
import { FiUploadCloud } from "react-icons/fi";

import styles from "./ImageInput.module.css";

export type ImageInputProps = {
  id: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<any>) => void;
};

ImageInput.defaultProps = {
  placeholder: "",
  type: "text",
  value: "",
  onChange: () => null,
};

export default function ImageInput({
  id,
  type,
  value,
  onChange,
}: ImageInputProps): React.ReactElement {
  return (
    <div className={styles.container}>
      <img className={styles.img} src="" alt="" />
      <FiUploadCloud className={styles.icon} size={24} color="var(--dark)" />
      <input
        className={styles.input}
        type={type}
        name={id}
        id={id}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
