"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/shared/components/ScrollReveal";
import SkillBar from "../components/SkillBar";
import { skillsData } from "../data/skillsData";
import "../styles/skills.css";

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section
      id="skills"
      className="relative py-32 px-4 md:px-8 overflow-hidden"
    >
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-white/[0.02] rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/40 text-sm mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-white/40" />
            {skillsData.subtitle}
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            My <span className="text-gradient">Services</span>
          </h2>
        </ScrollReveal>

        {/* Tab Buttons */}
        <ScrollReveal delay={0.1}>
          <div className="flex justify-center gap-2 mb-12">
            {skillsData.services.map((service, index) => (
              <motion.button
                key={service.title}
                onClick={() => setActiveTab(index)}
                whileTap={{ scale: 0.95 }}
                className={`relative px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                  activeTab === index
                    ? "text-white"
                    : "text-white/40 hover:text-white/60"
                }`}
              >
                {activeTab === index && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white/10 border border-white/20 rounded-full"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{service.title}</span>
              </motion.button>
            ))}
          </div>
        </ScrollReveal>

        {/* Tab Content */}
        <ScrollReveal delay={0.2}>
          <div className="relative min-h-[350px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl"
              >
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {skillsData.services[activeTab].title}
                  </h3>
                  <p className="text-white/50 leading-relaxed font-light">
                    {skillsData.services[activeTab].description}
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs uppercase tracking-widest text-white/30 font-semibold mb-6">
                    Technologies
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {skillsData.services[activeTab].skills.map(
                      (skill, index) => (
                        <SkillBar
                          key={skill.name}
                          name={skill.name}
                          level={skill.level}
                          delay={index * 0.05}
                        />
                      )
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </ScrollReveal>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
}
