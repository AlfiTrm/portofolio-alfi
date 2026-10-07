"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { heroEntranceMotion } from "../heroMotion";

interface HeroEntranceProps {
  isReady: boolean;
  onComplete: () => void;
}

const wordmark = "TSAN";
export default function HeroEntrance({ isReady, onComplete }: HeroEntranceProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      initial={{ opacity: 1 }}
      animate={isReady ? { opacity: 0 } : { opacity: 1 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : heroEntranceMotion.dissolve
      }
      onAnimationComplete={() => {
        if (isReady) onComplete();
      }}
      aria-hidden="true"
    >
      <div className="fixed inset-0 grid place-items-center">
        <motion.div
          className="relative size-14 [--entrance-shift:-3rem] md:size-16 md:[--entrance-shift:-7rem]"
          initial={{ x: 0 }}
          animate={isReady ? { x: "var(--entrance-shift)" } : { x: 0 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : heroEntranceMotion.lockup
          }
        >
          <Image src="/icon.svg" alt="" fill sizes="64px" />
          <span className="absolute left-full top-1/2 ml-3 flex -translate-y-1/2 whitespace-nowrap text-[#f2ede6] text-[clamp(1.35rem,3.4vw,3.25rem)] leading-none tracking-[-0.04em] md:ml-5 [font-family:var(--font-akira)]">
              {wordmark.split("").map((letter, index) => (
                <motion.span
                  key={`${letter}-${index}`}
                  initial={{ opacity: 0, filter: "blur(14px)", x: 18, y: -18 }}
                  animate={
                    isReady
                      ? { opacity: 1, filter: "blur(0px)", x: 0, y: 0 }
                      : { opacity: 0, filter: "blur(14px)", x: 18, y: -18 }
                  }
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : {
                          delay:
                            heroEntranceMotion.letters.delay +
                            index * heroEntranceMotion.letters.stagger,
                          duration: heroEntranceMotion.letters.duration,
                          ease: heroEntranceMotion.letters.ease,
                        }
                  }
                >
                  {letter}
                </motion.span>
              ))}
            </span>
        </motion.div>
      </div>

    </motion.div>
  );
}
