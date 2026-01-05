"use client";

import { useEffect, useRef, useState } from "react";

export default function BentoGridBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const keywords = [
    { text: "Coffee Addict", size: "text-lg" },
    { text: "Nocturnal Creature", size: "text-sm" },
    { text: "Born to Game", size: "text-base" },
    { text: "Spotify Enjoyer", size: "text-xs" },
    { text: "Code Enjoyer", size: "text-base" },

    { text: "Frontend Developer", size: "text-xl" },
    { text: "Future Fullstack", size: "text-lg" },
    { text: "Future Backend", size: "text-base" },
    { text: "React", size: "text-base" },
    { text: "TypeScript", size: "text-lg" },
    { text: "Next.js", size: "text-sm" },
    { text: "Tailwind CSS", size: "text-xs" },
    { text: "JavaScript", size: "text-base" },
    { text: "Node.js", size: "text-sm" },

    { text: "UI/UX", size: "text-sm" },
    { text: "Clean Code", size: "text-base" },
    { text: "Responsive", size: "text-xs" },
    { text: "Git Master", size: "text-sm" },
    { text: "API Design", size: "text-xs" },

    { text: "Always Learning", size: "text-lg" },
    { text: "Build & Ship", size: "text-base" },
    { text: "User First", size: "text-sm" },
    { text: "Creative", size: "text-xs" },
    { text: "Problem Solver", size: "text-base" },
    { text: "Passion Driven", size: "text-sm" },
    { text: "Detail Oriented", size: "text-xs" },
    { text: "Fast Learner", size: "text-sm" },
    { text: "Team Player", size: "text-xs" },
    { text: "Open Source", size: "text-sm" },
    { text: "Pixel Perfect", size: "text-xs" },
  ];

  const positions = [
    { top: "5%", left: "8%" },
    { top: "12%", left: "75%" },
    { top: "18%", left: "25%" },
    { top: "25%", left: "85%" },
    { top: "32%", left: "15%" },
    { top: "38%", left: "60%" },
    { top: "45%", left: "35%" },
    { top: "52%", left: "80%" },
    { top: "58%", left: "10%" },
    { top: "65%", left: "70%" },
    { top: "72%", left: "40%" },
    { top: "78%", left: "20%" },
    { top: "85%", left: "65%" },
    { top: "8%", left: "50%" },
    { top: "28%", left: "45%" },
    { top: "48%", left: "55%" },
    { top: "68%", left: "90%" },
    { top: "88%", left: "30%" },
    { top: "15%", left: "92%" },
    { top: "92%", left: "12%" },

    { top: "10%", left: "40%" },
    { top: "22%", left: "65%" },
    { top: "35%", left: "88%" },
    { top: "42%", left: "12%" },
    { top: "55%", left: "48%" },
    { top: "62%", left: "28%" },
    { top: "75%", left: "82%" },
    { top: "82%", left: "52%" },
    { top: "90%", left: "75%" },
    { top: "95%", left: "42%" },
  ];

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", updateDimensions);
      };
    }
  }, []);

  const getOpacity = (elementX: number, elementY: number) => {
    const distance = Math.sqrt(
      Math.pow(mousePos.x - elementX, 2) + Math.pow(mousePos.y - elementY, 2)
    );

    const maxDistance = 300; 
    const minOpacity = 0.05;
    const maxOpacity = 0.35;

    if (distance > maxDistance) return minOpacity;

    const opacity =
      maxOpacity - (distance / maxDistance) * (maxOpacity - minOpacity);
    return opacity;
  };

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {keywords.map((keyword, index) => {
        const topPercent = parseFloat(positions[index].top);
        const leftPercent = parseFloat(positions[index].left);

        return (
          <div
            key={index}
            className={`absolute ${keyword.size} text-white whitespace-nowrap`}
            style={{
              top: positions[index].top,
              left: positions[index].left,
              opacity:
                containerDimensions.width > 0
                  ? getOpacity(
                      (leftPercent / 100) * containerDimensions.width,
                      (topPercent / 100) * containerDimensions.height
                    )
                  : 0.05,
              transition: "opacity 0.5s ease-out",
            }}
          >
            {keyword.text}
          </div>
        );
      })}
    </div>
  );
}
