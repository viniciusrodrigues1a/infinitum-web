import React, { createContext, useContext, useMemo } from "react";
import { toast } from "react-toastify";
import APIService from "../services/APIService";

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
  const apiService = useMemo(
    () => new APIService(toast, "http://localhost:3333"),
    []
  );

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
