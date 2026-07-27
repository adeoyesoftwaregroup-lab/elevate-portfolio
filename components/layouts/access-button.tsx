"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SignalIcon } from "lucide-react";

export function AccessButton() {
  return (
    <Link
      href="/login"
      target="_blank"
      rel="noopener noreferrer"
      className="relative inline-block outline-none group pointer-events-auto cursor-pointer select-none"
    >
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={`
          relative flex h-8 items-center justify-center gap-1.5 overflow-hidden rounded-full 
          bg-neutral-950/40 px-4 font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-400
          border border-emerald-500/30 transition-all duration-300 
          hover:border-emerald-400 hover:text-white
          hover:shadow-[0_0_12px_rgba(16,185,129,0.2)]
        `}
      >
        {/* Animated Shimmer Border Track */}
        <span className="absolute inset-0 pointer-events-none rounded-full border border-white/[0.02]" />

        {/* FIXED Dynamic Ray Effect: Modified to dark charcoal matrix overlays to keep white text clean */}
        <span className="absolute inset-0 pointer-events-none -z-10 bg-[linear-gradient(110deg,#020202,45%,#062318,55%,#020202)] bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Semantic Icon Integration */}
        <SignalIcon className="h-3.5 w-3.5 stroke-[2.5] text-emerald-500 group-hover:text-white transition-colors duration-300 group-hover:animate-pulse" />

        <span className="relative tracking-widest">access_gate.sh</span>
      </motion.div>
    </Link>
  );
}
