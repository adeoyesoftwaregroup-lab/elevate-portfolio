"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileDown, Download } from "lucide-react";

export function ResumeButton() {
  return (
    <Link
      href="/resume/Yusuf-Adeoye-Resume.png"
      // Forces the browser to download the file directly into the local directory
      download="Yusuf-Adeoye-Resume.png"
      target="_blank"
      rel="noopener noreferrer"
      className="relative inline-block outline-none group pointer-events-auto cursor-pointer select-none"
    >
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={`
          relative flex h-8 items-center justify-center gap-2 overflow-hidden rounded-full 
          px-4 font-mono text-[11px] font-bold uppercase tracking-wider text-neutral-300
          border border-neutral-800/80 bg-neutral-900/50 backdrop-blur-md
          transition-all duration-300 hover:border-neutral-600 hover:text-white
          hover:shadow-[0_0_12px_rgba(99,102,241,0.15)]
        `}
      >
        {/* Animated Cyberpunk Shimmer Track */}
        <span className="absolute inset-0 pointer-events-none rounded-full border border-white/[0.03]" />

        {/* Dynamic Ray Effect (Flares up elegantly on link hover focus) */}
        <span className="absolute inset-0 pointer-events-none -z-10 bg-[linear-gradient(110deg,#09090b,45%,#222226,55%,#09090b)] bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Micro-Interaction Flip Icon Window */}
        <div className="relative w-3.5 h-3.5 overflow-hidden shrink-0">
          <FileDown className="absolute inset-0 h-3.5 w-3.5 text-neutral-400 transition-transform duration-300 group-hover:-translate-y-4" />
          <Download className="absolute inset-0 h-3.5 w-3.5 text-indigo-400 transition-transform duration-300 translate-y-4 group-hover:translate-y-0" />
        </div>

        {/* Dynamic Title Token string */}
        <span className="relative tracking-widest">Download Resume</span>
      </motion.div>
    </Link>
  );
}
