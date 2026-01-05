"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import ScrollReveal from "@/shared/components/ScrollReveal";

const facts = [
  { id: 1, icon: "☕", label: "coffee addict" },
  { id: 2, icon: "🎮", label: "gamer" },
  { id: 3, icon: "🌙", label: "night owl" },
  { id: 4, icon: "🎧", label: "lofi mode" },
];

function FloatingFact({
  icon,
  label,
  index,
}: {
  icon: string;
  label: string;
  index: number;
}) {
  const [position] = useState(() => ({
    x: (Math.random() - 0.5) * 200,
    y: (Math.random() - 0.5) * 80,
  }));

  return (
    <motion.div
      drag
      dragConstraints={{ left: -150, right: 150, top: -100, bottom: 100 }}
      dragElastic={0.1}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: position.x,
        y: position.y,
      }}
      transition={{
        delay: index * 0.15,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{ scale: 1.1, zIndex: 10 }}
      whileDrag={{ scale: 1.15, cursor: "grabbing" }}
      className="absolute cursor-grab active:cursor-grabbing"
    >
      <motion.div
        animate={{
          y: [0, -5, 0, 5, 0],
          rotate: [0, 2, 0, -2, 0],
        }}
        transition={{
          duration: 4 + index,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 flex items-center gap-2 hover:bg-white/10 hover:border-white/20 transition-colors"
      >
        <span className="text-base">{icon}</span>
        <span className="text-xs text-white/60 font-light">{label}</span>
      </motion.div>
    </motion.div>
  );
}

export default function QuickFacts() {
  return (
    <ScrollReveal className="mb-16" delay={0.2}>
      <div className="relative h-48 flex items-center justify-center">
        <p className="text-[10px] text-white/15 font-mono uppercase tracking-wider">
          drag me around
        </p>
        {facts.map((fact, i) => (
          <FloatingFact key={fact.id} {...fact} index={i} />
        ))}
      </div>
    </ScrollReveal>
  );
}
