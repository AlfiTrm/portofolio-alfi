"use client";

import { memo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useScrollCycleReveal } from "@/shared/components/motion/PageScrollCycle";
import type { TimelineMoment } from "../../data/timelineData";
import TimelineVisualCluster from "./TimelineVisualCluster";

const milestoneReveal = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.12,
    },
  },
};

const milestoneSequence = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.06,
    },
  },
};

const milestonePartReveal = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.68, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const milestoneMediaReveal = {
  hidden: {
    opacity: 0,
    y: 36,
    scale: 0.94,
    clipPath: "inset(8% 8% 8% 8%)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.05, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function TimelineMilestoneCard({
  entry,
  index,
  active,
  reducedMotion,
}: {
  entry: TimelineMoment;
  index: number;
  active: boolean;
  reducedMotion: boolean;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.22 });
  const hasRevealed = useScrollCycleReveal(isInView, `timeline-${entry.id}`);
  const side = index % 2 === 0 ? "left" : "right";

  return (
    <motion.article
      ref={cardRef}
      id={`milestone-${entry.id}`}
      data-milestone-index={index}
      role="listitem"
      className={`journey-story-item is-${side}${entry.visuals.length ? " has-image" : " no-image"}${active ? " is-active" : ""}`}
      variants={milestoneReveal}
      initial={reducedMotion ? false : "hidden"}
      animate={reducedMotion || hasRevealed ? "visible" : "hidden"}
    >
      <motion.div
        className="journey-story-copy surface-aware-foreground"
        variants={milestoneSequence}
      >
        <motion.h3 variants={milestonePartReveal}>{entry.title}</motion.h3>
        <motion.p
          className="journey-story-note"
          variants={milestonePartReveal}
        >
          {entry.note}
        </motion.p>
      </motion.div>

      {entry.visuals.length > 0 && (
        <motion.div
          className="journey-story-media"
          variants={milestoneMediaReveal}
        >
          <TimelineVisualCluster visuals={entry.visuals} index={index} />
        </motion.div>
      )}
    </motion.article>
  );
}

export default memo(TimelineMilestoneCard);
