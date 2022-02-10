import React, { createContext, useContext, useRef, useState } from "react";

type Session = {
  email: string;
  token: string;
};

type SessionContextData = {
  isSignedIn: () => boolean;
  clearSession: () => void;
  storeSession: (email: string, token: string) => void;
  loadSession: () => void;
  getSessionFromLocalStorage: () => Session | null;
  setReady: () => void;
  session: Session | null;
  isReady: boolean;
};

type SessionProviderProps = {
  children: React.ReactNode;
};

export const SessionContext = createContext({} as SessionContextData);

export function SessionProvider({
  children,
}: SessionProviderProps): React.ReactElement {
  const localStorageKey = useRef("@infinitum/session");
  const [session, setSession] = useState<Session | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);

  function isSignedIn() {
    return !!(session && session.token);
  }

  function clearSession() {
    setSession(null);
    localStorage.removeItem(localStorageKey.current);
  }

  function storeSession(email: string, token: string) {
    const session = { email, token };
    setSession(session);
    localStorage.setItem(localStorageKey.current, JSON.stringify(session));
  }

  function loadSession() {
    const storedSession = getSessionFromLocalStorage();

    if (storedSession) {
      const { email, token } = storedSession;
      storeSession(email, token);
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
