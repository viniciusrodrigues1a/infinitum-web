import React, { useEffect, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";

import styles from "./ImageInput.module.css";

export type ImageInputProps = {
  id: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<any>) => void;
  src?: any;
};

ImageInput.defaultProps = {
  placeholder: "",
  value: "",
  onChange: () => null,
  src: null,
};

export default function ImageInput({
  id,
  value,
  onChange,
  src,
}: ImageInputProps): React.ReactElement {
  const [isImgShown, setIsImgShown] = useState(!!src);

  useEffect(() => {
    setIsImgShown(true);
  }, [src]);

  function handleOnError(e: any) {
    e.target.src = null;
    setIsImgShown(false);
  }

  return (
    <div className={`${styles.container} ${isImgShown ? styles.imgShown : ""}`}>
      {isImgShown && (
        <img className={styles.img} src={src} alt="" onError={handleOnError} />
      )}
      {!isImgShown && (
        <FiUploadCloud className={styles.icon} size={24} color="var(--dark)" />
      )}
      <input
        className={styles.input}
        type="file"
        accept="image/png, image/jpeg, image/svg+xml"
        name={id}
        id={id}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
