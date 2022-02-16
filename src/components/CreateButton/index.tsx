import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import { IconBaseProps } from "react-icons";
import { FiPlusCircle } from "react-icons/fi";

import styles from "./CreateButton.module.css";

export type CreateButtonProps = {
  icon?: (
    props: DetailedHTMLProps<
      HTMLAttributes<HTMLElement | SVGElement>,
      HTMLElement | SVGElement
    > &
      IconBaseProps
  ) => React.ReactElement;
  title: string;
  onClick?: () => void;
  isSubmitButton?: boolean;
  id?: string;
  disabled?: boolean;
};

CreateButton.defaultProps = {
  onClick: () => null,
  leftIcon: null,
  isSubmitButton: false,
  id: "",
  disabled: false,
};

export default function CreateButton({
  icon: Icon,
  title,
  onClick,
  isSubmitButton,
  id,
  disabled,
}: CreateButtonProps): React.ReactElement {
  return (
    <button
      id={id}
      disabled={disabled}
      type={isSubmitButton ? "submit" : "button"}
      className={styles.newProjectButton}
      onClick={onClick}
    >
      {Icon ? (
        <Icon className={styles.buttonIcon} color="var(--dark)" size={20} />
      ) : (
        <FiPlusCircle
          className={styles.buttonIcon}
          color="var(--dark)"
          size={20}
        />
      )}
      <span className={styles.buttonText}>{title}</span>
    </button>
  );
}
