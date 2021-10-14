import React from "react";
import { ModalProps } from "../../../../../components/Modal";
import { useLanguage } from "../../../../../contexts/LanguageContext";
import AuthModalLayout from "../Layout";

type SignInProps = ModalProps;

export default function SignIn({
  shown,
  closeModal,
}: SignInProps): React.ReactElement {
  const language = useLanguage();

  return (
    <AuthModalLayout
      title={language.home.signInModal.title}
      buttonTitle={language.home.signInModal.buttonTitle}
      alternativeTitle={language.home.signInModal.alternativeTitle}
      onButtonClick={() => {}}
      onGoogleButtonClick={() => {}}
      onAlternativeClick={() => {}}
      shown={shown}
      closeModal={closeModal}
      formComponent={() => (
        <>
          <input
            type="text"
            placeholder={language.home.signInModal.emailInputPlaceholder}
            name="email_usuario"
          />
          <input
            type="text"
            placeholder={language.home.signInModal.passwordInputPlaceholder}
            name="email_usuario"
          />
        </>
      )}
    />
  );
}
