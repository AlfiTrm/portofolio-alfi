"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  getMemoryScrollSnapshot,
  hasPortfolioAppHydrated,
  markPortfolioAppHydrated,
  updateScrollSession,
} from "./scrollSession";
import { useSmoothScroll } from "./SmoothScroll";

const TOP_ENTER_THRESHOLD = 20;
const TOP_REARM_THRESHOLD = 80;

interface PageScrollCycleState {
  cycle: number;
  ready: boolean;
}

const PageScrollCycleContext = createContext<PageScrollCycleState>({
  cycle: 0,
  ready: false,
});

export function usePageScrollCycle() {
  return useContext(PageScrollCycleContext).cycle;
}

export function useScrollCycleReveal(isInView: boolean, revealKey: string) {
  const { cycle, ready } = useContext(PageScrollCycleContext);
  const canReadMemory = hasPortfolioAppHydrated();
  const [revealedCycle, setRevealedCycle] = useState<number | null>(() => {
    if (!canReadMemory) return null;

    const snapshot = getMemoryScrollSnapshot();
    return snapshot?.revealed[revealKey] === cycle ? cycle : null;
  });

  useEffect(() => {
    if (!ready) return;

    const snapshot = getMemoryScrollSnapshot();
    if (snapshot?.revealed[revealKey] === cycle) {
      if (revealedCycle !== cycle) setRevealedCycle(cycle);
      return;
    }

    if (!isInView) return;

    const revealed = {
      ...(snapshot?.revealed ?? {}),
      [revealKey]: cycle,
    };
    updateScrollSession({ revealed });
    setRevealedCycle(cycle);
  }, [cycle, isInView, ready, revealKey, revealedCycle]);

  return revealedCycle === cycle;
}

export default function PageScrollCycleProvider({
  children,
}: {
  children: ReactNode;
}) {
  const scrollRuntime = useSmoothScroll();
  const canReadMemory = hasPortfolioAppHydrated();
  const initialSnapshot = canReadMemory ? getMemoryScrollSnapshot() : null;
  const [cycle, setCycle] = useState(initialSnapshot?.cycle ?? 0);
  const [ready, setReady] = useState(canReadMemory);
  const hasLeftTopRef = useRef(initialSnapshot?.hasLeftTop ?? false);

  useEffect(() => {
    const snapshot = getMemoryScrollSnapshot();
    if (snapshot) {
      hasLeftTopRef.current = snapshot.hasLeftTop;
      setCycle(snapshot.cycle);
    }

    markPortfolioAppHydrated();
    setReady(true);
  }, []);

  useEffect(() => {
    const updateCycle = (scrollY: number) => {
      // The browser starts at the top before SmoothScroll restores a saved
      // position. That transition is restoration work, not a user return to top.
      if (document.documentElement.dataset.scrollRestoring === "true") return;

      const snapshot = getMemoryScrollSnapshot();

      if (scrollY > TOP_REARM_THRESHOLD) {
        if (!hasLeftTopRef.current) {
          hasLeftTopRef.current = true;
          updateScrollSession({ hasLeftTop: true });
        }
        return;
      }

      if (scrollY <= TOP_ENTER_THRESHOLD && hasLeftTopRef.current) {
        hasLeftTopRef.current = false;
        const nextCycle = Math.max(cycle, snapshot?.cycle ?? cycle) + 1;
        updateScrollSession({
          cycle: nextCycle,
          hasLeftTop: false,
          revealed: {},
        });
        setCycle(nextCycle);
      }
    };

    if (scrollRuntime) {
      return scrollRuntime.lenis.on("scroll", ({ scroll }: { scroll: number }) => {
        updateCycle(scroll);
      });
    }

    const handleNativeScroll = () => updateCycle(window.scrollY);
    handleNativeScroll();
    window.addEventListener("scroll", handleNativeScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleNativeScroll);
  }, [cycle, scrollRuntime]);

  return (
    <PageScrollCycleContext.Provider value={{ cycle, ready }}>
      {children}
    </PageScrollCycleContext.Provider>
  );
}
