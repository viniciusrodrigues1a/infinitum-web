import React, { useEffect, useState } from "react";

import { Redirect } from "react-router-dom";
import styles from "./Notification.module.scss";

import { NotificationType } from "../../contexts/NotificationsContext";
import { useAPIService } from "../../contexts/APIServiceContext";
import { useDateFormatter } from "../../contexts/DateFormatterContext";

type NotificationProps = {
  notification: NotificationType;
};

type BaseNotificationProps = NotificationProps & {
  component?: (props: NotificationProps) => React.ReactElement;
};

BaseNotification.defaultProps = {
  component: () => <></>,
};

function BaseNotification({
  notification,
  component: Component = () => <></>,
}: BaseNotificationProps): React.ReactElement {
  const { markNotificationAsReadService } = useAPIService();
  const { formatToFullDate } = useDateFormatter();

  return (
    <div className={styles.container}>
      <button
        id="mark-as-read"
        type="button"
        className={styles.unreadIndicator}
        style={{ backgroundColor: notification.read ? "#dedede" : "#4376d8" }}
        aria-label="Mark as read"
        onClick={() =>
          markNotificationAsReadService.markNotificationAsRead(notification._id)
        }
      />

      <div className={styles.content}>
        <span>{notification.message}</span>
        <span className={styles.date}>
          {formatToFullDate(new Date(notification.createdAt))}
        </span>

        <Component notification={notification} />
      </div>
    </div>
  );
}

function InvitationNotification({
  notification,
}: NotificationProps): React.ReactElement {
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  const { markNotificationAsReadService } = useAPIService();

  function handleOnClick(url: string) {
    return async () => {
      await markNotificationAsReadService.markNotificationAsRead(
        notification._id
      );

      setRedirectTo(url);
    };
  }

  if (redirectTo) return <Redirect to={redirectTo} />;

  return (
    <BaseNotification
      notification={notification}
      component={() => (
        <div className={styles.buttonsWrapper}>
          <button
            type="button"
            className={styles.declineButton}
            onClick={handleOnClick(notification.metadata.declineInvitationLink)}
          >
            Recusar
          </button>
          <button
            type="button"
            className={styles.acceptButton}
            onClick={handleOnClick(notification.metadata.acceptInvitationLink)}
          >
            Aceitar
          </button>
        </div>
      )}
    />
  );
}

export default function Notification({
  notification,
}: NotificationProps): React.ReactElement {
  switch (notification.type.toLowerCase()) {
    case "invitation":
      return <InvitationNotification notification={notification} />;
    default:
      return <BaseNotification notification={notification} />;
  }
}
