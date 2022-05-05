import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useEffectOnce } from "../hooks";

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
  hasFetchedAccount: boolean;
};

const AccountContext = createContext({} as AccountContextData);

type AccountProviderProps = {
  children: React.ReactNode;
};

export function AccountProvider({
  children,
}: AccountProviderProps): React.ReactElement {
  const [hasFetchedAccount, setHasFetchedAccount] = useState<boolean>(false);
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
    if (session === null) {
      setAccount({
        name: "",
        email: "",
        image: "",
        languageId: "",
      });
    }
  }, [session]);

  useEffect(() => {
    (async () => {
      const response = await listLanguagesService.listLanguages();

      if (response.data) setLanguages(response.data);
    })();
  }, [listLanguagesService]);

  const changeLanguage = useCallback(
    (languageId: string | undefined) => {
      if (!languageId) return;

      const language = languages.find((l) => l.id === languageId);

      if (!language) return;

      changeLanguageTo(language.isoCode);
    },
    [changeLanguageTo, languages]
  );

  useEffect(() => {
    (async () => {
      if (!isReady || !isReadyForAuthRequests || !session || !languages) return;

      const response = await findOneAccountService.findOneAccount(
        session.email
      );

      if (!response.data) return;

      setAccount(response.data);
      changeLanguage(response.data.languageId);
      setTimeout(() => {
        setHasFetchedAccount(true);
      }, 50);
    })();
  }, [
    isReady,
    isReadyForAuthRequests,
    languages,
    changeLanguage,
    findOneAccountService,
    session,
  ]);

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

  return (
    <AccountContext.Provider
      value={{ account, updateAccount, hasFetchedAccount }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount(): AccountContextData {
  return useContext(AccountContext);
}
