import React, { useCallback, useState } from "react";

import styles from "./CreateIssueModal.module.scss";

import Modal, { ModalProps } from "../../../../components/Modal";
import Title from "../../../../components/Title";
import Subtitle from "../../../../components/Subtitle";
import Form from "../../../../components/Form";
import CreateButton from "../../../../components/CreateButton";

export default function CreateIssueModal({
  shown,
  closeModal,
}: ModalProps): React.ReactElement {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");

  const clearInputs = useCallback(() => {
    setTitle("");
    setDescription("");
    setStartDate("");
  }, []);

  const handleCloseModal = useCallback(() => {
    clearInputs();
    closeModal();
  }, [closeModal, clearInputs]);

  return (
    <Modal.Container shown={shown} closeModal={closeModal}>
      <div id={styles.wrapper}>
        <div id={styles.content}>
          <div id={styles.closeButtonWrapper}>
            <Modal.CloseButton closeModal={handleCloseModal} />
          </div>

          <div>
            <Title>Criação de ticket</Title>
            <div id={styles.subtitleWrapper}>
              <Subtitle>Adicione as informações do seu ticket</Subtitle>
            </div>
          </div>

          <div id={styles.formWrapper}>
            <Form.Container id={styles.form}>
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
                  htmlFor="start-date"
                  titleLabel="Data de conclusão"
                  descriptionLabel="A data de conclusão deste ticket"
                />
                <Form.Input
                  id="start-date"
                  type="date"
                  placeholder="Data de início"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.InputWrapper>
              </div>
            </Form.Container>
          </div>

          <div>
            <CreateButton id={styles.submitButton} title="Criar" />
          </div>
        </div>
      </div>
    </Modal.Container>
  );
}
