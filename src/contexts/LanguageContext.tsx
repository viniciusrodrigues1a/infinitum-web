import React, { createContext, useEffect, useState } from "react";
import { Language, ptBR, enUS } from "../languages";

type LanguageContextData = {
  language: Language;
};

type LanguageProviderProps = {
  children: React.ReactElement;
};

const languages = {
  "pt-BR": ptBR,
  "en-US": enUS,
};

export const LanguageContext = createContext({} as LanguageContextData);

export const LanguageProvider = ({
  children,
}: LanguageProviderProps): React.ReactElement => {
  const [language, setLanguage] = useState<Language>(enUS);

  function getBrowserDefaultLanguage() {
    const browserLanguage = window.navigator.language;

    return browserLanguage;
  }

  function getLangQueryParam() {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get("lang");

    return lang;
  }

  function setLanguageIfSupported(lang: string | null) {
    if (!lang) {
      return;
    }

    if (lang in languages) {
      setLanguage(languages[lang as keyof typeof languages]);
    }
  }

  useEffect(() => {
    const browserLanguage = getBrowserDefaultLanguage();
    const langQueryParam = getLangQueryParam();

    setLanguageIfSupported(browserLanguage);
    setLanguageIfSupported(langQueryParam);
  }, []);

  return (
    <LanguageContext.Provider value={{ language }}>
      {children}
    </LanguageContext.Provider>
  );
};
