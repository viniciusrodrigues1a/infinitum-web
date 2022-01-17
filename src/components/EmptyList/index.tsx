import React, { SVGProps } from "react";
import { FiFrown } from "react-icons/fi";

import styles from "./EmptyList.module.css";

type EmptyListProps = {
  text: string;
  buttonComponent?: () => React.ReactElement;
  svg?: (props: SVGProps<SVGSVGElement>) => React.ReactElement;
};

EmptyList.defaultProps = {
  buttonComponent: null,
  svg: null,
};

export default function EmptyList({
  text,
  buttonComponent: ButtonComponent,
  svg: Svg,
}: EmptyListProps): React.ReactElement {
  return (
    <div className={styles.container}>
      {Svg && <Svg className={styles.svg} />}

      <div className={styles.info}>
        <div className={styles.infoTextContainer}>
          <p className={styles.infoText}>{text}</p>
          <FiFrown
            className={styles.infoTextIcon}
            color="var(--dark)"
            size={24}
          />
        </div>

        <div className={styles.buttonWrapper}>
          {ButtonComponent && <ButtonComponent />}
        </div>
      </div>
    </div>
  );
}
