"use client";

import { usePongGame } from "../hooks/usePongGame";
import GameOverlay from "./GameOverlay";
import { PongMobileControls } from "./MobileControls";

export default function PongGame() {
  const {
    canvasRef,
    gameState,
    score,
    resetGame,
    setMobileInput,
    canvasWidth,
    canvasHeight,
  } = usePongGame();

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative group">
        <canvas
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
          className="bg-black/40 border border-white/10 rounded-xl shadow-2xl backdrop-blur-sm max-w-full h-auto"
        />

        {gameState === "START" && (
          <GameOverlay
            type="start"
            title="CYBER PONG"
            subtitle="Defeat the AI to Prove Your Worth"
            buttonText="START GAME"
            onAction={resetGame}
          />
        )}
      </div>

      <div className="w-full max-w-[600px] flex justify-between items-center px-6 py-3 bg-white/5 border border-white/10 rounded-lg">
        <div className="flex items-center gap-2 text-cyan-400">
          <span className="font-mono font-bold">YOU</span>
          <span className="font-mono text-xl">{score.player}</span>
        </div>

        <div className="text-white/20 font-mono text-sm">VS</div>

        <div className="flex items-center gap-2 text-purple-400">
          <span className="font-mono text-xl">{score.ai}</span>
          <span className="font-mono font-bold">CPU</span>
        </div>
      </div>

      <PongMobileControls
        onUp={(active) => setMobileInput("up", active)}
        onDown={(active) => setMobileInput("down", active)}
      />
    </div>
  );
}
