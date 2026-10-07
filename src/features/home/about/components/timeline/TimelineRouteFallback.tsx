"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { TimelineMoment } from "../../data/timelineData";

interface TimelineRouteFallbackProps {
  milestones: TimelineMoment[];
  activeMilestoneIndex: number;
  progress: number;
}

type Point = { x: number; y: number };

const ROUTE_X = [900, 300, 900, 300, 984, 300];
const VIEWBOX_WIDTH = 1200;
const ROW_HEIGHT = 1000;
const EDGE_INSET = 400;
const HANDOFF_OVERRUN = 48;

function createRoute(count: number, contentHeightRatio: number) {
  const safeCount = Math.max(count, 1);
  const contentRatio = Math.min(1, Math.max(0.1, contentHeightRatio));
  const height = safeCount * ROW_HEIGHT / contentRatio;
  const nodes = Array.from({ length: count }, (_, index): Point => ({
    x: ROUTE_X[index % ROUTE_X.length],
    y: (index + 0.5) * ROW_HEIGHT,
  }));
  const points: Point[] = [{ x: VIEWBOX_WIDTH / 2, y: EDGE_INSET }];

  nodes.forEach((node, index) => {
    points.push(node);
    if (index < nodes.length - 1) {
      let bridgeX = index % 2 === 0 ? VIEWBOX_WIDTH - 112 : 112;
      if (index === nodes.length - 2) {
        bridgeX = nodes[index + 1]?.x ?? VIEWBOX_WIDTH - 112;
      }

      points.push({
        x: bridgeX,
        y: (index + 1) * ROW_HEIGHT,
      });
    }
  });
  const tailX = nodes[nodes.length - 1]?.x ?? VIEWBOX_WIDTH / 2;
  points.push({ x: tailX, y: height + HANDOFF_OVERRUN });

  const path = points.slice(0, -1).reduce((result, point, index) => {
    const next = points[index + 1];
    const previous = points[index - 1] ?? point;
    const following = points[index + 2] ?? next;
    const controlOne = {
      x: point.x + (next.x - previous.x) / 6,
      y: point.y + (next.y - previous.y) / 6,
    };
    const controlTwo = {
      x: next.x - (following.x - point.x) / 6,
      y: next.y - (following.y - point.y) / 6,
    };

    if (index === points.length - 2) {
      return `${result} L ${next.x} ${next.y}`;
    }

    return `${result} C ${controlOne.x} ${controlOne.y}, ${controlTwo.x} ${controlTwo.y}, ${next.x} ${next.y}`;
  }, `M ${points[0].x} ${points[0].y}`);

  const nodeAngles = nodes.map((_, index) => {
    const pointIndex = 1 + index * 2;
    const previous = points[pointIndex - 1] ?? points[0];
    const next = points[pointIndex + 1] ?? points[pointIndex];
    return Math.atan2(next.y - previous.y, next.x - previous.x) + Math.PI / 2;
  });

  return { nodes, path, height, nodeAngles };
}

export default function TimelineRouteFallback({
  milestones,
  activeMilestoneIndex,
  progress,
}: TimelineRouteFallbackProps) {
  const fallbackRef = useRef<HTMLDivElement>(null);
  const [contentHeightRatio, setContentHeightRatio] = useState(0.97);
  const { nodes, path, height, nodeAngles } = useMemo(
    () => createRoute(milestones.length, contentHeightRatio),
    [contentHeightRatio, milestones.length],
  );
  const pathStyle = {
    strokeDasharray: 1,
    strokeDashoffset: 1 - progress,
  } as CSSProperties;

  useEffect(() => {
    const fallback = fallbackRef.current;
    const stage = fallback?.parentElement?.parentElement;
    const grid = stage?.parentElement;
    if (!stage || !grid) return;

    const updateRatio = () => {
      const ratio = Math.min(
        1,
        Math.max(0.1, grid.clientHeight / Math.max(stage.clientHeight, 1)),
      );
      setContentHeightRatio((current) =>
        Math.abs(ratio - current) > 0.001 ? ratio : current,
      );
    };

    updateRatio();
    const observer = new ResizeObserver(updateRatio);
    observer.observe(grid);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={fallbackRef} className="journey-route-fallback" aria-hidden="true">
      <svg
        className="journey-route-drawing"
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${height}`}
        preserveAspectRatio="none"
        focusable="false"
      >
        <path
          className="journey-route-line-shadow"
          d={path}
          pathLength={1}
          style={pathStyle}
        />
        <path
          className="journey-route-line"
          d={path}
          pathLength={1}
          style={pathStyle}
        />
        <path
          className="journey-route-line-highlight"
          d={path}
          pathLength={1}
          style={pathStyle}
        />
      </svg>
      {milestones.map((milestone, index) => {
        const point = nodes[index] ?? { x: 600, y: ROW_HEIGHT / 2 };
        const active = index === activeMilestoneIndex;

        return (
          <span
            key={milestone.id}
            className={active ? "journey-route-node is-active" : "journey-route-node"}
            style={{
              left: `${(point.x / VIEWBOX_WIDTH) * 100}%`,
              top: `${(point.y / height) * 100}%`,
              "--journey-route-angle": `${nodeAngles[index] ?? 0}rad`,
              opacity: 1,
            } as CSSProperties}
          >
            <span className="journey-route-marker-halo" />
            <span className="journey-route-marker" />
          </span>
        );
      })}
    </div>
  );
}
