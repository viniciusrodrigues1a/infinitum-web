import React, { DetailedHTMLProps, HTMLAttributes, useMemo } from "react";
import { IconBaseProps } from "react-icons/lib";

import styles from "./Table.module.css";

type BaseElementProps<T extends Element> = DetailedHTMLProps<
  HTMLAttributes<T>,
  T
>;

type ChildrenProp = {
  children: React.ReactNode;
};

function Container({
  children,
  ...rest
}: ChildrenProp & BaseElementProps<HTMLTableElement>): React.ReactElement {
  return (
    <div className={styles.container}>
      <table
        {...rest}
        className={appendClassName(styles.table, rest.className)}
      >
        {children}
      </table>
    </div>
  );
}

function Head({ children, ...rest }: ChildrenProp): React.ReactElement {
  return <thead {...rest}>{children}</thead>;
}

function Body({ children, ...rest }: ChildrenProp): React.ReactElement {
  return <tbody {...rest}>{children}</tbody>;
}

function Row({
  children,
  ...rest
}: ChildrenProp & BaseElementProps<HTMLTableRowElement>): React.ReactElement {
  return (
    <tr {...rest} className={appendClassName(styles.tr, rest.className)}>
      {children}
    </tr>
  );
}

function eitherProp(one: string, another: string) {
  return (props: any, _propName: string, componentName: string) => {
    if (!props[one] && !props[another]) {
      return new Error(
        `One of props '${one}' or '${another}' was not specified in '${componentName}'.`
      );
    }
  };
}

Th.propTypes = {
  children: () => eitherProp("children", "leftIcon"),
  leftIcon: () => eitherProp("children", "leftIcon"),
  text: () => eitherProp("children", "text"),
};

type ThProps = BaseElementProps<HTMLTableCellElement> & {
  children?: React.ReactNode;
  leftIcon?: (
    props: BaseElementProps<HTMLElement | SVGElement> & IconBaseProps
  ) => React.ReactElement;
  text?: string;
  align?: "left" | "center" | "right";
};

Th.defaultProps = {
  children: null,
  leftIcon: null,
  text: "",
  align: "left",
};

function Th({
  children,
  leftIcon: LeftIcon,
  text,
  align,
  ...rest
}: ThProps): React.ReactElement {
  const justifyContentPosition = useMemo(() => {
    if (align === "left") return "flex-start";
    if (align === "center") return "center";
    if (align === "right") return "right";
  }, [align]);

  return (
    <th
      {...rest}
      style={{ textAlign: align }}
      className={appendClassName(styles.th, rest.className)}
    >
      {children || (
        <div
          style={{ justifyContent: justifyContentPosition }}
          className={styles.thDiv}
        >
          {LeftIcon && (
            <LeftIcon className={styles.thIcon} size={18} color="#444444" />
          )}
          <span className={styles.thText}>{text}</span>
        </div>
      )}
    </th>
  );
}

type TdProps = BaseElementProps<HTMLTableCellElement> &
  ChildrenProp & {
    align?: "left" | "center" | "right";
  };

Td.defaultProps = {
  align: "left",
};

function Td({ children, align, ...rest }: TdProps): React.ReactElement {
  return (
    <td
      style={{ textAlign: align }}
      {...rest}
      className={appendClassName(styles.td, rest.className)}
    >
      {children}
    </td>
  );
}

function appendClassName(
  append: string | undefined,
  to: string | undefined
): string {
  const leftSide = append || "";
  const separator = to ? " " : "";
  const rightSide = to || "";
  return `${leftSide}${separator}${rightSide}`;
}

const Table = {
  Container,
  Head,
  Body,
  Row,
  Th,
  Td,
};

export default Table;
