import React, { useCallback, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";

import styles from "./AddParticipantsModal.module.scss";

import Title from "../Title";
import Subtitle from "../Subtitle";
import Modal from "../Modal";
import CreateButton from "../CreateButton";

import { ReactComponent as TagIcon } from "../../assets/tag-x-circle.svg";
import { useAPIService } from "../../contexts/APIServiceContext";
import { useProjects } from "../../contexts/ProjectsContext";
import { FormattedProject } from "../../services/type-defs/FormattedProject";
import showToast from "../../utils/showToast";

type AddParticipantsModalProps = {
  closeModal: () => void;
  shown: boolean;
  project: FormattedProject;
};

export default function AddParticipantsModal({
  shown,
  closeModal,
  project,
}: AddParticipantsModalProps): React.ReactElement {
  const { inviteToProjectService } = useAPIService();
  const { fetchProjects } = useProjects();

  const [tags, setTags] = useState<Array<string>>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleCloseModal = useCallback(() => {
    closeModal();
    setTags([]);
  }, [closeModal]);

  const sanitizeTag = useCallback(
    (tag: string) => tag.trim().replaceAll(",", ""),
    []
  );

  const tagOnAnimationEnd = useCallback(
    (e: React.AnimationEvent<HTMLButtonElement>) => {
      e.currentTarget.classList.remove(styles.invalidTag);
    },
    []
  );

  const showDuplicatedTagAnimation = useCallback((tag: string) => {
    const tagClassName = `.${styles.tag}`;
    const elem = Array.from(document.querySelectorAll(tagClassName)).find(
      (e) => e.textContent === tag
    );

    if (!elem) return;

    elem.classList.add(styles.invalidTag);
  }, []);

  const addTag = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const inputElem = inputRef.current;
      if (!inputElem) return;

      const keys = ["Enter", " ", ","];
      const hasKeyBeenPressed = keys.indexOf(event.key) !== -1;

      if (!hasKeyBeenPressed) return;

      const newTag = sanitizeTag(inputElem.value);
      const isTagDuplicated = tags.indexOf(newTag) !== -1;

      if (isTagDuplicated) {
        showDuplicatedTagAnimation(newTag);
      }

      const isTagEmpty = newTag === "";

      if (!isTagDuplicated && !isTagEmpty) {
        setTags([...tags, newTag]);
      }

      inputElem.value = "";
    },
    [tags, sanitizeTag, showDuplicatedTagAnimation]
  );

  const removeTag = useCallback((tag: string) => {
    setTags((previousTags) => previousTags.filter((t) => t !== tag));
  }, []);

  function focusTagInput() {
    const inputElem = inputRef.current;

    if (!inputElem) return;

    inputElem.focus();
  }

  async function handleSubmit() {
    if (tags.length === 0) return;

    /* eslint-disable-next-line */
    for (const tag of tags) {
      /* eslint-disable-next-line */
      const response = await inviteToProjectService.inviteToProject({
        projectId: project.projectId,
        projectName: project.name,
        roleName: "member",
        accountEmail: tag,
      });

      const toastMsg = response.userFriendlyMessage;
      if (toastMsg) showToast(toastMsg, response.error);
    }

    handleCloseModal();
    await fetchProjects();
  }

  return (
    <Modal.Container
      shown={shown}
      closeModal={handleCloseModal}
      changeScroll={false}
    >
      <div id={styles.wrapper}>
        <div id={styles.content}>
          <div id={styles.closeButtonWrapper}>
            <Modal.CloseButton closeModal={handleCloseModal} />
          </div>

          <Title>Convide usuários</Title>
          <Subtitle>Convide usuários para seu projeto</Subtitle>

          <form id={styles.formWrapper} onSubmit={(e) => e.preventDefault()}>
            <button
              type="button"
              id={styles.tagsInputContainer}
              onClick={focusTagInput}
            >
              {tags.map((tag) => (
                <button
                  type="button"
                  key={tag}
                  className={styles.tag}
                  onClick={() => removeTag(tag)}
                  onAnimationEnd={tagOnAnimationEnd}
                >
                  {tag}
                  <TagIcon className={styles.tagIcon} />
                </button>
              ))}
              <input
                ref={inputRef}
                type="text"
                placeholder="E-mail do usuário"
                onKeyUp={addTag}
              />
            </button>

            <div>
              <CreateButton
                id={styles.submitButton}
                title="Enviar convite"
                icon={FiSend}
                onClick={handleSubmit}
              />
            </div>
          </form>
        </div>
      </div>
    </Modal.Container>
  );
}
