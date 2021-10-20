import React, { useMemo } from "react";

type XAxisTickProps = {
  x: number;
  y: number;
  index: number;
  dataLength: number;
  payload: { value: string };
};

export default function XAxisTick({
  x,
  y,
  payload,
  index,
  dataLength,
}: XAxisTickProps): React.ReactElement {
  const textAnchor = useMemo(() => {
    if (index === 0) return "middle";
    if (index === dataLength - 1) return "end";
    return "end";
  }, [index, dataLength]);

  if (payload.value === "") {
    return <></>;
  }

  return (
    <text x={x} y={y + 20} textAnchor={textAnchor} fill="#999999" fontSize={14}>
      {payload.value}
    </text>
  );
}
