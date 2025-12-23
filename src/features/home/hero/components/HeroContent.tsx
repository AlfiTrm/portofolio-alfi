"use client";

import { motion } from "framer-motion";
import ShatteredImage from "./ShatteredImage";
import { personalData } from "../data/personalData";

export default function HeroContent() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      id="home"
      className="relative z-10 min-h-screen flex items-center justify-center px-6 md:px-8 -translate-y-14"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center max-w-4xl mx-auto text-center"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-none tracking-tight mb-4"
        >
          Alfi Tsani
        </motion.h1>

        <motion.div variants={itemVariants} className="mb-50 md:mb-60">
          <div className="w-16 h-[1px] bg-white/20 mx-auto mb-4" />
          <h2 className="text-base md:text-lg font-light text-white/30 uppercase tracking-[0.4em]">
            {personalData.position}
          </h2>
        </motion.div>

        <motion.div variants={itemVariants}>
          <ShatteredImage
            src="/hero/gambaralfi.webp"
            alt="Alfi Tsani"
            className="w-[500px] h-[500px] md:w-[550px] md:h-[550px] absolute bottom-0"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
