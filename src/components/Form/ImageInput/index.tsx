import React, { useEffect, useState } from "react";

import styles from "./ImageInput.module.css";

export type ImageInputProps = {
  id: string;
  component: () => React.ReactElement;
  width: string;
  height: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  src?: string;
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
  component: Component,
  width,
  height,
}: ImageInputProps): React.ReactElement {
  const [isImgShown, setIsImgShown] = useState(!!src);

  useEffect(() => {
    setIsImgShown(!!src);
  }, [src]);

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  function handleOnError(e: any) {
    e.target.src = null;
    setIsImgShown(false);
  }

  return (
    <div
      style={{ width, height, position: "relative" }}
      className={isImgShown ? styles.imgShown : ""}
    >
      {isImgShown && (
        <img
          className={styles.img}
          src={src}
          alt=""
          onError={handleOnError}
          style={{ width, height }}
        />
      )}
      {!isImgShown && <Component />}
      <input
        className={styles.input}
        type="file"
        accept="image/png, image/jpeg, image/svg+xml"
        name={id}
        id={id}
        value={value}
        onChange={onChange}
        style={{ width, height }}
      />
    </div>
  );
}
