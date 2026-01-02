"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  FaReact,
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
import FloatingParticles from "@/shared/components/FloatingParticles";
import "../styles/projects.css";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  index: number;
  isActive: boolean;
  onToggle: () => void;
}

const TechIcon = ({ name }: { name: string }) => {
  const icons: Record<string, React.ReactNode> = {
    React: <FaReact className="w-4 h-4 text-[#61DAFB]" />,
    "Next.js": <SiNextdotjs className="w-4 h-4 text-white" />,
    TypeScript: <SiTypescript className="w-4 h-4 text-[#3178C6]" />,
    JavaScript: <SiJavascript className="w-4 h-4 text-[#F7DF1E]" />,
    "Tailwind CSS": <SiTailwindcss className="w-4 h-4 text-[#38B2AC]" />,
    Web: <FaGlobe className="w-4 h-4 text-white" />,
  };
  return icons[name] || <FaGlobe className="w-4 h-4 text-gray-400" />;
};

export default function ProjectCard({
  title,
  description,
  tags,
  image,
  liveUrl,
  index: indexProp,
  isActive,
  onToggle,
}: ProjectCardProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isActive) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0.5, y: 0.5 });
  };

  const tiltX = isHovered && !isActive ? (mousePosition.y - 0.5) * -20 : 0;
  const tiltY = isHovered && !isActive ? (mousePosition.x - 0.5) * 20 : 0;

  const glowX = mousePosition.x * 100;
  const glowY = mousePosition.y * 100;

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle();
    }
    if (e.key === "Escape" && isActive) {
      onToggle();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: indexProp * 0.1 }}
      viewport={{ once: true }}
      className={`relative h-[420px] ${isActive ? "z-50" : "z-0"}`}
      style={{ perspective: "1500px" }}
      role="article"
      aria-label={`Project: ${title}`}
    >
      <motion.div
        ref={cardRef}
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        tabIndex={0}
        role="button"
        aria-expanded={isActive}
        aria-label={
          isActive ? `Close ${title} preview` : `View ${title} preview`
        }
        className={`relative w-full h-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-2xl transition-colors duration-500 ${
          isActive
            ? "border-cyan-500/50 shadow-[0_0_30px_rgba(34,211,238,0.2)] z-[45]"
            : ""
        }`}
        animate={{
          rotateX: isActive && !isMobile ? 60 : tiltX,
          rotateY: isActive ? 0 : tiltY,
          scale: isActive && !isMobile ? 0.9 : isHovered ? 1.02 : 1,
          opacity: 1,
          y: isActive && !isMobile ? 50 : 0,
          filter: isActive && !isMobile ? "blur(4px)" : "blur(0px)",
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "center center",
        }}
      >
        {isHovered && !isActive && (
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none z-10"
            style={{
              background: `radial-gradient(600px circle at ${glowX}% ${glowY}%, rgba(34, 211, 238, 0.15), transparent 40%)`,
            }}
          />
        )}

        <div
          className={`relative w-full h-full rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl transition-all p-8 flex flex-col justify-between group ${
            isActive ? "bg-black" : ""
          } ${
            isHovered && !isActive
              ? "border-cyan-500/30"
              : "hover:border-white/20"
          }`}
        >
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          <div
            className="flex flex-col gap-5"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="flex justify-between items-start"
              style={{
                transform:
                  isHovered && !isActive ? "translateZ(40px)" : "translateZ(0)",
                transition: "transform 0.3s ease-out",
              }}
            >
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

            <p
              className="text-white/60 text-sm leading-relaxed font-light"
              style={{
                transform:
                  isHovered && !isActive ? "translateZ(20px)" : "translateZ(0)",
                transition: "transform 0.3s ease-out",
              }}
            >
              {description}
            </p>

            <div
              className="flex flex-wrap gap-2.5 mt-2"
              style={{
                transform:
                  isHovered && !isActive ? "translateZ(30px)" : "translateZ(0)",
                transition: "transform 0.3s ease-out",
              }}
            >
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
          </div>
        </div>

        <div
          className="absolute inset-0 -z-10 rounded-2xl bg-white/5"
          style={{ transform: "translateZ(-20px)" }}
        />
      </motion.div>

      <AnimatePresence>
        {isActive && !isMobile && (
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
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[40]"
              onClick={onToggle}
            />

            <motion.div
              className="absolute left-1/2 -translate-x-1/2 bottom-[40%] w-4/5 h-24 md:h-40 origin-bottom z-[49] pointer-events-none"
              style={{ perspective: "500px", transformStyle: "preserve-3d" }}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="w-full h-full bg-gradient-to-t from-cyan-500/20 to-transparent blur-xl"
                style={{ clipPath: "polygon(20% 100%, 80% 100%, 100% 0, 0 0)" }}
              />
            </motion.div>

            <motion.div
              className="absolute left-1/2 -translate-x-1/2 z-[50] pointer-events-auto"
              style={{
                width: isMobile ? "110%" : "140%",
                bottom: "30%",
              }}
              initial={{ opacity: 0, scale: 0.8, y: 50, rotateX: 20 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: isMobile ? -60 : -100,
                rotateX: 0,
                transition: {
                  type: "spring",
                  damping: 15,
                  stiffness: 120,
                  mass: 0.8,
                },
              }}
              exit={{
                opacity: 0,
                scale: 0.6,
                y: 0,
                transition: { duration: 0.2 },
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative group/hologram w-full aspect-video shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <FloatingParticles isActive={isActive} />

                <motion.div
                  className="absolute inset-0 bg-cyan-400 mix-blend-overlay z-40 rounded-lg pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0, 0.5, 0] }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                />

                <motion.div
                  className="w-full rounded-lg overflow-hidden border border-cyan-500/50 bg-black/90 shadow-[0_0_50px_rgba(34,211,238,0.4)]"
                  style={{ aspectRatio: "16/9" }}
                  initial={{ clipPath: "inset(50% 0 50% 0)" }}
                  animate={{
                    clipPath: "inset(0% 0 0% 0)",
                    transition: {
                      duration: 0.3,
                      ease: "circOut",
                      delay: 0.1,
                    },
                  }}
                >
                  <div className="relative w-full h-full opacity-100 mix-blend-screen">
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
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/hologram:opacity-100 transition-opacity duration-300 z-50 bg-black/60 backdrop-blur-sm">
                      <Link
                        href={liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Visit ${title} website (opens in new tab)`}
                        className="group/btn relative px-8 py-3 bg-cyan-950/30 overflow-hidden rounded-full flex items-center gap-3 transition-all border border-cyan-500/30 hover:border-cyan-400"
                      >
                        <div className="absolute inset-0 bg-cyan-400/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                        <span className="font-mono text-sm tracking-widest text-cyan-300 group-hover/btn:text-cyan-100 transition-colors uppercase">
                          Initialize Link
                        </span>
                        <FaExternalLinkAlt className="w-3 h-3 text-cyan-400 group-hover/btn:text-white transition-colors" />
                      </Link>
                    </div>
                  )}
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-4 bg-cyan-500/20 blur-xl rounded-[100%]"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggle();
                  }}
                  aria-label="Close project preview"
                  className="absolute -top-12 right-0 group/close"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                >
                  <div className="flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/10 hover:border-white/30 transition-all duration-300 group-hover/close:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                    <span className="text-[11px] font-mono tracking-[0.2em] text-white/60 group-hover/close:text-white transition-colors uppercase">
                      Close
                    </span>
                    <div className="w-4 h-4 flex items-center justify-center rounded-full bg-white/10 group-hover/close:bg-white transition-colors duration-300">
                      <FaTimes className="w-2.5 h-2.5 text-white/70 group-hover/close:text-black transition-colors" />
                    </div>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
