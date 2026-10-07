"use client";

import { useReducedMotion, useScroll } from "framer-motion";
import { useRef } from "react";
import ProjectCard from "./ProjectCard";
import WorksDropStage from "./WorksDropStage";
import { projectsData } from "../data/projectsData";
import "../styles/works-drop-stage.css";

export default function ProjectsSection() {
  const reduceMotion = Boolean(useReducedMotion());
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={sectionRef}
      id="projects"
      tabIndex={-1}
      aria-labelledby="projects-heading"
      data-restore-surface="dark"
      className="relative isolate bg-black text-[#f2ede6] focus:outline-none"
    >
      <h2 id="projects-heading" className="sr-only">
        Projects
      </h2>

      <WorksDropStage
        projects={projectsData.projects.slice(0, 3)}
        reduceMotion={reduceMotion}
        sectionProgress={sectionProgress}
      />

      <div className="works-gallery relative z-10">
        <div
          className={`mx-auto w-full max-w-[1440px] px-5 pb-24 md:px-10 md:pb-32 2xl:px-0 ${
            reduceMotion ? "pt-16 md:pt-24" : "pt-[100svh]"
          }`}
        >
          <div className="works-gallery-list">
            {projectsData.projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                period={project.period}
                focus={project.focus}
                image={project.image}
                liveUrl={project.liveUrl}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
