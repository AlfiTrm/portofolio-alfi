"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface FloatingOrbsProps {
  count?: number;
}

export default function FloatingOrbs({ count = 3 }: FloatingOrbsProps) {
  const [orbs, setOrbs] = useState<any[]>([]);

  useEffect(() => {
    const generatedOrbs = Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 400 + 200,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 25 + 20,
      delay: Math.random() * 5,
    }));
    setOrbs(generatedOrbs);
  }, [count]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full bg-white/[0.02] blur-3xl"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            x: [0, 30, -20, 10, 0],
            y: [0, -25, 20, -15, 0],
            scale: [1, 1.05, 0.95, 1.02, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
