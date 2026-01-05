"use client";

import { useState, useEffect } from "react";

export default function HeroStats() {
  const [time, setTime] = useState<string>("--:--");
  const [date, setDate] = useState<string>("Loading...");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
      setDate(
        now.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden md:block absolute bottom-32 md:bottom-40 left-6 md:left-12 z-20 font-mono text-[10px] md:text-xs text-white/40 space-y-2">
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        <span>AVAILABLE FOR WORK</span>
      </div>
      <div className="space-y-0.5">
        <div className="flex gap-4">
          <span className="text-white/20">LOCAL</span>
          <span className="text-white/60 tabular-nums">{time}</span>
        </div>
        <div className="flex gap-4">
          <span className="text-white/20">DATE</span>
          <span className="text-white/60">{date}</span>
        </div>
        <div className="flex gap-4">
          <span className="text-white/20">LOC</span>
          <span className="text-white/60">MALANG, ID</span>
        </div>
      </div>
    </div>
  );
}
