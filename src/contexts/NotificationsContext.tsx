import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useEffectOnce } from "../hooks";

import { useSession } from "./SessionContext";
import { useSocket } from "./SocketContext";

export type NotificationType = {
  _id: string;
  type: string;
  read: boolean;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
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
  const { session } = useSession();
  const { socket, isSocketReady } = useSocket();
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

  useEffectOnce(() => {
    socket.on("loadNotifications", (notifications) => {
      setNotifications(notifications);
    });

    socket.on("newNotification", (msg) => {
      setNotifications((prev) => [msg, ...prev]);
    });
  }, isSocketReady);

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
