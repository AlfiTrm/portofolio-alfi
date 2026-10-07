"use client";

import { motion, type MotionValue } from "framer-motion";
import Image from "next/image";
import { projectsData } from "../data/projectsData";
import ProjectDrop from "./ProjectDrop";

type Project = (typeof projectsData.projects)[number];

const DROP_COUNT = 9;

export default function WorksBowl({
  projects,
  progress,
  contentOpacity,
  reduceMotion,
}: {
  projects: Project[];
  progress: MotionValue<number>;
  contentOpacity: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const dropProjects = projects.length
    ? Array.from(
        { length: DROP_COUNT },
        (_, index) => projects[(index * 2) % projects.length],
      )
    : [];

  return (
    <motion.div
      aria-hidden="true"
      className="works-bucket"
      style={{ x: "-50%" }}
    >
      <div className="works-bucket-interior" />
      {dropProjects.map((project, index) => (
        <ProjectDrop
          key={`${project.id}-${index}`}
          cardIndex={index}
          image={project.image}
          progress={progress}
          contentOpacity={contentOpacity}
          reduceMotion={reduceMotion}
        />
      ))}
      <svg
        className="works-bucket-face"
        viewBox="0 0 1000 340"
        preserveAspectRatio="none"
        focusable="false"
      >
        <defs>
          <linearGradient id="works-bucket-graphite" x1="0" y1="0" x2="1" y2="0.2">
            <stop offset="0%" stopColor="#222224" />
            <stop offset="7%" stopColor="#777477" />
            <stop offset="11%" stopColor="#252426" />
            <stop offset="27%" stopColor="#09090b" />
            <stop offset="50%" stopColor="#171719" />
            <stop offset="73%" stopColor="#09090b" />
            <stop offset="89%" stopColor="#252426" />
            <stop offset="94%" stopColor="#777477" />
            <stop offset="100%" stopColor="#222224" />
          </linearGradient>
          <linearGradient id="works-bucket-glaze" x1="0" y1="0" x2="0.2" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.14" />
            <stop offset="46%" stopColor="#fff" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.42" />
          </linearGradient>
          <radialGradient id="works-bucket-reflection" cx="50%" cy="28%" r="68%">
            <stop offset="0%" stopColor="#f5e8d4" stopOpacity="0.18" />
            <stop offset="36%" stopColor="#d9d0c4" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path
          d="M8 72 C180 142 820 142 992 72 C960 154 904 256 820 292 C680 330 320 330 180 292 C96 256 40 154 8 72 Z"
          fill="url(#works-bucket-graphite)"
          stroke="#c9c4ba"
          strokeOpacity="0.44"
          strokeWidth="2"
        />
        <path
          d="M8 72 C180 142 820 142 992 72 C960 154 904 256 820 292 C680 330 320 330 180 292 C96 256 40 154 8 72 Z"
          fill="url(#works-bucket-glaze)"
          opacity="0.6"
        />
        <path
          d="M8 72 C180 142 820 142 992 72 C960 154 904 256 820 292 C680 330 320 330 180 292 C96 256 40 154 8 72 Z"
          fill="url(#works-bucket-reflection)"
        />
        <path
          d="M19 83 C45 157 98 253 180 292 M981 83 C955 157 902 253 820 292"
          fill="none"
          stroke="#e1dcd2"
          strokeOpacity="0.28"
          strokeWidth="2"
        />
        <path
          d="M180 292 C320 330 680 330 820 292"
          fill="none"
          stroke="#000"
          strokeOpacity="0.58"
          strokeWidth="2"
        />
      </svg>
      <div className="works-bucket-rim" />
      <div className="works-bucket-mark">
        <Image src="/logo/logo.svg" alt="" width={512} height={463} />
        <span>TSAN</span>
      </div>
    </motion.div>
  );
}
