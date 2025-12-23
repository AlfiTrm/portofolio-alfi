"use client";

import {
  FaArrowUp,
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { Direction } from "../constants/gameConfig";

interface SnakeControlsProps {
  onControl: (dir: Direction) => void;
}

interface PongControlsProps {
  onUp: (active: boolean) => void;
  onDown: (active: boolean) => void;
}

export function SnakeMobileControls({ onControl }: SnakeControlsProps) {
  return (
    <div className="grid grid-cols-3 gap-2 md:hidden">
      <div />
      <button
        onClick={() => onControl("UP")}
        className="p-4 bg-white/5 rounded-lg flex justify-center active:bg-cyan-500/20"
      >
        <FaArrowUp className="text-white" />
      </button>
      <div />
      <button
        onClick={() => onControl("LEFT")}
        className="p-4 bg-white/5 rounded-lg flex justify-center active:bg-cyan-500/20"
      >
        <FaArrowLeft className="text-white" />
      </button>
      <button
        onClick={() => onControl("DOWN")}
        className="p-4 bg-white/5 rounded-lg flex justify-center active:bg-cyan-500/20"
      >
        <FaArrowDown className="text-white" />
      </button>
      <button
        onClick={() => onControl("RIGHT")}
        className="p-4 bg-white/5 rounded-lg flex justify-center active:bg-cyan-500/20"
      >
        <FaArrowRight className="text-white" />
      </button>
    </div>
  );
}

export function PongMobileControls({ onUp, onDown }: PongControlsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:hidden w-full max-w-[300px]">
      <button
        onTouchStart={() => onUp(true)}
        onTouchEnd={() => onUp(false)}
        className="p-4 bg-white/5 rounded-lg flex justify-center active:bg-cyan-500/20"
      >
        <FaArrowUp className="text-white" />
      </button>
      <button
        onTouchStart={() => onDown(true)}
        onTouchEnd={() => onDown(false)}
        className="p-4 bg-white/5 rounded-lg flex justify-center active:bg-cyan-500/20"
      >
        <FaArrowDown className="text-white" />
      </button>
    </div>
  );
}
