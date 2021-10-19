import React, { useMemo } from "react";

type TooltipPosition = "left" | "middle" | "right";

type CustomTooltipProps = {
  centerX: number;
  centerY: number;
  index: number;
  dataLength: number;
  payload: { value: string };
  tooltipWidth: number;
  tooltipHeight: number;
  chartContainerWidth: number | null;
  pixelsNeededForTooltipAboveDot: number;
  maximumYPositionForTooltip: number;
};

export default function CustomTooltip({
  centerX,
  centerY,
  index,
  dataLength,
  payload,
  tooltipWidth,
  tooltipHeight,
  chartContainerWidth,
  pixelsNeededForTooltipAboveDot,
  maximumYPositionForTooltip,
}: CustomTooltipProps): React.ReactElement {
  const tooltipPosition: TooltipPosition = useMemo(() => {
    if (centerX < tooltipWidth) return "left";
    if (chartContainerWidth) {
      if (chartContainerWidth - centerX < tooltipWidth) return "right";
    } else if (index === dataLength - 1) return "right";
    return "middle";
  }, [index, dataLength, centerX, chartContainerWidth, tooltipWidth]);

  const rectCalculatedXPosition = useMemo(() => {
    const margin = 2;
    if (tooltipPosition === "left") return centerX - margin;
    if (tooltipPosition === "right") return centerX - tooltipWidth + margin;
    return centerX - tooltipWidth / 2;
  }, [centerX, tooltipPosition, tooltipWidth]);

  const textCalculatedXPosition = useMemo(() => {
    let xPos: number;
    if (tooltipPosition === "left") xPos = centerX;
    else if (tooltipPosition === "right") xPos = centerX - tooltipWidth;
    else xPos = centerX - tooltipWidth / 2;
    return xPos + 25;
  }, [centerX, tooltipPosition, tooltipWidth]);

  const rectCalculatedYPosition = useMemo(() => {
    const difference = centerY - pixelsNeededForTooltipAboveDot;
    if (difference > maximumYPositionForTooltip)
      return maximumYPositionForTooltip;

    return difference;
  }, [centerY, maximumYPositionForTooltip, pixelsNeededForTooltipAboveDot]);

  return (
    <g>
      <rect
        x={rectCalculatedXPosition}
        y={rectCalculatedYPosition}
        width={tooltipWidth}
        height={tooltipHeight}
        fill="#fff"
        stroke="#BBBBBB"
        strokeWidth="1"
        rx="4"
        filter="drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.20))"
      />
      <text
        x={textCalculatedXPosition}
        y={rectCalculatedYPosition + 25}
        fontWeight="bold"
      >
        {payload.value} tickets
      </text>
    </g>
  );
}
