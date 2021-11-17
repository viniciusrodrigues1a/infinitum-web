import React, { useEffect, useRef } from "react";
import styles from "./modalContainer.module.css";

export type ContainerProps = {
  shown: boolean;
  closeModal: () => void;
  children: React.ReactElement;
  changeScroll?: boolean;
};

Container.defaultProps = {
  changeScroll: true,
};

export default function Container({
  shown,
  closeModal,
  children,
  changeScroll = true,
}: ContainerProps): React.ReactElement {
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
      if (changeScroll) {
        body.classList.remove("noVerticalScroll");
      }
      body.removeEventListener("click", onClick);
      body.removeEventListener("keyup", onKeyup);
    };
  }, [shown, closeModal, changeScroll]);

  useEffect(() => {
    if (!changeScroll) return;

    const body = document.querySelector("body");
    if (!body) {
      return;
    }

    if (shown) {
      body.classList.add("noVerticalScroll");
    } else {
      body.classList.remove("noVerticalScroll");
    }
  }, [shown, changeScroll]);

  if (!shown) {
    return <></>;
  }

  return (
    <div id={styles.outsideContainer} ref={outsideModalContainerRef}>
      {children}
    </div>
  );
}
