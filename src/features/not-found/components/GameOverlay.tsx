"use client";

import { motion } from "framer-motion";
import { FaRedo } from "react-icons/fa";

interface GameOverlayProps {
  type: "start" | "gameover";
  title: string;
  subtitle: string;
  buttonText: string;
  onAction: () => void;
  score?: number;
}

export default function GameOverlay({
  type,
  title,
  subtitle,
  buttonText,
  onAction,
  score,
}: GameOverlayProps) {
  const isGameOver = type === "gameover";

  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center backdrop-blur-sm rounded-xl ${
        isGameOver ? "bg-black/80" : "bg-black/60"
      }`}
    >
      <motion.div
        initial={
          isGameOver ? { y: 20, opacity: 0 } : { scale: 0.8, opacity: 0 }
        }
        animate={isGameOver ? { y: 0, opacity: 1 } : { scale: 1, opacity: 1 }}
        className="text-center"
      >
        <h3
          className={`text-3xl font-bold mb-2 ${
            isGameOver ? "text-red-500" : "text-white"
          }`}
        >
          {title}
        </h3>
        {isGameOver && score !== undefined && (
          <p className="text-white/80 text-lg mb-6">Score: {score}</p>
        )}
        {!isGameOver && (
          <p className="text-white/60 mb-6 text-sm">{subtitle}</p>
        )}
        <button
          onClick={onAction}
          className={`px-6 py-2 font-bold rounded-full transition-all flex items-center gap-2 mx-auto ${
            isGameOver
              ? "border border-white/20 hover:bg-white/10 text-white font-medium"
              : "bg-cyan-500 hover:bg-cyan-400 text-black"
          }`}
        >
          <FaRedo className={isGameOver ? "" : "text-sm"} /> {buttonText}
        </button>
      </motion.div>
    </div>
  );
}
