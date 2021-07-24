import React, { useEffect, useMemo, useRef } from "react";
import { FiX } from "react-icons/fi";
import styles from "./languageModal.module.css";
import "./languageModal.css";

import flagBR from "../../../../assets/flag-br.svg";

import { ReactComponent as LanguageModalSvg } from "../../../../assets/language-modal.svg";

type LanguageModalProps = {
  shown: boolean;
  closeModal: () => void;
};

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
  const outsideModalContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const body = document.querySelector("body");
    if (!body) {
      return;
    }

    function onClick(event: MouseEvent) {
      if (shown && outsideModalContainerRef.current === event.target) {
        closeModal();
      }
    }

    function onKeyup(event: KeyboardEvent) {
      if (shown && event.key === "Escape") {
        closeModal();
      }
    }

    body.addEventListener("click", onClick);
    body.addEventListener("keyup", onKeyup);

    return () => {
      body.removeEventListener("click", onClick);
      body.removeEventListener("keyup", onKeyup);
    };
  }, [shown, closeModal]);

  useEffect(() => {
    const body = document.querySelector("body");
    if (!body) {
      return;
    }

    if (shown) {
      body.classList.add("noVerticalScroll");
    } else {
      body.classList.remove("noVerticalScroll");
    }
  }, [shown]);

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

  if (!shown) {
    return <></>;
  }

  return (
    <div id={styles.overlay} ref={outsideModalContainerRef}>
      <div id={styles.content}>
        <button id={styles.closeButton} type="button" onClick={closeModal}>
          <FiX color="#777777" size={48} />
        </button>

        <div id={styles.heroSvgContainer}>
          <LanguageModalSvg width="24rem" height="20rem" />
        </div>

        <h1 id={styles.titleHeading}>Escolha um idioma</h1>

        <div id={styles.languagesWrapper}>
          <div className={styles.languageContainer}>
            <img
              className={styles.languageImg}
              src={flagBR}
              alt="Bandeira do Brasil"
            />
            <div className={styles.languageAnchorContainer}>
              <a href="?lang=pt-BR" className={styles.languageAnchor}>
                Português (Brasil)
              </a>
            </div>
          </div>

          <div className={styles.languageContainer}>
            <img
              className={styles.languageImg}
              src={flagBR}
              alt="Bandeira do Brasil"
            />
            <div className={styles.languageAnchorContainer}>
              <a href="?lang=pt-BR" className={styles.languageAnchor}>
                Português (Brasil)
              </a>
            </div>
          </div>
          <div className={styles.languageContainer}>
            <img
              className={styles.languageImg}
              src={flagBR}
              alt="Bandeira do Brasil"
            />
            <div className={styles.languageAnchorContainer}>
              <a href="?lang=pt-BR" className={styles.languageAnchor}>
                Português (Brasil)
              </a>
            </div>
          </div>
          <div className={styles.languageContainer}>
            <img
              className={styles.languageImg}
              src={flagBR}
              alt="Bandeira do Brasil"
            />
            <div className={styles.languageAnchorContainer}>
              <a href="?lang=pt-BR" className={styles.languageAnchor}>
                Português (Brasil)
              </a>
            </div>
          </div>
          <div className={styles.languageContainer}>
            <img
              className={styles.languageImg}
              src={flagBR}
              alt="Bandeira do Brasil"
            />
            <div className={styles.languageAnchorContainer}>
              <a href="?lang=pt-BR" className={styles.languageAnchor}>
                Português (Brasil)
              </a>
            </div>
          </div>
          <div className={styles.languageContainer}>
            <img
              className={styles.languageImg}
              src={flagBR}
              alt="Bandeira do Brasil"
            />
            <div className={styles.languageAnchorContainer}>
              <a href="?lang=pt-BR" className={styles.languageAnchor}>
                Português (Brasil)
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
