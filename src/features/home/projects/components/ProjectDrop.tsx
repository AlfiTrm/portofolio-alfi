"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";

interface ProjectDropProps {
  image: string;
  cardIndex: number;
  progress: MotionValue<number>;
  contentOpacity: MotionValue<number>;
  reduceMotion: boolean;
}

export default function ProjectDrop({
  image,
  cardIndex,
  progress,
  contentOpacity,
  reduceMotion,
}: ProjectDropProps) {
  const start = 0.34 + cardIndex * 0.05;
  const settle = start + 0.17;
  const initialTilt = cardIndex % 2 === 0 ? -12 : 11;
  const landingTilt = (cardIndex % 4) * 7 - 10;
  const initialPitch = cardIndex % 2 === 0 ? 24 : -20;
  const initialYaw = cardIndex % 3 === 0 ? -13 : 12;
  const landingPitch = (cardIndex % 3) * 3 - 3;
  const landingYaw = (cardIndex % 4) * 4 - 6;
  const landingScale = 0.82 + (cardIndex % 4) * 0.045;
  const sideDrift = ((cardIndex % 3) - 1) * 48;
  const x = useTransform(
    progress,
    [0, start, start + 0.08, settle],
    [sideDrift, sideDrift, sideDrift * 0.18, 0],
  );
  const y = useTransform(
    progress,
    [0, start, settle - 0.04, settle],
    ["-110svh", "-110svh", "1.4svh", "0svh"],
  );
  const rotate = useTransform(
    progress,
    [start, start + 0.08, settle],
    [initialTilt, initialTilt * 0.55, landingTilt],
  );
  const rotateX = useTransform(
    progress,
    [start, start + 0.1, settle],
    [initialPitch, initialPitch * 0.28, landingPitch],
  );
  const rotateY = useTransform(
    progress,
    [start, start + 0.1, settle],
    [initialYaw, initialYaw * 0.24, landingYaw],
  );
  const scale = useTransform(
    progress,
    [start, start + 0.1, settle],
    [0.88, 1.06, landingScale],
  );

  return (
    <motion.div
      className={`works-drop-paper works-drop-paper--${cardIndex + 1}`}
      style={{
        x: reduceMotion ? 0 : x,
        y: reduceMotion ? 0 : y,
        rotate: reduceMotion ? 0 : rotate,
        rotateX: reduceMotion ? 0 : rotateX,
        rotateY: reduceMotion ? 0 : rotateY,
        scale: reduceMotion ? 1 : scale,
        opacity: contentOpacity,
        zIndex: 2,
      }}
    >
      <div className="works-drop-card-image">
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 640px) 22vw, 152px"
          className="object-cover"
        />
      </div>
    </motion.div>
  );
}
