"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { timelineData } from "../data/timelineData";
import { useRef } from "react";

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      ref={containerRef}
      className="relative max-w-5xl mx-auto px-4 mt-32 font-mono"
    >
      <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-px bg-white/5 md:-translate-x-1/2 border-l border-dashed border-white/10" />

      <motion.div
        className="absolute left-[19px] md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-white/0 via-white/40 to-white/0 md:-translate-x-1/2 origin-top z-10 blur-[1px]"
        style={{ height: "100%", scaleY }}
      />

      <div className="space-y-32">
        {timelineData.map((period, pIndex) => (
          <div key={pIndex} className="relative">
            <div className="flex items-center gap-6 mb-12 md:mb-16 md:justify-center relative">
              <div className="md:absolute md:left-1/2 md:-translate-x-1/2 flex flex-col items-center">
                <div className="w-10 h-10 flex items-center justify-center bg-[#0a0a0a] border border-white/10 rounded-full z-20 shadow-xl">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              </div>
              <span className="text-4xl md:text-5xl font-bold text-white/5 tracking-tighter pl-16 md:pl-0">
                {period.period.split(" ")[0]}
              </span>
            </div>

            <div className="space-y-24">
              {period.entries.map((entry, eIndex) => {
                const isEven = eIndex % 2 === 0;

                return (
                  <motion.div
                    key={eIndex}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: eIndex * 0.1, duration: 0.5 }}
                    className={`relative md:flex items-start gap-10 ${
                      isEven ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    <div className="absolute left-[15px] md:left-1/2 top-2 w-2.5 h-2.5 bg-[#0a0a0a] border border-white/20 rounded-full z-20 md:-translate-x-1/2 ring-4 ring-[#0a0a0a]" />

                    <div
                      className={`hidden md:block flex-1 text-right py-1 ${
                        isEven ? "text-left" : ""
                      }`}
                    >
                      <span className="text-xs tracking-widest uppercase text-white/30">
                        {entry.category}
                      </span>
                    </div>

                    <div className="pl-12 md:pl-0 flex-1">
                      <div
                        className={`relative group ${
                          isEven ? "md:text-right" : "md:text-left"
                        }`}
                      >
                        <div className="mb-2">
                          <h3 className="text-xl md:text-2xl font-bold text-zinc-100 mb-1 leading-tight">
                            {entry.title}
                          </h3>
                          <p className="text-zinc-500 font-medium">
                            @{entry.company}
                          </p>
                          <div className="md:hidden mt-2">
                            <span className="text-[10px] tracking-widest uppercase text-white/30 border border-white/10 px-2 py-1 rounded">
                              {entry.category}
                            </span>
                          </div>
                        </div>

                        {entry.description && (
                          <p className="text-sm md:text-base text-zinc-400 leading-relaxed max-w-md ml-0 md:ml-auto md:mr-0 opacity-80 group-hover:opacity-100 transition-opacity">
                            <span
                              className={isEven ? "block md:ml-auto" : "block"}
                            >
                              {entry.description}
                            </span>
                          </p>
                        )}

                        {entry.highlights.length > 0 && (
                          <div
                            className={`mt-4 flex flex-wrap gap-2 ${
                              isEven ? "md:justify-end" : "md:justify-start"
                            }`}
                          >
                            {entry.highlights.map((h, i) => (
                              <span
                                key={i}
                                className="text-xs text-zinc-600 bg-white/5 px-3 py-1 rounded-full border border-white/5"
                              >
                                {h}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
