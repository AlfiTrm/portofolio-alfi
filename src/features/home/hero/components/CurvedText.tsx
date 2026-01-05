"use client";

import { motion } from "framer-motion";

interface CurvedTextProps {
  text: string;
  radius?: number;
  className?: string;
  duration?: number;
}

export default function CurvedText({
  text,
  radius = 200,
  className = "",
  duration = 20,
}: CurvedTextProps) {
  const size = radius * 2 + 60;

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center pointer-events-none ${className}`}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
        animate={{ rotate: 360 }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <defs>
          <path
            id="textCircle"
            d={`
              M ${size / 2}, ${size / 2}
              m -${radius}, 0
              a ${radius},${radius} 0 1,1 ${radius * 2},0
              a ${radius},${radius} 0 1,1 -${radius * 2},0
            `}
            fill="none"
          />
        </defs>

        <text
          className="fill-white/20 uppercase tracking-[0.35em] text-[13px] font-light"
          style={{ fontFamily: "monospace" }}
        >
          <textPath href="#textCircle" startOffset="0%">
            {text}
          </textPath>
        </text>
      </motion.svg>
    </div>
  );
}
