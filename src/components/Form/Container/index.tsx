import React, { DetailedHTMLProps, FormEvent, HTMLAttributes } from "react";

export type ContainerProps = DetailedHTMLProps<
  HTMLAttributes<HTMLFormElement>,
  HTMLFormElement
> & {
  children: React.ReactNode;
  onSubmit?: (e: FormEvent) => void;
};

Container.defaultProps = {
  onSubmit: () => null,
};

export default function Container({
  children,
  onSubmit,
  ...rest
}: ContainerProps): React.ReactElement {
  return (
    <form onSubmit={onSubmit} {...rest}>
      {children}
    </form>
  );
}
