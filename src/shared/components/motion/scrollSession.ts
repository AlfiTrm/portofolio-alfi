export const SCROLL_SESSION_KEY = "tsan-portfolio-scroll-session-v1";
export const SCROLL_SESSION_TTL = 12 * 60 * 60 * 1000;
export type ScrollRestoreSurface = "hero" | "light" | "dark" | "contact";

export interface ScrollSessionSnapshot {
  pathname: string;
  scrollY: number;
  savedAt: number;
  surface: ScrollRestoreSurface;
  cycle: number;
  hasLeftTop: boolean;
  revealed: Record<string, number>;
}

type ScrollSessionUpdates = Partial<
  Pick<ScrollSessionSnapshot, "cycle" | "hasLeftTop" | "revealed">
>;

declare global {
  interface Window {
    __tsanPortfolioScrollSession?: ScrollSessionSnapshot;
    __tsanPortfolioAppReady?: boolean;
    __tsanPortfolioReloadIntroPending?: boolean;
  }
}

function isValidSnapshot(
  value: unknown,
  pathname: string,
): value is ScrollSessionSnapshot {
  if (!value || typeof value !== "object") return false;

  const snapshot = value as Partial<ScrollSessionSnapshot>;
  return (
    snapshot.pathname === pathname &&
    typeof snapshot.scrollY === "number" &&
    Number.isFinite(snapshot.scrollY) &&
    snapshot.scrollY >= 0 &&
    typeof snapshot.savedAt === "number" &&
    Date.now() - snapshot.savedAt >= 0 &&
    Date.now() - snapshot.savedAt <= SCROLL_SESSION_TTL
  );
}

function normalizeSnapshot(snapshot: Partial<ScrollSessionSnapshot>): ScrollSessionSnapshot {
  const revealed =
    snapshot.revealed && typeof snapshot.revealed === "object"
      ? Object.fromEntries(
          Object.entries(snapshot.revealed).filter(
            ([, cycle]) => Number.isInteger(cycle) && cycle >= 0,
          ),
        )
      : {};

  return {
    pathname: snapshot.pathname ?? window.location.pathname,
    scrollY: snapshot.scrollY ?? 0,
    savedAt: snapshot.savedAt ?? Date.now(),
    surface:
      snapshot.surface === "hero" ||
      snapshot.surface === "light" ||
      snapshot.surface === "contact"
        ? snapshot.surface
        : "dark",
    cycle:
      typeof snapshot.cycle === "number" &&
      Number.isInteger(snapshot.cycle) &&
      snapshot.cycle >= 0
        ? snapshot.cycle
        : 0,
    hasLeftTop: snapshot.hasLeftTop === true,
    revealed,
  };
}

export function getMemoryScrollSnapshot() {
  if (typeof window === "undefined") return null;

  const snapshot = window.__tsanPortfolioScrollSession;
  if (!snapshot || !isValidSnapshot(snapshot, window.location.pathname)) return null;

  const normalized = normalizeSnapshot(snapshot);
  window.__tsanPortfolioScrollSession = normalized;
  return normalized;
}

export function saveScrollSnapshot(
  scrollY: number,
  persist = false,
  surface?: ScrollRestoreSurface,
) {
  if (typeof window === "undefined") return null;

  const previous = getMemoryScrollSnapshot();
  const snapshot: ScrollSessionSnapshot = {
    pathname: window.location.pathname,
    scrollY: Math.max(0, Math.round(scrollY)),
    savedAt: Date.now(),
    surface: surface ?? previous?.surface ?? "dark",
    cycle: previous?.cycle ?? 0,
    hasLeftTop: previous?.hasLeftTop ?? false,
    revealed: previous?.revealed ?? {},
  };

  window.__tsanPortfolioScrollSession = snapshot;

  if (persist) {
    try {
      window.sessionStorage.setItem(SCROLL_SESSION_KEY, JSON.stringify(snapshot));
    } catch {
      // Keep the in-memory snapshot available when browser storage is disabled.
    }
  }

  return snapshot;
}

export function updateScrollSession(updates: ScrollSessionUpdates, persist = true) {
  if (typeof window === "undefined") return null;

  const previous = getMemoryScrollSnapshot();
  const snapshot: ScrollSessionSnapshot = {
    pathname: window.location.pathname,
    scrollY: previous?.scrollY ?? window.scrollY,
    savedAt: Date.now(),
    surface: previous?.surface ?? "dark",
    cycle: previous?.cycle ?? 0,
    hasLeftTop: previous?.hasLeftTop ?? false,
    revealed: previous?.revealed ?? {},
    ...updates,
  };

  window.__tsanPortfolioScrollSession = snapshot;
  if (persist) {
    try {
      window.sessionStorage.setItem(SCROLL_SESSION_KEY, JSON.stringify(snapshot));
    } catch {
      // Keep the in-memory snapshot available when browser storage is disabled.
    }
  }

  return snapshot;
}

export function hasPortfolioAppHydrated() {
  return typeof window !== "undefined" && window.__tsanPortfolioAppReady === true;
}

export function markPortfolioAppHydrated() {
  if (typeof window !== "undefined") window.__tsanPortfolioAppReady = true;
}

export function clearScrollRestoringMarker() {
  if (typeof document !== "undefined") {
    delete document.documentElement.dataset.scrollRestoring;
  }
}
