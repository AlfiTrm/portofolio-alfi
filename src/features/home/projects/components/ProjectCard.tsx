"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  FaReact,
  FaGithub,
  FaExternalLinkAlt,
  FaChevronRight,
  FaGlobe,
  FaTimes,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
} from "react-icons/si";
import { Scan } from "lucide-react";
import "../styles/projects.css";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  index: number;
}

const TechIcon = ({ name }: { name: string }) => {
  const icons: Record<string, React.ReactNode> = {
    React: <FaReact className="w-4 h-4 text-[#61DAFB]" />,
    "Next.js": <SiNextdotjs className="w-4 h-4 text-white" />,
    TypeScript: <SiTypescript className="w-4 h-4 text-[#3178C6]" />,
    JavaScript: <SiJavascript className="w-4 h-4 text-[#F7DF1E]" />,
    "Tailwind CSS": <SiTailwindcss className="w-4 h-4 text-[#38B2AC]" />,
    Web: <FaGlobe className="w-4 h-4 text-white" />,
    github: <FaGithub className="w-4 h-4" />,
  };
  return icons[name] || <FaGlobe className="w-4 h-4 text-gray-400" />;
};

export default function ProjectCard({
  title,
  description,
  tags,
  image,
  liveUrl,
  githubUrl,
  index: indexProp,
}: ProjectCardProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: indexProp * 0.1 }}
      viewport={{ once: true }}
      className="relative h-[420px]"
      style={{ perspective: "1500px" }}
    >
      <motion.div
        onClick={() => setIsActive(!isActive)}
        className="relative w-full h-full cursor-pointer"
        animate={{
          rotateX: isActive ? 60 : 0,
          scale: isActive ? 0.95 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 20,
        }}
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "center bottom",
        }}
      >
        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl hover:border-white/20 transition-all p-8 flex flex-col justify-between group">
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-start">
              <h3 className="text-2xl font-bold text-white group-hover:text-cyan-200 transition-colors leading-tight">
                {title}
              </h3>
              <div
                className={`shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-colors ${
                  isActive
                    ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400"
                    : "text-white/30"
                }`}
              >
                {isActive ? (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,1)]"
                  />
                ) : (
                  <FaChevronRight className="w-4 h-4" />
                )}
              </div>
            </div>

            <p className="text-white/60 text-sm leading-relaxed font-light">
              {description}
            </p>

            <div className="flex flex-wrap gap-2.5 mt-2">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg hover:border-white/20 transition-colors"
                >
                  <span className="text-white/70">
                    <TechIcon name={tag} />
                  </span>
                  <span className="text-xs text-white/60 font-medium">
                    {tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-white/10 relative z-10">
            <span
              className={`text-xs uppercase tracking-widest font-mono transition-colors duration-300 flex items-center gap-2 ${
                isActive ? "text-cyan-400 text-shadow-cyan" : "text-white/30"
              }`}
            >
              {isActive ? (
                <>
                  <Scan className="w-3 h-3" /> PROJECTION ACTIVE
                </>
              ) : (
                "CLICK TO PROJECT"
              )}
            </span>
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 text-white/40 hover:text-white transition-colors hover:bg-white/5 rounded-full"
              >
                <FaGithub className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        <div
          className="absolute inset-0 -z-10 rounded-2xl bg-white/5"
          style={{ transform: "translateZ(-20px)" }}
        />
      </motion.div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            className="absolute left-0 right-0 pointer-events-none"
            style={{
              bottom: "20px",
              height: "300px",
              transform: "translateZ(-50px) rotateX(60deg)",
              transformOrigin: "bottom center",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-full"
              style={{
                background:
                  "linear-gradient(to top, rgba(34,211,238,0.2), transparent)",
                clipPath: "polygon(20% 100%, 80% 100%, 100% 0, 0 0)",
                filter: "blur(15px)",
              }}
            />
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/5 h-[80%]"
              style={{
                background:
                  "linear-gradient(to top, rgba(167,243,208,0.1), transparent)",
                clipPath: "polygon(30% 100%, 70% 100%, 100% 0, 0 0)",
                filter: "blur(10px)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isActive && (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 pointer-events-auto z-50 w-[130%]"
            initial={{ opacity: 0, scale: 0.4, y: -420, filter: "blur(10px)" }}
            animate={{
              opacity: 1,
              scale: 1,
              y: -420,
              filter: "blur(0px)",
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
                mass: 0.8,
                delay: 0.1,
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              filter: "blur(10px)",
              transition: { duration: 0.2 },
            }}
            style={{ perspective: "1000px" }}
          >
            <div className="relative group/hologram">
              <motion.div
                className="absolute inset-0 bg-cyan-400 mix-blend-overlay z-40 rounded-lg pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0, 0.5, 0] }}
                transition={{ duration: 0.3, delay: 0.1 }}
              />

              <motion.div
                className="relative rounded-lg overflow-hidden border border-cyan-500/50 bg-black/40 shadow-[0_0_50px_rgba(34,211,238,0.4)] backdrop-blur-sm"
                initial={{ clipPath: "inset(50% 0 50% 0)" }}
                animate={{
                  clipPath: "inset(0% 0 0% 0)",
                  transition: { duration: 0.3, ease: "circOut", delay: 0.1 },
                }}
              >
                <div className="relative aspect-video w-full opacity-100 mix-blend-screen">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover sepia-[0.2] hue-rotate-[170deg] contrast-[1.1] brightness-[1.1] group-hover/hologram:sepia-0 group-hover/hologram:hue-rotate-0 group-hover/hologram:brightness-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_4px,3px_100%] pointer-events-none opacity-50" />

                  <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(34,211,238,0.3)] z-20 pointer-events-none" />
                </div>

                <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]" />
                <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]" />
                <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]" />
                <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]" />

                {liveUrl && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/hologram:opacity-100 transition-opacity duration-300 z-50 bg-black/40">
                    <Link
                      href={liveUrl}
                      onClick={(e) => e.stopPropagation()}
                      className="px-6 py-2 bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-500/50 hover:border-cyan-400 text-cyan-300 rounded-full font-mono text-xs tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] backdrop-blur-md flex items-center gap-2"
                    >
                      <span>Visit Website</span>
                      <FaExternalLinkAlt className="w-3 h-3" />
                    </Link>
                  </div>
                )}
              </motion.div>

              <motion.div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[90%] h-4 bg-cyan-500/20 blur-xl rounded-[100%]"
                animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isActive && (
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            setIsActive(false);
          }}
          className="absolute -top-10 right-0 p-2 text-white/50 hover:text-white bg-black/50 rounded-full backdrop-blur-md border border-white/10 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <FaTimes className="w-4 h-4" />
        </motion.button>
      )}
    </motion.div>
  );
}
