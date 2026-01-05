"use client";

import { useState, useCallback, useSyncExternalStore } from "react";
import Navbar from "@/shared/components/Navbar";
import SmoothScroll from "@/shared/components/SmoothScroll";
import Footer from "@/shared/components/Footer";
import TechStackTransition from "@/shared/components/TechStackTransition";
import HeroContent from "../components/HeroContent";
import AboutSection from "@/features/home/about/containers/AboutSection";
import SkillsSection from "@/features/home/skills/containers/SkillsSection";
import ProjectsSection from "@/features/home/projects/containers/ProjectsSection";
import ContactSection from "@/features/home/contact/containers/ContactSection";

import EntranceLoader from "@/shared/components/EntranceLoader";
import QuickLoader from "@/shared/components/QuickLoader";

const VISITED_KEY = "portfolio_visited";

const subscribe = () => () => {};

const getSnapshot = () => {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(VISITED_KEY);
};

const getServerSnapshot = () => null;

function useIsFirstVisit() {
  const visited = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  return visited === null;
}

export default function HomeScreen() {
  const isFirstVisit = useIsFirstVisit();
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = useCallback(() => {
    if (isFirstVisit && typeof window !== "undefined") {
      sessionStorage.setItem(VISITED_KEY, "true");
    }
    setIsLoading(false);
  }, [isFirstVisit]);

  if (isFirstVisit === null) {
    return <div className="fixed inset-0 bg-black z-[100]" />;
  }

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-black overflow-hidden">
        {isLoading &&
          (isFirstVisit ? (
            <EntranceLoader onComplete={handleLoadComplete} />
          ) : (
            <QuickLoader onComplete={handleLoadComplete} />
          ))}

        <div className="relative">
          <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none" />

          <Navbar />

          <main id="main-content">
            <HeroContent />
            <TechStackTransition />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ContactSection />
          </main>
        </div>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
