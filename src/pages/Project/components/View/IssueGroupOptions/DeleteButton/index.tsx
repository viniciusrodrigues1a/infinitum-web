import React from "react";
import { FiTrash2 } from "react-icons/fi";

import styles from "./DeleteButton.module.scss";

type DeleteButtonProps = {
  onClick: () => void;
  loggedInUserRole: string;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  [key: string]: any;
};

export default function DeleteButton({
  onClick,
  loggedInUserRole,
  ...rest
}: DeleteButtonProps): React.ReactElement {
  if (loggedInUserRole !== "owner") return <></>;

  return (
    <button onClick={onClick} className={styles.button} type="button" {...rest}>
      <FiTrash2 color="#D85C43" size={28} />
    </button>
  );
}
