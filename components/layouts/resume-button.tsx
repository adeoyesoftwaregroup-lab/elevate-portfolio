"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileDown } from "lucide-react";

export function ResumeButton() {
  return (
    <Link
      href="/resume/Yusuf-Adeoye-Resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="relative inline-block outline-none group"
    >
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="relative flex h-9 items-center justify-center gap-1.5 overflow-hidden rounded-full bg-neutral-950 px-4 text-xs font-medium text-neutral-50 shadow-sm transition-colors duration-300 dark:bg-neutral-50 dark:text-neutral-950 dark:hover:bg-neutral-200 hover:bg-neutral-800"
      >
        {/* Animated Shimmer Border Track */}
        <span className="absolute inset-0 pointer-events-none rounded-full border border-white/10 dark:border-black/5" />

        {/* Dynamic Ray Effect (Flares up subtly on hover) */}
        <span className="absolute inset-0 pointer-events-none -z-10 bg-[linear-gradient(110deg,#000,45%,#1e1e1e,55%,#000)] dark:bg-[linear-gradient(110deg,#fff,45%,#f4f4f5,55%,#fff)] bg-[length:200%_100%] animate-[shimmer_2.5s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Semantic Icon Integration */}
        <FileDown className="h-3.5 w-3.5 stroke-[2] transition-transform duration-300 group-hover:-translate-y-0.5" />

        <span className="relative tracking-wide">Resume</span>
      </motion.div>
    </Link>
  );
}
