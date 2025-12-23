"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function EntranceLoader({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState<"draw" | "focus" | "warp" | "complete">(
    "draw"
  );

  useEffect(() => {
    const sequence = async () => {
      setPhase("draw");
      await new Promise((r) => setTimeout(r, 1500));

      setPhase("focus");
      await new Promise((r) => setTimeout(r, 1200));

      setPhase("warp");
      onComplete();

      await new Promise((r) => setTimeout(r, 1500));
      setPhase("complete");
    };

    sequence();
  }, [onComplete]);

  if (phase === "complete") return null;

  return (
    <div className="fixed inset-0 z-[100] font-sans pointer-events-none cursor-none flex items-center justify-center">
      <AnimatePresence>
        {phase !== "complete" && (
          <>
            <motion.div
              className="absolute z-50 box-content rounded-full border-white"
              style={{
                borderWidth: "150vmax",
                borderColor: "#ffffff",
              }}
              initial={{ width: 0, height: 0 }}
              animate={
                phase === "warp"
                  ? { width: "250vmax", height: "250vmax" }
                  : { width: 0, height: 0 }
              }
              transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
            />

            <motion.div
              className="absolute inset-0 z-[60] flex items-center justify-center"
              animate={
                phase === "warp" ? { opacity: 0, scale: 2 } : { opacity: 1 }
              }
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="absolute w-full h-[1px] bg-black/80"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, ease: "circOut" }}
              />

              <motion.div
                className="absolute h-full w-[1px] bg-black/80"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1.5, ease: "circOut", delay: 0.2 }}
              />

              <motion.div
                className="absolute top-1/2 left-8 -translate-y-1/2 text-[10px] font-mono font-bold text-black/60 tracking-widest writing-vertical-lr rotate-180"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
              />

              <motion.div
                className="absolute bottom-8 right-1/2 translate-x-1/2 text-[10px] font-mono font-bold text-black/60 tracking-widest"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
              />

              {phase !== "draw" && (
                <motion.div
                  className="absolute w-4 h-4 bg-black rounded-full z-10"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.8, ease: "backOut" }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full border border-black"
                    animate={{ scale: [1, 2.5], opacity: [1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
