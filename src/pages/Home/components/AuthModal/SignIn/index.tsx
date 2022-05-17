import React, { useRef } from "react";
import { toast } from "react-toastify";
import { ModalProps } from "../../../../../components/Modal";
import { useAPIService } from "../../../../../contexts/APIServiceContext";
import { useLanguage } from "../../../../../contexts/LanguageContext";
import { useSession } from "../../../../../contexts/SessionContext";
import showToast from "../../../../../utils/showToast";
import loginValidation from "../../../../../validation/loginValidation";
import AuthModalLayout from "../Layout";

import asideImage from "../../../../../assets/signin-modal.png";

type SignInProps = Pick<ModalProps, "closeModal"> & {
  openAlternativeModal: () => void;
};

export default function SignIn({
  closeModal,
  openAlternativeModal,
}: SignInProps): React.ReactElement {
  const { loginService } = useAPIService();
  const {
    language: {
      pages: { home: homeLanguage },
      validation: validationLanguage,
    },
  } = useLanguage();
  const session = useSession();

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  async function handleButtonClick() {
    const email = emailInputRef.current?.value;
    const password = passwordInputRef.current?.value;
    const body = { email, password };

    if (!loginValidation.validateFields(body)) {
      toast.error(validationLanguage.emptyFields);
      return;
    }

    const response = await loginService.login(body);

    const toastMsg = response.userFriendlyMessage;
    if (toastMsg) showToast(toastMsg, response.error);
    if (response.data) session.storeSession(email!, response.data.token);
  }

  return (
    <AuthModalLayout
      title={homeLanguage.signInModal.title}
      buttonTitle={homeLanguage.signInModal.buttonTitle}
      alternativeTitle={homeLanguage.signInModal.alternativeTitle}
      onButtonClick={handleButtonClick}
      onAlternativeClick={openAlternativeModal}
      closeModal={closeModal}
      asideImageSrc={asideImage}
      formComponent={() => (
        <>
          <input
            ref={emailInputRef}
            type="text"
            placeholder={homeLanguage.signInModal.emailInputPlaceholder}
            name="email"
          />
          <input
            ref={passwordInputRef}
            type="password"
            placeholder={homeLanguage.signInModal.passwordInputPlaceholder}
            name="password"
          />
        </>
      )}
    />
  );
}
