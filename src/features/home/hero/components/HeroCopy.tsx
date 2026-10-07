"use client";

import { motion } from "framer-motion";
import TextRoll from "@/components/ui/text-roll";
import FlipText from "@/shared/components/motion/FlipText";
import BodyLineReveal from "@/shared/components/text/BodyLineReveal";
import { personalData } from "../data/personalData";
import { heroEntranceMotion } from "../heroMotion";

interface HeroCopyProps {
  isActive?: boolean;
  isResumePending?: boolean;
  onOpenResume?: () => void;
}

export default function HeroCopy({
  isActive = false,
  isResumePending = false,
  onOpenResume,
}: HeroCopyProps) {
  return (
    <div className="absolute inset-0 z-20">
      <div className="relative mx-auto h-full w-full max-w-[1440px] px-5 pt-20 lg:px-10 lg:pt-24">
        <div className="absolute right-5 top-[17.5%] hidden w-[9.25rem] lg:right-10 lg:block">
          <BodyLineReveal
            isActive
            skipAnimation
            className="text-justify text-[0.55rem] uppercase leading-[1.45] tracking-[0.16em] text-[#efe6d1]/58"
            lines={["made from quiet choices,", "sharp edges, soft light,", "and things that just", "feel right."]}
          />
        </div>

        <div className="flex h-full w-full flex-col justify-center">
          <motion.div className="absolute inset-x-5 top-[11svh] flex flex-col items-center text-center lg:hidden">
            <p className="text-[0.62rem] uppercase leading-none tracking-[0.22em] text-[#efe6d1]/62">hi, i&apos;m</p>
            <h1 className="mt-3 text-[clamp(2.5rem,12vw,3.65rem)] leading-[0.82] tracking-[-0.035em] text-[#f0e7d4] [font-family:var(--font-akira)]">
              <span className="block">Alfi</span>
              <span className="block">Tsani</span>
            </h1>
            <p className="mt-4 text-[0.62rem] uppercase leading-[1.5] tracking-[0.16em] text-[#efe6d1]/72">
              {personalData.title}
            </p>
          </motion.div>

          <div className="hidden min-h-[74vh] w-full grid-cols-[1fr_auto_1fr] items-center gap-1 lg:grid lg:gap-4">
            <div className="self-start pt-[26vh]">
              <p className="text-left text-[clamp(1.5rem,7vw,7rem)] leading-[0.92] tracking-[-0.02em] text-[#f0e7d4] [font-family:var(--font-akira)]">
                <TextRoll
                  animateOnMount
                  center
                  isActive={isActive}
                  duration={heroEntranceMotion.title.duration}
                  stagger={heroEntranceMotion.title.stagger}
                  className="text-[#f0e7d4]"
                >
                  port
                </TextRoll>
              </p>
              <BodyLineReveal
                isActive
                skipAnimation
                className="mt-6 text-left text-[clamp(0.4rem,0.8vw,0.56rem)] uppercase tracking-[0.2em] text-[#efe6d1]/58 lg:mt-[4.75rem] lg:pl-7 lg:tracking-[0.28em]"
                lineClassName="leading-[1.5]"
                lines={["currently powered by coffee", "and questionable sleep"]}
              />
            </div>

            <div />

            <div className="self-end pb-[19vh]">
              <p className="text-right text-[clamp(1.5rem,7vw,7rem)] leading-[0.92] tracking-[-0.02em] text-[#f0e7d4] [font-family:var(--font-akira)]">
                <TextRoll
                  animateOnMount
                  center
                  isActive={isActive}
                  duration={heroEntranceMotion.title.duration}
                  stagger={heroEntranceMotion.title.stagger}
                  className="text-[#f0e7d4]"
                >
                  folio
                </TextRoll>
              </p>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-5 bottom-[calc(env(safe-area-inset-bottom)+1.25rem)] z-30 flex lg:inset-x-10 lg:bottom-[7svh] lg:justify-center">
          <motion.button
            type="button"
            onClick={() => onOpenResume?.()}
            disabled={isResumePending}
            aria-busy={isResumePending}
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.97 }}
            animate={{
              scale: isResumePending ? 1.04 : 1,
              backgroundColor: isResumePending ? "#fff8e9" : "#f0e7d4",
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto flex min-h-12 items-center gap-4 bg-[#f0e7d4] px-4 text-[#171512] transition-colors duration-300 hover:bg-[#fff8e9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f0e7d4] focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-wait lg:mx-auto"
          >
            <span className="text-[0.62rem] uppercase tracking-[0.18em] [font-family:var(--font-akira)]">
              <FlipText>Resume</FlipText>
            </span>
            <motion.span
              animate={{ rotate: isResumePending ? 45 : 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex size-7 items-center justify-center bg-[#171512] text-[#f0e7d4]"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-3.5"
              >
                <path d="M4 12 12 4M5 4h7v7" />
              </svg>
            </motion.span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
