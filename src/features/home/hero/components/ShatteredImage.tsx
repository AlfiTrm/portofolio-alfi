"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { useShatteredImage, Fragment } from "../hooks/useShatteredImage";
import "../styles/hero.css";

interface ShatteredImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ShatteredImage({
  src,
  alt,
  className = "",
}: ShatteredImageProps) {
  const {
    fragments,
    fragmentWidth,
    fragmentHeight,
    cols,
    rows,
    isHovered,
    setIsHovered,
  } = useShatteredImage({ cols: 10, rows: 10, scatterIntensity: 60 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set(clientX / innerWidth);
      mouseY.set(clientY / innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className={`absolute bottom-0 left-1/2 -translate-x-1/2 cursor-pointer group ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial="scattered"
      whileHover="assembled"
    >
      <div className="relative w-full h-full">
        {fragments.map((fragment) => (
          <ShatteredFragment
            key={fragment.id}
            fragment={fragment}
            src={src}
            alt={alt}
            fragmentWidth={fragmentWidth}
            fragmentHeight={fragmentHeight}
            cols={cols}
            rows={rows}
            isHovered={isHovered}
            mouseX={mouseX}
            mouseY={mouseY}
          />
        ))}
      </div>

      <motion.p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white/15 text-xs uppercase tracking-widest whitespace-nowrap group-hover:opacity-0 transition-opacity duration-300">
        Hover
      </motion.p>
    </motion.div>
  );
}

function ShatteredFragment({
  fragment,
  src,
  alt,
  fragmentWidth,
  fragmentHeight,
  cols,
  rows,
  isHovered,
  mouseX,
  mouseY,
}: {
  fragment: Fragment;
  src: string;
  alt: string;
  fragmentWidth: number;
  fragmentHeight: number;
  cols: number;
  rows: number;
  isHovered: boolean;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}) {
  const parallaxIntensity = useSpring(isHovered ? 0 : 1, {
    stiffness: 100,
    damping: 20,
  });

  useEffect(() => {
    parallaxIntensity.set(isHovered ? 0 : 1);
  }, [isHovered, parallaxIntensity]);

  const rawX = useTransform(
    mouseX,
    [0, 1],
    [-fragment.depth * 30, fragment.depth * 30]
  );
  const rawY = useTransform(
    mouseY,
    [0, 1],
    [-fragment.depth * 30, fragment.depth * 30]
  );

  const x = useTransform(() => rawX.get() * parallaxIntensity.get());
  const y = useTransform(() => rawY.get() * parallaxIntensity.get());

  return (
    <motion.div
      className="absolute overflow-hidden"
      style={{
        width: `${fragmentWidth}%`,
        height: `${fragmentHeight}%`,
        left: `${fragment.col * fragmentWidth}%`,
        top: `${fragment.row * fragmentHeight}%`,
      }}
      variants={{
        scattered: {
          x: fragment.scatterX,
          y: fragment.scatterY,
          rotate: fragment.scatterRotate,
          opacity: 0.35,
          scale: 0.92,
          filter: "grayscale(100%) brightness(0.4)",
        },
        assembled: {
          x: 0,
          y: 0,
          rotate: 0,
          opacity: 1,
          scale: 1,
          filter: "grayscale(0%) brightness(1)",
        },
      }}
      transition={{
        duration: 0.5,
        delay: fragment.delay,
        ease: "circOut",
      }}
    >
      <motion.div className="w-full h-full" style={{ x, y }}>
        <motion.div
          className="w-full h-full"
          animate={
            isHovered
              ? { x: 0, y: 0, rotate: 0 }
              : {
                  x: fragment.floatPathX,
                  y: fragment.floatPathY,
                  rotate: [0, 2, -2, 1, -1, 0],
                }
          }
          transition={
            isHovered
              ? { duration: 0, type: "tween" }
              : {
                  duration: fragment.floatDuration,
                  delay: fragment.floatDelay,
                  repeat: Infinity,
                  ease: "linear",
                  times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                }
          }
        >
          <div
            className="relative w-full h-full"
            style={{
              width: `${cols * 100}%`,
              height: `${rows * 100}%`,
              marginLeft: `-${fragment.col * 100}%`,
              marginTop: `-${fragment.row * 100}%`,
            }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain grayscale"
              priority
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
