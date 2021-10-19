import React from "react";

type DotProps = {
  centerX: number;
  centerY: number;
  dotOutermostCircleRadius: number;
  dotInnerCircleRadius: number;
  dotInnermostCircleRadius: number;
};

export default function Dot({
  centerX,
  centerY,
  dotOutermostCircleRadius,
  dotInnerCircleRadius,
  dotInnermostCircleRadius,
}: DotProps): React.ReactElement {
  return (
    <g>
      <circle
        cx={centerX}
        cy={centerY}
        r={dotOutermostCircleRadius}
        fill="#4376D8"
        fillOpacity="0.2"
      />

      <circle
        cx={centerX}
        cy={centerY}
        r={dotInnerCircleRadius}
        fill="#4376D8"
        fillOpacity="0.4"
      />
      <circle
        cx={centerX}
        cy={centerY}
        r={dotInnermostCircleRadius}
        fill="url(#activeDotGradient)"
      />
      <defs>
        <linearGradient
          id="activeDotGradient"
          x1={centerX - 5}
          y1={centerY - 5}
          x2={centerX + 5}
          y2={centerY + 5}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#EEEEEE" stopOpacity={1} />
          <stop offset="100%" stopColor="#4376D8" stopOpacity={1} />
        </linearGradient>
      </defs>
    </g>
  );
}
