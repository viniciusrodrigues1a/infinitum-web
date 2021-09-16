import React from "react";
import { ModalProps } from "../../../../../components/Modal";
import AuthModalLayout from "../Layout";

type SignInProps = ModalProps;

export default function SignIn({
  shown,
  closeModal,
}: SignInProps): React.ReactElement {
  return (
    <AuthModalLayout
      title="Entre com sua conta"
      buttonTitle="Entrar"
      alternativeTitle={["Não possui uma conta?", "Faça seu cadastro"]}
      onButtonClick={() => {}}
      onGoogleButtonClick={() => {}}
      onAlternativeClick={() => {}}
      shown={shown}
      closeModal={closeModal}
      formComponent={() => (
        <>
          <input type="text" placeholder="Email" name="email_usuario" />
          <input type="text" placeholder="Password" name="email_usuario" />
        </>
      )}
    />
  );
}
