"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

interface FlipTextProps {
  children: string;
  className?: string;
}

export default function FlipText({ children, className = "" }: FlipTextProps) {
  const reduceMotion = useReducedMotion();
  const [playId, setPlayId] = useState(0);

  const play = () => {
    if (!reduceMotion) setPlayId((current) => current + 1);
  };

  return (
    <span
      className={`inline-block ${className}`}
      onPointerEnter={play}
      onFocus={play}
    >
      <span className="sr-only">{children}</span>
      <span aria-hidden="true" className="inline-flex">
        {Array.from(children).map((character, index) => (
          <motion.span
            key={`${playId}-${index}`}
            initial={playId > 0 && !reduceMotion ? { rotateX: -82, opacity: 0.45 } : false}
            animate={{ rotateX: 0, opacity: 1 }}
            transition={{
              duration: 0.42,
              delay: Math.min(index * 0.018, 0.22),
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              display: "inline-block",
              transformOrigin: "50% 50%",
              transformStyle: "preserve-3d",
              whiteSpace: "pre",
            }}
          >
            {character}
          </motion.span>
        ))}
      </span>
    </span>
  );
}
