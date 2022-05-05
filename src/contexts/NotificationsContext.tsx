import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { useEffectOnce } from "../hooks";

import { useSession } from "./SessionContext";

export type NotificationType = {
  _id: string;
  message: string;
  type: string;
  read: boolean;
  metadata: Record<any, any>;
  createdAt: number;
};

type NotificationsContextData = {
  notifications: NotificationType[];
  unreadNotificationsAmount: number;
};

const NotificationsContext = createContext({} as NotificationsContextData);

type NotificationsProviderProps = {
  children: React.ReactNode;
};

export function NotificationsProvider({
  children,
}: NotificationsProviderProps): React.ReactElement {
  const { isSignedIn, session } = useSession();

  const { current: socket } = useRef<Socket>(io("http://localhost:3333"));
  const [isReady, setIsReady] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const unreadNotificationsAmount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  useEffect(() => {
    if (session === null) {
      setNotifications([]);
    }
  }, [session]);

  useEffect(() => {
    if (isSignedIn()) {
      socket.emit("newUser", session!.email);
      setIsReady(true);
    }
  }, [session, isSignedIn, socket]);

  useEffectOnce(() => {
    socket.on("loadNotifications", (notifications) => {
      setNotifications(notifications);
    });

    socket.on("newNotification", (msg) => {
      setNotifications((prev) => [msg, ...prev]);
    });
  }, isReady);

  return (
    <NotificationsContext.Provider
      value={{ notifications, unreadNotificationsAmount }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications(): NotificationsContextData {
  return useContext(NotificationsContext);
}
