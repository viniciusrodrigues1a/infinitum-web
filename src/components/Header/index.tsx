import React, { useEffect, useRef, useState } from "react";
import { FiBell } from "react-icons/fi";
import { RiCheckDoubleFill } from "react-icons/ri";
import { useHistory } from "react-router-dom";

import styles from "./Header.module.css";

import { useSession } from "../../contexts/SessionContext";

import Notification from "../Notification";
import ExpandableHamburger from "../ExpandableHamburger";
import AccountAvatar from "../AccountAvatar";

import RoutesEnum from "../../routes/type-defs/RoutesEnum";
import { useAccount } from "../../contexts/AccountContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { useNotifications } from "../../contexts/NotificationsContext";
import { useAPIService } from "../../contexts/APIServiceContext";

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
  const { markAllNotificationsAsReadService } = useAPIService();
  const { notifications, unreadNotificationsAmount } = useNotifications();

  const [isDropdownShown, setIsDropdownShown] = useState(false);
  const [isNotificationsDropdownShown, setIsNotificationsDropdownShown] =
    useState(false);

  const notificationsDropdownDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const body = document.querySelector("body");
    if (!body) {
      return;
    }

    function onClick(e: MouseEvent) {
      if (isDropdownShown) {
        setIsDropdownShown(false);
      }

      let clickedInsideNotificationsDropdown = false;
      if (notificationsDropdownDivRef.current) {
        clickedInsideNotificationsDropdown =
          notificationsDropdownDivRef.current.contains(e.target as Node);
      }
      if (isNotificationsDropdownShown && !clickedInsideNotificationsDropdown) {
        setIsNotificationsDropdownShown(false);
      }
    }

    body.addEventListener("click", onClick);

    return () => body.removeEventListener("click", onClick);
  }, [isDropdownShown, isNotificationsDropdownShown]);

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
          <div id={styles.notificationsWrapper}>
            <button
              type="button"
              id={styles.notificationsBellWrapper}
              onClick={() =>
                setIsNotificationsDropdownShown(!isNotificationsDropdownShown)
              }
            >
              <FiBell
                color="var(--dark)"
                size={28}
                fill={unreadNotificationsAmount > 0 ? "var(--dark)" : "none"}
              />

              {unreadNotificationsAmount > 0 && (
                <div id={styles.notificationCount}>
                  <span>{unreadNotificationsAmount}</span>
                </div>
              )}
            </button>

            {isNotificationsDropdownShown && (
              <div
                ref={notificationsDropdownDivRef}
                id={styles.notificationsDropdown}
              >
                <div id={styles.notificationsDropdownHeader}>
                  <strong id={styles.notificationsDropdownTitle}>
                    Notifications
                  </strong>

                  <button
                    id={styles.markAllAsReadButton}
                    type="button"
                    onClick={() =>
                      markAllNotificationsAsReadService.markAllNotificationsAsRead()
                    }
                  >
                    <RiCheckDoubleFill color="#4376d8" size={24} />
                    <span>Mark all as read</span>
                  </button>
                </div>
                {notifications.map((n, index) => (
                  <Notification notification={n} key={index.toString()} />
                ))}
              </div>
            )}
          </div>

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
