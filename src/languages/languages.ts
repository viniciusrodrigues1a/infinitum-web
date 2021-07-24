import { ptBR } from "./ptBR";
import { enUS } from "./enUS";
import { esEs } from "./esEs";
import { Language } from "./types/Language";

type LanguageInfo = {
  [key: string]: {
    content: Language;
    name: string;
    flagAlt: string;
    path: string;
  };
};

export const languages: LanguageInfo = {
  "pt-BR": {
    content: ptBR,
    name: "Português (Brasil)",
    flagAlt: "Bandeira do Brasil",
    path: "?lang/pt-BR",
  },
  "en-US": {
    content: enUS,
    name: "English (United States)",
    flagAlt: "US Flag",
    path: "?lang/en-US",
  },
  "es-ES": {
    content: esEs,
    name: "Español (Espanha)",
    flagAlt: "Bandera española",
    path: "?lang/es-ES",
  },
};
