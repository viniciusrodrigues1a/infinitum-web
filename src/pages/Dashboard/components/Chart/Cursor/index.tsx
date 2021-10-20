import React, { useMemo } from "react";

type CursorProps = {
  centerX: number;
  centerY: number;
  containerHeight: number;
  pixelsNeededForTooltipAboveDot: number;
  maximumYPositionForTooltip: number;
};

export default function Cursor({
  centerX,
  centerY,
  containerHeight,
  pixelsNeededForTooltipAboveDot,
  maximumYPositionForTooltip,
}: CursorProps): React.ReactElement {
  const points = useMemo(() => {
    const padding = 10;
    let startingYPositionForTooltip =
      centerY - pixelsNeededForTooltipAboveDot + padding;
    if (startingYPositionForTooltip > maximumYPositionForTooltip) {
      startingYPositionForTooltip = maximumYPositionForTooltip + padding;
    }

    return [
      { x: centerX, y: startingYPositionForTooltip },
      { x: centerX, y: containerHeight },
    ];
  }, [
    centerX,
    centerY,
    containerHeight,
    maximumYPositionForTooltip,
    pixelsNeededForTooltipAboveDot,
  ]);
  const pathDrawn = useMemo(() => {
    const joinedPoints = points.map((p) => `${p.x},${p.y}`).join("L");
    return `M${joinedPoints}`;
  }, [points]);

  return (
    <g>
      <path
        stroke="url(#cursorGradient)"
        strokeWidth={2}
        fill="url(#cursorGradient)"
        pointerEvents="none"
        d={pathDrawn}
      />
      <defs>
        <linearGradient
          id="cursorGradient"
          x1={points[0].x}
          y1={points[0].y}
          x2={points[1].x}
          y2={points[1].y}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#4376D8" stopOpacity={1} />
          <stop offset="80%" stopColor="#4376D8" stopOpacity={0.1} />
        </linearGradient>
      </defs>
    </g>
  );
}
