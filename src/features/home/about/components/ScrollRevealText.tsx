"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface Props {
  paragraphs: string[];
}

export default function ScrollRevealText({ paragraphs }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.4"],
  });

  const allWords: { word: string; isParagraphEnd: boolean }[] = [];
  paragraphs.forEach((para, pIndex) => {
    const words = para.split(" ");
    words.forEach((word, wIndex) => {
      allWords.push({
        word,
        isParagraphEnd:
          wIndex === words.length - 1 && pIndex < paragraphs.length - 1,
      });
    });
  });

  const totalWords = allWords.length;

  return (
    <div ref={containerRef} className="space-y-6">
      <p className="text-lg leading-relaxed font-light flex flex-wrap justify-center gap-x-2">
        {allWords.map((item, i) => {
          const start = i / totalWords;
          const end = Math.min(start + 2 / totalWords, 1);
          return (
            <span key={i}>
              <Word
                word={item.word}
                range={[start, end]}
                progress={scrollYProgress}
              />
              {item.isParagraphEnd && <span className="w-full h-6 block" />}
            </span>
          );
        })}
      </p>
    </div>
  );
}

function Word({
  word,
  range,
  progress,
}: {
  word: string;
  range: [number, number];
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const opacity = useTransform(progress, range, [0.4, 1]);
  const color = useTransform(progress, range, [
    "rgb(255 255 255 / 0.4)",
    "rgb(255 255 255 / 0.9)",
  ]);

  return <motion.span style={{ opacity, color }}>{word}</motion.span>;
}
