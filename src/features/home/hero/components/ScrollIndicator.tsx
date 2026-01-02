"use client";

import { motion } from "framer-motion";

export default function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-6 md:left-12 flex items-center gap-3 z-10">
      <motion.div
        className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="w-full h-3 bg-white/80"
          animate={{ y: [-12, 32, -12] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
      <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
        Scroll
      </span>
    </div>
  );
}
