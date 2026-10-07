"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import SmoothScroll from "@/shared/components/motion/SmoothScroll";
import PageScrollCycleProvider from "@/shared/components/motion/PageScrollCycle";
import {
  interactionEase,
  interactionCloseDelayMs,
  interactionFocusMs,
} from "@/shared/components/motion/interactionTiming";
import Navbar from "@/shared/components/layout/Navbar";
import MobileNavbar from "@/shared/components/layout/MobileNavbar";
import HeroSection from "./hero/components/HeroSection";

type EntranceState = "checking" | "playing" | "ready";
const entranceStorageKey = "tsan-portfolio-entrance-seen";

const AboutSection = dynamic(
  () => import("@/features/home/about/components/AboutSection")
);
const ExperienceTimeline = dynamic(
  () => import("@/features/home/about/components/ExperienceTimeline")
);
const ProjectsSection = dynamic(
  () => import("@/features/home/projects/components/ProjectsSection")
);
const ContactSection = dynamic(
  () => import("@/features/home/contact/components/ContactSection")
);
const ExploringSection = dynamic(
  () => import("@/features/home/exploring/components/ExploringSection")
);
const ResumeModal = dynamic(
  () => import("@/features/resume/components/ResumeModal"),
  { ssr: false }
);
const FloatingChatSheet = dynamic(
  () => import("@/features/chat/components/FloatingChatSheet"),
  { ssr: false }
);

export default function HomeScreen() {
  const introTransitionRef = useRef<HTMLDivElement>(null);
  const [pageReady, setPageReady] = useState(false);
  const [bootstrapReady, setBootstrapReady] = useState(false);
  const [heroBackgroundPreloaded, setHeroBackgroundPreloaded] = useState(false);
  const [entranceState, setEntranceState] = useState<EntranceState>("checking");
  const [keepHeroBackdrop, setKeepHeroBackdrop] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [shouldMountResume, setShouldMountResume] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [shouldMountChat, setShouldMountChat] = useState(false);
  const [chatPending, setChatPending] = useState(false);
  const [chatClosing, setChatClosing] = useState(false);
  const chatTimerRef = useRef<number | null>(null);
  const chatCloseTimerRef = useRef<number | null>(null);
  const chatTriggerRef = useRef<HTMLButtonElement | null>(null);
  const chatWasOpenRef = useRef(false);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress: introScrollProgress } = useScroll({
    target: introTransitionRef,
    offset: ["start start", "end end"],
  });

  const openChat = useCallback(() => {
    if (chatOpen || chatPending || chatClosing) return;

    if (reduceMotion) {
      setShouldMountChat(true);
      setChatOpen(true);
      return;
    }

    setChatPending(true);
    chatTimerRef.current = window.setTimeout(() => {
      chatTimerRef.current = null;
      setChatPending(false);
      setShouldMountChat(true);
      setChatOpen(true);
    }, interactionFocusMs);
  }, [chatClosing, chatOpen, chatPending, reduceMotion]);

  const closeChat = useCallback(() => {
    if (chatTimerRef.current !== null) {
      window.clearTimeout(chatTimerRef.current);
      chatTimerRef.current = null;
    }
    if (chatCloseTimerRef.current !== null) {
      window.clearTimeout(chatCloseTimerRef.current);
      chatCloseTimerRef.current = null;
    }
    setChatPending(false);
    setChatClosing(false);
    setChatOpen(false);
  }, []);

  const beginChatClose = useCallback(() => {
    if (!chatOpen || chatClosing) return;

    if (reduceMotion) {
      closeChat();
      return;
    }

    setChatClosing(true);
    chatCloseTimerRef.current = window.setTimeout(() => {
      chatCloseTimerRef.current = null;
      setChatClosing(false);
      setChatOpen(false);
    }, interactionCloseDelayMs);
  }, [chatClosing, chatOpen, closeChat, reduceMotion]);

  const toggleChat = useCallback(() => {
    if (chatOpen) beginChatClose();
    else openChat();
  }, [beginChatClose, chatOpen, openChat]);

  useEffect(() => {
    if (!bootstrapReady) return;

    const frame = window.requestAnimationFrame(() => {
      if (window.__tsanPortfolioReloadIntroPending) {
        window.__tsanPortfolioReloadIntroPending = false;
        setKeepHeroBackdrop(true);
        setEntranceState("ready");
        return;
      }

      const seen = window.localStorage.getItem(entranceStorageKey) === "true";

      if (seen) {
        setEntranceState("ready");
        return;
      }

      window.localStorage.setItem(entranceStorageKey, "true");
      setEntranceState("playing");
    });

    return () => window.cancelAnimationFrame(frame);
  }, [bootstrapReady]);

  useEffect(() => {
    if (!heroBackgroundPreloaded) return;

    let cancelled = false;
    let firstFrame = 0;
    let secondFrame = 0;

    const revealPage = () => {
      void document.fonts.ready.then(() => {
        if (cancelled) return;

        firstFrame = window.requestAnimationFrame(() => {
          secondFrame = window.requestAnimationFrame(() => {
            if (!cancelled) setPageReady(true);
          });
        });
      });
    };

    revealPage();

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, [heroBackgroundPreloaded]);

  useEffect(() => {
    const root = document.documentElement;
    let cancelled = false;
    let fallback = 0;
    const image = new window.Image();
    const markHeroBackgroundReady = () => {
      if (cancelled) return;
      window.clearTimeout(fallback);
      root.dataset.portfolioHeroPreloaded = "true";
      setHeroBackgroundPreloaded(true);
    };

    image.onload = markHeroBackgroundReady;
    image.onerror = markHeroBackgroundReady;
    image.src = "/home/picture-me.webp";
    fallback = window.setTimeout(markHeroBackgroundReady, 6000);

    if (image.complete) markHeroBackgroundReady();

    return () => {
      cancelled = true;
      window.clearTimeout(fallback);
      image.onload = null;
      image.onerror = null;
    };
  }, []);

  useEffect(() => {
    if (bootstrapReady) return;

    const root = document.documentElement;
    const isInitialVisit = root.dataset.portfolioBootstrapMode !== "restore";
    let cancelled = false;
    let releaseTimer = 0;
    let failOpen = 0;
    let observer: MutationObserver | null = null;

    const releaseBootstrap = () => {
      if (cancelled) return;
      window.clearTimeout(releaseTimer);
      window.clearTimeout(failOpen);
      observer?.disconnect();
      root.dataset.portfolioBootstrapReady = "true";
      setKeepHeroBackdrop(true);
      setBootstrapReady(true);
    };

    const tryReleaseBootstrap = () => {
      if (!pageReady) return;
      if (isInitialVisit && !heroBackgroundPreloaded) return;
      if (root.dataset.scrollRestoring === "true" || releaseTimer) return;

      const backgroundFadeDuration = isInitialVisit && !reduceMotion ? 1400 : 0;
      releaseTimer = window.setTimeout(releaseBootstrap, backgroundFadeDuration);
      observer?.disconnect();
    };

    observer = new MutationObserver(tryReleaseBootstrap);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-scroll-restoring"],
    });
    tryReleaseBootstrap();

    failOpen = window.setTimeout(releaseBootstrap, 10000);
    return () => {
      cancelled = true;
      observer?.disconnect();
      window.clearTimeout(releaseTimer);
      window.clearTimeout(failOpen);
    };
  }, [bootstrapReady, heroBackgroundPreloaded, pageReady, reduceMotion]);

  useEffect(() => {
    return () => {
      if (chatTimerRef.current !== null) {
        window.clearTimeout(chatTimerRef.current);
      }
      if (chatCloseTimerRef.current !== null) {
        window.clearTimeout(chatCloseTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (chatOpen) {
      chatWasOpenRef.current = true;
      return;
    }

    if (chatWasOpenRef.current) {
      chatWasOpenRef.current = false;
      chatTriggerRef.current?.focus();
    }
  }, [chatOpen]);

  useEffect(() => {
    const handleKeyboardShortcut = (event: KeyboardEvent) => {
      if (event.key === "Escape" && chatPending) {
        event.preventDefault();
        closeChat();
        return;
      }

      if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== "k") return;

      event.preventDefault();
      if (pageReady && entranceState === "ready") {
        toggleChat();
      }
    };

    window.addEventListener("keydown", handleKeyboardShortcut);
    return () => window.removeEventListener("keydown", handleKeyboardShortcut);
  }, [chatPending, closeChat, entranceState, pageReady, toggleChat]);

  return (
    <SmoothScroll>
      <PageScrollCycleProvider>
        <div className="relative min-h-screen overflow-x-clip bg-stage">
        <Navbar
          className={`mix-blend-difference transition-opacity duration-[1400ms] ${
            entranceState === "ready" ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        />
        <MobileNavbar
          className={`mix-blend-difference transition-opacity duration-[1400ms] ${
            entranceState === "ready" ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        />
        <div className="relative">
          <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none" />

          <main id="main-content">
            <div
              ref={introTransitionRef}
              id="home"
              tabIndex={-1}
              className="home-story-transition relative isolate focus:outline-none"
            >
              <HeroSection
                isReady={pageReady}
                entranceState={entranceState}
                keepBackdrop={keepHeroBackdrop}
                scrollProgress={introScrollProgress}
                onEntranceComplete={() => {
                  setEntranceState("ready");
                  setKeepHeroBackdrop(false);
                }}
                onOpenResume={() => {
                  setShouldMountResume(true);
                  setResumeOpen(true);
                }}
              />
              <AboutSection />
            </div>
            <ExperienceTimeline />
            <ProjectsSection />
            <ExploringSection />
            <ContactSection />
          </main>
        </div>

        {/*
        <div>
          <Footer />
        </div>
        */}

        <motion.button
          ref={chatTriggerRef}
          type="button"
          aria-label={chatPending ? "Opening chat" : chatOpen ? "Close chat" : "Open chat"}
          aria-expanded={chatOpen || chatPending}
          aria-busy={chatPending}
          onClick={toggleChat}
          animate={{ scale: chatPending ? 1.04 : 1 }}
          whileTap={reduceMotion ? undefined : { scale: 0.96 }}
          transition={{ duration: reduceMotion ? 0.12 : 0.3, ease: interactionEase }}
          className={`group fixed bottom-[calc(env(safe-area-inset-bottom)+1.25rem)] right-5 z-[62] flex cursor-pointer items-center gap-3 uppercase transition-[opacity,transform] duration-[1400ms] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black md:bottom-6 md:right-6 md:gap-3 md:text-[0.72rem] md:tracking-[0.24em] ${
            pageReady && entranceState === "ready"
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-2 opacity-0"
          }`}
        >
          <kbd className="surface-aware-foreground pointer-events-none absolute right-0 bottom-full mb-2 whitespace-nowrap font-mono text-[0.62rem] tracking-[0.08em] opacity-0 transition-opacity duration-200 group-hover:opacity-60 group-focus-visible:opacity-60">
            ctrl k
          </kbd>
          <span className="surface-aware-foreground text-[0.56rem] tracking-[0.2em] md:text-[0.62rem] md:tracking-[0.2em]">
            {chatOpen ? "close" : "ask me"}
          </span>
          <motion.span
            animate={{
              backgroundColor: chatPending ? "#f0e7d4" : "#0b0a08",
              color: chatPending ? "#0b0a08" : "#efe6d1",
              borderColor: chatPending ? "#f0e7d4" : "rgba(239,230,209,0.18)",
            }}
            transition={{ duration: reduceMotion ? 0.12 : 0.3, ease: interactionEase }}
            className="flex size-11 items-center justify-center border bg-[#0b0a08]/75 text-[#efe6d1]"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-[18px]"
              aria-hidden="true"
            >
              <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5 8 8 0 0 1-3.6-.85L4 20l1.25-4.9A7.5 7.5 0 1 1 20 11.5Z" />
              <path d="M8.5 11.5h.01M12.5 11.5h.01M16.5 11.5h.01" />
            </svg>
          </motion.span>
        </motion.button>

        {shouldMountChat && (
          <FloatingChatSheet
            isOpen={chatOpen}
            isClosing={chatClosing}
            onClose={beginChatClose}
          />
        )}

        {shouldMountResume && (
          <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
        )}
        </div>
      </PageScrollCycleProvider>
    </SmoothScroll>
  );
}
