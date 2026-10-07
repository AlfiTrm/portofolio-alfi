"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { timelineMilestones } from "../data/timelineData";
import { useTimelineRuntime } from "../hooks/useTimelineRuntime";
import TimelineMilestoneCard from "./timeline/TimelineMilestoneCard";
import TimelineRouteFallback from "./timeline/TimelineRouteFallback";
import "../styles/timeline-story.css";
import "../styles/timeline-visuals.css";
import "../styles/timeline-route.css";

const TimelineRouteScene = dynamic(
  () => import("./timeline/TimelineRouteScene"),
  { ssr: false },
);

export default function ExperienceTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const storyListRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const {
    activeMilestoneIndex,
    handleSceneReady,
    handleSceneUnavailable,
    sceneReady,
    shouldEnhance,
    visibleProgress,
  } = useTimelineRuntime({
    sectionRef,
    storyListRef,
    reducedMotion: reduceMotion,
  });

  return (
    <section
      ref={sectionRef}
      id="journey"
      tabIndex={-1}
      aria-label="Alfi's timeline"
      data-restore-surface="light"
      className="journey-section focus:outline-none"
    >
      <div className="journey-container">
        <div className="journey-story-grid">
          <aside
            className={`journey-route-stage${sceneReady ? " has-webgl" : ""}`}
            aria-hidden="true"
          >
            <div className={`journey-route-static${sceneReady ? " is-hidden" : ""}`}>
              <TimelineRouteFallback
                milestones={timelineMilestones}
                activeMilestoneIndex={activeMilestoneIndex}
                progress={visibleProgress}
              />
            </div>
            {shouldEnhance && (
              <TimelineRouteScene
                milestones={timelineMilestones}
                progress={visibleProgress}
                activeMilestoneIndex={activeMilestoneIndex}
                reducedMotion={Boolean(reduceMotion)}
                onReady={handleSceneReady}
                onUnavailable={handleSceneUnavailable}
              />
            )}
          </aside>

          <div
            ref={storyListRef}
            className="journey-story-list"
            role="list"
            aria-label="Alfi's journey from university to today"
          >
            {timelineMilestones.map((entry, index) => (
              <TimelineMilestoneCard
                key={entry.id}
                entry={entry}
                index={index}
                active={index === activeMilestoneIndex}
                reducedMotion={Boolean(reduceMotion)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
