"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, FileDown } from "lucide-react";

export function HeroActions() {
  return (
    <div className="flex flex-wrap items-center gap-4 select-none pointer-events-auto">
      {/* 1. PRIMARY ACTION: VIEW PROJECTS (CRYSTALLINE RAY SHIMMER) */}
      <Link href="/projects" className="relative outline-none group">
        <motion.div
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          className="relative flex h-11 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-6 text-sm font-semibold text-black shadow-lg transition-colors duration-300 hover:bg-neutral-100"
        >
          <span>View Projects</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />

          {/* Luxury Micro Edge Reflection Highlight */}
          <span className="absolute inset-0 rounded-full border border-white/20 pointer-events-none" />
        </motion.div>
      </Link>

      {/* 2. SECONDARY ACTION: DOWNLOAD RESUME (SMOKED OBSIDIAN SHELL) */}
      <Link
        href="/resume/Yusuf-Adeoye-Resume.png"
        target="_blank"
        rel="noopener noreferrer"
        className="relative outline-none group"
      >
        <motion.div
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          className="relative flex h-11 items-center justify-center gap-2 overflow-hidden rounded-full border border-neutral-800 bg-neutral-900/40 px-6 text-sm font-semibold text-neutral-200 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-800/80 hover:text-white"
        >
          <FileDown className="w-4 h-4 text-neutral-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-neutral-200" />
          <span>Download Resume</span>

          {/* Internal Reflection Glare Track */}
          <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </motion.div>
      </Link>
    </div>
  );
}
