import React, { useEffect, useState } from "react";

import styles from "./Profile.module.scss";

import Form from "../../components/Form";
import AccountAvatar from "../../components/AccountAvatar";
import CreateButton from "../../components/CreateButton";
import ExpandableHamburger from "../../components/ExpandableHamburger";

import flagBR from "../../assets/flag-br.svg";
import flagUS from "../../assets/flag-us.svg";
import flagES from "../../assets/flag-es.svg";
import globeSvg from "../../assets/globe.svg";

import { useSidebar } from "../../contexts/SidebarContext";
import { useAPIService } from "../../contexts/APIServiceContext";
import { useSession } from "../../contexts/SessionContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { useAccount } from "../../contexts/AccountContext";

import showToast from "../../utils/showToast";
import { ListLanguagesServiceResponse } from "../../services/interfaces";

export default function Profile(): React.ReactElement {
  const { session, clearSession } = useSession();
  const { listLanguagesService, loginService } = useAPIService();
  const { account, updateAccount } = useAccount();
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  const {
    isoCode,
    language: {
      pages: { profile: profileLanguage },
      validation: validationLanguage,
    },
  } = useLanguage();

  const [languages, setLanguages] = useState<ListLanguagesServiceResponse>([]);
  const [name, setName] = useState(account.name);
  const [languageId, setLanguageId] = useState<string | null>(
    account.languageId || null
  );
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [imagePreview, setImagePreview] = useState(account.image || "");
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => setImagePreview(account.image || ""), [account]);

  function resolveLanguage() {
    if (languageId) return languages.find((l) => l.id === languageId);

    return languages.find((l) => l.isoCode === isoCode);
  }

  useEffect(() => {
    (async () => {
      const response = await listLanguagesService.listLanguages();

      if (response.data) {
        setLanguages(response.data);
      }
    })();
  }, [listLanguagesService]);

  function getSVGOfLanguage(isoCode: string) {
    switch (isoCode.toLowerCase()) {
      case "pt-br":
        return flagBR;
      case "en-us":
        return flagUS;
      case "es-es":
        return flagES;
      default:
        return globeSvg;
    }
  }

  function handleOnImageInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    const file = e.target.files[0];

    setNewImageFile(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setImagePreview(reader.result as string);
  }

  async function handleSubmit() {
    setLoading(true);

    let isPasswordConfirmed = newPassword !== confirmNewPassword;

    if (oldPassword) {
      const loginResponse = await loginService.login({
        email: session!.email,
        password: oldPassword,
      });

      if (loginResponse.userFriendlyMessage) {
        showToast(loginResponse.userFriendlyMessage, loginResponse.error);
        setLoading(false);
        return;
      }

      isPasswordConfirmed =
        isPasswordConfirmed || !newPassword || !confirmNewPassword;
    }

    if (isPasswordConfirmed) {
      showToast(validationLanguage.passwordDoesntMatchConfirmation, true);
      setLoading(false);
      return;
    }

    const response = await updateAccount({
      name,
      languageId: languageId || undefined,
      password: newPassword,
      file: newImageFile,
    });

    if (response.error) {
      showToast(profileLanguage.failureMessage, response.error);
    } else {
      showToast(profileLanguage.successMessage);
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

      <div id={styles.formWrapper}>
        <Form.Container>
          <div id={styles.imageInputWrapper}>
            <Form.ImageInput
              id="account-image"
              onChange={handleOnImageInputChange}
              width="8rem"
              height="8rem"
              component={() => (
                <AccountAvatar
                  size="8rem"
                  fontSize="2.5rem"
                  name={account.name}
                  image={imagePreview}
                  borderStyle="dotted"
                />
              )}
            />
          </div>

          <div className={styles.inputGroup}>
            <Form.Input
              id="name"
              placeholder={profileLanguage.nameInputPlaceholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Form.CustomSelect
              items={languages}
              defaultValue={resolveLanguage()}
              onSelectChange={(i) => setLanguageId(i.id)}
              keyExtractor={(i) => i.isoCode}
              renderItem={(i) => (
                <div className={styles.selectItem}>
                  <img src={getSVGOfLanguage(i.isoCode)} alt="" />
                  <span>{i.displayName}</span>
                </div>
              )}
              separator={() => (
                <div
                  style={{
                    width: "100%",
                    height: 12,
                    backgroundColor: "transparent",
                  }}
                />
              )}
            />
          </div>

          <div className={styles.separator} />

          <div className={styles.inputGroup}>
            <Form.Input
              id={styles.oldPassword}
              placeholder={profileLanguage.oldPasswordPlaceholder}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              type="password"
            />

            <Form.Input
              id="new-password"
              placeholder={profileLanguage.newPasswordPlaceholder}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
            />

            <Form.Input
              id="confirm-new-password"
              placeholder={profileLanguage.confirmNewPasswordPlaceholder}
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              type="password"
            />
          </div>
        </Form.Container>
      </div>

      <div id={styles.buttonsContainer}>
        <div style={{ opacity: loading ? 0.7 : 1 }}>
          <CreateButton
            title={profileLanguage.updateButtonText}
            disabled={loading}
            id={styles.submitButton}
            icon={() => <></>}
            onClick={handleSubmit}
          />
        </div>
        <CreateButton
          title={profileLanguage.logoutButtonText}
          id={styles.logoutButton}
          icon={() => <></>}
          onClick={clearSession}
        />
      </div>
    </div>
  );
}
