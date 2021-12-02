import React from "react";
import { FiClipboard, FiAlignLeft } from "react-icons/fi";

import styles from "./IssueListModal.module.scss";

import Title from "../../../../components/Title";
import Subtitle from "../../../../components/Subtitle";
import Modal from "../../../../components/Modal";

import { IssueWithProjectName } from "../../../../services/interfaces";

type IssueListModalProps = {
  shown: boolean;
  closeModal: () => void;
  issues: IssueWithProjectName[];
  title: string;
  subtitle: string;
};

export default function IssueListModal({
  shown,
  closeModal,
  issues,
  title,
  subtitle,
}: IssueListModalProps): React.ReactElement {
  return (
    <Modal.Container shown={shown} closeModal={closeModal}>
      <div id={styles.wrapper}>
        <div id={styles.content}>
          <div id={styles.closeButtonWrapper}>
            <Modal.CloseButton closeModal={closeModal} />
          </div>

          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>

          <div id={styles.issueListWrapper}>
            {issues.map((issue) => (
              <div className={styles.cardTicket}>
                <div className={styles.cardTicketInfo}>
                  <FiAlignLeft color="var(--dark)" size={14} />
                  <strong>{issue.title}</strong>
                </div>
                <div className={styles.cardTicketInfo}>
                  <FiClipboard color="#888888" size={14} />
                  <span>{issue.projectName}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal.Container>
  );
}
