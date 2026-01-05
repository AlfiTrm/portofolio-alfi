"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

const CHARS = "!@#$%^&*():{};|,.<>/?";

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleClassName?: string;
  scrambleOnHover?: boolean;
}

export default function ScrambleText({
  text,
  className = "",
  scrambleClassName = "text-cyan-400",
  scrambleOnHover = true,
}: ScrambleTextProps) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [scrambledText, setScrambledText] = useState(text.split(""));
  const [revealIndex, setRevealIndex] = useState(text.length);

  const scramble = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    let pos = 0;

    intervalRef.current = setInterval(() => {
      const newText = text.split("").map((char, index) => {
        if (index < pos) {
          return text[index];
        }
        if (text[index] === " ") return "\u00A0";
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      });

      setScrambledText(newText);
      setRevealIndex(Math.floor(pos));

      pos += 0.4;

      if (pos >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setScrambledText(text.split(""));
        setRevealIndex(text.length);
      }
    }, 50);
  }, [text]);

  useEffect(() => {
    scramble();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, scramble]);

  return (
    <motion.span
      className={`inline-block whitespace-nowrap cursor-default relative overflow-hidden ${className}`}
      onMouseEnter={scrambleOnHover ? scramble : undefined}
      onClick={scramble}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-block">
        {scrambledText.map((char, index) => (
          <span
            key={index}
            className={`inline-block transition-colors duration-200 ${
              index < revealIndex ? "" : `${scrambleClassName} font-mono`
            }`}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    </motion.span>
  );
}
