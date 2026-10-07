"use client";

import { Icon } from "@iconify/react";
import { motion, useReducedMotion, type MotionStyle } from "framer-motion";
import { useEffect, useState } from "react";
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

const navPrimary = navItems.filter((item) => item.group === "primary");
const navSecondary = navItems.filter((item) => item.group === "secondary");
const navContact = navItems.filter((item) => item.group === "contact");
const brandSlideEase = [0.16, 1, 0.3, 1] as const;

interface NavbarProps {
  tone?: "light" | "dark";
  style?: MotionStyle;
  className?: string;
}

export default function Navbar({
  tone = "light",
  style,
  className = "",
}: NavbarProps) {
  const [activeItem, setActiveItem] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [brandHovered, setBrandHovered] = useState(false);
  const reduceMotion = useReducedMotion();
  const isDark = tone === "dark";
  const brandCollapsed = brandHovered || activeItem !== "Home";
  const activeText = isDark ? "text-black" : "text-[#f2ede6]";
  const inactiveText = isDark
    ? "text-black/34 hover:text-black/68"
    : "text-white/42 hover:text-white/72";
  const brandText = isDark ? "text-black" : "text-[#f2ede6]";
  const focusRing = isDark
    ? "focus-visible:ring-black/50 focus-visible:ring-offset-[#f2ede6]"
    : "focus-visible:ring-white/60 focus-visible:ring-offset-black";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

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

      setActiveItem(currentItem);
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

  const renderNavGroup = (items: typeof navItems) => (
    <ul className="flex flex-col items-start gap-0.5 xl:gap-0.5">
      {items.map((item) => {
        const isActive = activeItem === item.name;

        return (
          <li key={item.name}>
            <a
              href={item.href}
              aria-current={isActive ? "location" : undefined}
              className={`relative flex min-h-8 items-center uppercase text-[0.68rem] xl:text-[0.72rem] leading-none transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${focusRing} ${
                isActive
                  ? `${activeText} tracking-[0.18em] font-medium`
                  : `${inactiveText} tracking-[0.24em]`
              }`}
            >
              {isActive && (
                <Icon
                  icon="iconoir:spark-solid"
                  className={`absolute -left-4 top-1/2 text-[0.78rem] -translate-y-1/2 ${activeText}`}
                />
              )}
              {item.label === "Works" || item.label === "Contact" ? (
                <FlipText>{item.label}</FlipText>
              ) : item.label}
            </a>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-lg focus:font-medium"
      >
        Skip to main content
      </a>

      <motion.nav
        style={style}
        className={`hidden lg:flex fixed top-0 left-0 right-0 z-50 justify-center px-6 xl:px-10 pointer-events-none ${className}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div
          className={`pointer-events-auto flex w-full max-w-[1440px] items-start justify-between gap-8 pt-7 xl:pt-8 transition-opacity duration-500 ${
            scrolled ? "opacity-100" : "opacity-90"
          }`}
        >
          <a
            href="#home"
            onMouseEnter={() => setBrandHovered(true)}
            onMouseLeave={() => setBrandHovered(false)}
            onFocus={() => setBrandHovered(true)}
            onBlur={() => setBrandHovered(false)}
            className={`flex min-w-[168px] shrink-0 items-center text-[1.45rem] leading-none tracking-[0.02em] ${brandText} transition-opacity duration-300 hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${focusRing} rounded-sm [font-family:var(--font-akira)]`}
            aria-label="Tsan - Home"
          >
            <BrandLogo tone={isDark ? "dark" : "light"} className="relative z-10 h-[60px]" />
            <motion.span
              initial={false}
              animate={{
                width: brandCollapsed ? 0 : "auto",
                marginLeft: brandCollapsed ? 0 : 10,
              }}
              transition={{
                width: { duration: reduceMotion ? 0 : 0.64, ease: brandSlideEase },
                marginLeft: { duration: reduceMotion ? 0 : 0.64, ease: brandSlideEase },
              }}
              className="relative block shrink-0 overflow-hidden"
              aria-hidden={brandCollapsed}
            >
              <motion.span
                initial={false}
                animate={{
                  x: brandCollapsed ? -64 : 0,
                  opacity: brandCollapsed ? 0 : 1,
                }}
                transition={{
                  x: { duration: reduceMotion ? 0 : 0.64, ease: brandSlideEase },
                  opacity: {
                    duration: reduceMotion ? 0 : 0.2,
                    delay: brandCollapsed && !reduceMotion ? 0.32 : 0,
                    ease: "easeOut",
                  },
                }}
                className="block whitespace-nowrap"
              >
                Tsan
              </motion.span>
            </motion.span>
          </a>

          <div className="flex items-start gap-10 xl:gap-14 ml-auto">
            <div className="pt-2">{renderNavGroup(navPrimary)}</div>
            <div className="pt-2 flex flex-col items-start">
              {renderNavGroup(navSecondary)}
            </div>
            <div className="pt-[0.9rem]">{renderNavGroup(navContact)}</div>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
