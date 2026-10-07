"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import HeroCopy from "./HeroCopy";
import HeroEntrance from "./HeroEntrance";
import HeroLightRays from "./HeroLightRays";
import HeroPortraitLayer from "./HeroPortraitLayer";
import { interactionFocusMs } from "@/shared/components/motion/interactionTiming";
import { heroEntranceMotion } from "../heroMotion";

type EntranceState = "checking" | "playing" | "ready";

interface HeroSectionProps {
  isReady: boolean;
  entranceState: EntranceState;
  keepBackdrop: boolean;
  scrollProgress: MotionValue<number>;
  onEntranceComplete: () => void;
  onOpenResume?: () => void;
}

export default function HeroSection({
  isReady,
  entranceState,
  keepBackdrop,
  scrollProgress,
  onEntranceComplete,
  onOpenResume,
}: HeroSectionProps) {
  const [resumePending, setResumePending] = useState(false);
  const resumeTimerRef = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();
  const heroReady = isReady && entranceState === "ready";
  const backdropReady = heroReady || keepBackdrop;
  const copyY = useTransform(
    scrollProgress,
    [0, 1],
    ["0svh", reduceMotion ? "0svh" : "-16svh"],
  );
  const portraitGrayscale = useTransform(
    scrollProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 1],
  );
  const portraitFilter = useMotionTemplate`grayscale(${portraitGrayscale})`;
  const copyOpacity = useTransform(
    scrollProgress,
    [0, 0.55, 1],
    reduceMotion ? [1, 1, 1] : [1, 0.9, 0.08],
  );
  const raysOpacity = useTransform(
    scrollProgress,
    [0, 0.3, 0.82, 1],
    reduceMotion ? [1, 1, 1, 1] : [1, 0.92, 0.36, 0],
  );

  const beginResume = () => {
    if (resumePending || !onOpenResume) return;

    if (reduceMotion) {
      onOpenResume();
      return;
    }

    setResumePending(true);
    resumeTimerRef.current = window.setTimeout(() => {
      resumeTimerRef.current = null;
      setResumePending(false);
      onOpenResume();
    }, interactionFocusMs);
  };

  useEffect(() => () => {
    if (resumeTimerRef.current !== null) {
      window.clearTimeout(resumeTimerRef.current);
    }
  }, []);

  useEffect(() => {
    if (!resumePending) return;

    const cancelPendingResume = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      event.preventDefault();
      if (resumeTimerRef.current !== null) {
        window.clearTimeout(resumeTimerRef.current);
        resumeTimerRef.current = null;
      }
      setResumePending(false);
    };

    window.addEventListener("keydown", cancelPendingResume);
    return () => window.removeEventListener("keydown", cancelPendingResume);
  }, [resumePending]);

  const revealState = heroReady
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: reduceMotion ? 0 : 28 };

  return (
    <section
      data-restore-surface="hero"
      className="hero-transition-stage sticky top-0 z-0 isolate h-svh min-h-[320px] overflow-hidden bg-stage focus:outline-none"
    >
      <div className="absolute inset-0 bg-stage" aria-hidden="true" />
      <HeroPortraitLayer
        isReady={isReady}
        entranceState={entranceState}
        keepBackdrop={keepBackdrop}
        portraitFilter={portraitFilter}
      />

      <motion.div
        className="hero-backdrop-light pointer-events-none absolute inset-0 z-[15]"
        initial={false}
        animate={{ opacity: backdropReady ? 1 : 0 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                duration: heroEntranceMotion.light.duration,
                ease: heroEntranceMotion.light.ease,
              }
        }
        aria-hidden="true"
      >
        <motion.div className="absolute inset-0" style={{ opacity: raysOpacity }}>
          <HeroLightRays isActive={backdropReady} isImmediate={keepBackdrop} />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute inset-0 z-20"
        initial={false}
        animate={revealState}
        transition={{
          duration: reduceMotion ? 0 : heroEntranceMotion.copy.duration,
          delay: reduceMotion ? 0 : heroEntranceMotion.copy.delay,
          ease: heroEntranceMotion.copy.ease,
        }}
      >
        <motion.div className="absolute inset-0" style={{ y: copyY, opacity: copyOpacity }}>
          <HeroCopy
            isActive={heroReady}
            isResumePending={resumePending}
            onOpenResume={beginResume}
          />
        </motion.div>
      </motion.div>

      {entranceState === "playing" && (
        <HeroEntrance isReady={isReady} onComplete={onEntranceComplete} />
      )}
    </section>
  );
}
