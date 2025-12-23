"use client";

import Navbar from "@/shared/components/Navbar";
import FloatingOrbs from "@/shared/components/FloatingOrbs";
import SmoothScroll from "@/shared/components/SmoothScroll";
import Footer from "@/shared/components/Footer";
import TechStackTransition from "@/shared/components/TechStackTransition";
import HeroContent from "../components/HeroContent";
import AboutSection from "@/features/home/about/containers/AboutSection";
import SkillsSection from "@/features/home/skills/containers/SkillsSection";
import ProjectsSection from "@/features/home/projects/containers/ProjectsSection";
import ContactSection from "@/features/home/contact/containers/ContactSection";

import EntranceLoader from "@/shared/components/EntranceLoader";

export default function HomeScreen() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-black overflow-hidden">
        <EntranceLoader onComplete={() => {}} />

        <div className="relative">
          <FloatingOrbs count={3} />
          <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none" />

          <Navbar />

          <main>
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
