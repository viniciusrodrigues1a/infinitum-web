import React, { createContext, useContext, useEffect, useState } from "react";
import { languages, Language, SupportedLanguages } from "../languages";

type LanguageContextData = {
  language: Language;
  isoCode: string;
  changeLanguageTo(language: keyof typeof languages): void;
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

  function setLanguageIfSupported(lang: string | null) {
    if (!lang) {
      return;
    }

    if (lang in languages) {
      setIsoCode(lang);
      setLanguage(languages[lang as SupportedLanguages].content);
    }
  }

  useEffect(() => {
    const browserLanguage = getBrowserDefaultLanguage();

    setLanguageIfSupported(browserLanguage);
  }, []);

  function changeLanguageTo(language: SupportedLanguages) {
    setIsoCode(language);
    setLanguage(languages[language].content);
  }

  return (
    <LanguageContext.Provider value={{ language, isoCode, changeLanguageTo }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextData {
  return useContext(LanguageContext);
}
