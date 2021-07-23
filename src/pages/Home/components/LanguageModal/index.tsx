import React from "react";
import styles from "./languageModal.module.css";

type LanguageModalProps = {
  shown: boolean;
};

export default function LanguageModal({
  shown,
}: LanguageModalProps): React.ReactElement {
  if (!shown) {
    return <></>;
  }

  return <h1>Hello, world</h1>;
}

export { LanguageModal };
