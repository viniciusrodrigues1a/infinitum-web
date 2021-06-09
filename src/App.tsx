import { ReactElement, useState } from "react";
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

export default function App(): ReactElement {
  const [dropdownShown, setDropdownShown] = useState(false);

  function toggleDropdownMenu() {
    setDropdownShown(!dropdownShown);
  }

  return (
    <>
      <header>
        <div id={styles.logo}>
          <div id={styles.logoIcon}>LOGO</div>
          <span id={styles.logoText}>Bug Tracker</span>
        </div>

        <button
          id={styles.hamburgerDropdown}
          type="button"
          onClick={toggleDropdownMenu}
        >
          <FiMenu size={32} color="var(--light)" />
        </button>

        {dropdownShown && (
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
        )}
      </header>

      <main>
        <div className={styles.introductionContainer}>
          <div className={styles.introductionTitle}>
            <h1>Work on big ideas, without the busywork.</h1>
          </div>
          <div className={styles.introductionText}>
            <span>
              Collaborate, manage projects, and reach new productivity peaks.
              From high rises to the home office, the way your team works is
              unique accomplish it all with Trello.
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
        </div>
      </main>

      <main>
        <div>
          <h1>Learn more about our work</h1>
        </div>
      </main>

      <main>
        <div>
          <img
            src="https://http2.mlstatic.com/D_NQ_NP_721511-MLB20567637142_012016-O.jpg"
            width="40px"
            height="40px"
          />
          <h2>Manage everything in one workspace</h2>
          <p>
            Planning, tracking, and delivering your team’s best work has never
            been easier
          </p>
          <img
            src="https://http2.mlstatic.com/D_NQ_NP_721511-MLB20567637142_012016-O.jpg"
            width="40px"
            height="40px"
          />
        </div>
      </main>

      <main>
        <div>
          <h1>Visualize work with views</h1>
          <p>View data as a map, calendar, timeline, kanban, and more</p>
        </div>
        <div className={styles.options}>
          <FiList size={28} color="var(--dark)" />
          <FiLayout size={28} color="var(--dark)" />
          <FiPieChart size={28} color="var(--dark)" />
          <FiActivity size={28} color="var(--dark)" />
        </div>
      </main>

      <main>
        <div>
          <img src="assets/google-logo.svg" alt="google-logo" />
          <button type="submit">Sign Up with Google</button>
          <FiMail size={28} color="var(--light)" />
          <button type="submit">Sign Up with Email</button>
        </div>
      </main>

      <footer>
        <div className={styles.language}>
          <FiGlobe size={28} color="var(--light)" />
          <a id="language-text" href="">
            Language
          </a>
        </div>
        <div className={styles.contact}>
          <FiMail size={28} color="var(--light)" />
          <a id="contact-text" href="">
            Contact us
          </a>
        </div>
      </footer>
    </>
  );
}
