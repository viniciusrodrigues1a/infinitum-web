import React from "react";
import Modal, { ModalProps } from "../../../../../components/Modal";

import styles from "./AuthModalLayout.module.css";

type AuthModalLayoutProps = Pick<ModalProps, "closeModal"> & {
  title: string;
  buttonTitle: string;
  onButtonClick: () => void;
  onGoogleButtonClick: () => void;
  alternativeTitle: string[] | string;
  onAlternativeClick: () => void;
  formComponent: () => React.ReactElement;
  asideImageSrc: string;
};

type AlternativeAuthSpanProps = {
  title: string[] | string;
  onClick: () => void;
};

function AlternativeAuthSpan({ title, onClick }: AlternativeAuthSpanProps) {
  if (typeof title === "string") {
    return (
      <button
        className={styles.alternativeButton}
        type="button"
        onClick={onClick}
      >
        <strong>{title}</strong>
      </button>
    );
  }

  return (
    <span>
      {title[0]}{" "}
      <button
        className={styles.alternativeSpanButton}
        type="button"
        onClick={onClick}
      >
        <strong>{title[1]}</strong>
      </button>
    </span>
  );
}

export default function AuthModalLayout({
  closeModal,
  title,
  buttonTitle,
  onButtonClick,
  onGoogleButtonClick,
  alternativeTitle,
  onAlternativeClick,
  formComponent: FormComponent,
  asideImageSrc,
}: AuthModalLayoutProps): React.ReactElement {
  return (
    <div id={styles.wrapper}>
      <div id={styles.content}>
        <div id={styles.closeButtonWrapper}>
          <Modal.CloseButton closeModal={closeModal} size={40} />
        </div>

        <h1 id={styles.title}>{title}</h1>

        <div id={styles.formAndButtonsWrapper}>
          <form
            id={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              onButtonClick();
            }}
          >
            <FormComponent />

            <div id={styles.buttonContainer}>
              <button
                type="submit"
                id={styles.signUpButton}
                className={styles.button}
              >
                {buttonTitle}
              </button>
            </div>
          </form>
        </div>

        <div id={styles.hasAnAccount}>
          <AlternativeAuthSpan
            title={alternativeTitle}
            onClick={onAlternativeClick}
          />
        </div>
      </div>
      <img
        width="32.8125rem"
        id={styles.signUpImg}
        src={asideImageSrc}
        alt="Foguete no espaço"
      />
    </div>
  );
}
