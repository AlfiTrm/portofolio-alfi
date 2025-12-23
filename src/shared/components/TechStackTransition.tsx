"use client";

import { motion } from "framer-motion";
import { techStack } from "@/features/home/hero/data/techStack";
import React from "react";
import {
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
} from "react-icons/si";
import { FaReact } from "react-icons/fa";

const TechIcon = ({ name }: { name: string }) => {
  const configs: Record<
    string,
    { icon: React.ReactNode; color: string; hoverColor: string }
  > = {
    nextjs: {
      color: "#FFFFFF",
      hoverColor: "#FFFFFF",
      icon: <SiNextdotjs className="w-10 h-10" />,
    },
    typescript: {
      color: "#3178C6",
      hoverColor: "#3178C6",
      icon: <SiTypescript className="w-10 h-10" />,
    },
    react: {
      color: "#61DAFB",
      hoverColor: "#61DAFB",
      icon: <FaReact className="w-10 h-10" />,
    },
    javascript: {
      color: "#F7DF1E",
      hoverColor: "#F7DF1E",
      icon: <SiJavascript className="w-10 h-10" />,
    },
    tailwind: {
      color: "#06B6D4",
      hoverColor: "#06B6D4",
      icon: <SiTailwindcss className="w-10 h-10" />,
    },
  };

  const config = configs[name] || configs.nextjs;

  return (
    <motion.div
      className="relative w-20 h-20 flex items-center justify-center rounded-xl group overflow-hidden"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.05)",
      }}
      whileHover={{
        scale: 1.08,
        backgroundColor: `${config.hoverColor}15`,
        borderColor: `${config.hoverColor}40`,
      }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="relative z-10 text-white/20 group-hover:text-[var(--hover-color)] transition-colors duration-300"
        style={{ "--hover-color": config.color } as React.CSSProperties}
      >
        {config.icon}
      </div>

      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 20px ${config.color}20`,
        }}
      />
    </motion.div>
  );
};

export default function TechStackTransition() {
  const tripleStack = [...techStack, ...techStack, ...techStack];

  return (
    <section className="relative py-20 overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-md" />

      <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-black via-black/90 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-black via-black/90 to-transparent z-10 pointer-events-none" />

      <div className="relative text-center mb-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white/15 text-xs uppercase tracking-[0.4em] font-light"
        >
          Tech Stack
        </motion.p>
      </div>

      <div className="relative">
        <motion.div
          className="flex gap-20 items-center"
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {tripleStack.map((tech, index) => (
            <div key={`${tech.name}-${index}`} className="flex-shrink-0">
              <TechIcon name={tech.icon} />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
