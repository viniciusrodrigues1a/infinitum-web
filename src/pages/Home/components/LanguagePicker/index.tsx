import React from "react";

import styles from "./languagePicker.module.css";

import flagBR from "../../../../assets/flag-br.svg";
import flagUS from "../../../../assets/flag-us.svg";
import flagES from "../../../../assets/flag-es.svg";
import { useLanguage } from "../../../../contexts/LanguageContext";

type LanguagePickerProps = {
  shown: boolean;
};

export default function LanguagePicker({
  shown,
}: LanguagePickerProps): React.ReactElement {
  const { changeLanguageTo } = useLanguage();

  if (!shown) {
    return <></>;
  }

  return (
    <div id={styles.languageMenu}>
      <button
        type="button"
        onClick={() => changeLanguageTo("pt-BR")}
        className={styles.languageItem}
      >
        <div>
          <img src={flagBR} alt="Bandeira do Brasil" />
          <span>Português (Brasil)</span>
        </div>
      </button>
      <button
        type="button"
        onClick={() => changeLanguageTo("en-US")}
        className={styles.languageItem}
      >
        <div>
          <img src={flagUS} alt="US Flag" />
          <span>English (United States)</span>
        </div>
      </button>
      <button
        type="button"
        onClick={() => changeLanguageTo("es-ES")}
        className={styles.languageItem}
      >
        <div>
          <img src={flagES} alt="Bandera española" />
          <span>Español (España)</span>
        </div>
      </button>
    </div>
  );
}
