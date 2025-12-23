"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/shared/components/ScrollReveal";
import SkillBar from "../components/SkillBar";
import { skillsData } from "../data/skillsData";
import "../styles/skills.css";

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative py-32 px-4 md:px-8 overflow-hidden"
    >
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-white/[0.02] rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-20">
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

        <div className="grid lg:grid-cols-2 gap-8">
          {skillsData.services.map((service, serviceIndex) => (
            <ScrollReveal
              key={service.title}
              direction={serviceIndex % 2 === 0 ? "left" : "right"}
              delay={0.2}
            >
              <div className="h-full p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl hover:border-white/20 transition-all group">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed font-light">
                    {service.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs uppercase tracking-widest text-white/30 font-semibold mb-6">
                    Technologies
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {service.skills.map((skill, index) => (
                      <SkillBar
                        key={skill.name}
                        name={skill.name}
                        level={skill.level}
                        delay={index * 0.05}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4} className="mt-20">
          <div className="text-center mb-10">
            <h3 className="text-xl font-semibold text-white/60">Soft Skills</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {skillsData.softSkills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, type: "spring" }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-5 py-2.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white/40 text-sm hover:text-white/70 hover:border-white/20 hover:bg-white/10 transition-all cursor-default font-light"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
}
