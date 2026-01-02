"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ScrambleText from "@/shared/components/ScrambleText";
import ShatteredImage from "./ShatteredImage";
import ScrollIndicator from "./ScrollIndicator";
import HeroStats from "./HeroStats";
import PixelCharacter from "./PixelCharacter";

export default function HeroContent() {
  const [currentRole, setCurrentRole] = useState("Junior Frontend Developer");

  useEffect(() => {
    const roles = ["Junior Frontend Developer", "Future Fullstack Developer"];
    let index = 0;

    const timer = setInterval(() => {
      index = (index + 1) % roles.length;
      setCurrentRole(roles[index]);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

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
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-none tracking-tight mb-4"
        >
          <ScrambleText text="Alfi Tsani" scrambleOnHover={false} />
        </motion.h1>

        <motion.div variants={itemVariants} className="mb-58 md:mb-62">
          <div className="w-16 h-1 bg-white/20 mx-auto mb-6" />
          <h2 className="text-xs sm:text-sm md:text-lg font-light text-white/50 uppercase tracking-[0.25em] sm:tracking-[0.3em] h-8">
            <ScrambleText
              text={currentRole}
              className="text-white/70"
              scrambleClassName="text-white/40"
            />
          </h2>
        </motion.div>

        <motion.div variants={itemVariants}>
          <ShatteredImage
            src="/hero/gambaralfi.webp"
            alt="Alfi Tsani"
            className="w-[500px] h-[500px] md:w-[500px] md:h-[500px] absolute bottom-0"
          />
        </motion.div>

        <ScrollIndicator />
      </motion.div>

      <HeroStats />
      <PixelCharacter />
    </section>
  );
}
