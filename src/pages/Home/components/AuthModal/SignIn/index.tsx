import React from "react";
import { Modal } from "../../../../../components/Modal";
import AuthModalLayout from "../Layout";

type SignInProps = {
  shown: boolean;
  closeModal: () => void;
};

export default function SignIn({
  shown,
  closeModal,
}: SignInProps): React.ReactElement {
  return (
    <Modal.Container shown={shown} closeModal={closeModal}>
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
    </Modal.Container>
  );
}
