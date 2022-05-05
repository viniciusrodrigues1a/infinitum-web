import React, { useEffect, useMemo } from "react";

import styles from "./languageModal.module.css";
import "./languageModal.css";

import { languages, SupportedLanguages } from "../../../../languages";

import { ReactComponent as LanguageModalSvg } from "../../../../assets/language-modal.svg";
import { useLanguage } from "../../../../contexts/LanguageContext";
import Modal, { ModalProps } from "../../../../components/Modal";

type LanguageModalProps = ModalProps;

type SVGLanguage = {
  text1: string;
  text2: string;
};

type LanguageRoulette = {
  currentIndex: number;
  nextIndex: () => void;
  languages: SVGLanguage[];
  currentLanguage: SVGLanguage;
};

let svgInterval: any = null;

export default function LanguageModal({
  shown,
  closeModal,
}: LanguageModalProps): React.ReactElement {
  const {
    changeLanguageTo,
    language: {
      pages: { home: homeLanguage },
    },
  } = useLanguage();

  const languageRoulette: LanguageRoulette = useMemo(
    () => ({
      currentIndex: 0,
      nextIndex() {
        this.currentIndex += 1;
        if (this.currentIndex > this.languages.length - 1) {
          this.currentIndex = 0;
        }
      },
      get currentLanguage() {
        return this.languages[this.currentIndex];
      },
      languages: [
        {
          text1: "Bem vindo",
          text2: "Use o Infinitum onde estiver!",
        },
        {
          text1: "Welcome",
          text2: "Use Infinitum wherever you are!",
        },
        {
          text1: "Bienvenido",
          text2: "¡Usa Infinitum dondequiera que estés! ",
        },
      ],
    }),
    []
  );

  useEffect(() => {
    if (!shown) {
      return;
    }

    if (svgInterval) {
      clearInterval(svgInterval);
      svgInterval = null;
    }

    const svgTspan1 = document.querySelector("#textCloud1 tspan");
    const svgTspan2 = document.querySelector("#textCloud2 tspan");

    animate(); // começa a animação uma vez antes do interval chamar o callback pra não ficar sem texto no balão
    svgInterval = setInterval(async () => {
      await animate();
    }, 3600);

    async function animate() {
      if (!svgTspan1 || !svgTspan2) {
        return;
      }

      languageRoulette.nextIndex();

      svgTspan1.innerHTML = languageRoulette.currentLanguage.text1;
      svgTspan2.innerHTML = languageRoulette.currentLanguage.text2;

      await Promise.all([
        runAnimationOnElement(svgTspan1.parentElement! as HTMLElement),
        runAnimationOnElement(svgTspan2.parentElement! as HTMLElement),
      ]);
    }

    async function runAnimationOnElement(element: HTMLElement) {
      element.classList.remove("svgEnteringAnimation");
      element.classList.remove("svgLeavingAnimation");
      element.classList.add("svgEnteringAnimation");
      await new Promise((resolve) => setTimeout(resolve, 3000));
      element.classList.remove("svgEnteringAnimation");
      element.classList.add("svgLeavingAnimation");
      await new Promise((resolve) => setTimeout(resolve, 600));
    }
  }, [shown, languageRoulette]);

  return (
    <Modal.Container shown={shown} closeModal={closeModal}>
      <div id={styles.content}>
        <div id={styles.closeButtonWrapper}>
          <Modal.CloseButton closeModal={closeModal} />
        </div>

        <div id={styles.heroSvgContainer}>
          <LanguageModalSvg width="24rem" height="20rem" />
        </div>

        <h1 id={styles.titleHeading}>{homeLanguage.footer.modal.title}</h1>

        <div id={styles.languagesWrapper}>
          <div id={styles.languagesContainer}>
            {Object.keys(languages).map((langKey) => {
              const langIsoCode = langKey as SupportedLanguages;
              const lang = languages[langIsoCode];

              return (
                <div className={styles.languageContainer} key={langKey}>
                  <img
                    className={styles.languageImg}
                    src={lang.flagSvg}
                    alt={lang.flagAlt}
                  />
                  <div className={styles.languageButtonContainer}>
                    <button
                      type="button"
                      onClick={() => {
                        changeLanguageTo(langIsoCode);
                        closeModal();
                      }}
                      className={styles.languageButton}
                    >
                      {lang.name}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Modal.Container>
  );
}
