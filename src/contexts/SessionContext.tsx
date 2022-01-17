import React, { createContext, useContext, useEffect, useState } from "react";

type SessionContextData = {
  isSignedIn: () => boolean;
  clearSession: () => void;
  storeSession: (token: string) => void;
  loadSession: () => void;
  sessionToken: string | null | undefined;
  isReady: boolean;
};

type SessionProviderProps = {
  children: React.ReactNode;
};

export const SessionContext = createContext({} as SessionContextData);

export function SessionProvider({
  children,
}: SessionProviderProps): React.ReactElement {
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);

  function isSignedIn() {
    return sessionToken !== null;
  }

  function clearSession() {
    setSessionToken(null);
    localStorage.removeItem("jwtToken");
  }

  function storeSession(token: string) {
    setSessionToken(token);
    localStorage.setItem("jwtToken", token);
  }

  function loadSession() {
    const storedToken = localStorage.getItem("jwtToken");
    if (storedToken) {
      storeSession(storedToken);
    }
    setIsReady(true);
  }

  return (
    <SessionContext.Provider
      value={{
        isSignedIn,
        storeSession,
        clearSession,
        loadSession,
        sessionToken,
        isReady,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession(): SessionContextData {
  return useContext(SessionContext);
}
