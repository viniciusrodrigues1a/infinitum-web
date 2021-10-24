import React, { useRef } from "react";
import { toast } from "react-toastify";
import { ModalProps } from "../../../../../components/Modal";
import { useAPIService } from "../../../../../contexts/APIServiceContext";
import { useLanguage } from "../../../../../contexts/LanguageContext";
import showToast from "../../../../../utils/showToast";
import registerValidation from "../../../../../validation/registerValidation";
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
  const {
    language: {
      pages: { home: homeLanguage },
      validation: validationLanguage,
    },
  } = useLanguage();

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const passwordConfirmationInputRef = useRef<HTMLInputElement>(null);

  async function handleButtonClick() {
    const name = nameInputRef.current?.value;
    const email = emailInputRef.current?.value;
    const password = passwordInputRef.current?.value;
    const passwordConfirmation = passwordConfirmationInputRef.current?.value;
    const body = { name, email, password, passwordConfirmation };

    if (!registerValidation.validateFields(body)) {
      toast.error(validationLanguage.emptyFields);
      return;
    }

    if (!registerValidation.validatePasswordConfirmationField(body)) {
      toast.error(validationLanguage.passwordDoesntMatchConfirmation);
      return;
    }

    const response = await registerService.register(body);

    if (!response.error) showToast(homeLanguage.accountCreatedSuccessfully);

    const toastMsg = response.userFriendlyMessage;
    if (toastMsg) showToast(toastMsg, response.error);
  }

  return (
    <AuthModalLayout
      title={homeLanguage.signUpModal.title}
      buttonTitle={homeLanguage.signUpModal.buttonTitle}
      alternativeTitle={homeLanguage.signUpModal.alternativeTitle}
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
            placeholder={homeLanguage.signUpModal.nameInputPlaceholder}
            name="name"
          />
          <input
            ref={emailInputRef}
            type="text"
            placeholder={homeLanguage.signUpModal.emailInputPlaceholder}
            name="email"
          />
          <input
            ref={passwordInputRef}
            type="password"
            placeholder={homeLanguage.signUpModal.passwordInputPlaceholder}
            name="password"
          />
          <input
            ref={passwordConfirmationInputRef}
            type="password"
            placeholder={
              homeLanguage.signUpModal.passwordConfirmationInputPlaceholder
            }
            name="password-confirmation"
          />
        </>
      )}
    />
  );
}
