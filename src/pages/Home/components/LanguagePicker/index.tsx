import React from "react";

import styles from "./languagePicker.module.css";

import flagBR from "../../../../assets/flag-br.svg";
import flagUS from "../../../../assets/flag-us.svg";
import flagES from "../../../../assets/flag-es.svg";

type LanguagePickerProps = {
  shown: boolean;
};

export default function LanguagePicker({
  shown,
}: LanguagePickerProps): React.ReactElement {
  if (!shown) {
    return <></>;
  }

  return (
    <div id={styles.languageMenu}>
      <a href="?lang=pt-BR" className={styles.languageItem}>
        <div>
          <img src={flagBR} alt="Bandeira do Brasil" />
          <span>Português (Brasil)</span>
        </div>
      </a>
      <a href="?lang=en-US" className={styles.languageItem}>
        <div>
          <img src={flagUS} alt="US Flag" />
          <span>English (United States)</span>
        </div>
      </a>
      <a href="?lang=es-ES" className={styles.languageItem}>
        <div>
          <img src={flagES} alt="Bandera española" />
          <span>Español (España)</span>
        </div>
      </a>
    </div>
  );
}
