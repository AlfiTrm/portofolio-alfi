"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import TextRoll from "@/components/ui/text-roll";
import {
  usePageScrollCycle,
  useScrollCycleReveal,
} from "@/shared/components/motion/PageScrollCycle";
import { aboutData } from "../data/aboutData";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.8, once: false });
  const scrollCycle = usePageScrollCycle();
  const hasRevealed = useScrollCycleReveal(isInView, "about-section");
  const reduceMotion = useReducedMotion();
  const contentIsActive = hasRevealed || Boolean(reduceMotion);

  return (
    <section
      ref={sectionRef}
      id="about"
      tabIndex={-1}
      aria-labelledby="about-heading"
      data-restore-surface="light"
      className="relative z-10 min-h-[82svh] bg-white text-black focus:outline-none lg:min-h-svh"
    >
      <div className="relative z-10 mx-auto grid min-h-[82svh] w-full max-w-[1440px] grid-cols-1 items-center gap-12 px-5 py-28 lg:min-h-svh lg:grid-cols-12 lg:gap-8 lg:px-10 lg:py-24">
        <div className="lg:col-span-5 lg:col-start-1 lg:-translate-y-[3svh]">
          <h2
            id="about-heading"
            className="max-w-[9ch] font-sans text-[clamp(3.25rem,6vw,7rem)] font-medium leading-[0.9] tracking-[-0.065em]"
          >
            {aboutData.titleLines.map((line) => (
              <TextRoll
                key={`${scrollCycle}-${line}`}
                animateOnMount
                center
                isActive={contentIsActive}
                className="whitespace-nowrap"
              >
                {line}
              </TextRoll>
            ))}
          </h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 28 }}
          animate={contentIsActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{
            duration: reduceMotion ? 0 : 0.75,
            delay: reduceMotion ? 0 : 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-[55ch] text-[clamp(1rem,1.2vw,1.25rem)] leading-[1.72] text-black/72 lg:col-span-4 lg:col-start-8 lg:translate-y-[3svh]"
        >
          {aboutData.description}
        </motion.p>
      </div>
    </section>
  );
}
