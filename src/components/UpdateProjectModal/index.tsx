import React, { useCallback, useEffect, useState } from "react";
import { FiEdit3, FiTrash2, FiUploadCloud } from "react-icons/fi";

import { useParams } from "react-router-dom";
import styles from "./UpdateProjectModal.module.scss";

import CreateButton from "../CreateButton";
import Form from "../Form";
import Modal from "../Modal";
import Subtitle from "../Subtitle";
import Title from "../Title";
import DeleteProjectModal from "../DeleteProjectModal";

import { useAPIService } from "../../contexts/APIServiceContext";
import { useProjects } from "../../contexts/ProjectsContext";
import showToast from "../../utils/showToast";
import { useLanguage } from "../../contexts/LanguageContext";
import { FormattedProject } from "../../services/type-defs/FormattedProject";

export type UpdateProjectModalProps = {
  shown: boolean;
  closeModal: () => void;
  project: FormattedProject;
  loggedInUserRole: string;
};

export default function UpdateProjectModal({
  shown,
  closeModal,
  project,
  loggedInUserRole,
}: UpdateProjectModalProps): React.ReactElement {
  const params = useParams<{ projectId: string }>();
  const {
    updateProjectService,
    updateProjectImageService,
    findProjectImageService,
  } = useAPIService();
  const { fetchProjects } = useProjects();
  const {
    language: {
      components: { updateProjectModal: updateProjectModalLanguage },
      pages: { projects: projectsLanguage },
    },
  } = useLanguage();

  const [imagePreview, setImagePreview] = useState("");
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
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
  }, [project, params, shown]);

  useEffect(() => {
    (async () => {
      const response = await findProjectImageService.findProjectImage(
        params.projectId
      );

      if (response.data) {
        setImagePreview(response.data.dataURL);
      }
    })();
  }, [findProjectImageService, params, shown]);

  const clearInputs = useCallback(() => {
    setTitle("");
    setStartDate("");
    setEndDate("");
    setDescription("");
  }, []);

  const handleCloseModal = useCallback(() => {
    clearInputs();
    setIsDeleteModalOpen(false);
    setImagePreview("");
    closeModal();
  }, [closeModal, clearInputs]);

  async function handleSubmit() {
    await updateProject();
    await updateProjectImage();

    handleCloseModal();
    await fetchProjects();
  }

  async function updateProject() {
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

    const response = await updateProjectService.updateProject({
      projectId: params.projectId,
      name: title,
      description,
      beginsAt,
      finishesAt,
    });

    const toastMsg = response.userFriendlyMessage;
    if (toastMsg) showToast(toastMsg, response.error);
  }

  async function updateProjectImage() {
    if (!newImageFile) return;

    const formData = new FormData();
    formData.append("file", newImageFile);
    formData.append("projectId", params.projectId);

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
      <>
        <div id={styles.wrapper}>
          <div id={styles.content}>
            <div id={styles.closeButtonWrapper}>
              <Modal.CloseButton closeModal={handleCloseModal} />
            </div>

            <div id={styles.contentHeader}>
              <div id={styles.contentHeaderTitleWrapper}>
                <Title>{updateProjectModalLanguage.title}</Title>
                <div id={styles.subtitleWrapper}>
                  <Subtitle>{updateProjectModalLanguage.subtitle}</Subtitle>
                </div>
              </div>

              {loggedInUserRole === "owner" && (
                <button
                  type="button"
                  id={styles.deleteButton}
                  onClick={() => setIsDeleteModalOpen(true)}
                >
                  <FiTrash2 color="#D85C43" size={24} />
                </button>
              )}
            </div>

            <div id={styles.formWrapper}>
              <Form.Container className={styles.form} onSubmit={handleSubmit}>
                <div id={styles.imageInputWrapper}>
                  <Form.ImageInput
                    src={imagePreview}
                    id="project-image"
                    onChange={handleOnImageInputChange}
                    width="6rem"
                    height="6rem"
                    component={() => (
                      <div id={styles.imageInput}>
                        <FiUploadCloud
                          className={styles.icon}
                          size={24}
                          color="var(--dark)"
                        />
                      </div>
                    )}
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
                title={updateProjectModalLanguage.updateButtonText}
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
          project={project}
        />
      </>
    </Modal.Container>
  );
}
