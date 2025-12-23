"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeItem, setActiveItem] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (name: string, href: string) => {
    setActiveItem(name);
    setMobileMenuOpen(false);

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none"
      >
        <div
          className={`
                relative flex items-center justify-between rounded-full border pointer-events-auto
                transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1)
                ${
                  scrolled
                    ? "bg-black/90 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl py-3 px-6 w-[90%] md:w-auto md:min-w-[500px]"
                    : "bg-white/5 border-white/5 backdrop-blur-sm py-4 px-8 w-[95%] md:w-auto md:min-w-[750px]"
                }
            `}
        >
          <Link
            href="/"
            className="text-2xl font-bold text-white tracking-tighter hover:text-cyan-400 transition-colors mr-8 group"
          >
            AT
            <span className="text-cyan-400 group-hover:text-white transition-colors">
              .
            </span>
          </Link>

          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => handleNavClick(item.name, item.href)}
                  className={`
                      relative px-5 py-2.5 rounded-full text-base font-medium transition-colors
                      ${
                        activeItem === item.name
                          ? "text-white"
                          : "text-white/60 hover:text-white"
                      }
                    `}
                >
                  {activeItem === item.name && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/10 border border-white/10 rounded-full -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                  {item.name}
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 text-white/80 hover:text-white transition-colors hover:bg-white/10 rounded-full"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="absolute bottom-0 left-6 right-6 h-[1.5px] overflow-hidden rounded-full opacity-60">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 origin-left"
              style={{ scaleX }}
            />
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-20 pointer-events-none" />

            <motion.button
              initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
              className="absolute top-6 right-6 p-3 bg-white/5 rounded-full border border-white/10 text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="w-6 h-6" />
            </motion.button>

            <ul className="flex flex-col items-center gap-4 w-full max-w-sm relative z-10">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{
                    delay: 0.1 + index * 0.05,
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                  }}
                  className="w-full"
                >
                  <button
                    onClick={() => handleNavClick(item.name, item.href)}
                    className={`
                                    w-full py-4 text-xl font-light tracking-wider rounded-2xl border backdrop-blur-md
                                    transition-all duration-300 flex items-center justify-center relative overflow-hidden group
                                    ${
                                      activeItem === item.name
                                        ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                        : "bg-black/40 text-white/60 border-white/10 hover:border-white/30 hover:text-white hover:bg-white/5"
                                    }
                                `}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {activeItem !== item.name && (
                      <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    )}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
