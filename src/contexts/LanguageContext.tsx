import React, { createContext, useContext, useEffect, useState } from "react";
import { languages, Language } from "../languages";

type LanguageContextData = {
  language: Language;
  isoCode: string;
};

type LanguageProviderProps = {
  children: React.ReactElement;
};

export const LanguageContext = createContext({} as LanguageContextData);

export const LanguageProvider = ({
  children,
}: LanguageProviderProps): React.ReactElement => {
  const [language, setLanguage] = useState<Language>(
    languages["en-US"].content
  );
  const [isoCode, setIsoCode] = useState("en-US");

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
      setIsoCode(lang);
      setLanguage(languages[lang].content);
    }
  }

  useEffect(() => {
    const browserLanguage = getBrowserDefaultLanguage();
    const langQueryParam = getLangQueryParam();

    setLanguageIfSupported(browserLanguage);
    setLanguageIfSupported(langQueryParam);
  }, []);

  return (
    <LanguageContext.Provider value={{ language, isoCode }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextData {
  return useContext(LanguageContext);
}
