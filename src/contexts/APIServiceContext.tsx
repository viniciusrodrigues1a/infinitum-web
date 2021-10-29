import React, { createContext, useContext, useEffect, useMemo } from "react";
import api from "../services/api";
import CreateProjectService from "../services/CreateProjectService";
import {
  ICreateProjectService,
  IListProjectsService,
  ILoginService,
  IRegisterService,
} from "../services/interfaces";
import ListProjectsService from "../services/ListProjectsService";
import LoginService from "../services/LoginService";
import RegisterService from "../services/RegisterService";
import { useLanguage } from "./LanguageContext";
import { useSession } from "./SessionContext";

type APIServiceContextData = {
  loginService: ILoginService;
  registerService: IRegisterService;
  listProjectsService: IListProjectsService;
  createProjectService: ICreateProjectService;
};

type APIServiceProviderProps = {
  children: React.ReactElement;
};

export const APIServiceContext = createContext({} as APIServiceContextData);

export const APIServiceProvider = ({
  children,
}: APIServiceProviderProps): React.ReactElement => {
  const { sessionToken } = useSession();
  const { isoCode, language } = useLanguage();

  const services = useMemo(() => {
    const lang = language.libs.axios;

    return {
      loginService: new LoginService(api, lang),
      registerService: new RegisterService(api, lang),
      listProjectsService: new ListProjectsService(api, lang),
      createProjectService: new CreateProjectService(api, lang),
    } as APIServiceContextData;
  }, [language]);

  useEffect(() => {
    api.defaults.headers.common["Accept-Language"] = isoCode;
  }, [isoCode]);

  useEffect(() => {
    if (sessionToken) {
      api.defaults.headers.common.Authorization = `Bearer ${sessionToken}`;
    }
  }, [sessionToken]);

  return (
    <APIServiceContext.Provider value={services}>
      {children}
    </APIServiceContext.Provider>
  );
};

export function useAPIService(): APIServiceContextData {
  return useContext(APIServiceContext);
}
