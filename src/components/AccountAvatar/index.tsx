import React, { useEffect, useMemo, useState } from "react";
import { darken, lighten, setLightness, setSaturation } from "polished";

import styles from "./AccountAvatar.module.scss";

type AccountAvatarProps = {
  onClick?: () => void;
  size?: string | undefined;
  fontSize?: string | undefined;
  name: string;
  image?: string | null;
  borderStyle?: "solid" | "dotted";
};

AccountAvatar.defaultProps = {
  size: undefined,
  fontSize: undefined,
  onClick: () => null,
  image: null,
  borderStyle: "solid",
};

export default function AccountAvatar({
  onClick,
  size,
  fontSize,
  name,
  image,
  borderStyle,
}: AccountAvatarProps): React.ReactElement {
  const backgroundColor = useMemo(() => {
    if (image) return "transparent";

    return setLightness(0.8, setSaturation(0.8, stringToColor(name)));
  }, [name, image]);
  const color = useMemo(() => {
    if (image) return "transparent";

    return darken(0.45)(backgroundColor);
  }, [backgroundColor, image]);

  const backgroundImage = useMemo(() => {
    if (borderStyle !== "dotted" || image) return "";

    return `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='100' ry='100' stroke='%23${color.replace(
      "#",
      ""
    )}FF' stroke-width='4' stroke-dasharray='10%2c 9' stroke-dashoffset='86' stroke-linecap='butt'/%3e%3c/svg%3e")`;
  }, [color, borderStyle, image]);

  const border = useMemo(() => {
    if (borderStyle !== "solid" || image) return "";

    return `1px solid ${color}`;
  }, [color, borderStyle, image]);

  function stringToColor(s: string) {
    let hash = 0;
    for (let i = 0; i < s.length; i++) {
      hash = s.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    return color;
  }

  const nameInitials = useMemo(() => {
    const splitted = name.split(" ");

    if (splitted.length > 1) {
      return splitted[0][0] + splitted[1][0];
    }

    return splitted[0][0];
  }, [name]);

  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      style={{
        width: size,
        height: size,
        backgroundColor,
        backgroundImage,
        border,
      }}
    >
      {image ? (
        <img src={image} alt="" />
      ) : (
        <span
          style={{
            fontSize: fontSize || "1rem",
            color,
          }}
        >
          {nameInitials}
        </span>
      )}
    </button>
  );
}
