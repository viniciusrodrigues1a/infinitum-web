import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
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
  const location = useLocation();

  const [language, setLanguage] = useState<Language>(
    languages["en-US"].content
  );
  const [isoCode, setIsoCode] = useState("en-US");

  function getBrowserDefaultLanguage() {
    const browserLanguage = window.navigator.language;

    return browserLanguage;
  }

  const getLangQueryParam = useCallback(() => {
    const params = new URLSearchParams(location.search);
    const lang = params.get("lang");

    return lang;
  }, [location]);

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
  }, [getLangQueryParam]);

  return (
    <LanguageContext.Provider value={{ language, isoCode }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextData {
  return useContext(LanguageContext);
}
