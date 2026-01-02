"use client";

import { motion } from "framer-motion";

export default function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main Aurora Blobs */}
      <motion.div
        className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/20 blur-[100px]"
        animate={{
          x: [0, 100, 50, 0],
          y: [0, -50, 50, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 -right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-l from-purple-500/25 to-pink-500/15 blur-[100px]"
        animate={{
          x: [0, -80, -40, 0],
          y: [0, 80, -30, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-emerald-500/20 to-cyan-500/15 blur-[80px]"
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -40, 40, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Noise Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
