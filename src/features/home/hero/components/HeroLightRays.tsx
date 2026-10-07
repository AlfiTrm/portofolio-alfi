"use client";

import { motion, useReducedMotion } from "framer-motion";
import { heroEntranceMotion } from "../heroMotion";

export default function HeroLightRays({
  isActive = true,
  isImmediate = false,
}: {
  isActive?: boolean;
  isImmediate?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const rayTransition = reduceMotion || isImmediate
    ? { duration: 0 }
    : {
        delay: heroEntranceMotion.light.delay,
        duration: heroEntranceMotion.light.duration,
        ease: heroEntranceMotion.light.ease,
      };

  return (
    <motion.div
      className="hero-light-rays pointer-events-none absolute -top-16 left-1/2 z-10 h-[56vh] min-h-[340px] w-[82vw] max-w-[1120px] opacity-95 mix-blend-screen"
      initial={isImmediate ? false : { opacity: 0, x: "-50%", y: -18, scaleY: 0.92 }}
      animate={isActive
        ? { opacity: 0.95, x: "-50%", y: 0, scaleY: 1 }
        : { opacity: 0, x: "-50%", y: -18, scaleY: 0.92 }}
      transition={rayTransition}
      aria-hidden="true"
    >
      <motion.div
        className="hero-light-halo absolute inset-x-[18%] top-0 h-[24%] rounded-full bg-[radial-gradient(circle_at_50%_0%,rgba(244,238,220,0.34),rgba(244,238,220,0.12)_42%,transparent_78%)] blur-3xl"
        initial={isImmediate ? false : { opacity: 0, scale: 0.82 }}
        animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.82 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                delay: heroEntranceMotion.light.haloDelay,
                duration: heroEntranceMotion.light.haloDuration,
                ease: heroEntranceMotion.light.ease,
              }
        }
      />
      <div className="absolute left-[27%] top-0 h-full w-[6%] bg-[linear-gradient(180deg,rgba(244,238,220,0.34)_0%,rgba(244,238,220,0.12)_28%,transparent_92%)] blur-xl" />
      <div className="absolute left-[41%] top-0 h-full w-[10%] bg-[linear-gradient(180deg,rgba(244,238,220,0.4)_0%,rgba(244,238,220,0.16)_26%,transparent_88%)] blur-xl" />
      <div className="absolute left-1/2 top-0 h-full w-[16%] -translate-x-1/2 bg-[linear-gradient(180deg,rgba(244,238,220,0.3)_0%,rgba(244,238,220,0.14)_22%,transparent_86%)] blur-2xl" />
      <div className="absolute right-[34%] top-0 h-full w-[8%] bg-[linear-gradient(180deg,rgba(244,238,220,0.28)_0%,rgba(244,238,220,0.1)_30%,transparent_92%)] blur-xl" />
      <div className="absolute right-[22%] top-0 h-full w-[5%] bg-[linear-gradient(180deg,rgba(244,238,220,0.24)_0%,rgba(244,238,220,0.08)_28%,transparent_94%)] blur-xl" />
    </motion.div>
  );
}
