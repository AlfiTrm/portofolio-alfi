"use client";

import { motion } from "framer-motion";
import HeroImage from "./HeroImage";
import HeadlineReveal from "@/shared/components/text/HeadlineReveal";
import BodyLineReveal from "@/shared/components/text/BodyLineReveal";
import MetaLabelReveal from "@/shared/components/text/MetaLabelReveal";

const contentDelay = 0.08;
const contentDuration = 0.95;

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: contentDuration,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

interface HeroContentProps {
  onOpenResume?: () => void;
  isActive?: boolean;
}

export default function HeroContent({
  onOpenResume,
  isActive = true,
}: HeroContentProps) {
  return (
    <section
      className="relative z-10 flex min-h-screen items-center overflow-hidden px-5 pt-20 md:px-8 md:pt-24"
    >
      <HeroImage
        src="/home/picture-me.webp"
        alt="Portrait texture"
        isActive={isActive}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0.08)_34%,rgba(0,0,0,0.4)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(60,47,29,0.14),transparent_36%)]" />

      <motion.div
        variants={fadeIn}
        initial={false}
        animate={isActive ? "visible" : "hidden"}
        transition={{ delay: contentDelay + 0.02 }}
        className="absolute right-6 top-[17.5%] z-20 hidden w-[9.25rem] md:block lg:right-10"
      >
        <BodyLineReveal
          isActive={isActive}
          skipAnimation
          delay={contentDelay + 0.08}
          className="text-justify text-[0.55rem] uppercase leading-[1.45] tracking-[0.16em] text-[#efe6d1]/58"
          lines={[
            "made from quiet choices,",
            "sharp edges, soft light,",
            "and things that just",
            "feel right.",
          ]}
        />
      </motion.div>

      <div className="relative z-20 mx-auto flex w-full max-w-[1380px] flex-col justify-center">
        <div className="grid min-h-[74vh] items-center gap-10 md:grid-cols-[1fr_auto_1fr] md:gap-4">
          <motion.div
            variants={fadeIn}
            initial={false}
            animate={isActive ? "visible" : "hidden"}
            transition={{ delay: contentDelay }}
            className="self-center md:self-start md:pt-[26vh]"
          >
            <p className="text-center text-[2.85rem] leading-[0.92] tracking-[-0.02em] text-[#f0e7d4] sm:text-[3.8rem] md:text-left md:text-[5rem] lg:text-[7rem] [font-family:var(--font-akira)]">
              <HeadlineReveal
                text="port"
                delay={contentDelay + 0.04}
                isActive={isActive}
                skipAnimation
              />
            </p>
            <BodyLineReveal
              isActive={isActive}
              skipAnimation
              delay={contentDelay + 0.34}
              className="mt-10 text-center text-[0.56rem] uppercase tracking-[0.28em] text-[#efe6d1]/58 md:mt-[4.75rem] md:pl-7 md:text-left"
              lineClassName="leading-[1.5]"
              lines={[
                "currently powered by coffee",
                "and questionable sleep",
              ]}
            />
          </motion.div>

          <div className="hidden md:block" />

          <motion.div
            variants={fadeIn}
            initial={false}
            animate={isActive ? "visible" : "hidden"}
            transition={{ delay: contentDelay + 0.08 }}
            className="self-center md:self-end md:pb-[19vh]"
          >
            <p className="text-center text-[2.85rem] leading-[0.92] tracking-[-0.02em] text-[#f0e7d4] sm:text-[3.8rem] md:text-right md:text-[5rem] lg:text-[7rem] [font-family:var(--font-akira)]">
              <HeadlineReveal
                text="folio"
                delay={contentDelay + 0.18}
                isActive={isActive}
                skipAnimation
              />
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={fadeIn}
          initial={false}
          animate={isActive ? "visible" : "hidden"}
          transition={{ delay: contentDelay + 0.14 }}
          className="pointer-events-none absolute inset-x-0 bottom-[14vh] z-20 mx-auto flex max-w-[320px] justify-between px-2 text-[0.48rem] uppercase tracking-[0.28em] text-[#efe6d1]/46 md:bottom-[11.5vh] md:max-w-[580px]"
        >
          <MetaLabelReveal
            delay={contentDelay + 0.42}
            isActive={isActive}
          >
            still studies
          </MetaLabelReveal>
          <button
            onClick={() => onOpenResume?.()}
            className="pointer-events-auto text-[#efe6d1]/72 transition-colors duration-300 hover:text-[#efe6d1] focus:outline-none focus-visible:text-[#efe6d1]"
          >
            {"<Resume/>"}
          </button>
          <MetaLabelReveal
            delay={contentDelay + 0.5}
            isActive={isActive}
          >
            still exploring
          </MetaLabelReveal>
        </motion.div>
      </div>
    </section>
  );
}
