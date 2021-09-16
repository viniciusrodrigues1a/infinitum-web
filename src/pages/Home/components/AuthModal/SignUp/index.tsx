import React from "react";
import { Modal } from "../../../../../components/Modal";
import AuthModalLayout from "../Layout";

type SignUpProps = {
  shown: boolean;
  closeModal: () => void;
};

export default function SignUp({
  shown,
  closeModal,
}: SignUpProps): React.ReactElement {
  return (
    <Modal.Container shown={shown} closeModal={closeModal}>
      <AuthModalLayout
        title="Crie sua conta"
        buttonTitle="Cadatre-se"
        alternativeTitle={["Já tem uma conta?", "Faça login"]}
        onButtonClick={() => {}}
        onGoogleButtonClick={() => {}}
        onAlternativeClick={() => {}}
        shown={shown}
        closeModal={closeModal}
        formComponent={() => (
          <>
            <input type="text" placeholder="Nome" name="name" />
            <input type="text" placeholder="Email" name="email_usuario" />
            <input type="text" placeholder="Password" name="email_usuario" />
            <input
              type="password"
              placeholder="Confirmação de senha"
              name="password-confirmation"
            />
          </>
        )}
      />
    </Modal.Container>
  );
}
