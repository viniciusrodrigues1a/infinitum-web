import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import api from "../services/api";
import RefreshTokenService from "../services/RefreshTokenService";
import showToast from "../utils/showToast";
import { useLanguage } from "./LanguageContext";

type Session = {
  email: string;
  token: string;
  refreshToken: string;
};

type SessionContextData = {
  isSignedIn: () => boolean;
  clearSession: () => void;
  storeSession: (email: string, token: string, rt: string) => Promise<void>;
  loadSession: () => Promise<void>;
  getSessionFromLocalStorage: () => Session | null;
  setReady: () => void;
  session: Session | null;
  isReady: boolean;
};

type SessionProviderProps = {
  children: React.ReactNode;
};

export const SessionContext = createContext({} as SessionContextData);

let timeout: any = null;

export function SessionProvider({
  children,
}: SessionProviderProps): React.ReactElement {
  const localStorageKey = useRef("@infinitum/session");
  const [session, setSession] = useState<Session | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);
  const { language } = useLanguage();

  const refreshTokenService = useMemo(
    () => new RefreshTokenService(api, language.libs.axios),
    [language]
  );

  useEffect(() => {
    if (!session) return;

    clearTimeout(timeout);
    timeout = null;
    timeout = setTimeout(async () => {
      const response = await refreshTokenService.refresh(session.refreshToken);

      if (response.data) {
        const s = {
          email: session.email,
          refreshToken: response.data.refreshToken,
          token: response.data.accessToken,
        };
        setSession(s);
        localStorage.setItem(localStorageKey.current, JSON.stringify(s));
      } else if (response.error) {
        showToast(language.libs.axios.sessionExpired, true);
        clearSession();
      }
    }, 1000 * 60 * 12);
  }, [session, refreshTokenService, language]);

  function isSignedIn() {
    return !!(session && session.token);
  }

  function clearSession() {
    setSession(null);
    localStorage.removeItem(localStorageKey.current);
  }

  async function storeSession(email: string, token: string, rt: string) {
    const response = await refreshTokenService.refresh(rt);

    if (response.data) {
      const s = {
        email,
        token: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      };
      setSession(s);
      localStorage.setItem(localStorageKey.current, JSON.stringify(s));
    } else if (response.error) {
      showToast(language.libs.axios.sessionExpired, true);
      clearSession();
    }
  }

  async function loadSession() {
    const storedSession = getSessionFromLocalStorage();

    if (storedSession) {
      const { email, token, refreshToken } = storedSession;
      await storeSession(email, token, refreshToken);
    }
  }

  function getSessionFromLocalStorage() {
    const storedItem = localStorage.getItem(localStorageKey.current);

    if (!storedItem) return null;

    return JSON.parse(storedItem);
  }

  function setReady() {
    setIsReady(true);
  }

  return (
    <SessionContext.Provider
      value={{
        isSignedIn,
        storeSession,
        clearSession,
        loadSession,
        setReady,
        session,
        isReady,
        getSessionFromLocalStorage,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession(): SessionContextData {
  return useContext(SessionContext);
}
