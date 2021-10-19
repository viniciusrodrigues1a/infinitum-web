import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import Cursor from "./Cursor";
import CustomTooltip from "./CustomTooltip";
import Dot from "./Dot";
import Squares, { MousePos } from "./Squares";
import XAxisTick from "./XAxisTick";
import YAxisTick from "./YAxisTick";

const fakeData = [
  { date: "seg", value: 1 },
  { date: "ter", value: 7 },
  { date: "qua", value: 16 },
  { date: "qui", value: 19 },
  { date: "sex", value: 0 },
  { date: "sab", value: 5 },
  { date: "dom", value: 1 },
];

/*
=============================
CONSTANTS
=============================
*/

const CONTAINER_HEIGHT = 280;
const XAXIS_HEIGHT = 34;
const YAXIS_WIDTH = 24;

const TOOLTIP_WIDTH = 130;
const TOOLTIP_HEIGHT = 40;

const DOT_OUTERMOST_CIRCLE_RADIUS = 32.5;
const DOT_INNER_CIRCLE_RADIUS = 16.25;
const DOT_INNERMOST_CIRCLE_RADIUS = 7.5;

const PIXELS_NEEDED_FOR_TOOLTIP_ABOVE_DOT =
  TOOLTIP_HEIGHT + DOT_OUTERMOST_CIRCLE_RADIUS + 14;
const MAXIMUM_Y_POSITION_FOR_TOOLTIP = 60;

let chartContainer: HTMLDivElement | null = null;

type RechartsMouseMoveEvent = {
  chartX: number;
  chartY: number;
  isTooltipActive: boolean;
};

export default function Chart(): React.ReactElement {
  const [mousePos, setMousePos] = useState<MousePos | null>(null);

  useEffect(() => {
    chartContainer = document.querySelector(
      "#dashboard-chart-responsive-container"
    );
  }, []);

  function handleOnMouseMove(e: RechartsMouseMoveEvent) {
    if (e.isTooltipActive) {
      setMousePos({ x: e.chartX, y: e.chartY });
    }
  }

  function handleOnMouseLeave() {
    setMousePos(null);
  }

  return (
    <ResponsiveContainer
      id="dashboard-chart-responsive-container"
      width="95%"
      height={CONTAINER_HEIGHT}
    >
      <AreaChart
        data={fakeData}
        onMouseMove={handleOnMouseMove}
        onMouseLeave={handleOnMouseLeave}
      >
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4376D8" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#4376D8" stopOpacity={0.05} />
          </linearGradient>
          <linearGradient id="areaLineGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#90AADB" stopOpacity={0.2} />
            <stop offset="50%" stopColor="#4376D8" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#90AADB" stopOpacity={0.2} />
          </linearGradient>

          <clipPath id="cartesianGridPath">
            <rect
              x={YAXIS_WIDTH}
              y={5}
              width="calc(100% - 28px)"
              height={CONTAINER_HEIGHT - XAXIS_HEIGHT - 5}
            />
          </clipPath>
        </defs>

        <g clipPath="url(#cartesianGridPath)">
          <Squares
            mousePos={mousePos}
            containerHeight={CONTAINER_HEIGHT}
            chartContainerWidth={
              chartContainer ? chartContainer.offsetWidth : null
            }
          />
        </g>

        <CartesianGrid opacity={0.35} />

        <Area
          type="monotone"
          dataKey="value"
          stroke="url(#areaLineGradient)"
          strokeWidth={4}
          fill="url(#areaGradient)"
          activeDot={({ cx, cy, index, payload }) => (
            <ActiveDot
              centerX={cx}
              centerY={cy}
              index={index}
              payload={payload}
            />
          )}
        />

        <Tooltip cursor={false} contentStyle={{ display: "none" }} />

        <XAxis
          dataKey="date"
          interval={0}
          axisLine={false}
          tickLine={false}
          tick={({ x, y, payload, index }) => (
            <XAxisTick
              x={x}
              y={y}
              payload={payload}
              index={index}
              dataLength={fakeData.length}
            />
          )}
        />
        <YAxis
          padding={{ top: 80 }}
          width={20}
          axisLine={false}
          tickLine={false}
          tick={({ x, y, payload }) => (
            <YAxisTick x={x} y={y} payload={payload} />
          )}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

/*
=============================
HELPER COMPONENTS
=============================
*/

type ActiveDotProps = {
  centerX: number;
  centerY: number;
  index: number;
  payload: { value: string };
};

function ActiveDot({ centerX, centerY, index, payload }: ActiveDotProps) {
  return (
    <g clipPath="url(#cartesianGridPath)">
      <Cursor
        centerX={centerX}
        centerY={centerY}
        containerHeight={CONTAINER_HEIGHT}
        pixelsNeededForTooltipAboveDot={PIXELS_NEEDED_FOR_TOOLTIP_ABOVE_DOT}
        maximumYPositionForTooltip={MAXIMUM_Y_POSITION_FOR_TOOLTIP}
      />
      <CustomTooltip
        centerX={centerX}
        centerY={centerY}
        index={index}
        dataLength={7}
        payload={payload}
        tooltipWidth={TOOLTIP_WIDTH}
        tooltipHeight={TOOLTIP_HEIGHT}
        chartContainerWidth={chartContainer ? chartContainer.offsetWidth : null}
        pixelsNeededForTooltipAboveDot={PIXELS_NEEDED_FOR_TOOLTIP_ABOVE_DOT}
        maximumYPositionForTooltip={MAXIMUM_Y_POSITION_FOR_TOOLTIP}
      />
      <Dot
        centerX={centerX}
        centerY={centerY}
        dotOutermostCircleRadius={DOT_OUTERMOST_CIRCLE_RADIUS}
        dotInnerCircleRadius={DOT_INNER_CIRCLE_RADIUS}
        dotInnermostCircleRadius={DOT_INNERMOST_CIRCLE_RADIUS}
      />
    </g>
  );
}
