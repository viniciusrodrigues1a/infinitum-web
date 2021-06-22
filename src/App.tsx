import React, { ReactElement, useEffect, useState, useRef } from "react";
import {
  FiMenu,
  FiGlobe,
  FiPieChart,
  FiList,
  FiLayout,
  FiActivity,
  FiMail,
} from "react-icons/fi";
import styles from "./app.module.css";

import Star from "./components/Star";

import landImg from "./assets/land.png";
import googleLogoImg from "./assets/google-logo.png";
import estrelaImg from "./assets/estrela.png";

export default function App(): ReactElement {
  const [dropdownShown, setDropdownShown] = useState(false);
  const [viewOptionIndex, setViewOptionIndex] = useState(0);

  const dropdownOutside = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (dropdownOutside.current === event.target) {
        setDropdownShown(false);
      }
    }

    const body = document.querySelector("body");

    if (!body) {
      return;
    }

    body.addEventListener("click", onClick);

    return () => body.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    const body = document.querySelector("body");

    if (!body) return;

    if (dropdownShown) {
      body.classList.add("noVerticalScroll");
    } else {
      body.classList.remove("noVerticalScroll");
    }
  }, [dropdownShown]);

  function toggleDropdownMenu() {
    setDropdownShown(!dropdownShown);
  }

  return (
    <>
      <header>
        <div id={styles.navigation}>
          <div id={styles.logo}>
            <div id={styles.logoIcon}>LOGO</div>
            <span id={styles.logoText}>Bug Tracker</span>
          </div>

          <div id={styles.hamburgerDropdownWrapper}>
            <button
              id={styles.hamburgerDropdown}
              className={dropdownShown ? styles.fixed : ""}
              type="button"
              onClick={toggleDropdownMenu}
            >
              <FiMenu
                size={32}
                color="var(--light)"
                className={
                  dropdownShown
                    ? styles.hamburgerAnimatedSvg
                    : styles.reverseAnimSvg
                }
              />
            </button>
          </div>
        </div>

        {dropdownShown && (
          <>
            <div id={styles.dropdownMenuOutside} ref={dropdownOutside}>
              <div id={styles.dropdownMenu}>
                <button
                  type="button"
                  className={`${styles.authButton} ${styles.signInButton}`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  className={`${styles.authButton} ${styles.signUpButton}`}
                >
                  Sign Up
                </button>
                <button type="button" className={styles.languageButton}>
                  <FiGlobe size={28} color="var(--light)" />

                  <strong>Idioma</strong>
                </button>
              </div>
            </div>
          </>
        )}
      </header>

      <main>
        <div className={styles.introductionTitle}>
          <h1>Work on big ideas, without the busywork.</h1>
        </div>
        <div className={styles.introductionText}>
          <span>
            Collaborate, manage projects, and reach new productivity peaks. From
            high rises to the home office, the way your team works is unique
            accomplish it all with Trello.
          </span>
        </div>
        <div className={styles.introductionButton}>
          <button
            className={`${styles.signUp} ${styles.authButton} ${styles.signUpButton}`}
            type="button"
          >
            SIGN UP
          </button>
        </div>
      </main>

      <section id={styles.pitchSection} className={styles.sectionMargin}>
        <Star top="2rem" left="36%" />
        <Star top="50%" left="1rem" />
        <Star top="3rem" left="94%" />

        <div>
          <h1>
            Learn more about our <span>work</span>
          </h1>
          <div id={styles.pitch} />
        </div>
      </section>

      <section id={styles.thirdSection} className={styles.sectionMargin}>
        <div className={styles.showcase}>
          <h2
            id={styles.titleThirdsection}
            className={styles.titleThirdSection}
          >
            Manage everything in one workspace
          </h2>
          <p className={styles.descriptionThirdSection}>
            Planning, tracking, and delivering your team’s best work has never
            been easier
          </p>
          <img
            className={styles.imgThirdSection}
            src="https://http2.mlstatic.com/D_NQ_NP_721511-MLB20567637142_012016-O.jpg"
            width="300px"
            height="200px"
          />
        </div>
        <div className={styles.showcase}>
          <h2 className={styles.titleThirdSection}>Set up in minutes</h2>
          <p className={styles.descriptionThirdSection}>
            Get started fast with hundreds of visual and customizable templates
            - or create your own
          </p>
          <img
            className={styles.imgThirdSection}
            src="https://http2.mlstatic.com/D_NQ_NP_721511-MLB20567637142_012016-O.jpg"
            width="300px"
            height="200px"
          />
        </div>
      </section>

      <section id={styles.viewsSection} className={styles.sectionMargin}>
        <h1>
          Visualize work with <strong>views</strong>
        </h1>
        <p>View data as a map, calendar, timeline, kanban, and more</p>

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
            <span>Sign Up with Google</span>
          </button>

          <button type="button">
            <FiMail size={48} color="var(--light)" />
            <span>Sign Up with Email</span>
          </button>
        </div>

        <div>
          <Star top={0} left={0} />
          <Star top={0} left={0} />
          <Star top={0} left={0} />
        </div>

        <div id={styles.authSectionSeparator}>
          <img src={landImg} alt="" />
        </div>
      </section>

      <footer>
        <div className={styles.footerInfo}>
          <FiMail size={32} color="var(--light)" />
          <a href="">Contact us</a>
        </div>
        <div className={styles.footerInfo}>
          <FiGlobe size={32} color="var(--light)" />
          <a href="">Language</a>
        </div>
      </footer>
    </>
  );
}
