import React from "react";

type YAxisTickProps = {
  x: number;
  y: number;
  payload: { value: string };
};

export default function YAxisTick({
  x,
  y,
  payload,
}: YAxisTickProps): React.ReactElement {
  return (
    <text x={x} y={y} textAnchor="end" fill="#999999" fontSize={14}>
      {payload.value}
    </text>
  );
}
