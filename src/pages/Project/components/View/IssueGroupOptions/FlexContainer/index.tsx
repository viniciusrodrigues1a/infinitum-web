import React from "react";

type FlexContainerProps = {
  children: React.ReactNode;
};

export default function FlexContainer({
  children,
}: FlexContainerProps): React.ReactElement {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
}
