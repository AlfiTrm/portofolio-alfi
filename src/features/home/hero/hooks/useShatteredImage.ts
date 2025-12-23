"use client";

import { useState, useEffect } from "react";

export interface Fragment {
  id: string;
  row: number;
  col: number;
  scatterX: number;
  scatterY: number;
  scatterRotate: number;
  delay: number;
  floatPathX: number[];
  floatPathY: number[];
  floatDuration: number;
  floatDelay: number;
  depth: number;
}

interface UseShatteredImageProps {
  cols?: number;
  rows?: number;
  scatterIntensity?: number;
}

export function useShatteredImage({
  cols = 8,
  rows = 8,
  scatterIntensity = 80,
}: UseShatteredImageProps = {}) {
  const [isHovered, setIsHovered] = useState(false);

  const [fragments, setFragments] = useState<Fragment[]>([]);

  useEffect(() => {
    const result: Fragment[] = [];
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const numPoints = 5;
        const floatPathX = Array.from({ length: numPoints }, () => (Math.random() - 0.5) * 50);
        const floatPathY = Array.from({ length: numPoints }, () => (Math.random() - 0.5) * 50);
        
        floatPathX[0] = 0;
        floatPathX[numPoints - 1] = 0;
        floatPathY[0] = 0;
        floatPathY[numPoints - 1] = 0;

        const floatDuration = 5 + Math.random() * 5;
        const floatDelay = Math.random() * -5;
        const depth = (Math.random() - 0.5) * 2;
        
        result.push({
          id: `${row}-${col}`,
          row,
          col,
          scatterX: (Math.random() - 0.5) * scatterIntensity,
          scatterY: (Math.random() - 0.5) * scatterIntensity,
          scatterRotate: (Math.random() - 0.5) * 60,
          delay: (row + col) * 0.01,
          floatPathX,
          floatPathY,
          floatDuration,
          floatDelay,
          depth,
        });
      }
    }
    
    setFragments(result);
  }, [cols, rows, scatterIntensity]);

  const fragmentWidth = 100 / cols;
  const fragmentHeight = 100 / rows;

  return {
    fragments,
    fragmentWidth,
    fragmentHeight,
    cols,
    rows,
    isHovered,
    setIsHovered,
  };
}
