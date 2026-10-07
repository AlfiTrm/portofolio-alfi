"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { PanelsTopLeft, PenTool, ServerCog, ShieldCheck } from "lucide-react";
import { useRef } from "react";

const focusAreas = [
  ["Frontend Engineer", "Interfaces that feel clear, responsive, and considered.", "hover:bg-[#e8eeee]", PanelsTopLeft],
  ["Quality Assurance", "Testing, accessibility, and the edge cases behind a smoother product.", "hover:bg-[#ebeee2]", ShieldCheck],
  ["Backend", "APIs, NestJS, and the systems that keep content moving.", "hover:bg-[#f0e8dc]", ServerCog],
  ["UI/UX Design", "Exploring structure, visual direction, and flows that feel natural to use.", "hover:bg-[#efe3e4]", PenTool],
] as const;

export default function ExploringSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const blackY = useTransform(scrollYProgress, [0.08, 0.38], ["0%", "-100%"]);
  const titleY = useTransform(scrollYProgress, [0.1, 0.4], ["-8vh", "0vh"]);
  const cardsY = useTransform(scrollYProgress, [0.36, 0.62], ["12vh", "0vh"]);
  const cardsOpacity = useTransform(scrollYProgress, [0.38, 0.56], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="exploring"
      tabIndex={-1}
      aria-labelledby="exploring-heading"
      data-restore-surface="light"
      className="relative h-[165vh] bg-[#f2ede6] text-black"
    >
      <div className="sticky top-0 h-svh overflow-hidden px-5 md:px-10">
        <motion.div
          data-restore-surface="dark"
          className="absolute inset-0 bg-black"
          style={{ y: reduceMotion ? "-100%" : blackY }}
          aria-hidden="true"
        />
        <motion.h2
          id="exploring-heading"
          style={{
            y: reduceMotion ? 0 : titleY,
          }}
          className="relative z-10 mx-auto w-full max-w-[1440px] pt-[12vh] text-[clamp(2rem,11vw,12rem)] leading-[0.78] tracking-[-0.06em] text-black [font-family:var(--font-akira)] sm:text-[clamp(3rem,10.5vw,12rem)] lg:text-[clamp(3.6rem,12.5vw,12rem)]"
        >
          EXPLORING
        </motion.h2>

        <motion.div
          style={{
            opacity: reduceMotion ? 1 : cardsOpacity,
            y: reduceMotion ? 0 : cardsY,
          }}
          className="absolute bottom-8 left-5 right-5 z-10 mx-auto max-w-[1440px] md:bottom-10 md:left-10 md:right-10"
        >
          <p className="mb-7 max-w-xl text-xl leading-snug tracking-[-0.025em] md:mb-9 md:text-2xl">
            These are the areas I&apos;m exploring right now. More will be added as I go.
          </p>

          <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-smooth">
            {focusAreas.map(([label, description, accent, Icon], index) => (
              <div
                key={label}
                className={`group relative flex min-h-72 min-w-[82vw] snap-start flex-col justify-end overflow-hidden border-b border-l border-black/30 p-6 transition-colors duration-500 md:min-w-[42vw] md:p-8 xl:min-h-80 xl:min-w-[calc(33.333%_-_0.5rem)] ${accent} ${index % 3 === 0 ? "xl:snap-start" : "xl:[scroll-snap-align:none]"}`}
              >
                <Icon
                  className="absolute right-7 top-7 size-10 stroke-[1.25] text-black/[0.08] transition-colors duration-500 group-hover:text-black/[0.18]"
                  aria-hidden="true"
                />
                <div className="relative z-10">
                  <h3 className="mb-2 text-lg tracking-[-0.02em]">{label}</h3>
                  <p className="max-w-xs text-sm leading-relaxed text-black/58">{description}</p>
                </div>
              </div>
            ))}
            <div
              className="hidden xl:block xl:min-w-[calc(66.666%_-_0.25rem)]"
              aria-hidden="true"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
