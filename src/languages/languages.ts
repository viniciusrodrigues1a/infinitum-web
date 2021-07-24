import { ptBR } from "./ptBR";
import { enUS } from "./enUS";
import { esEs } from "./esEs";
import { Language } from "./types/Language";

import flagBR from "../assets/flag-br.svg";
import flagUS from "../assets/flag-us.svg";
import flagES from "../assets/flag-es.svg";

type LanguageInfo = {
  [key: string]: {
    content: Language;
    name: string;
    flagAlt: string;
    flagSvg: string;
    path: string;
  };
};

export const languages: LanguageInfo = {
  "pt-BR": {
    content: ptBR,
    name: "Português (Brasil)",
    flagAlt: "Bandeira do Brasil",
    flagSvg: flagBR,
    path: "?lang=pt-BR",
  },
  "en-US": {
    content: enUS,
    name: "English (United States)",
    flagAlt: "US Flag",
    flagSvg: flagUS,
    path: "?lang=en-US",
  },
  "es-ES": {
    content: esEs,
    name: "Español (Espanha)",
    flagAlt: "Bandera española",
    flagSvg: flagES,
    path: "?lang=es-ES",
  },
};
