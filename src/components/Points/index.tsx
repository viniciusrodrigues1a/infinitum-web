import React, { useEffect, useRef } from "react";

import styles from "./styles.module.css";

export default function Points(): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fitScreenElement: HTMLDivElement | null = document.querySelector(
      "main.noCssModule_main"
    );

    if (!fitScreenElement) {
      return;
    }

    const defaultTop = -16;
    const defaultLeft = -24;

    function changeStylesOnMouseMove(event: MouseEvent) {
      if (!containerRef.current) {
        return;
      }

      const xOffset = (window.innerWidth / 2 - event.pageX) / 24;
      const yOffset = (Math.floor(window.innerHeight / 1.5) - event.pageY) / 24;

      const left = defaultLeft - xOffset;
      const top = defaultTop - yOffset;

      containerRef.current.style.transition = "none";
      containerRef.current.style.left = `${left}px`;
      containerRef.current.style.top = `${top}px`;
    }

    function changeStylesOnMouseLeave(_: MouseEvent) {
      if (!containerRef.current) {
        return;
      }

      containerRef.current.style.transition = `all 0.5s`;
      containerRef.current.style.left = `${defaultLeft}px`;
      containerRef.current.style.top = `${defaultTop}px`;
    }

    fitScreenElement.addEventListener("mousemove", changeStylesOnMouseMove);
    fitScreenElement.addEventListener("mouseleave", changeStylesOnMouseLeave);

    return () => {
      fitScreenElement.removeEventListener(
        "mousemove",
        changeStylesOnMouseMove
      );
      fitScreenElement.removeEventListener(
        "mouseleave",
        changeStylesOnMouseLeave
      );
    };
  }, []);

  return (
    <div id={styles.container} ref={containerRef}>
      <div className={styles.row}>
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
      </div>
      <div className={styles.row}>
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
      </div>
      <div className={styles.row}>
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
      </div>
      <div className={styles.row}>
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
      </div>
      <div className={styles.row}>
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
      </div>
      <div className={styles.row}>
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
      </div>
      <div className={styles.row}>
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
      </div>
      <div className={styles.row}>
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
      </div>
      <div className={styles.row}>
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
      </div>
      <div className={styles.row}>
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
      </div>
      <div className={styles.row}>
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
      </div>
      <div className={styles.row}>
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
        <div className={styles.point} />
      </div>
    </div>
  );
}
