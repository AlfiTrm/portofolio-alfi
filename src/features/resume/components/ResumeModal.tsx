"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FaDownload, FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  interactionEase,
  interactionMorphSeconds,
} from "@/shared/components/motion/interactionTiming";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const reduceMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const [contentReady, setContentReady] = useState(false);
  const [isCompact, setIsCompact] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches,
  );
  const closeResume = useCallback(() => {
    setContentReady(false);
    onClose();
  }, [onClose]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateLayout = () => setIsCompact(mediaQuery.matches);

    updateLayout();
    mediaQuery.addEventListener("change", updateLayout);
    return () => mediaQuery.removeEventListener("change", updateLayout);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      openerRef.current = document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && contentReady) closeButtonRef.current?.focus();
  }, [contentReady, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeResume();
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [closeResume, isOpen]);

  const restoreFocus = () => {
    const opener = openerRef.current;
    if (opener?.isConnected && opener.getClientRects().length > 0) opener.focus();
  };

  const morphTransition = {
    duration: reduceMotion ? 0.16 : interactionMorphSeconds,
    ease: interactionEase,
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close resume"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.12 : interactionMorphSeconds }}
            onClick={closeResume}
            className="fixed inset-0 z-[100] cursor-pointer bg-black/80 backdrop-blur-md"
          />

          <div className="pointer-events-none fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={
                reduceMotion
                  ? { opacity: 0, scale: 1 }
                  : { opacity: 0, scaleX: isCompact ? 0.34 : 0.06, scaleY: isCompact ? 0.08 : 0.025 }
              }
              animate={{ opacity: 1, scaleX: 1, scaleY: 1 }}
              exit={
                reduceMotion
                  ? { opacity: 0, scale: 1 }
                  : { opacity: 0, scaleX: isCompact ? 0.34 : 0.06, scaleY: isCompact ? 0.08 : 0.025 }
              }
              transition={morphTransition}
              onAnimationComplete={() => {
                if (isOpen) setContentReady(true);
                else restoreFocus();
              }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="resume-dialog-title"
              className="pointer-events-auto origin-bottom-left flex h-[min(85dvh,calc(100dvh-2rem))] min-h-[min(500px,70dvh)] w-full max-w-6xl flex-col overflow-hidden border border-white/16 bg-[#0a0a0a] shadow-2xl md:h-[min(90dvh,calc(100dvh-4rem))] md:origin-bottom"
            >
              <motion.div
                initial={false}
                animate={{ opacity: contentReady ? 1 : 0, y: contentReady ? 0 : 12 }}
                transition={{ duration: reduceMotion ? 0.12 : 0.28, ease: interactionEase }}
                className="flex h-full min-h-0 flex-col"
              >
                <div className="flex items-center justify-between border-b border-white/10 bg-white/5 p-4 md:p-6">
                  <h3 id="resume-dialog-title" className="text-xl font-medium tracking-tight text-white">
                    Curriculum Vitae
                  </h3>
                  <button
                    ref={closeButtonRef}
                    type="button"
                    aria-label="Close resume"
                    onClick={closeResume}
                    className="flex size-11 items-center justify-center text-white/60 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  >
                    <FaTimes className="size-5" />
                  </button>
                </div>

                <div className="relative flex-1 overflow-hidden bg-neutral-900">
                  <iframe
                    src="/home/file/CV_Alfi.pdf"
                    className="h-full w-full border-none"
                    title="CV Preview"
                  />
                </div>

                <div className="flex flex-col items-center justify-end gap-4 border-t border-white/10 bg-white/5 p-4 md:flex-row md:p-6">
                  <a
                    href="/home/file/CV_Alfi.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 w-full items-center justify-center gap-2 border border-white/20 px-6 py-3 font-medium text-white/75 transition-colors hover:bg-white/5 hover:text-white md:w-auto"
                  >
                    <FaExternalLinkAlt className="size-4" />
                    Open in New Tab
                  </a>

                  <a
                    href="/home/file/CV_Alfi.pdf"
                    download="CV_Alfi_Tsani.pdf"
                    className="flex min-h-11 w-full items-center justify-center gap-2 bg-[#f0e7d4] px-6 py-3 font-medium text-[#171512] transition-colors hover:bg-white md:w-auto"
                  >
                    <FaDownload className="size-4" />
                    Download PDF
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
