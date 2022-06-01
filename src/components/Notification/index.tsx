import React, { useMemo, useState } from "react";

import { Redirect } from "react-router-dom";
import styles from "./Notification.module.scss";

import { NotificationType } from "../../contexts/NotificationsContext";
import { useAPIService } from "../../contexts/APIServiceContext";
import { useDateFormatter } from "../../contexts/DateFormatterContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { NotificationLanguage } from "../../languages/types/components/NotificationLanguage";

type NotificationProps = {
  notification: NotificationType;
  message?: string;
};

type BaseNotificationProps = NotificationProps & {
  component?: (props: NotificationProps) => React.ReactElement;
};

BaseNotification.defaultProps = {
  component: () => <></>,
  message: undefined,
};

function BaseNotification({
  notification,
  message,
  component: Component = () => <></>,
}: BaseNotificationProps): React.ReactElement {
  const {
    language: {
      components: { notification: i18n },
    },
  } = useLanguage();
  const { markNotificationAsReadService } = useAPIService();
  const { formatToFullDate } = useDateFormatter();

  const formattedMessage = useMemo(() => {
    if (message) return message;

    const {
      projectName,
      roleName,
      emailKicked,
      emailWhoseRoleHasBeenUpdated,
      issueTitle,
    } = notification.metadata;
    const messages = {
      KICKED: i18n.kicked.message(projectName),
      KICKED_ADMIN: i18n.kickedAdmin.message(projectName, emailKicked),
      PROJECT_DELETED: i18n.projectDeleted.message(projectName),
      ROLE_UPDATED: i18n.roleUpdated.message(projectName, roleName),
      ROLE_UPDATED_ADMIN: i18n.roleUpdatedAdmin.message(
        projectName,
        roleName,
        emailWhoseRoleHasBeenUpdated
      ),
      ISSUE_ASSIGNED: i18n.issueAssigned.message(issueTitle),
    };

    return messages[notification.type as keyof typeof messages];
  }, [message, i18n, notification]);

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
        <span>{formattedMessage}</span>
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
  const {
    language: {
      components: { notification: i18n },
    },
  } = useLanguage();
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
      message={i18n.invitation.message(notification.metadata.projectName)}
      component={() => (
        <div className={styles.buttonsWrapper}>
          <button
            type="button"
            className={styles.declineButton}
            onClick={handleOnClick(notification.metadata.declineInvitationLink)}
          >
            {i18n.invitation.denyText}
          </button>
          <button
            type="button"
            className={styles.acceptButton}
            onClick={handleOnClick(notification.metadata.acceptInvitationLink)}
          >
            {i18n.invitation.acceptText}
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
