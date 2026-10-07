"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  interactionEase,
  interactionFocusMs,
  interactionMorphSeconds,
} from "@/shared/components/motion/interactionTiming";
import FlipText from "@/shared/components/motion/FlipText";
import BrandLogo from "./BrandLogo";

const navItems = [
  { name: "Home", label: "Home", href: "#home", group: "primary" },
  { name: "About", label: "About", href: "#about", group: "primary" },
  {
    name: "Projects",
    label: "Works",
    href: "#projects",
    group: "secondary",
  },
  {
    name: "Exploring",
    label: "Exploring",
    href: "#exploring",
    group: "secondary",
  },
  { name: "Contact", label: "Contact", href: "#contact", group: "contact" },
];
const brandSlideEase = [0.16, 1, 0.3, 1] as const;

interface MobileNavbarProps {
  className?: string;
}

export default function MobileNavbar({
  className = "",
}: MobileNavbarProps) {
  const [activeTab, setActiveTab] = useState("Home");
  const [brandHovered, setBrandHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPending, setMenuPending] = useState(false);
  const [menuContentReady, setMenuContentReady] = useState(false);
  const menuTimerRef = useRef<number | null>(null);
  const menuTriggerRef = useRef<HTMLButtonElement | null>(null);
  const menuCloseRef = useRef<HTMLButtonElement | null>(null);
  const menuWasOpenRef = useRef(false);
  const reduceMotion = useReducedMotion();
  const brandCollapsed = brandHovered || activeTab !== "Home";

  const openMenu = () => {
    if (menuPending || menuOpen) return;

    if (reduceMotion) {
      setMenuOpen(true);
      return;
    }

    setMenuPending(true);
    menuTimerRef.current = window.setTimeout(() => {
      menuTimerRef.current = null;
      setMenuPending(false);
      setMenuOpen(true);
    }, interactionFocusMs);
  };

  const closeMenu = useCallback(() => {
    if (menuTimerRef.current !== null) {
      window.clearTimeout(menuTimerRef.current);
      menuTimerRef.current = null;
    }
    setMenuPending(false);
    setMenuContentReady(false);
    setMenuOpen(false);
  }, []);

  useEffect(() => () => {
    if (menuTimerRef.current !== null) {
      window.clearTimeout(menuTimerRef.current);
    }
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && (menuOpen || menuPending)) {
        event.preventDefault();
        closeMenu();
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [closeMenu, menuOpen, menuPending]);

  useEffect(() => {
    if (menuOpen) {
      menuWasOpenRef.current = true;
      return;
    }

    if (menuWasOpenRef.current) {
      menuWasOpenRef.current = false;
      menuTriggerRef.current?.focus();
    }
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        ...navItems.map((item) => ({ id: item.href.substring(1), name: item.name })),
        { id: "journey", name: "About" },
      ];
      let currentItem = window.location.hash === "#journey" ? "About" : "Home";

      for (const { id, name } of sections) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 220 && rect.bottom >= 220) {
            currentItem = name;
          }
        }
      }

      setActiveTab(currentItem);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("hashchange", handleScroll);
    window.addEventListener("popstate", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleScroll);
      window.removeEventListener("popstate", handleScroll);
    };
  }, []);

  const navPrimary = navItems.filter((item) => item.group === "primary");
  const navSecondary = navItems.filter((item) => item.group === "secondary");
  const navContact = navItems.filter((item) => item.group === "contact");

  return (
    <>
      <motion.nav
        initial={{ y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`lg:hidden fixed top-0 left-0 right-0 z-50 px-5 pt-5 ${className}`}
      >
        <div className="flex items-start justify-between">
          <a
            href="#home"
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") setBrandHovered(true);
            }}
            onPointerLeave={(event) => {
              if (event.pointerType === "mouse") setBrandHovered(false);
            }}
            onFocus={() => setBrandHovered(true)}
            onBlur={() => setBrandHovered(false)}
            className="flex min-h-11 items-center text-[1.1rem] leading-none tracking-[0.02em] text-[#f2ede6] [font-family:var(--font-akira)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            aria-label="Tsan - Home"
          >
            <BrandLogo className="relative z-10 h-9" />
            <motion.span
              initial={false}
              animate={{
                width: brandCollapsed ? 0 : "auto",
                marginLeft: brandCollapsed ? 0 : 7,
              }}
              transition={{
                width: { duration: reduceMotion ? 0 : 0.58, ease: brandSlideEase },
                marginLeft: { duration: reduceMotion ? 0 : 0.58, ease: brandSlideEase },
              }}
              className="relative block shrink-0 overflow-hidden"
              aria-hidden={brandCollapsed}
            >
              <motion.span
                initial={false}
                animate={{
                  x: brandCollapsed ? -44 : 0,
                  opacity: brandCollapsed ? 0 : 1,
                }}
                transition={{
                  x: { duration: reduceMotion ? 0 : 0.58, ease: brandSlideEase },
                  opacity: {
                    duration: reduceMotion ? 0 : 0.2,
                    delay: brandCollapsed && !reduceMotion ? 0.28 : 0,
                    ease: "easeOut",
                  },
                }}
                className="block whitespace-nowrap"
              >
                Tsan
              </motion.span>
            </motion.span>
          </a>

          <motion.button
            ref={menuTriggerRef}
            type="button"
            onClick={openMenu}
            animate={{
              color: menuPending ? "#f2ede6" : "rgba(255,255,255,0.6)",
              y: menuPending ? -1 : 0,
            }}
            transition={{ duration: reduceMotion ? 0.12 : 0.3, ease: interactionEase }}
            aria-label={menuOpen ? "Close navigation menu" : menuPending ? "Opening navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen || menuPending}
            aria-busy={menuPending}
            aria-controls="mobile-navigation-menu"
            className="relative flex min-h-11 items-center px-2 uppercase text-[0.68rem] tracking-[0.26em] transition-colors hover:text-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Menu
            <motion.span
              aria-hidden="true"
              className="absolute inset-x-2 bottom-1 h-px origin-right bg-[#f2ede6]"
              animate={{ scaleX: menuPending ? 1 : 0 }}
              transition={{ duration: reduceMotion ? 0.12 : 0.3, ease: interactionEase }}
            />
          </motion.button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{
              clipPath: reduceMotion
                ? "inset(0% 0% 0% 0%)"
                : "inset(1.25rem 1.25rem calc(100% - 4rem) calc(100% - 4.5rem) round 2px)",
              opacity: reduceMotion ? 0 : 1,
            }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
            exit={{
              clipPath: reduceMotion
                ? "inset(0% 0% 0% 0%)"
                : "inset(1.25rem 1.25rem calc(100% - 4rem) calc(100% - 4.5rem) round 2px)",
              opacity: 0,
            }}
            transition={{
              clipPath: {
                duration: reduceMotion ? 0 : interactionMorphSeconds,
                ease: interactionEase,
              },
              opacity: { duration: reduceMotion ? 0.12 : interactionMorphSeconds },
            }}
            onAnimationComplete={() => {
              if (menuOpen) setMenuContentReady(true);
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-0 z-[80] overflow-y-auto bg-black/88 px-5 pt-5 pb-10 backdrop-blur-xl lg:hidden"
          >
            <motion.div
              initial={false}
              animate={{
                opacity: menuContentReady ? 1 : 0,
                y: menuContentReady ? 0 : 8,
              }}
              transition={{
                duration: reduceMotion ? 0.12 : 0.28,
                ease: interactionEase,
              }}
              onAnimationComplete={() => {
                if (menuOpen && menuContentReady) menuCloseRef.current?.focus();
              }}
              className="min-h-full"
            >
              <div className="flex items-start justify-between">
                <span className="flex items-center gap-2 text-[1.1rem] leading-none tracking-[0.02em] text-[#f2ede6] [font-family:var(--font-akira)]">
                  <BrandLogo className="h-9" />
                  <span>Tsan</span>
                </span>
                <button
                  ref={menuCloseRef}
                  type="button"
                  onClick={closeMenu}
                  className="flex min-h-11 items-center px-2 uppercase text-[0.68rem] tracking-[0.26em] text-white/64 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  aria-label="Close navigation menu"
                >
                  Close
                </button>
              </div>

              <div
                id="mobile-navigation-menu"
                className="mt-24 flex flex-col gap-16"
              >
                <div className="flex flex-col gap-8">
                  {navPrimary.map((item) => {
                    const isActive = activeTab === item.name;

                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={closeMenu}
                        aria-current={isActive ? "location" : undefined}
                        className={`flex min-h-11 items-center text-left uppercase text-[0.82rem] transition-all duration-300 ${
                          isActive
                            ? "text-[#f2ede6] tracking-[0.18em] font-medium"
                            : "text-white/46 tracking-[0.24em] hover:text-white/76"
                        }`}
                      >
                        {item.label}
                      </a>
                    );
                  })}
                </div>

                <div className="flex flex-col gap-6">
                  {navSecondary.map((item) => {
                    const isActive = activeTab === item.name;

                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={closeMenu}
                        aria-current={isActive ? "location" : undefined}
                        className={`flex min-h-11 items-center text-left uppercase text-[0.72rem] transition-all duration-300 ${
                          isActive
                            ? "text-[#f2ede6] tracking-[0.18em] font-medium"
                            : "text-white/46 tracking-[0.24em] hover:text-white/76"
                        }`}
                      >
                        {item.label === "Works" ? (
                          <FlipText>{item.label}</FlipText>
                        ) : item.label}
                      </a>
                    );
                  })}
                </div>

                <div className="flex flex-col gap-6">
                  {navContact.map((item) => {
                    const isActive = activeTab === item.name;

                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={closeMenu}
                        aria-current={isActive ? "location" : undefined}
                        className={`flex min-h-11 items-center text-left uppercase text-[0.72rem] transition-all duration-300 ${
                          isActive
                            ? "text-[#f2ede6] tracking-[0.18em] font-medium"
                            : "text-white/46 tracking-[0.24em] hover:text-white/76"
                        }`}
                      >
                        <FlipText>{item.label}</FlipText>
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
