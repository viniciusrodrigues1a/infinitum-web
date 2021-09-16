import React from "react";
import Modal from "../../../../../components/Modal";

import styles from "./AuthModalLayout.module.css";

import asideImage from "../../../../../assets/signup-modal.png";

type AuthModalLayoutProps = {
  shown: boolean;
  closeModal: () => void;
  title: string;
  buttonTitle: string;
  onButtonClick: () => void;
  onGoogleButtonClick: () => void;
  alternativeTitle: string[] | string;
  onAlternativeClick: () => void;
  formComponent: () => React.ReactElement;
};

type AlternativeAuthSpanProps = {
  title: string[] | string;
  onClick: () => void;
};

function AlternativeAuthSpan({ title, onClick }: AlternativeAuthSpanProps) {
  if (typeof title === "string") {
    return (
      <button type="button" onClick={onClick}>
        <strong>{title}</strong>
      </button>
    );
  }

  return (
    <span>
      {title[0]}{" "}
      <button type="button">
        <strong>{title[1]}</strong>
      </button>
    </span>
  );
}

export default function AuthModalLayout({
  shown,
  closeModal,
  title,
  buttonTitle,
  onButtonClick,
  onGoogleButtonClick,
  alternativeTitle,
  onAlternativeClick,
  formComponent: FormComponent,
}: AuthModalLayoutProps): React.ReactElement {
  return (
    <Modal.Container shown={shown} closeModal={closeModal}>
      <div id={styles.wrapper}>
        <div id={styles.content}>
          <div id={styles.closeButtonWrapper}>
            <Modal.CloseButton closeModal={closeModal} size={40} />
          </div>

          <h1 id={styles.title}>{title}</h1>

          <div id={styles.formAndButtonsWrapper}>
            <form id={styles.form}>
              <FormComponent />
            </form>

            <div id={styles.buttonContainer}>
              <button
                type="button"
                id={styles.signInWithGoogleButton}
                className={styles.button}
                onClick={onGoogleButtonClick}
              >
                Google
              </button>
              <button
                type="button"
                id={styles.signUpButton}
                className={styles.button}
                onClick={onButtonClick}
              >
                {buttonTitle}
              </button>
            </div>
          </div>

          <div id={styles.hasAnAccount}>
            <AlternativeAuthSpan
              title={alternativeTitle}
              onClick={onAlternativeClick}
            />
          </div>
        </div>
        <img id={styles.signUpImg} src={asideImage} alt="Foguete no espaço" />
      </div>
    </Modal.Container>
  );
}
