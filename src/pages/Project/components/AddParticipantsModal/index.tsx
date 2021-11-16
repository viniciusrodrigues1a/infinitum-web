import React, { FormEvent, useCallback, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";

import styles from "./AddParticipantsModal.module.scss";

import Title from "../../../../components/Title";
import Subtitle from "../../../../components/Subtitle";
import Modal from "../../../../components/Modal";
import CreateButton from "../../../../components/CreateButton";

import { ReactComponent as TagIcon } from "../../../../assets/tag-x-circle.svg";

type AddParticipantsModalProps = {
  closeModal: () => void;
  shown: boolean;
};

export default function AddParticipantsModal({
  shown,
  closeModal,
}: AddParticipantsModalProps): React.ReactElement {
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

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
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

          <form id={styles.formWrapper} onSubmit={handleSubmit}>
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
          </form>

          <div>
            <CreateButton
              id={styles.submitButton}
              title="Enviar convite"
              icon={FiSend}
            />
          </div>
        </div>
      </div>
    </Modal.Container>
  );
}
