import React, {
  ReactElement,
  useEffect,
  useState,
  useRef,
  useContext,
} from "react";
import {
  FiMenu,
  FiGlobe,
  FiPieChart,
  FiList,
  FiLayout,
  FiActivity,
  FiMail,
  FiArrowDown,
} from "react-icons/fi";
import styles from "./home.module.css";

import moonImg from "../../assets/moon.png";
import landImg from "../../assets/land.png";
import googleLogoImg from "../../assets/google-logo.png";

import HeroSvg from "./components/HeroSvg";
import Points from "./components/Points";
import Star from "./components/Star";

import logoImg from "../../assets/logo.png";

import { LanguageContext } from "../../contexts/LanguageContext";
import LanguagePicker from "./components/LanguagePicker";
import LanguageModal from "./components/LanguageModal";
import AuthModal from "./components/AuthModal";
import Modal from "../../components/Modal";

export default function Home(): ReactElement {
  const { language } = useContext(LanguageContext);

  const [authModalShownName, setAuthModalShownName] = useState<
    "signup" | "signin" | null
  >(null);
  const [drawerMenuShown, setDrawerMenuShown] = useState(false);
  const [viewOptionIndex, setViewOptionIndex] = useState(0);
  const [languageMenuShown, setLanguageMenuShown] = useState(false);
  const [languageModalShown, setLanguageModalShown] = useState(false);

  const drawerMenuOutsideRef = useRef<HTMLDivElement>(null);
  const pitchSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (drawerMenuShown && drawerMenuOutsideRef.current === event.target) {
        setDrawerMenuShown(false);
      }

      if (languageMenuShown) {
        setLanguageMenuShown(false);
      }
    }

    const body = document.querySelector("body");

    if (!body) {
      return;
    }

    body.addEventListener("click", onClick);

    return () => body.removeEventListener("click", onClick);
  }, [drawerMenuShown, languageMenuShown]);

  function toggleDropdownMenu() {
    setDrawerMenuShown(!drawerMenuShown);
  }

  function toggleLanguageMenu() {
    setLanguageMenuShown(!languageMenuShown);
  }

  function toggleLanguageModal() {
    setLanguageModalShown(!languageModalShown);
  }

  function scrollToSectionBelowIntroduction() {
    if (!pitchSectionRef.current) {
      return;
    }

    pitchSectionRef.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <header>
        <div id={styles.headerContentWrapper}>
          <div id={styles.headerContent}>
            <div id={styles.logo}>
              <a id={styles.logoIcon} href="/">
                <img src={logoImg} alt="LOGO" />
              </a>
              <span id={styles.logoText}>Infinitum</span>
            </div>

            <div id={styles.hamburgerButtonWrapper}>
              <button
                id={styles.hamburgerButton}
                className={drawerMenuShown ? styles.fixed : ""}
                type="button"
                onClick={toggleDropdownMenu}
              >
                <FiMenu
                  size={32}
                  color="var(--light)"
                  className={
                    drawerMenuShown
                      ? styles.hamburgerClose
                      : styles.hamburgerNormal
                  }
                />
              </button>
            </div>

            <div id={styles.navbar}>
              <div className={styles.navitem}>
                <div id={styles.languageWrapper}>
                  <button
                    type="button"
                    className={styles.languageButton}
                    onClick={toggleLanguageMenu}
                  >
                    <FiGlobe size={28} color="var(--light)" />
                  </button>

                  <LanguagePicker shown={languageMenuShown} />
                </div>
              </div>

              <div className={styles.navitem}>
                <button
                  type="button"
                  className={styles.signInButton}
                  onClick={() => setAuthModalShownName("signin")}
                >
                  {language.home.signInText}
                </button>
              </div>

              <div className={styles.navitem}>
                <button
                  type="button"
                  className={styles.signUpButton}
                  onClick={() => setAuthModalShownName("signup")}
                >
                  {language.home.signUpText}
                </button>
              </div>
            </div>
          </div>
        </div>

        {drawerMenuShown && (
          <>
            <div id={styles.drawerMenuOutside} ref={drawerMenuOutsideRef}>
              <div id={styles.drawerMenu}>
                <div className={styles.drawerItem}>
                  <button type="button" className={styles.signInButton}>
                    {language.home.signInText}
                  </button>
                </div>
                <div className={styles.drawerItem}>
                  <button type="button" className={styles.signUpButton}>
                    {language.home.signUpText}
                  </button>
                </div>
                <div className={styles.drawerItem}>
                  <div id={styles.languageWrapper}>
                    <button
                      type="button"
                      className={styles.languageButton}
                      onClick={toggleLanguageMenu}
                    >
                      <FiGlobe size={28} color="var(--light)" />

                      <strong>{language.home.languageButtonText}</strong>
                    </button>

                    <LanguagePicker shown={languageMenuShown} />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </header>

      <main id={styles.introductionSection} className="noCssModule_main">
        <div id={styles.mainFlex}>
          <div id={styles.introductionContainer}>
            <h1 id={styles.introductionTitle}>
              {language.home.introduction.title}
            </h1>
            <span id={styles.introductionDescription}>
              {language.home.introduction.description}
            </span>
            <div id={styles.introductionButtonContainer}>
              <Points />

              <button
                id={styles.introductionButton}
                className={styles.signUpButton}
                type="button"
                onClick={() => setAuthModalShownName("signup")}
              >
                {language.home.signUpText}
              </button>
            </div>
          </div>
          <div id={styles.introductionImgContainer}>
            <HeroSvg />
          </div>
        </div>

        <button
          type="button"
          id={styles.scrollArrow}
          onClick={scrollToSectionBelowIntroduction}
        >
          <FiArrowDown color="var(--dark)" size={40} />
        </button>
      </main>

      <section
        id={styles.pitchSection}
        className={styles.sectionMargin}
        ref={pitchSectionRef}
      >
        <Star top="1rem" left="36%" delay={0.1} />
        <Star top="90%" left="10rem" delay={1.3} />
        <Star top="3rem" left="75%" delay={0.9} />
        <Star top="4rem" left="20%" delay={0.56} />
        <Star top="85%" left="80%" delay={0.45} />
        <Star top="86%" left="10%" />
        <Star top="14%" left="5%" delay={0.33} />

        <div>
          <img src={moonImg} id={styles.moon} />
          <h1>
            {language.home.pitch.title[0]}{" "}
            <span>{language.home.pitch.title[1]}</span>
          </h1>
          <div id={styles.pitch} />
        </div>
      </section>

      <section id={styles.showcaseSection} className={styles.sectionMargin}>
        <div className={styles.showcase}>
          <div className={styles.showcaseTextContainer}>
            <h2 className={styles.showcaseTitle}>
              {language.home.showcase.title1}
            </h2>
            <p className={styles.showcaseDescription}>
              {language.home.showcase.description1}
            </p>
          </div>
          <img
            className={styles.showcaseImg}
            src="https://http2.mlstatic.com/D_NQ_NP_721511-MLB20567637142_012016-O.jpg"
            width="300px"
            height="200px"
          />
        </div>
        <div className={styles.showcase}>
          <div className={styles.showcaseTextContainer}>
            <h2 className={styles.showcaseTitle}>
              {language.home.showcase.title2}
            </h2>

            <p className={styles.showcaseDescription}>
              {language.home.showcase.description2}
            </p>
          </div>
          <img
            className={styles.showcaseImg}
            src="https://http2.mlstatic.com/D_NQ_NP_721511-MLB20567637142_012016-O.jpg"
            width="300px"
            height="200px"
          />
        </div>
      </section>

      <section id={styles.viewsSection} className={styles.sectionMargin}>
        <h1>
          {language.home.views.title[0]}{" "}
          <strong>{language.home.views.title[1]}</strong>
        </h1>
        <p>{language.home.views.description}</p>

        <div className={styles.options}>
          <button
            type="button"
            onClick={() => setViewOptionIndex(0)}
            className={`${styles.option} ${
              viewOptionIndex === 0 ? styles.selectedOption : ""
            }`}
          >
            <FiList
              size={28}
              color={viewOptionIndex === 0 ? "var(--dark)" : "#a6a6a6"}
            />
          </button>
          <button
            type="button"
            onClick={() => setViewOptionIndex(1)}
            className={`${styles.option} ${
              viewOptionIndex === 1 ? styles.selectedOption : ""
            }`}
          >
            <FiLayout
              size={28}
              color={viewOptionIndex === 1 ? "var(--dark)" : "#a6a6a6"}
            />
          </button>
          <button
            type="button"
            onClick={() => setViewOptionIndex(2)}
            className={`${styles.option} ${
              viewOptionIndex === 2 ? styles.selectedOption : ""
            }`}
          >
            <FiPieChart
              size={28}
              color={viewOptionIndex === 2 ? "var(--dark)" : "#a6a6a6"}
            />
          </button>
          <button
            type="button"
            onClick={() => setViewOptionIndex(3)}
            className={`${styles.option} ${
              viewOptionIndex === 3 ? styles.selectedOption : ""
            }`}
          >
            <FiActivity
              size={28}
              color={viewOptionIndex === 3 ? "var(--dark)" : "#a6a6a6"}
            />
          </button>
        </div>

        <div />
      </section>

      <section id={styles.authSection} className={styles.sectionMargin}>
        <div id={styles.loginOptions}>
          <button type="button">
            <img src={googleLogoImg} alt="Login with google" />
            <span>{language.home.signUpGoogleText}</span>
          </button>

          <button type="button">
            <FiMail size={48} color="var(--light)" />
            <span>{language.home.signUpEmailText}</span>
          </button>
        </div>

        <div id={styles.authSectionSeparator}>
          <img src={landImg} alt="" />
        </div>

        <Star top="32%" left="38%" delay={0.1} />
        <Star top="38%" left="94%" delay={0.2} />
        <Star top="38%" left="0.5rem" delay={0.2} />
        <Star top="18%" left="72%" delay={0.2} />
        <Star top="30%" left="60%" delay={0.8} />
        <Star top="20%" left="20%" delay={0.1} />
        <Star top="15%" left="90%" delay={0.7} />
        <Star top="15%" left="50%" delay={0.9} />
        <Star top="8rem" left="2rem" delay={0.4} />
        <Star top="4rem" left="10%" delay={0.5} />
      </section>

      <footer>
        <div className={styles.footerInfo}>
          <FiMail size={32} color="var(--light)" />
          <a href="">
            <strong>{language.home.footer.contactUs}</strong>
          </a>
        </div>
        <div className={styles.footerInfo}>
          <button type="button" onClick={toggleLanguageModal}>
            <FiGlobe size={32} color="var(--light)" />
            <strong>{language.home.languageButtonText}</strong>
          </button>
        </div>
      </footer>

      <LanguageModal
        shown={languageModalShown}
        closeModal={() => setLanguageModalShown(false)}
      />

      <Modal.Container
        shown={authModalShownName !== null}
        closeModal={() => setAuthModalShownName(null)}
      >
        <>
          {authModalShownName === "signup" && (
            <AuthModal.SignUp
              shown={authModalShownName === "signup"}
              closeModal={() => setAuthModalShownName(null)}
              openAlternativeModal={() => {
                setAuthModalShownName("signin");
              }}
            />
          )}

          {authModalShownName === "signin" && (
            <AuthModal.SignIn
              shown={authModalShownName === "signin"}
              closeModal={() => setAuthModalShownName(null)}
              openAlternativeModal={() => {
                setAuthModalShownName("signup");
              }}
            />
          )}
        </>
      </Modal.Container>
    </>
  );
}
