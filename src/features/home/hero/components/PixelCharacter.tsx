"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";

function highlightSyntax(code: string) {
  const keywords = ["const", "let", "while", "true", "false"];
  const functions = ["buildAmazingStuff", "refill"];
  const strings = /'[^']*'/g;

  let result = code;

  result = result.replace(strings, '<span class="text-amber-400">$&</span>');

  keywords.forEach((kw) => {
    const regex = new RegExp(`\\b${kw}\\b`, "g");
    result = result.replace(
      regex,
      `<span class="text-purple-400">${kw}</span>`
    );
  });

  functions.forEach((fn) => {
    const regex = new RegExp(`\\b${fn}\\b`, "g");
    result = result.replace(regex, `<span class="text-blue-400">${fn}</span>`);
  });

  return result;
}

export default function PixelCharacter() {
  const [text, setText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);

  const codeLines = useMemo(
    () => [
      "const dev = 'Alfi';",
      "let coffee = true;",
      "while (coffee) {",
      "  buildAmazingStuff();",
      "  coffee = refill();",
      "}",
    ],
    []
  );

  useEffect(() => {
    const currentLine = codeLines[lineIndex];
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      if (charIndex <= currentLine.length) {
        setText(currentLine.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setLineIndex((prev) => (prev + 1) % codeLines.length);
        }, 1500);
      }
    }, 80);

    return () => clearInterval(typeInterval);
  }, [lineIndex, codeLines]);

  return (
    <div className="absolute bottom-28 md:bottom-36 right-4 md:right-10 z-20">
      {/* Mini Terminal Window */}
      <motion.div
        className="relative w-[150px] md:w-[170px] bg-black/60 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.03, borderColor: "rgba(34,211,238,0.3)" }}
      >
        {/* Title Bar */}
        <div className="flex items-center justify-between px-2 py-1.5 bg-white/5 border-b border-white/5">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/80" />
            <div className="w-1.5 h-1.5 rounded-full bg-green-500/80" />
          </div>
          <span className="text-[7px] text-white/40 font-mono">main.ts</span>
        </div>

        {/* Code Area with line numbers */}
        <div className="p-2 font-mono text-[8px] md:text-[9px] flex gap-2">
          {/* Line numbers */}
          <div className="text-white/20 select-none">
            {codeLines.map((_, i) => (
              <div key={i} className="leading-relaxed">
                {i + 1}
              </div>
            ))}
          </div>

          {/* Code content */}
          <div className="flex-1">
            {/* Previous lines with syntax highlighting */}
            {codeLines.slice(0, lineIndex).map((line, i) => (
              <div
                key={i}
                className="text-white/40 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: highlightSyntax(line) }}
              />
            ))}

            {/* Current typing line */}
            <div className="leading-relaxed flex">
              <span
                className="text-white/80"
                dangerouslySetInnerHTML={{ __html: highlightSyntax(text) }}
              />
              <motion.span
                className="w-[2px] h-3 bg-cyan-400 ml-0.5"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            </div>

            {/* Upcoming lines (hidden) */}
            {codeLines.slice(lineIndex + 1).map((_, i) => (
              <div
                key={i}
                className="text-transparent leading-relaxed select-none"
              >
                .
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Status indicator */}
      <div className="flex items-center justify-end gap-1.5 mt-1.5 mr-1">
        <motion.div
          className="w-1 h-1 rounded-full bg-green-400"
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span className="text-[8px] font-mono text-white/30 uppercase tracking-wider">
          typing...
        </span>
      </div>
    </div>
  );
}
