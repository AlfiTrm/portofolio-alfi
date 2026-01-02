"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import ScrollReveal from "@/shared/components/ScrollReveal";
import { aboutData } from "../data/aboutData";
import { Coffee, Gamepad2, Moon, Headphones } from "lucide-react";
import ScrollRevealText from "../components/ScrollRevealText";
import "../styles/about.css";

export default function AboutSection() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform([x, y], ([latestX, latestY]) => {
    return (latestX as number) * 0.05 + (latestY as number) * 0.02;
  });

  const [cardPos, setCardPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const unsubscribeX = x.on("change", (latest) => {
      setCardPos((prev) => ({ ...prev, x: latest }));
    });
    const unsubscribeY = y.on("change", (latest) => {
      setCardPos((prev) => ({ ...prev, y: latest }));
    });

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [x, y]);

  const anchorX = 0;
  const anchorY = 0;

  const holeX = cardPos.x;
  const holeY = 131 + cardPos.y;

  const controlX = (anchorX + holeX) / 2;
  const controlY = (anchorY + holeY) / 2 + Math.abs(holeX) * 0.15 + 20;

  return (
    <section id="about" className="relative py-32 px-4 md:px-8 overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl -translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/40 text-sm mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-white/40" />
            {aboutData.subtitle}
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            About <span className="text-gradient">Me</span>
          </h2>
        </ScrollReveal>

        <div className="max-w-5xl mx-auto">
          <ScrollReveal delay={0.2}>
            <div className="flex flex-col items-center mb-20 relative h-[600px]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/20 border-2 border-white/30 rounded-full z-30 shadow-lg" />

              <svg
                className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
                style={{
                  width: "600px",
                  height: "600px",
                  overflow: "visible",
                }}
              >
                <path
                  d={`M 300 2 Q ${300 + controlX} ${controlY} ${
                    300 + holeX
                  } ${holeY}`}
                  stroke="rgba(255, 255, 255, 0.35)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  style={{
                    filter: "drop-shadow(0 0 4px rgba(255,255,255,0.2))",
                  }}
                />
                <path
                  d={`M 300 2 Q ${300 + controlX} ${controlY} ${
                    300 + holeX
                  } ${holeY}`}
                  stroke="rgba(255, 255, 255, 0.15)"
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                  style={{ filter: "blur(2px)" }}
                />
              </svg>

              <div className="h-32" />

              <motion.div
                drag
                dragConstraints={{
                  top: -100,
                  bottom: 100,
                  left: -150,
                  right: 150,
                }}
                dragElastic={0.2}
                dragTransition={{ bounceStiffness: 400, bounceDamping: 30 }}
                style={{ x, y, rotate }}
                className="relative cursor-grab active:cursor-grabbing z-20"
                whileDrag={{ scale: 1.02 }}
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                  <div className="w-12 h-8 bg-white/10 border-2 border-white/20 rounded-lg flex items-center justify-center shadow-xl backdrop-blur-sm">
                    <div className="w-4 h-4 rounded-full border-2 border-white/30 bg-black/80" />
                  </div>
                </div>

                <div className="relative w-80 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-white/40" />
                      <span className="text-white/30 text-xs uppercase tracking-widest font-light">
                        Developer ID
                      </span>
                    </div>
                    <span className="text-white/20 text-xs font-mono">
                      #CAFE
                    </span>
                  </div>

                  <div className="relative w-full aspect-square mb-4 rounded-xl overflow-hidden border border-white/10 bg-white/5">
                    <Image
                      src="/hero/gambaralfi.webp"
                      alt="Alfi Tsani"
                      fill
                      className="object-cover grayscale"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-bold text-white">
                        Alfi Tsani
                      </h3>
                      <div className="flex items-center gap-1.5">
                        <Coffee className="w-4 h-4 text-white/30" />
                        <Gamepad2 className="w-4 h-4 text-white/30" />
                        <Moon className="w-4 h-4 text-white/30" />
                        <Headphones className="w-4 h-4 text-white/30" />
                      </div>
                    </div>
                    <p className="text-white/40 text-sm uppercase tracking-wider font-light">
                      Frontend Developer
                    </p>
                  </div>

                  <div className="flex gap-[2px] h-8 items-end opacity-30">
                    {[
                      4, 8, 6, 9, 3, 7, 5, 8, 4, 9, 6, 3, 7, 5, 8, 4, 6, 9, 5,
                      7,
                    ].map((height, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-white/40 rounded-sm"
                        style={{ height: `${height * 10}%` }}
                      />
                    ))}
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white/20 text-xs uppercase tracking-widest whitespace-nowrap"
                >
                  Drag me around
                </motion.div>
              </motion.div>
            </div>
          </ScrollReveal>

          <ScrollReveal className="max-w-3xl mx-auto text-center" delay={0.3}>
            <h3 className="text-2xl font-semibold text-white mb-8">My Story</h3>
            <ScrollRevealText
              paragraphs={aboutData.description.split("\n\n")}
            />
          </ScrollReveal>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
}
