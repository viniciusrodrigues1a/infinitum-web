import React, { useEffect, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

import inputStyles from "../_shared/Input.module.scss";
import styles from "./CustomSelect.module.scss";

type CustomSelectProps<T> = {
  items: Array<T>;
  keyExtractor: (item: T) => string;
  renderItem: (item: T) => React.ReactElement;
  onSelectChange?: (item: T) => void;
  defaultValue?: T | null;
  separator?: () => React.ReactElement;
  value?: T | null;
};

CustomSelect.defaultProps = {
  separator: () => <></>,
  onSelectChange: () => null,
  defaultValue: null,
  value: undefined,
};

export default function CustomSelect<T extends unknown>({
  items,
  renderItem,
  keyExtractor,
  onSelectChange = () => null,
  defaultValue,
  value = undefined,
  separator: Separator = () => <></>,
}: CustomSelectProps<T>): React.ReactElement {
  const [internalValue, setInternalValue] = useState<T | null>(
    defaultValue || null
  );
  const [optionsShown, setOptionsShown] = useState<boolean>(false);

  useEffect(() => {
    if (value === undefined && defaultValue !== undefined) {
      setInternalValue(defaultValue);
    }

    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value, defaultValue]);

  useEffect(() => {
    const body = document.querySelector("body");
    if (!body) {
      return;
    }

    function onClick() {
      if (optionsShown) {
        setOptionsShown(false);
      }
    }

    body.addEventListener("click", onClick);

    return () => body.removeEventListener("click", onClick);
  }, [optionsShown]);

  function withSeparator(Node: () => React.ReactElement) {
    return (
      <>
        <Node />
        <Separator />
      </>
    );
  }

  function internalRenderItem(item: T) {
    return (
      <button
        className={styles.itemButtonWrapper}
        type="button"
        onClick={() => {
          setInternalValue(item);
          onSelectChange(item);
        }}
      >
        {renderItem(item)}
      </button>
    );
  }

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={`${styles.button} ${inputStyles.input}`}
        onClick={() => setOptionsShown(!optionsShown)}
      >
        {internalValue && renderItem(internalValue)}
        <FiChevronDown color="#444444" size={28} />
      </button>

      {optionsShown && (
        <div className={styles.optionsDropdown}>
          {items.map((item, index) => (
            <div key={keyExtractor(item)}>
              {index === items.length - 1
                ? internalRenderItem(item)
                : withSeparator(() => internalRenderItem(item))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
