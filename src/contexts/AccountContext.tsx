import React, { createContext, useContext, useEffect, useState } from "react";

import {
  FindOneAccountServiceResponse,
  ListLanguagesServiceResponse,
  UpdateAccountServiceRequest,
} from "../services/interfaces";
import { APIResponse } from "../services/type-defs/APIResponse";
import { useAPIService } from "./APIServiceContext";
import { useLanguage } from "./LanguageContext";
import { useSession } from "./SessionContext";

type AccountContextData = {
  account: FindOneAccountServiceResponse;
  updateAccount: (
    data: UpdateAccountServiceRequest
  ) => Promise<APIResponse<null>>;
};

const AccountContext = createContext({} as AccountContextData);

type AccountProviderProps = {
  children: React.ReactNode;
};

export function AccountProvider({
  children,
}: AccountProviderProps): React.ReactElement {
  const [languages, setLanguages] = useState<ListLanguagesServiceResponse>([]);
  const [account, setAccount] = useState<FindOneAccountServiceResponse>({
    name: "",
    email: "",
    image: "",
    languageId: "",
  });
  const { session, isReady } = useSession();
  const {
    findOneAccountService,
    listLanguagesService,
    updateAccountService,
    isReadyForAuthRequests,
  } = useAPIService();
  const { changeLanguageTo } = useLanguage();

  useEffect(() => {
    (async () => {
      const response = await listLanguagesService.listLanguages();

      if (response.data) setLanguages(response.data);
    })();
  }, [listLanguagesService]);

  useEffect(() => {
    (async () => {
      if (!isReady || !isReadyForAuthRequests || !session) return;

      const response = await findOneAccountService.findOneAccount(
        session.email
      );

      if (!response.data) return;

      setAccount(response.data);
      changeLanguage(response.data.languageId);
    })();
  }, [isReady, isReadyForAuthRequests]);

  async function updateAccount({
    file,
    name,
    password,
    languageId,
  }: Omit<UpdateAccountServiceRequest, "email">) {
    const response = await updateAccountService.updateAccount({
      name,
      languageId,
      password,
      file,
    });

    changeLanguage(languageId);
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () =>
        setAccount({ ...account, image: reader.result as string });
    }

    return response;
  }

  function changeLanguage(languageId: string | undefined) {
    if (!languageId) return;

    const language = languages.find((l) => l.id === languageId);

    if (!language) return;

    changeLanguageTo(language.isoCode);
  }

  return (
    <AccountContext.Provider value={{ account, updateAccount }}>
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount(): AccountContextData {
  return useContext(AccountContext);
}
