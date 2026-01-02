"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/shared/components/ScrollReveal";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

const timelineData: TimelineItem[] = [
  {
    year: "2022",
    title: "Started Coding Journey",
    description: "First exposure to HTML, CSS, and JavaScript",
  },
  {
    year: "2023",
    title: "Learning React & Frontend",
    description: "Deep dive into React ecosystem and modern web development",
  },
  {
    year: "2024",
    title: "Building Real Projects",
    description: "Creating portfolio and freelance projects with Next.js",
  },
  {
    year: "NOW",
    title: "Towards Fullstack",
    description: "Expanding skills to backend and database technologies",
  },
];

export default function ExperienceTimeline() {
  return (
    <ScrollReveal className="max-w-2xl mx-auto mb-16" delay={0.3}>
      <h3 className="text-xl font-semibold text-white mb-8 text-center">
        My Journey
      </h3>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-white/10" />

        {timelineData.map((item, index) => (
          <motion.div
            key={item.year}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`relative flex items-center gap-4 mb-8 ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* Dot */}
            <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-2 h-2 rounded-full bg-white/40 ring-4 ring-black" />

            {/* Content */}
            <div
              className={`ml-10 md:ml-0 md:w-1/2 ${
                index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
              }`}
            >
              <span className="text-xs font-mono text-cyan-400/80">
                {item.year}
              </span>
              <h4 className="text-sm font-medium text-white mt-1">
                {item.title}
              </h4>
              <p className="text-xs text-white/40 mt-1 leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </ScrollReveal>
  );
}
