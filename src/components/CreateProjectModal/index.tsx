import React, { useCallback, useState } from "react";

import styles from "./CreateProjectModal.module.css";

import CreateButton from "../CreateButton";
import Form from "../Form";
import Modal from "../Modal";
import Subtitle from "../Subtitle";
import Title from "../Title";

import { useAPIService } from "../../contexts/APIServiceContext";
import showToast from "../../utils/showToast";
import { useProjects } from "../../contexts/ProjectsContext";
import { useLanguage } from "../../contexts/LanguageContext";

export type CreateProjectModalProps = {
  shown: boolean;
  closeModal: () => void;
};

export default function CreateProjectModal({
  shown,
  closeModal,
}: CreateProjectModalProps): React.ReactElement {
  const { createProjectService, updateProjectImageService } = useAPIService();
  const { fetchProjects } = useProjects();
  const {
    language: {
      pages: { projects: projectsLanguage },
    },
  } = useLanguage();

  const [imagePreview, setImagePreview] = useState("");
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const clearInputs = useCallback(() => {
    setTitle("");
    setStartDate("");
    setEndDate("");
    setDescription("");
  }, []);

  const handleCloseModal = useCallback(() => {
    clearInputs();
    closeModal();
  }, [closeModal, clearInputs]);

  async function handleSubmit() {
    const projectId = await updateProject();
    if (!projectId) return;

    await updateProjectImage(projectId);

    handleCloseModal();
    await fetchProjects();
  }

  async function updateProject(): Promise<string | undefined> {
    let beginsAt: Date | undefined;
    if (startDate) {
      const [year, month, day] = startDate.split("-").map((e) => Number(e));
      const timezoneOffsetInHours = new Date().getTimezoneOffset() / 60;
      beginsAt = new Date(year, month - 1, day, 12 - timezoneOffsetInHours);
    }

    let finishesAt: Date | undefined;
    if (endDate) {
      const [year, month, day] = endDate.split("-").map((e) => Number(e));
      const timezoneOffsetInHours = new Date().getTimezoneOffset() / 60;
      finishesAt = new Date(year, month - 1, day, 12 - timezoneOffsetInHours);
    }

    const response = await createProjectService.createProject({
      name: title,
      description,
      beginsAt,
      finishesAt,
    });

    const toastMsg = response.userFriendlyMessage;
    if (toastMsg) showToast(toastMsg, response.error);

    if (response.data) return response.data;
  }

  async function updateProjectImage(projectId: string) {
    if (!newImageFile) return;

    const formData = new FormData();
    formData.append("file", newImageFile);
    formData.append("projectId", projectId);

    await updateProjectImageService.updateProjectImage(formData);
  }

  function handleOnImageInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    const file = e.target.files[0];

    setNewImageFile(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setImagePreview(reader.result as string);
  }

  return (
    <Modal.Container shown={shown} closeModal={handleCloseModal}>
      <div id={styles.wrapper}>
        <div id={styles.content}>
          <div id={styles.closeButtonWrapper}>
            <Modal.CloseButton closeModal={handleCloseModal} />
          </div>

          <div>
            <Title>{projectsLanguage.createModal.title}</Title>
            <div id={styles.subtitleWrapper}>
              <Subtitle>{projectsLanguage.createModal.subtitle}</Subtitle>
            </div>
          </div>

          <div id={styles.formWrapper}>
            <Form.Container className={styles.form} onSubmit={handleSubmit}>
              <div id={styles.imageInputWrapper}>
                <Form.ImageInput
                  src={imagePreview}
                  id="project-image"
                  onChange={handleOnImageInputChange}
                />
              </div>

              <Form.InputWrapper>
                <Form.Label
                  htmlFor="title"
                  titleLabel={projectsLanguage.createModal.titleInputLabel}
                  descriptionLabel={
                    projectsLanguage.createModal.titleInputDescription
                  }
                />
                <Form.Input
                  id="title"
                  placeholder={
                    projectsLanguage.createModal.titleInputPlaceholder
                  }
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.InputWrapper>

              <Form.InputWrapper>
                <Form.Label
                  htmlFor="dates"
                  titleLabel={projectsLanguage.createModal.dateInputLabel}
                  descriptionLabel={
                    projectsLanguage.createModal.dateInputDescription
                  }
                />
                <div className={styles.dateInputsContainer}>
                  <Form.Input
                    id="start-date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <Form.Input
                    id="end-date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </Form.InputWrapper>

              <div id={styles.descriptionInputWrapper}>
                <Form.InputWrapper>
                  <Form.Label
                    htmlFor="description"
                    titleLabel={
                      projectsLanguage.createModal.descriptionInputLabel
                    }
                    descriptionLabel={
                      projectsLanguage.createModal.descriptionInputDescription
                    }
                  />
                  <Form.TextArea
                    id="description"
                    placeholder={
                      projectsLanguage.createModal.descriptionInputPlaceholder
                    }
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.InputWrapper>
              </div>
            </Form.Container>
          </div>

          <div>
            <CreateButton
              title={projectsLanguage.createModal.submitButtonText}
              id={styles.submitButton}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </Modal.Container>
  );
}
