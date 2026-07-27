"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  ShieldCheck,
  Terminal,
  ChevronLeft,
  ChevronRight,
  Binary,
} from "lucide-react";
import { Container } from "@/components/common/container";

interface Testimonial {
  id: string;
  signatureHash: string;
  author: string;
  role: string;
  organization: string;
  body: string;
  timestamp: string;
}

// Highly tailored mock data - replace these strings with your actual LinkedIn reviews!
const COMMENDATIONS: Testimonial[] = [
  {
    id: "NODE-01",
    signatureHash: "sha256:7f83b1a2c...e84d9f",
    author: "Sarah Jenkins",
    role: "Engineering Lead",
    organization: "Vercel Labs",
    body: "Yusuf's capacity to optimize Next.js server components and implement fluid reactive interfaces completely altered our deployment metrics. His architecture patterns are pristine, documentation is thorough, and his system mentality matches high-tier staff engineers.",
    timestamp: "2026.04.12_14:22:08_UTC",
  },
  {
    id: "NODE-02",
    signatureHash: "sha256:3a19e8f4c...b22c71",
    author: "Marcus Chen",
    role: "Principal Infrastructure Architect",
    organization: "Neon Database",
    body: "Exceptional clean code execution profiles. Yusuf solved critical concurrency deadlocks on our client connection matrix. He operates with extreme precision under tight production deadlines and acts as a massive culture accelerator for agile engineering squads.",
    timestamp: "2026.06.19_09:44:51_UTC",
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const handlePaginate = (newDirection: number) => {
    setDirection(newDirection);
    setActiveIndex((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = COMMENDATIONS.length - 1;
      if (next >= COMMENDATIONS.length) next = 0;
      return next;
    });
  };

  const current = COMMENDATIONS[activeIndex];

  // Framer Motion slide-fade variant configurations
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 160 : -160,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 160 : -160,
      opacity: 0,
    }),
  };

  return (
    <section
      id="commendations"
      className="relative w-full py-24 bg-[#020202] overflow-hidden select-none"
    >
      {/* Background Matrix Node Line Decor */}
      <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-neutral-900 via-neutral-900/10 to-transparent -translate-x-1/2" />

      <Container className="relative z-10 w-full max-w-3xl mx-auto space-y-10">
        {/* Module Section Header */}
        <div className="flex flex-col space-y-2 text-left md:text-center md:items-center">
          <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 flex items-center gap-1.5 md:justify-center">
            <ShieldCheck className="w-3.5 h-3.5 shadow-[0_0_8px_#10b981]" />{" "}
            Verified Peer Commendations
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white max-w-xl">
            Signed Cryptographic Validation Packages.
          </h2>
        </div>

        {/* Outer Command Terminal Box Enclosure */}
        <div className="relative w-full rounded-2xl border border-neutral-900 bg-[#060609]/60 p-6 font-mono text-xs shadow-2xl backdrop-blur-xl subpixel-antialiased flex flex-col space-y-6 min-h-[320px] justify-between">
          {/* Top Window Navigation Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-neutral-900/80 w-full">
            <div className="flex items-center gap-2">
              <Binary className="w-3.5 h-3.5 text-neutral-600 animate-pulse" />
              <span className="text-[10px] text-zinc-500 uppercase font-semibold tracking-wider">
                node_stream: {current.id}
              </span>
            </div>
            <div className="text-[10px] text-zinc-600 font-medium select-none truncate max-w-[150px] sm:max-w-none">
              {current.signatureHash}
            </div>
          </div>

          {/* AnimatePresence Shell wrapper for frictionless structural sliding transitions */}
          <div className="relative overflow-hidden flex-1 flex flex-col justify-center py-2">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex flex-col space-y-4"
              >
                {/* Testimonial Core Text Block */}
                <p className="text-neutral-300 text-sm leading-relaxed font-sans font-light italic">
                  "{current.body}"
                </p>

                {/* Identity Metadata String Layout */}
                <div className="flex flex-col space-y-0.5 pt-2">
                  <div className="text-white font-bold text-sm font-sans tracking-tight">
                    {current.author}
                  </div>
                  <div className="text-zinc-500 text-[11px] font-medium tracking-wide">
                    {current.role}{" "}
                    <span className="text-indigo-400">
                      @ {current.organization}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Core Shell Command Line & Pagination Footer controls */}
          <div className="flex items-center justify-between border-t border-neutral-900/80 pt-4 w-full text-[10px] text-zinc-600 font-semibold tracking-wider uppercase">
            <div className="flex items-center gap-1.5 hidden sm:flex">
              <Terminal className="w-3 h-3 text-neutral-500" />
              <span>timestamp: {current.timestamp}</span>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={() => handlePaginate(-1)}
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-neutral-900 bg-neutral-950 text-neutral-400 hover:border-neutral-700 hover:text-white transition-all cursor-pointer"
                title="Previous Commendation"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handlePaginate(1)}
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-neutral-900 bg-neutral-950 text-neutral-400 hover:border-neutral-700 hover:text-white transition-all cursor-pointer"
                title="Next Commendation"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
