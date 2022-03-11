import React, { useEffect, useState } from "react";

import styles from "./NotificationSettings.module.scss";

import Title from "../../components/Title";
import Subtitle from "../../components/Subtitle";
import CreateButton from "../../components/CreateButton";
import NotificationPreference from "./components/NotificationPreference";
import { useAPIService } from "../../contexts/APIServiceContext";
import showToast from "../../utils/showToast";
import { UpdateNotificationSettingsServiceRequest } from "../../services/interfaces";
import { useEffectOnce } from "../../hooks";
import { useSession } from "../../contexts/SessionContext";

type Settings = UpdateNotificationSettingsServiceRequest["settings"];

export default function NotificationSettings(): React.ReactElement {
  const { isReady } = useSession();
  const {
    updateNotificationSettingsService,
    findOneNotificationSettingsService,
  } = useAPIService();

  const [settings, setSettings] = useState<Settings>({
    invitation: { email: false, push: false },
    kicked: { email: false, push: false },
    roleUpdated: { email: false, push: false },
  });
  const [loading, setLoading] = useState(false);

  useEffectOnce(() => {
    (async () => {
      const response =
        await findOneNotificationSettingsService.findOneNotificationSettings();

      if (!response.error && response.data) setSettings(response.data);
    })();
  }, isReady);

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
      showToast("Error", response.error);
    } else {
      showToast("Success");
    }

    setLoading(false);
  }

  return (
    <div id={styles.container}>
      <Title>Configuração de notificações</Title>
      <Subtitle>
        Configure suas configurações e a forma como prefere recebê-las
      </Subtitle>

      <div id={styles.preferences}>
        <NotificationPreference
          initialState={settings.invitation}
          description="Sou convidado para um projeto"
          onPushOptionChange={setSettingsEntry("invitation.push")}
          onEmailOptionChange={setSettingsEntry("invitation.email")}
        />
        <NotificationPreference
          initialState={settings.kicked}
          description="Sou removido de um projeto"
          onPushOptionChange={setSettingsEntry("kicked.push")}
          onEmailOptionChange={setSettingsEntry("kicked.email")}
        />
        <NotificationPreference
          initialState={settings.roleUpdated}
          description="Minha função em um projeto é atualizada"
          onPushOptionChange={setSettingsEntry("roleUpdated.push")}
          onEmailOptionChange={setSettingsEntry("roleUpdated.email")}
        />
      </div>

      <div style={{ opacity: loading ? 0.7 : 1 }}>
        <CreateButton
          title="Atualizar preferências"
          disabled={loading}
          id={styles.submitButton}
          icon={() => <></>}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}
