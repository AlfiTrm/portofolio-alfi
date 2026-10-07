"use client";

import Lenis from "@studio-freight/lenis";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  clearScrollRestoringMarker,
  getMemoryScrollSnapshot,
  saveScrollSnapshot,
  type ScrollRestoreSurface,
} from "./scrollSession";

export interface SmoothScrollRuntime {
  lenis: Lenis;
}

const SmoothScrollContext = createContext<SmoothScrollRuntime | null>(null);
const STORAGE_WRITE_INTERVAL = 250;

function getNavigationDuration(distance: number) {
  return Math.min(1.7, Math.max(0.72, 0.72 + Math.sqrt(distance / 9_000) * 0.9));
}

function getRestoreSurface(): ScrollRestoreSurface {
  if (document.documentElement.dataset.scrollRestoring === "true") {
    return getMemoryScrollSnapshot()?.surface ?? "dark";
  }

  const element = document.elementFromPoint(
    Math.round(window.innerWidth / 2),
    Math.round(window.innerHeight / 2),
  );
  const surface = element
    ?.closest<HTMLElement>("[data-restore-surface]")
    ?.dataset.restoreSurface;

  return surface === "hero" || surface === "light" || surface === "contact"
    ? surface
    : "dark";
}

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [runtime, setRuntime] = useState<SmoothScrollRuntime | null>(null);

  useEffect(() => {
    const restoreSnapshot = getMemoryScrollSnapshot();
    let lastStorageWriteAt = 0;
    let hasSeenScroll = false;
    let initialPositionResolved = false;

    const saveCurrentScroll = (scrollY = window.scrollY, force = false) => {
      const shouldPersist =
        force || Date.now() - lastStorageWriteAt >= STORAGE_WRITE_INTERVAL;
      saveScrollSnapshot(
        scrollY,
        shouldPersist,
        shouldPersist ? getRestoreSurface() : undefined,
      );
      if (shouldPersist) lastStorageWriteAt = Date.now();
    };

    const handleScroll = () => {
      hasSeenScroll = true;
      saveCurrentScroll();
    };
    const flushScroll = () => saveCurrentScroll(window.scrollY, true);
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") flushScroll();
    };

    const attachPersistence = () => {
      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("pagehide", flushScroll);
      document.addEventListener("visibilitychange", handleVisibilityChange);
    };

    const detachPersistence = () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pagehide", flushScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) {
      let restoreFrame = 0;
      let secondRestoreFrame = 0;

      const scrollToCurrentHash = (force: boolean) => {
        const id = decodeURIComponent(window.location.hash.slice(1));
        if (!id) {
          if (force) window.scrollTo(0, 0);
          return;
        }
        if (!force && window.scrollY > 20) return;

        const section = document.getElementById(id);
        if (section) section.scrollIntoView();
      };
      const handleHistoryNavigation = () => scrollToCurrentHash(true);

      attachPersistence();
      window.addEventListener("popstate", handleHistoryNavigation);
      window.addEventListener("hashchange", handleHistoryNavigation);

      const restorePosition = () => {
        if (restoreSnapshot) {
          window.scrollTo(0, restoreSnapshot.scrollY);
          saveCurrentScroll(window.scrollY, true);
          initialPositionResolved = true;
          clearScrollRestoringMarker();
          return;
        }

        scrollToCurrentHash(false);
        initialPositionResolved = true;
        clearScrollRestoringMarker();
      };

      restoreFrame = window.requestAnimationFrame(() => {
        secondRestoreFrame = window.requestAnimationFrame(restorePosition);
      });

      return () => {
        window.cancelAnimationFrame(restoreFrame);
        window.cancelAnimationFrame(secondRestoreFrame);
        detachPersistence();
        window.removeEventListener("popstate", handleHistoryNavigation);
        window.removeEventListener("hashchange", handleHistoryNavigation);
        if (initialPositionResolved || hasSeenScroll) flushScroll();
        if (initialPositionResolved) clearScrollRestoringMarker();
      };
    }

    const lenis = new Lenis({
      smoothWheel: true,
      syncTouch: false,
      lerp: 0.1,
      touchMultiplier: 1,
    });

    let destroyed = false;
    let frameId = 0;
    let restoreFrame = 0;
    let secondRestoreFrame = 0;

    const requestNextFrame = () => {
      if (destroyed) return;
      frameId = window.requestAnimationFrame((time) => {
        lenis.raf(time);
        requestNextFrame();
      });
    };

    const handleAnchorClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) return;

      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>("a[href^='#']");
      if (!anchor || anchor.hasAttribute("download")) return;

      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;

      const id = decodeURIComponent(hash.slice(1));
      const section = document.getElementById(id);
      if (!section) return;

      event.preventDefault();
      if (window.location.hash !== hash) window.history.pushState(null, "", hash);
      section.focus({ preventScroll: true });
      const offset = id === "home" || id === "about" ? 0 : -88;
      const currentScroll = lenis.scroll;
      const destination = section.getBoundingClientRect().top + currentScroll + offset;
      const distance = Math.abs(destination - currentScroll);
      lenis.scrollTo(section, { offset, duration: getNavigationDuration(distance) });
    };

    const scrollToCurrentHash = (force: boolean) => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) {
        if (force) lenis.scrollTo(0, { immediate: true });
        return;
      }
      if (!force && window.scrollY > 20) return;

      const section = document.getElementById(id);
      if (!section) return;
      const offset = id === "home" || id === "about" ? 0 : -88;
      lenis.scrollTo(section, { offset, immediate: true });
    };
    const handleHistoryNavigation = () => scrollToCurrentHash(true);

    const restorePosition = () => {
      if (restoreSnapshot) {
        lenis.resize();
        const target = Math.min(restoreSnapshot.scrollY, lenis.limit);
        lenis.scrollTo(target, { immediate: true });
        saveCurrentScroll(target, true);
        initialPositionResolved = true;
        clearScrollRestoringMarker();
        return;
      }

      scrollToCurrentHash(false);
      initialPositionResolved = true;
      clearScrollRestoringMarker();
    };

    const nextRuntime = { lenis };

    document.addEventListener("click", handleAnchorClick);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("pagehide", flushScroll);
    window.addEventListener("popstate", handleHistoryNavigation);
    window.addEventListener("hashchange", handleHistoryNavigation);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    setRuntime(nextRuntime);

    restoreFrame = window.requestAnimationFrame(() => {
      secondRestoreFrame = window.requestAnimationFrame(restorePosition);
    });
    requestNextFrame();

    return () => {
      destroyed = true;
      window.cancelAnimationFrame(frameId);
      window.cancelAnimationFrame(restoreFrame);
      window.cancelAnimationFrame(secondRestoreFrame);
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pagehide", flushScroll);
      window.removeEventListener("popstate", handleHistoryNavigation);
      window.removeEventListener("hashchange", handleHistoryNavigation);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (initialPositionResolved || hasSeenScroll) flushScroll();
      if (initialPositionResolved) clearScrollRestoringMarker();
      lenis.destroy();
      setRuntime((current) => current === nextRuntime ? null : current);
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={runtime}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
