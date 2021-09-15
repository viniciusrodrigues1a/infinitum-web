import React, { useEffect, useRef } from "react";
import styles from "./modalContainer.module.css";

type ContainerProps = {
  shown: boolean;
  closeModal: () => void;
  children: React.ReactElement;
};

export function Container({
  shown,
  closeModal,
  children,
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

  if (!shown) {
    return <></>;
  }

  return (
    <div id={styles.outsideContainer} ref={outsideModalContainerRef}>
      {children}
    </div>
  );
}
