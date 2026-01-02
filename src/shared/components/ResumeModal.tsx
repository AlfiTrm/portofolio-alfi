"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaDownload, FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import { useEffect } from "react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] cursor-pointer"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-8 pointer-events-none"
          >
            <div className="w-full max-w-6xl h-[85vh] md:h-[90vh] min-h-[500px] bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl pointer-events-auto flex flex-col">
              <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/10 bg-white/5">
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Curriculum Vitae
                </h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/60 hover:text-white"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 bg-neutral-900 relative overflow-hidden">
                <iframe
                  src="/CV.pdf"
                  className="w-full h-full border-none"
                  title="CV Preview"
                />
              </div>

              <div className="p-4 md:p-6 border-t border-white/10 bg-white/5 flex flex-col md:flex-row gap-4 items-center justify-end">
                <a
                  href="/CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:w-auto px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-white/70 hover:text-white transition-all flex items-center justify-center gap-2 font-medium"
                >
                  <FaExternalLinkAlt className="w-4 h-4" />
                  Open in New Tab
                </a>

                <a
                  href="/CV.pdf"
                  download="CV_Alfi_Tsani.pdf"
                  className="w-full md:w-auto px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black transition-all flex items-center justify-center gap-2 font-bold shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
                >
                  <FaDownload className="w-4 h-4" />
                  Download PDF
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
