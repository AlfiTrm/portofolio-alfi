"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const STAGGER = 0.035;

export default function TextRoll({
  children,
  className,
  center = false,
  duration = 0.3,
  stagger = STAGGER,
  animateOnMount = false,
  isActive = true,
}: {
  children: string;
  className?: string;
  center?: boolean;
  duration?: number;
  stagger?: number;
  animateOnMount?: boolean;
  isActive?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const [hasEntered, setHasEntered] = useState(!animateOnMount);

  useEffect(() => {
    if (
      !animateOnMount ||
      reduceMotion === null
    ) {
      return;
    }

    if (reduceMotion) {
      if (!hasEntered) setHasEntered(true);
      return;
    }

    if (isActive && !hasEntered) setHasEntered(true);
  }, [animateOnMount, hasEntered, isActive, reduceMotion]);

  const getDelay = (index: number) =>
    reduceMotion
      ? 0
      : center
      ? stagger * Math.abs(index - (children.length - 1) / 2)
      : stagger * index;

  return (
    <motion.span
      initial={animateOnMount ? "entrance" : "initial"}
      animate={reduceMotion || hasEntered ? "initial" : "entrance"}
      whileHover={isActive && reduceMotion === false ? "hovered" : undefined}
      className={cn(
        "relative block overflow-hidden text-black dark:text-white/90",
        className,
      )}
      style={{ lineHeight: 0.85 }}
    >
      <span className="sr-only">{children}</span>

      <span aria-hidden="true" className="block">
        {Array.from(children).map((character, index) => (
          <motion.span
            key={`top-${index}`}
            variants={{
              entrance: { y: "100%" },
              initial: { y: 0 },
              hovered: { y: "-100%" },
            }}
            transition={{
              duration: reduceMotion ? 0 : duration,
              ease: "easeInOut",
              delay: getDelay(index),
            }}
            className="inline-block"
          >
            {character === " " ? "\u00a0" : character}
          </motion.span>
        ))}
      </span>

      <span aria-hidden="true" className="absolute inset-0 block">
        {Array.from(children).map((character, index) => (
          <motion.span
            key={`bottom-${index}`}
            variants={{
              entrance: { y: "100%" },
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            transition={{
              duration: reduceMotion ? 0 : duration,
              ease: "easeInOut",
              delay: getDelay(index),
            }}
            className="inline-block"
          >
            {character === " " ? "\u00a0" : character}
          </motion.span>
        ))}
      </span>
    </motion.span>
  );
}
