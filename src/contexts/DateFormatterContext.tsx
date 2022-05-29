import React, { createContext, useCallback, useContext } from "react";
import { addMinutes, format } from "date-fns";
import { ptBR, enUS, es } from "date-fns/locale";
import { useLanguage } from "./LanguageContext";

type DateFormatterContextData = {
  formatToFullDate(date: string | Date): string;
};

export const DateFormatterContext = createContext(
  {} as DateFormatterContextData
);

type DateFormatterProviderProps = {
  children: React.ReactElement;
};

const locales = {
  "pt-BR": ptBR,
  "en-US": enUS,
  es,
};

export const DateFormatterProvider = ({
  children,
}: DateFormatterProviderProps): React.ReactElement => {
  const { isoCode } = useLanguage();

  const formatToFullDate = useCallback(
    (date: string | Date) => {
      const d = new Date(date);
      return format(addMinutes(d, d.getTimezoneOffset()), "MMM d, y", {
        locale: locales[isoCode as keyof typeof locales] || ptBR,
      });
    },
    [isoCode]
  );

  return (
    <DateFormatterContext.Provider value={{ formatToFullDate }}>
      {children}
    </DateFormatterContext.Provider>
  );
};

export function useDateFormatter(): DateFormatterContextData {
  return useContext(DateFormatterContext);
}
