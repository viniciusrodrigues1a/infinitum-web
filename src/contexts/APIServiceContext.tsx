import React, { createContext, useContext, useEffect, useMemo } from "react";
import api from "../services/api";
import { ILoginService, IRegisterService } from "../services/interfaces";
import LoginService from "../services/LoginService";
import RegisterService from "../services/RegisterService";
import { useLanguage } from "./LanguageContext";

type APIServiceContextData = {
  loginService: ILoginService;
  registerService: IRegisterService;
};

type APIServiceProviderProps = {
  children: React.ReactElement;
};

export const APIServiceContext = createContext({} as APIServiceContextData);

export const APIServiceProvider = ({
  children,
}: APIServiceProviderProps): React.ReactElement => {
  const { isoCode, language } = useLanguage();

  const services = useMemo(
    () => ({
      loginService: new LoginService(api, language.libs.axios),
      registerService: new RegisterService(api, language.libs.axios),
    }),
    [language]
  );

  useEffect(() => {
    api.defaults.headers.common["Accept-Language"] = isoCode;
  }, [isoCode]);

  return (
    <APIServiceContext.Provider value={services}>
      {children}
    </APIServiceContext.Provider>
  );
};

export function useAPIService(): APIServiceContextData {
  return useContext(APIServiceContext);
}
