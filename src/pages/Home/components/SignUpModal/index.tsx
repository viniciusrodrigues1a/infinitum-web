import React from "react";

import styles from "./signUpModal.module.css";

import asideImage from "../../../../assets/signup-modal.png";

type SignUpModalProps = {
  shown: boolean;
};

export default function SignUpModal({
  shown,
}: SignUpModalProps): React.ReactElement {
  if (!shown) {
    return <></>;
  }

  return (
    <div id={styles.container}>
      <div id={styles.wrapper}>
        <div id={styles.content}>
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
    </div>
  );
}
