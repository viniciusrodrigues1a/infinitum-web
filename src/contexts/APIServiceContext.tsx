import React, { createContext, useContext, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import APIService from "../services/APIService";
import { useLanguage } from "./LanguageContext";

type APIServiceContextData = {
  apiService: APIService;
};

type APIServiceProviderProps = {
  children: React.ReactElement;
};

export const APIServiceContext = createContext({} as APIServiceContextData);

export const APIServiceProvider = ({
  children,
}: APIServiceProviderProps): React.ReactElement => {
  const { isoCode } = useLanguage();

  const apiService = useMemo(
    () => new APIService(toast, "http://localhost:3333"),
    []
  );

  useEffect(() => {
    apiService.axiosInstance.defaults.headers.common["Accept-Language"] =
      isoCode;
  }, [isoCode, apiService]);

  return (
    <APIServiceContext.Provider value={{ apiService }}>
      {children}
    </APIServiceContext.Provider>
  );
};

export function useAPIService(): APIService {
  const { apiService } = useContext(APIServiceContext);

  return apiService;
}
