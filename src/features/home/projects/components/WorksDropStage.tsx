"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import HeroLightRays from "@/features/home/hero/components/HeroLightRays";
import WorksBowl from "./WorksBowl";
import { projectsData } from "../data/projectsData";

type Project = (typeof projectsData.projects)[number];

interface WorksDropStageProps {
  projects: Project[];
  reduceMotion: boolean;
  sectionProgress: MotionValue<number>;
}

export default function WorksDropStage({
  projects,
  reduceMotion,
  sectionProgress,
}: WorksDropStageProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });
  const beamOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.34, 0.7, 0.94, 1],
    [0, 0.02, 0.4, 1, 0.08, 0.06],
  );
  const beamScale = useTransform(
    scrollYProgress,
    [0, 0.1, 0.34, 0.72, 0.94],
    [0.2, 0.2, 0.72, 1.12, 1],
  );
  const poolOpacity = useTransform(
    scrollYProgress,
    [0, 0.14, 0.38, 0.74, 0.94, 1],
    [0, 0, 0.34, 0.92, 0.08, 0.06],
  );
  const worksTextOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.44, 0.74, 0.94],
    [0, 0, 0.18, 0.94, 0.72],
  );
  const bowlContentsOpacity = useTransform(
    sectionProgress,
    [0, 0.4, 0.48, 0.96, 1],
    [1, 1, 0.22, 0.22, 0],
  );
  const stageOpacity = useTransform(
    sectionProgress,
    [0, 0.975, 1],
    [1, 1, 0],
  );
  const visibleWorksTextOpacity = useTransform(
    [worksTextOpacity, bowlContentsOpacity],
    (values) => {
      const [textOpacity, contentsOpacity] = values as [number, number];
      return textOpacity * contentsOpacity;
    },
  );
  return (
    <>
      <motion.div
        className="sticky top-0 z-0 h-svh overflow-hidden bg-transparent pointer-events-none"
        style={{ opacity: stageOpacity }}
      >
        <motion.div
          aria-hidden="true"
          className="works-hero-rays"
          style={{
            opacity: reduceMotion ? 0.68 : beamOpacity,
            scaleY: reduceMotion ? 1 : beamScale,
          }}
        >
          <HeroLightRays isActive isImmediate />
        </motion.div>
        <motion.div
          aria-hidden="true"
          className="works-light-pool"
          style={{ opacity: reduceMotion ? 0.6 : poolOpacity }}
        />
        <motion.h2
          aria-hidden="true"
          className="works-stage-title"
          style={{
            opacity: reduceMotion ? 0.22 : visibleWorksTextOpacity,
          }}
        >
          WORKS
        </motion.h2>
        <WorksBowl
          projects={projects}
          progress={scrollYProgress}
          contentOpacity={bowlContentsOpacity}
          reduceMotion={reduceMotion}
        />
      </motion.div>
      <div
        ref={sceneRef}
        aria-hidden="true"
        className={`works-stage-scroll-space ${
          reduceMotion ? "works-stage-scroll-space--reduced" : ""
        }`}
      />
    </>
  );
}
