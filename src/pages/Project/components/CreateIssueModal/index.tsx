import React, { useCallback, useMemo, useState } from "react";

import { useParams } from "react-router-dom";
import styles from "./CreateIssueModal.module.scss";

import Modal, { ModalProps } from "../../../../components/Modal";
import Title from "../../../../components/Title";
import Subtitle from "../../../../components/Subtitle";
import Form from "../../../../components/Form";
import CreateButton from "../../../../components/CreateButton";
import { useAPIService } from "../../../../contexts/APIServiceContext";
import showToast from "../../../../utils/showToast";
import { useProjects } from "../../../../contexts/ProjectsContext";

export default function CreateIssueModal({
  shown,
  closeModal,
}: ModalProps): React.ReactElement {
  const params = useParams<{ projectId: string }>();
  const { getProjectById, fetchProjects } = useProjects();
  const { createIssueService } = useAPIService();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [issueGroupId, setIssueGroupId] = useState<string>("");
  const [expirationDate, setExpirationDate] = useState("");

  const project = useMemo(
    () => getProjectById(params.projectId),
    [getProjectById, params]
  );

  const clearInputs = useCallback(() => {
    setTitle("");
    setDescription("");
    setExpirationDate("");
  }, []);

  const handleCloseModal = useCallback(() => {
    clearInputs();
    closeModal();
  }, [closeModal, clearInputs]);

  async function handleSubmit() {
    const response = await createIssueService.createIssue({
      title,
      description,
      expiresAt: expirationDate ? new Date(expirationDate) : undefined,
      issueGroupId,
    });

    const toastMsg = response.userFriendlyMessage;
    if (toastMsg) showToast(toastMsg, response.error);
    if (!response.error) {
      handleCloseModal();
      await fetchProjects();
    }
  }

  if (!project) {
    return <h1>Projeto não encontrado!</h1>;
  }

  return (
    <Modal.Container shown={shown} closeModal={handleCloseModal}>
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
            <Form.Container id={styles.form} onSubmit={handleSubmit}>
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
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                />
              </Form.InputWrapper>

              <div id={styles.selectInputWrapper}>
                <Form.InputWrapper>
                  <Form.Label
                    htmlFor="section"
                    titleLabel="Seção"
                    descriptionLabel="A qual seção do seu projeto seu ticket fará parte"
                  />
                  <Form.Select
                    id="section"
                    placeholder="Selecione uma seção"
                    options={project.issueGroups.map((ig) => ({
                      value: ig.issueGroupId,
                      text: ig.title,
                    }))}
                    value={issueGroupId}
                    onChange={(e) => setIssueGroupId(e.target.value)}
                  />
                </Form.InputWrapper>
              </div>

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
            <CreateButton
              id={styles.submitButton}
              title="Criar"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </Modal.Container>
  );
}
