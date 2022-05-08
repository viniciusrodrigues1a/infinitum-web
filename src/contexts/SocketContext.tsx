import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";

import { useSession } from "./SessionContext";

type SocketContextData = {
  socket: Socket;
  isSocketReady: boolean;
};

const SocketContext = createContext({} as SocketContextData);

type SocketProviderProps = {
  children: React.ReactNode;
};

export default function SocketProvider({
  children,
}: SocketProviderProps): React.ReactElement {
  const { isSignedIn, session } = useSession();
  const [isReady, setIsReady] = useState<boolean>(false);
  const { current: socket } = useRef<Socket>(io("http://localhost:3333"));

  useEffect(() => {
    if (isSignedIn()) {
      socket.emit("newUser", session!.email);
      setIsReady(true);
    }
  }, [session, isSignedIn, socket]);

  return (
    <SocketContext.Provider value={{ socket, isSocketReady: isReady }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket(): SocketContextData {
  return useContext(SocketContext);
}
