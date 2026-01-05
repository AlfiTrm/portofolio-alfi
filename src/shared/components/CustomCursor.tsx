"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const posRef = useRef({ x: -100, y: -100 });
  const ringPosRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number | undefined>(undefined);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const animate = () => {
      if (!isAnimatingRef.current) return;

      ringPosRef.current.x = lerp(ringPosRef.current.x, posRef.current.x, 0.15);
      ringPosRef.current.y = lerp(ringPosRef.current.y, posRef.current.y, 0.15);

      dot.style.transform = `translate(${posRef.current.x - 4}px, ${
        posRef.current.y - 4
      }px)`;

      ring.style.transform = `translate(${ringPosRef.current.x - 20}px, ${
        ringPosRef.current.y - 20
      }px) scale(${isHovering ? 1.3 : 1})`;

      const dx = Math.abs(ringPosRef.current.x - posRef.current.x);
      const dy = Math.abs(ringPosRef.current.y - posRef.current.y);

      if (dx < 1 && dy < 1) {
        isAnimatingRef.current = false;
        return;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (!isAnimatingRef.current) {
        isAnimatingRef.current = true;
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      startAnimation();
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "button, a, [role='button'], .cursor-pointer"
      );
      setIsHovering(!!interactive);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      isAnimatingRef.current = false;
    };
  }, [isHovering]);

  return (
    <>
      <style jsx global>{`
        @media (min-width: 768px) and (hover: hover) and (pointer: fine) {
          body,
          a,
          button,
          [role="button"] {
            cursor: none !important;
          }
        }
      `}</style>

      <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
        <div
          ref={dotRef}
          className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full will-change-transform"
        />
        <div
          ref={ringRef}
          className="fixed top-0 left-0 w-10 h-10 border border-white/30 rounded-full will-change-transform transition-[border-color] duration-150"
          style={{
            borderColor: isHovering
              ? "rgba(255,255,255,0.6)"
              : "rgba(255,255,255,0.3)",
          }}
        />
      </div>
    </>
  );
}
