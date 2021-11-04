import React, { useCallback, useEffect, useState } from "react";
import { FiEdit3, FiTrash2 } from "react-icons/fi";

import { useParams } from "react-router-dom";
import styles from "./UpdateProjectModal.module.scss";

import CreateButton from "../../../../components/CreateButton";
import Form from "../../../../components/Form";
import Modal from "../../../../components/Modal";
import Subtitle from "../../../../components/Subtitle";
import Title from "../../../../components/Title";
import DeleteProjectModal from "../DeleteProjectModal";

import { useAPIService } from "../../../../contexts/APIServiceContext";
import { useProjects } from "../../../../contexts/ProjectsContext";
import showToast from "../../../../utils/showToast";

export type UpdateProjectModalProps = {
  shown: boolean;
  closeModal: () => void;
};

export default function UpdateProjectModal({
  shown,
  closeModal,
}: UpdateProjectModalProps): React.ReactElement {
  const params = useParams<{ projectId: string }>();
  const { updateProjectService } = useAPIService();
  const { getProjectById, fetchProjects } = useProjects();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const project = getProjectById(params.projectId);

    if (project) {
      setTitle(project.name);
      setDescription(project.description);
      const sanitizedStartDate = project.beginsAt
        ? project.beginsAt.split("T")[0]
        : "";
      const sanitizedEndDate = project.finishesAt
        ? project.finishesAt.split("T")[0]
        : "";
      setStartDate(sanitizedStartDate);
      setEndDate(sanitizedEndDate);
    }
  }, [getProjectById, params]);

  const clearInputs = useCallback(() => {
    setTitle("");
    setStartDate("");
    setEndDate("");
    setDescription("");
  }, []);

  const handleCloseModal = useCallback(() => {
    clearInputs();
    setIsDeleteModalOpen(false);
    closeModal();
  }, [closeModal, clearInputs]);

  async function handleSubmit() {
    const response = await updateProjectService.updateProject({
      projectId: params.projectId,
      name: title,
      description,
      beginsAt: startDate ? new Date(startDate) : undefined,
      finishesAt: endDate ? new Date(endDate) : undefined,
    });

    const toastMsg = response.userFriendlyMessage;
    if (toastMsg) showToast(toastMsg, response.error);
    if (!response.error) {
      handleCloseModal();
      await fetchProjects();
    }
  }

  return (
    <Modal.Container shown={shown} closeModal={handleCloseModal}>
      <>
        <div id={styles.wrapper}>
          <div id={styles.content}>
            <div id={styles.closeButtonWrapper}>
              <Modal.CloseButton closeModal={handleCloseModal} />
            </div>

            <div id={styles.contentHeader}>
              <div id={styles.contentHeaderTitleWrapper}>
                <Title>Configuração do seu projeto</Title>
                <div id={styles.subtitleWrapper}>
                  <Subtitle>Atualize as informações do seu projeto</Subtitle>
                </div>
              </div>

              <button
                type="button"
                id={styles.deleteButton}
                onClick={() => setIsDeleteModalOpen(true)}
              >
                <FiTrash2 color="#D85C43" size={24} />
              </button>
            </div>

            <div id={styles.formWrapper}>
              <Form.Container className={styles.form} onSubmit={handleSubmit}>
                <div id={styles.imageInputWrapper}>
                  <Form.ImageInput id="project-image" />
                </div>

                <Form.InputWrapper>
                  <Form.Label
                    htmlFor="title"
                    titleLabel="Título"
                    descriptionLabel="Este é o nome usado para se referir ao seu projeto"
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
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Form.InputWrapper>
                </div>
              </Form.Container>
            </div>

            <div>
              <CreateButton
                title="Atualizar"
                id={styles.submitButton}
                onClick={handleSubmit}
                icon={FiEdit3}
              />
            </div>
          </div>
        </div>

        <DeleteProjectModal
          shown={isDeleteModalOpen}
          closeModal={() => setIsDeleteModalOpen(false)}
        />
      </>
    </Modal.Container>
  );
}
