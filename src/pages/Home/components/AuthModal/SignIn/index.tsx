import React, { useRef } from "react";
import { toast } from "react-toastify";
import { ModalProps } from "../../../../../components/Modal";
import { useAPIService } from "../../../../../contexts/APIServiceContext";
import { useLanguage } from "../../../../../contexts/LanguageContext";
import { useSession } from "../../../../../contexts/SessionContext";
import showToast from "../../../../../utils/showToast";
import AuthModalLayout from "../Layout";

type SignInProps = ModalProps & {
  openAlternativeModal: () => void;
};

export default function SignIn({
  shown,
  closeModal,
  openAlternativeModal,
}: SignInProps): React.ReactElement {
  const { loginService } = useAPIService();
  const { language } = useLanguage();
  const session = useSession();

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  async function handleButtonClick() {
    const email = emailInputRef.current?.value;
    const password = passwordInputRef.current?.value;

    if (!email || !password) {
      toast.error("Preencha todos os campos");
      return;
    }

    const response = await loginService.login({ email, password });

    const toastMsg = response.userFriendlyMessage;
    if (toastMsg) showToast(toastMsg, response.error);
    if (response.data) session.storeSession(response.data.token);
  }

  return (
    <AuthModalLayout
      title={language.home.signInModal.title}
      buttonTitle={language.home.signInModal.buttonTitle}
      alternativeTitle={language.home.signInModal.alternativeTitle}
      onButtonClick={handleButtonClick}
      onGoogleButtonClick={() => {}}
      onAlternativeClick={openAlternativeModal}
      shown={shown}
      closeModal={closeModal}
      formComponent={() => (
        <>
          <input
            ref={emailInputRef}
            type="text"
            placeholder={language.home.signInModal.emailInputPlaceholder}
            name="email"
          />
          <input
            ref={passwordInputRef}
            type="password"
            placeholder={language.home.signInModal.passwordInputPlaceholder}
            name="password"
          />
        </>
      )}
    />
  );
}
