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
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (socketRef.current) return;

    if (isSignedIn()) {
      socketRef.current = io("http://localhost:3333", {
        extraHeaders: { email: session!.email },
      });
      setIsReady(true);
    }
  }, [session, isSignedIn]);

  return (
    <SocketContext.Provider
      value={{ socket: socketRef.current as Socket, isSocketReady: isReady }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket(): SocketContextData {
  return useContext(SocketContext);
}
