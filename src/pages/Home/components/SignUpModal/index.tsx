import React from "react";

import styles from "./signUpModal.module.css";

import asideImage from "../../../../assets/signup-modal.png";
import { Modal } from "../../../../components/Modal";

type SignUpModalProps = {
  shown: boolean;
  closeModal: () => void;
};

export default function SignUpModal({
  shown,
  closeModal,
}: SignUpModalProps): React.ReactElement {
  return (
    <Modal.Container shown={shown} closeModal={closeModal}>
      <div id={styles.wrapper}>
        <div id={styles.content}>
          <div id={styles.closeButtonWrapper}>
            <Modal.CloseButton closeModal={closeModal} size={40} />
          </div>

          <h1 id={styles.title}>Crie sua conta</h1>

          <div id={styles.formAndButtonsWrapper}>
            <form id={styles.form}>
              <input
                type="text"
                placeholder="Nome"
                id={styles.nome}
                name="name"
                className={styles.input}
              />

              <input
                type="text"
                placeholder="Email"
                id={styles.email}
                name="email_usuario"
                className={styles.input}
              />

              <input
                type="text"
                placeholder="Password"
                id={styles.password}
                name="email_usuario"
                className={styles.input}
              />

              <input
                type="password"
                placeholder="Confirmação de senha"
                id={styles.confirmPassword}
                name="password-confirmation"
                className={styles.input}
              />
            </form>

            <div id={styles.buttonContainer}>
              <button type="button" id={styles.signInWithGoogleButton}>
                Google
              </button>
              <button type="button" id={styles.signUpButton}>
                Cadastrar-se
              </button>
            </div>
          </div>

          <div id={styles.hasAnAccount}>
            <span>
              Já tem uma conta? <strong>Faça login</strong>
            </span>
          </div>
        </div>
        <img id={styles.signUpImg} src={asideImage} alt="Foguete no espaço" />
      </div>
    </Modal.Container>
  );
}
