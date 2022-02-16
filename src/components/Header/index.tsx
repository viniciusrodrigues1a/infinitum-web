import React, { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import { useHistory } from "react-router-dom";

import styles from "./Header.module.css";

import { useSession } from "../../contexts/SessionContext";

import ExpandableHamburger from "../ExpandableHamburger";
import AccountAvatar from "../AccountAvatar";
import RoutesEnum from "../../routes/type-defs/RoutesEnum";
import { useAccount } from "../../contexts/AccountContext";
import { useLanguage } from "../../contexts/LanguageContext";

type HeaderProps = {
  openSidebar: () => void;
  closeSidebar: () => void;
  isSidebarOpen: boolean;
  title: string;
  rightSideComponent?: () => React.ReactElement;
};

Header.defaultProps = {
  rightSideComponent: () => null,
};

export default function Header({
  openSidebar,
  closeSidebar,
  isSidebarOpen,
  title,
  rightSideComponent: RightSideComponent,
}: HeaderProps): React.ReactElement {
  const history = useHistory();
  const { clearSession } = useSession();
  const { account } = useAccount();
  const {
    language: {
      components: { header: headerLanguage },
    },
  } = useLanguage();

  const [isDropdownShown, setIsDropdownShown] = useState(false);

  useEffect(() => {
    const body = document.querySelector("body");
    if (!body) {
      return;
    }

    function onClick() {
      if (isDropdownShown) {
        setIsDropdownShown(false);
      }
    }

    body.addEventListener("click", onClick);

    return () => body.removeEventListener("click", onClick);
  }, [isDropdownShown]);

  function navigateToProfilePage() {
    history.push(RoutesEnum.PROFILE);
  }

  return (
    <div id={styles.container}>
      <div className={styles.flexAlignedRow}>
        <div id={styles.hamburgerWrapper}>
          <div
            className={
              isSidebarOpen ? styles.animatedHamburger : styles.hamburger
            }
          >
            <ExpandableHamburger
              isCollapsed={!isSidebarOpen}
              onExpand={openSidebar}
              onCollapse={closeSidebar}
              theme={isSidebarOpen ? "light" : "dark"}
            />
          </div>
        </div>
        <span id={styles.title}>{title}</span>
      </div>

      <div className={styles.flexAlignedRow}>
        {RightSideComponent && <RightSideComponent />}

        <div id={styles.userAvatarWrapper}>
          <AccountAvatar
            name={account.name}
            image={account.image}
            onClick={() => setIsDropdownShown(!isDropdownShown)}
          />

          {isDropdownShown && (
            <div id={styles.headerDropdown}>
              <div id={styles.userInfo}>
                <div id={styles.userInfoText}>
                  <strong>{account.name}</strong>
                  <span>{account.email}</span>
                </div>

                <AccountAvatar
                  name={account.name}
                  image={account.image}
                  onClick={navigateToProfilePage}
                />
              </div>

              <div className={styles.separator} />

              <div>
                <button
                  type="button"
                  className={styles.dropdownButton}
                  onClick={navigateToProfilePage}
                >
                  {headerLanguage.myProfileText}
                </button>
                <button
                  type="button"
                  className={styles.dropdownButton}
                  onClick={clearSession}
                >
                  {headerLanguage.logoutText}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
