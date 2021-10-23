import React, { useRef } from "react";
import { toast } from "react-toastify";
import { ModalProps } from "../../../../../components/Modal";
import { useAPIService } from "../../../../../contexts/APIServiceContext";
import { useLanguage } from "../../../../../contexts/LanguageContext";
import showToast from "../../../../../utils/showToast";
import AuthModalLayout from "../Layout";

type SignUpProps = ModalProps & {
  openAlternativeModal: () => void;
};

export default function SignUp({
  shown,
  closeModal,
  openAlternativeModal,
}: SignUpProps): React.ReactElement {
  const { registerService } = useAPIService();
  const { language } = useLanguage();

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const passwordConfirmationInputRef = useRef<HTMLInputElement>(null);

  async function handleButtonClick() {
    const name = nameInputRef.current?.value;
    const email = emailInputRef.current?.value;
    const password = passwordInputRef.current?.value;
    const passwordConfirmation = passwordConfirmationInputRef.current?.value;

    if (!name || !email || !password || !passwordConfirmation) {
      toast.error("Preencha todos os campos");
      return;
    }

    if (password !== passwordConfirmation) {
      toast.error("Senhas não condizem");
    }

    const response = await registerService.register({
      name,
      email,
      password,
    });

    if (!response.error) showToast("Conta criada com sucesso");

    const toastMsg = response.userFriendlyMessage;
    if (toastMsg) showToast(toastMsg, response.error);
  }

  return (
    <AuthModalLayout
      title={language.home.signUpModal.title}
      buttonTitle={language.home.signUpModal.buttonTitle}
      alternativeTitle={language.home.signUpModal.alternativeTitle}
      onButtonClick={handleButtonClick}
      onGoogleButtonClick={() => {}}
      onAlternativeClick={openAlternativeModal}
      shown={shown}
      closeModal={closeModal}
      formComponent={() => (
        <>
          <input
            ref={nameInputRef}
            type="text"
            placeholder={language.home.signUpModal.nameInputPlaceholder}
            name="name"
          />
          <input
            ref={emailInputRef}
            type="text"
            placeholder={language.home.signUpModal.emailInputPlaceholder}
            name="email"
          />
          <input
            ref={passwordInputRef}
            type="password"
            placeholder={language.home.signUpModal.passwordInputPlaceholder}
            name="password"
          />
          <input
            ref={passwordConfirmationInputRef}
            type="password"
            placeholder={
              language.home.signUpModal.passwordConfirmationInputPlaceholder
            }
            name="password-confirmation"
          />
        </>
      )}
    />
  );
}
