import React, { useCallback, useState } from "react";
import Modal from "../Modal";
import Title from "../Title";
import Subtitle from "../Subtitle";
import Form from "../Form";

import styles from "./CreateProjectModal.module.css";

export type CreateProjectModalProps = {
  shown: boolean;
  closeModal: () => void;
};

export default function CreateProjectModal({
  shown,
  closeModal,
}: CreateProjectModalProps): React.ReactElement {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleCloseModal = useCallback(() => {
    setTitle("");
    setStartDate("");
    setEndDate("");
    closeModal();
  }, [closeModal]);

  return (
    <Modal.Container shown={shown} closeModal={handleCloseModal}>
      <div id={styles.wrapper}>
        <div id={styles.content}>
          <div id={styles.closeButtonWrapper}>
            <Modal.CloseButton closeModal={handleCloseModal} />
          </div>

          <div>
            <Title>Criação de projeto</Title>
            <div id={styles.subtitleWrapper}>
              <Subtitle>
                O primeiro passo para a realização da sua ideia
              </Subtitle>
            </div>
          </div>

          <div id={styles.formWrapper}>
            <Form.Container className={styles.form}>
              <div id={styles.imageInputWrapper}>
                <Form.ImageInput id="project-image" />
              </div>

              <Form.InputWrapper>
                <Form.Label
                  htmlFor="title"
                  titleLabel="Título"
                  descriptionLabel="Este será o nome usado para se referir ao seu projeto"
                />
                <Form.Input
                  id="title"
                  placeholder="Título"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.InputWrapper>

              <Form.InputWrapper>
                <Form.Label
                  htmlFor="dates"
                  titleLabel="Data de início e término"
                  descriptionLabel="O tempo de vida do seu projeto"
                />
                <div className={styles.dateInputsContainer}>
                  <Form.Input
                    id="start-date"
                    type="date"
                    placeholder="Data de início"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <Form.Input
                    id="end-date"
                    type="date"
                    placeholder="Data de término"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </Form.InputWrapper>

              <div id={styles.descriptionInputWrapper}>
                <Form.InputWrapper>
                  <Form.Label
                    htmlFor="description"
                    titleLabel="Descrição"
                    descriptionLabel="Dê uma breve descrição de seu projeto"
                  />
                  <Form.TextArea
                    id="description"
                    placeholder="Descrição"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </Form.InputWrapper>
              </div>
            </Form.Container>
          </div>
        </div>
      </div>
    </Modal.Container>
  );
}
