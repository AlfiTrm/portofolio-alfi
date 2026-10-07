"use client";

import Image from "next/image";
import { motion, useReducedMotion, type MotionValue } from "framer-motion";
import { heroEntranceMotion } from "../heroMotion";

interface HeroPortraitLayerProps {
  isReady: boolean;
  entranceState: "checking" | "playing" | "ready";
  keepBackdrop: boolean;
  portraitFilter: MotionValue<string>;
}

export default function HeroPortraitLayer({
  isReady,
  entranceState,
  keepBackdrop,
  portraitFilter,
}: HeroPortraitLayerProps) {
  const reduceMotion = useReducedMotion();
  const entranceIsReady = isReady && entranceState === "playing";
  const portraitIsVisible = keepBackdrop || entranceState === "ready" || entranceIsReady;

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-[2]"
      aria-hidden="true"
    >
      <motion.div
        className="hero-portrait-frame absolute bottom-0 left-1/2 h-[78svh] w-[132vw] overflow-hidden lg:bottom-auto lg:top-0 lg:h-screen lg:w-[76vw]"
        initial={false}
        animate={{ x: "-50%", y: portraitIsVisible ? "0%" : "105%" }}
        transition={
          entranceIsReady && !keepBackdrop && !reduceMotion
            ? heroEntranceMotion.portrait
            : { duration: 0 }
        }
      >
        <motion.div className="absolute inset-0" style={{ filter: portraitFilter }}>
          <Image
            src="/home/picture-me.webp"
            alt=""
            fill
            priority
            unoptimized
            sizes="(min-width: 1024px) 76vw, 132vw"
            className="object-contain object-bottom lg:object-top"
          />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(19,17,13,0.7)_0%,rgba(19,17,13,0.42)_20%,rgba(19,17,13,0.1)_44%,rgba(19,17,13,0.14)_68%,rgba(19,17,13,0.56)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(241,233,210,0.04)_0%,rgba(0,0,0,0)_18%,rgba(0,0,0,0.08)_56%,rgba(0,0,0,0.46)_100%)]" />
    </motion.div>
  );
}
