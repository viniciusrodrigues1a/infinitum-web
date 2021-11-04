import React, { createContext, useContext, useEffect, useState } from "react";

type SessionContextData = {
  isSignedIn: () => boolean;
  clearSession: () => void;
  storeSession: (token: string) => void;
  sessionToken: string | null | undefined;
};

type SessionProviderProps = {
  children: React.ReactNode;
};

export const SessionContext = createContext({} as SessionContextData);

export function SessionProvider({
  children,
}: SessionProviderProps): React.ReactElement {
  const [sessionToken, setSessionToken] = useState<string | null>(null);

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

  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");
    if (storedToken) {
      storeSession(storedToken);
    }
  }, []);

  return (
    <SessionContext.Provider
      value={{ isSignedIn, storeSession, clearSession, sessionToken }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession(): SessionContextData {
  return useContext(SessionContext);
}
