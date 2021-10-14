import React, { useRef } from "react";
import { toast } from "react-toastify";
import { ModalProps } from "../../../../../components/Modal";
import { useAPIService } from "../../../../../contexts/APIServiceContext";
import AuthModalLayout from "../Layout";

type SignUpProps = ModalProps;

export default function SignUp({
  shown,
  closeModal,
}: SignUpProps): React.ReactElement {
  const apiService = useAPIService();

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
      return;
    }

    apiService.registerAccount({ name, email, password });
  }

  return (
    <AuthModalLayout
      title="Crie sua conta"
      buttonTitle="Cadastre-se"
      alternativeTitle={["Já tem uma conta?", "Faça login"]}
      onButtonClick={handleButtonClick}
      onGoogleButtonClick={() => {}}
      onAlternativeClick={() => {}}
      shown={shown}
      closeModal={closeModal}
      formComponent={() => (
        <>
          <input
            ref={nameInputRef}
            type="text"
            placeholder="Nome"
            name="name"
          />
          <input
            ref={emailInputRef}
            type="text"
            placeholder="Email"
            name="email_usuario"
          />
          <input
            ref={passwordInputRef}
            type="password"
            placeholder="Password"
            name="email_usuario"
          />
          <input
            ref={passwordConfirmationInputRef}
            type="password"
            placeholder="Confirmação de senha"
            name="password-confirmation"
          />
        </>
      )}
    />
  );
}
