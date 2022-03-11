import React, { useEffect, useState } from "react";

import styles from "./NotificationSettings.module.scss";

import Title from "../../components/Title";
import Subtitle from "../../components/Subtitle";
import CreateButton from "../../components/CreateButton";
import NotificationPreference from "./components/NotificationPreference";

type SettingsMethods = {
  push: boolean;
  email: boolean;
};

type Settings = {
  invitation: SettingsMethods;
  kicked: SettingsMethods;
  roleUpdated: SettingsMethods;
};

export default function NotificationSettings(): React.ReactElement {
  const [settings, setSettings] = useState<Settings>({
    invitation: { email: false, push: false },
    kicked: { email: false, push: false },
    roleUpdated: { email: false, push: false },
  });

  /*
   * Example: setSettingsEntry("invitation.push")(true);
   * Keeps the settings state updating only the field invitation.push
   * */
  function setSettingsEntry(entry: string) {
    return (val: boolean) => {
      const [key, innerKey] = entry.split(".") as [
        keyof Settings,
        keyof SettingsMethods
      ];

      setSettings((s) => {
        const copy = { ...s };
        copy[key][innerKey] = val;

        return copy;
      });
    };
  }

  useEffect(() => console.log(settings), [settings]);

  return (
    <div id={styles.container}>
      <Title>Configuração de notificações</Title>
      <Subtitle>
        Configure suas configurações e a forma como prefere recebê-las
      </Subtitle>

      <div id={styles.preferences}>
        <NotificationPreference
          description="Sou convidado para um projeto"
          onPushOptionChange={setSettingsEntry("invitation.push")}
          onEmailOptionChange={setSettingsEntry("invitation.email")}
        />
        <NotificationPreference
          description="Sou removido de um projeto"
          onPushOptionChange={setSettingsEntry("kicked.push")}
          onEmailOptionChange={setSettingsEntry("kicked.email")}
        />
        <NotificationPreference
          description="Minha função em um projeto é atualizada"
          onPushOptionChange={setSettingsEntry("roleUpdated.push")}
          onEmailOptionChange={setSettingsEntry("roleUpdated.email")}
        />
      </div>

      <CreateButton
        title="Atualizar preferências"
        id={styles.submitButton}
        icon={() => <></>}
      />
    </div>
  );
}
