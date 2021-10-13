import React, { createContext, useState } from "react";

type Session = null | {
  token: string;
  tokenHeader: string;
};

type SessionContextData = {
  isSignedIn: () => boolean;
  signout: () => void;
};

type SessionProviderProps = {
  children: React.ReactNode;
};

export const SessionContext = createContext({} as SessionContextData);

export function SessionProvider({
  children,
}: SessionProviderProps): React.ReactElement {
  const [session, setSession] = useState<Session>();

  function isSignedIn() {
    return session === null;
  }

  function signout() {
    setSession(null);
  }

  return (
    <SessionContext.Provider value={{ isSignedIn, signout }}>
      {children}
    </SessionContext.Provider>
  );
}
