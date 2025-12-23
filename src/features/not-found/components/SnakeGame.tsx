"use client";

import { FaTrophy } from "react-icons/fa";
import { useSnakeGame } from "../hooks/useSnakeGame";
import { SNAKE_CONFIG } from "../constants/gameConfig";
import GameOverlay from "./GameOverlay";
import { SnakeMobileControls } from "./MobileControls";

export default function SnakeGame() {
  const { canvasRef, gameState, score, highScore, resetGame, handleControl } =
    useSnakeGame();

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative group">
        <canvas
          ref={canvasRef}
          width={SNAKE_CONFIG.CANVAS_SIZE}
          height={SNAKE_CONFIG.CANVAS_SIZE}
          className="bg-black/40 border border-white/10 rounded-xl shadow-2xl backdrop-blur-sm"
        />

        {gameState === "START" && (
          <GameOverlay
            type="start"
            title="CYBER SNAKE"
            subtitle="Use Arrow Keys to Navigate"
            buttonText="START GAME"
            onAction={resetGame}
          />
        )}

        {gameState === "GAME_OVER" && (
          <GameOverlay
            type="gameover"
            title="SYSTEM FAILURE"
            subtitle=""
            buttonText="TRY AGAIN"
            onAction={resetGame}
            score={score}
          />
        )}
      </div>

      <div className="w-full max-w-[400px] flex flex-col gap-4">
        <div className="flex justify-between items-center px-4 py-3 bg-white/5 border border-white/10 rounded-lg">
          <div className="flex items-center gap-2 text-cyan-400">
            <span className="font-mono font-bold">SCORE:</span>
            <span className="font-mono text-xl">{score}</span>
          </div>
          <div className="flex items-center gap-2 text-yellow-400">
            <FaTrophy />
            <span className="font-mono font-bold">BEST:</span>
            <span className="font-mono text-xl">{highScore}</span>
          </div>
        </div>

        <SnakeMobileControls onControl={handleControl} />
      </div>
    </div>
  );
}
