"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import CurvedText from "./CurvedText";
import { techStack } from "../data/techStack";

interface HeroImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function HeroImage({
  src,
  alt,
  className = "",
}: HeroImageProps) {
  const techStackText = techStack
    .map((tech) => tech.name)
    .join(" </> ")
    .repeat(2);

  return (
    <div className={`relative ${className}`}>
      <CurvedText text={techStackText} radius={260} duration={25} />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[350px] h-[350px] bg-cyan-500/5 rounded-full blur-2xl" />
      </div>

      <motion.div
        className="relative w-[400px] h-[400px] md:w-[450px] md:h-[450px] mx-auto group"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="absolute inset-0 rounded-full border border-white/5" />
        <div className="absolute inset-4 rounded-full border border-white/10" />

        <div className="absolute inset-4.5 rounded-full overflow-hidden">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain grayscale group-hover:grayscale-0 transition-all duration-700"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
      </motion.div>
    </div>
  );
}
