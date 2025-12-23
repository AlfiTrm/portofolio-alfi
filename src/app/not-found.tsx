"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SnakeGame from "@/features/not-found/components/SnakeGame";
import PongGame from "@/features/not-found/components/PongGame";
import { FaHome, FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function NotFound() {
  const [gameIndex, setGameIndex] = useState(0);

  const games = [
    { title: "CYBER SNAKE", component: <SnakeGame /> },
    { title: "CYBER PONG", component: <PongGame /> },
  ];

  const nextGame = () => {
    setGameIndex((prev) => (prev + 1) % games.length);
  };

  const prevGame = () => {
    setGameIndex((prev) => (prev - 1 + games.length) % games.length);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-8 max-w-4xl mx-auto w-full">
        <div className="text-center space-y-4">
          <div className="inline-block px-6 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-red-500 text-xl font-mono tracking-widest mb-2 animate-pulse">
            ERROR 404
          </div>
          <p className="text-white/40 text-lg max-w-md mx-auto">
            The page you&apos;re looking for seems to have disconnected. While
            we try to restore the link, enjoy playing.
          </p>
        </div>

        <div className="relative w-full flex items-center justify-center gap-8">
          <button
            onClick={prevGame}
            className="hidden md:flex p-4 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all border border-white/5 hover:scale-110"
          >
            <FaChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex-1 max-w-[700px] relative min-h-[500px] flex flex-col items-center">
            <div className="w-full flex justify-between items-center mb-4 px-4">
              <button
                onClick={prevGame}
                className="md:hidden p-2 text-white/50 hover:text-white"
              >
                <FaChevronLeft />
              </button>
              <h2 className="text-xl font-bold text-cyan-400 tracking-widest text-center w-full">
                {games[gameIndex].title}
              </h2>
              <button
                onClick={nextGame}
                className="md:hidden p-2 text-white/50 hover:text-white"
              >
                <FaChevronRight />
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={gameIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="w-full flex justify-center"
              >
                {games[gameIndex].component}
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-2 mt-6">
              {games.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setGameIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === gameIndex
                      ? "bg-cyan-400 w-6"
                      : "bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={nextGame}
            className="hidden md:flex p-4 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all border border-white/5 hover:scale-110"
          >
            <FaChevronRight className="w-6 h-6" />
          </button>
        </div>

        <Link
          href="/"
          className="flex items-center gap-2 px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-white/90 transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)] mt-4"
        >
          <FaHome /> RETURN TO BASE
        </Link>
      </div>

      <div className="absolute bottom-4 left-0 right-0 text-center text-white/10 text-xs font-mono">
        SYSTEM_ID: NULL
      </div>
    </div>
  );
}
