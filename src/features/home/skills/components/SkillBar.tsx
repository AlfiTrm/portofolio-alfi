"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

interface SkillBarProps {
  name: string;
  level: number;
  delay?: number;
}

export default function SkillBar({ name, level, delay = 0 }: SkillBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group cursor-default"
    >
      <div className="flex items-center justify-between mb-1">
        <motion.span
          className="text-white/60 font-medium text-xs tracking-wide"
          animate={{
            color: isHovered
              ? "rgba(255,255,255,0.9)"
              : "rgba(255,255,255,0.6)",
          }}
          transition={{ duration: 0.2 }}
        >
          {name}
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={
            isInView
              ? {
                  opacity: isHovered ? 0.3 : 0.1,
                  scale: isHovered ? 1 : 0.9,
                }
              : {}
          }
          transition={{ delay: delay + 0.5 }}
          className="text-xs text-white font-mono font-light tracking-tighter"
        >
          {level}%
        </motion.span>
      </div>

      <motion.div
        className="h-[2px] bg-white/5 rounded-full overflow-hidden"
        animate={{
          backgroundColor: isHovered
            ? "rgba(255,255,255,0.08)"
            : "rgba(255,255,255,0.02)",
        }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={
            isInView
              ? {
                  width: `${level}%`,
                  opacity: isHovered ? 0.8 : 0.4,
                }
              : {}
          }
          transition={{ duration: 1, delay: delay + 0.2, ease: "easeOut" }}
          className="h-full rounded-full relative bg-white/40"
        >
          <motion.div
            className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-white"
            animate={{
              width: isHovered ? 4 : 2,
              height: isHovered ? 4 : 2,
              opacity: isHovered ? 0.8 : 0,
              boxShadow: isHovered ? "0 0 8px rgba(255,255,255,0.5)" : "none",
            }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
