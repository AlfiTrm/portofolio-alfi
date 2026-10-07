"use client";

import { useCallback, useEffect, useState } from "react";
import { useSmoothScroll } from "@/shared/components/motion/SmoothScroll";

type ElementRef<T extends HTMLElement> = { current: T | null };

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function useTimelineRuntime({
  sectionRef,
  storyListRef,
  reducedMotion,
}: {
  sectionRef: ElementRef<HTMLElement>;
  storyListRef: ElementRef<HTMLDivElement>;
  reducedMotion: boolean | null;
}) {
  const scrollRuntime = useSmoothScroll();
  const [webglEligible, setWebglEligible] = useState(false);
  const [sectionInView, setSectionInView] = useState(false);
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [sceneReady, setSceneReady] = useState(false);
  const [sceneFailed, setSceneFailed] = useState(false);
  const shouldEnhance = webglEligible && sectionInView && !reducedMotion && !sceneFailed;
  const visibleProgress = reducedMotion ? 1 : progress;

  const handleSceneReady = useCallback(() => setSceneReady(true), []);
  const handleSceneUnavailable = useCallback(() => {
    setSceneReady(false);
    setSceneFailed(true);
  }, []);

  useEffect(() => {
    const viewport = window.matchMedia("(min-width: 1120px)");
    const updateEligibility = () => setWebglEligible(viewport.matches);
    updateEligibility();
    viewport.addEventListener("change", updateEligibility);
    return () => viewport.removeEventListener("change", updateEligibility);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => setSectionInView(Boolean(entry?.isIntersecting)),
      { rootMargin: "320px 0px" },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [sectionRef]);

  useEffect(() => {
    const entries = storyListRef.current?.querySelectorAll<HTMLElement>("[data-milestone-index]");
    if (!entries?.length || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (observedEntries) => {
        const candidates = observedEntries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => {
            const viewportCenter = window.innerHeight / 2;
            const leftCenter = left.boundingClientRect.top + left.boundingClientRect.height / 2;
            const rightCenter = right.boundingClientRect.top + right.boundingClientRect.height / 2;
            return Math.abs(leftCenter - viewportCenter) - Math.abs(rightCenter - viewportCenter);
          });
        const active = candidates[0]?.target.getAttribute("data-milestone-index");
        if (active !== null && active !== undefined) setActiveMilestoneIndex(Number(active));
      },
      { rootMargin: "-34% 0px -34% 0px", threshold: [0, 0.15, 0.35, 0.65, 1] },
    );

    entries.forEach((entry) => observer.observe(entry));
    return () => observer.disconnect();
  }, [storyListRef]);

  useEffect(() => {
    const storyList = storyListRef.current;
    if (!storyList || reducedMotion) {
      if (reducedMotion) setProgress(1);
      return;
    }

    let cancelled = false;
    let trigger: { kill: () => void } | null = null;
    let removeLenisListener: (() => void) | null = null;
    let timelineScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger | null = null;

    const connectMotion = async () => {
      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
        if (cancelled) return;

        timelineScrollTrigger = ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);
        if (scrollRuntime) {
          removeLenisListener = scrollRuntime.lenis.on("scroll", ScrollTrigger.update);
        }

        trigger = ScrollTrigger.create({
          trigger: storyList,
          start: "top 92%",
          end: "bottom 88%",
          onUpdate: (self) => setProgress(clamp01(self.progress)),
        });
        ScrollTrigger.refresh();
      } catch {
        if (!cancelled) {
          setProgress(1);
          setSceneFailed(true);
          setSceneReady(false);
        }
      }
    };

    void connectMotion();

    return () => {
      cancelled = true;
      trigger?.kill();
      removeLenisListener?.();
      timelineScrollTrigger?.refresh();
    };
  }, [reducedMotion, scrollRuntime, storyListRef]);

  return {
    activeMilestoneIndex,
    handleSceneReady,
    handleSceneUnavailable,
    sceneReady,
    shouldEnhance,
    visibleProgress,
  };
}
