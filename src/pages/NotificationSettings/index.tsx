import React, { useEffect, useState } from "react";

import styles from "./NotificationSettings.module.scss";

import Title from "../../components/Title";
import Subtitle from "../../components/Subtitle";
import CreateButton from "../../components/CreateButton";
import NotificationPreference from "./components/NotificationPreference";
import ExpandableHamburger from "../../components/ExpandableHamburger";

import { useAPIService } from "../../contexts/APIServiceContext";
import { useSession } from "../../contexts/SessionContext";
import showToast from "../../utils/showToast";
import { UpdateNotificationSettingsServiceRequest } from "../../services/interfaces";
import { useSidebar } from "../../contexts/SidebarContext";
import { useLanguage } from "../../contexts/LanguageContext";

type Settings = UpdateNotificationSettingsServiceRequest["settings"];

export default function NotificationSettings(): React.ReactElement {
  const { isReady } = useSession();
  const {
    updateNotificationSettingsService,
    findOneNotificationSettingsService,
  } = useAPIService();
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  const {
    language: {
      pages: { notificationSettings: notificationSettingsLanguage },
    },
  } = useLanguage();

  const [settings, setSettings] = useState<Settings>({
    invitation: { email: false, push: false },
    kicked: { email: false, push: false },
    roleUpdated: { email: false, push: false },
    issueAssigned: { email: false, push: false },
    projectDeleted: { email: false, push: false },
    kickedAdmin: { email: false, push: false },
    roleUpdatedAdmin: { email: false, push: false },
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isReady) return;

    (async () => {
      const response =
        await findOneNotificationSettingsService.findOneNotificationSettings();

      if (!response.error && response.data) setSettings(response.data);
    })();
  }, [isReady, findOneNotificationSettingsService]);

  /*
   * Example: setSettingsEntry("invitation.push")(true);
   * Keeps the settings state updating only the field invitation.push
   * */
  function setSettingsEntry(entry: string) {
    return (val: boolean) => {
      const [key, innerKey] = entry.split(".") as [
        keyof Settings,
        "email" | "push"
      ];

      setSettings((s) => {
        const copy = { ...s };
        copy[key][innerKey] = val;

        return copy;
      });
    };
  }

  async function handleSubmit() {
    setLoading(true);

    const response =
      await updateNotificationSettingsService.updateNotificationSettings({
        settings,
      });

    if (response.error) {
      showToast(notificationSettingsLanguage.failureMessage, response.error);
    } else {
      showToast(notificationSettingsLanguage.successMessage);
    }

    setLoading(false);
  }

  return (
    <div id={styles.container}>
      <div id={styles.hamburgerWrapper}>
        <div
          className={
            isSidebarOpen ? styles.animatedHamburger : styles.hamburger
          }
        >
          <ExpandableHamburger
            isCollapsed={!isSidebarOpen}
            onExpand={() => setIsSidebarOpen(true)}
            onCollapse={() => setIsSidebarOpen(false)}
            theme={isSidebarOpen ? "light" : "dark"}
          />
        </div>
      </div>

      <Title>{notificationSettingsLanguage.title}</Title>
      <Subtitle>{notificationSettingsLanguage.title}</Subtitle>

      <div id={styles.preferences}>
        <NotificationPreference
          initialState={settings.invitation}
          description={notificationSettingsLanguage.preferences.invitation}
          onPushOptionChange={setSettingsEntry("invitation.push")}
          onEmailOptionChange={setSettingsEntry("invitation.email")}
        />
        <NotificationPreference
          initialState={settings.kicked}
          description={notificationSettingsLanguage.preferences.kicked}
          onPushOptionChange={setSettingsEntry("kicked.push")}
          onEmailOptionChange={setSettingsEntry("kicked.email")}
        />
        <NotificationPreference
          initialState={settings.roleUpdated}
          description={notificationSettingsLanguage.preferences.roleUpdated}
          onPushOptionChange={setSettingsEntry("roleUpdated.push")}
          onEmailOptionChange={setSettingsEntry("roleUpdated.email")}
        />
        <NotificationPreference
          initialState={settings.issueAssigned}
          description={notificationSettingsLanguage.preferences.issueAssigned}
          onPushOptionChange={setSettingsEntry("issueAssigned.push")}
          onEmailOptionChange={setSettingsEntry("issueAssigned.email")}
        />
        <NotificationPreference
          initialState={settings.projectDeleted}
          description={notificationSettingsLanguage.preferences.projectDeleted}
          onPushOptionChange={setSettingsEntry("projectDeleted.push")}
          onEmailOptionChange={setSettingsEntry("projectDeleted.email")}
        />
        <NotificationPreference
          initialState={settings.kickedAdmin}
          description={notificationSettingsLanguage.preferences.kickedAdmin}
          onPushOptionChange={setSettingsEntry("kickedAdmin.push")}
          onEmailOptionChange={setSettingsEntry("kickedAdmin.email")}
        />
        <NotificationPreference
          initialState={settings.roleUpdatedAdmin}
          description={
            notificationSettingsLanguage.preferences.roleUpdatedAdmin
          }
          onPushOptionChange={setSettingsEntry("roleUpdatedAdmin.push")}
          onEmailOptionChange={setSettingsEntry("roleUpdatedAdmin.email")}
        />
      </div>

      <div style={{ opacity: loading ? 0.7 : 1 }}>
        <CreateButton
          title={notificationSettingsLanguage.updateButtonText}
          disabled={loading}
          id={styles.submitButton}
          icon={() => <></>}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}
