import React, { useEffect, useRef } from "react";

import styles from "./points.module.css";

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
      if (!containerRef.current || !fitScreenElement) {
        return;
      }

      let headerHeight = 0;
      const header: HTMLElement | null = document.querySelector("header");

      if (header) {
        headerHeight = header.offsetHeight;
      }

      const xOffset = (window.innerWidth / 2 - event.pageX) / 34;
      const yOffset =
        (window.innerHeight / 2 -
          (event.pageY % (headerHeight + fitScreenElement.offsetHeight))) /
        34;

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
