import { ptBR } from "./ptBR";
import { enUS } from "./enUS";
import { esEs } from "./esEs";
import { Language } from "./types/Language";

import flagBR from "../assets/flag-br.svg";
import flagUS from "../assets/flag-us.svg";
import flagES from "../assets/flag-es.svg";

export type SupportedLanguages = "pt-BR" | "en-US" | "es-ES";

type LanguageInfo = {
  [key in SupportedLanguages]: {
    content: Language;
    name: string;
    flagAlt: string;
    flagSvg: string;
  };
};

export const languages: LanguageInfo = {
  "pt-BR": {
    content: ptBR,
    name: "Português (Brasil)",
    flagAlt: "Bandeira do Brasil",
    flagSvg: flagBR,
  },
  "en-US": {
    content: enUS,
    name: "English (United States)",
    flagAlt: "US Flag",
    flagSvg: flagUS,
  },
  "es-ES": {
    content: esEs,
    name: "Español (Espanha)",
    flagAlt: "Bandera española",
    flagSvg: flagES,
  },
};
