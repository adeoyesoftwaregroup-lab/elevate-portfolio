"use client";

import React from "react";
import {
  Terminal,
  Shield,
  Cpu,
  MapPin,
  Radio,
  Globe,
  Layers,
  ArrowUpRight,
} from "lucide-react";

export function IdentityHero() {
  return (
    <section className="relative w-full pt-36 pb-24 px-6 md:px-12 xl:px-24 border-b border-white/5 bg-[#020203]">
      {/* Premium Visual Noise & Grid Underlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        {/* LEFT COLUMN: CRITICAL BIO & STRATEGIC OVERVIEW (7 Cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Live System Broadcast Indicator */}
          <div className="inline-flex items-center gap-3 px-3.5 py-2 rounded-full bg-zinc-900/80 border border-white/10 backdrop-blur-md text-[11px] font-mono tracking-widest text-zinc-300 uppercase shadow-xl shadow-black/50">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span className="text-zinc-500">//</span> BROADCASTING LIVE FROM ZA{" "}
            <span className="text-zinc-500">to</span> GLOBAL_NET
          </div>

          {/* Primary Typography Grid */}
          <div className="space-y-4">
            <span className="block text-[11px] font-mono tracking-[0.3em] text-indigo-400 uppercase font-semibold">
              // PRINCIPAL SYSTEMS ARCHITECT
            </span>
            <h1 className="text-4xl sm:text-5xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Engineering Resilient <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-200 via-indigo-300 to-zinc-500">
                Enterprise Software
              </span>
            </h1>
          </div>

          {/* Narrative optimized for High-Tier Global Enterprise Recruiters */}
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-2xl font-light">
            I construct mission-critical, enterprise-grade digital systems
            across Web, Mobile, and Desktop platforms. Specializing in
            low-latency runtime environments, reactive Java/Spring Boot
            frameworks, high-throughput database design, and intelligent AI
            pipeline orchestrations for global industries.
          </p>

          {/* Quick Technical Summary Badges */}
          <div className="flex flex-wrap gap-2 pt-2 max-w-xl">
            {[
              "Java / Spring Boot",
              "Next.js / React Native",
              "Docker Containers",
              "Relational Systems & PL/SQL",
              "AI Pipelines",
            ].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-[11px] font-mono rounded bg-white/[0.02] border border-white/5 text-zinc-400"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Core System Meta Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg pt-4 font-mono text-xs">
            <div className="flex items-center gap-3 bg-zinc-900/20 p-3.5 rounded-lg border border-white/5 backdrop-blur-sm group hover:border-indigo-500/20 transition-all duration-300">
              <div className="p-2 rounded bg-indigo-500/5 text-indigo-400 border border-indigo-500/10">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] text-zinc-600 uppercase">
                  BASE OPERATIONS
                </span>
                <span className="text-zinc-300">South Africa</span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-zinc-900/20 p-3.5 rounded-lg border border-white/5 backdrop-blur-sm group hover:border-indigo-500/20 transition-all duration-300">
              <div className="p-2 rounded bg-indigo-500/5 text-indigo-400 border border-indigo-500/10">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] text-zinc-600 uppercase">
                  AVAILABILITY
                </span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  Global Remote Ready <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: PREMIUM SYSTEM ARCHITECTURE DOSSIER DISPLAY (5 Cols) */}
        <div className="lg:col-span-5 w-full">
          <div className="relative group rounded-xl border border-white/10 bg-gradient-to-b from-[#09090c] to-[#040406] p-7 shadow-2xl shadow-indigo-950/20 transition-all duration-500 hover:border-indigo-500/30">
            {/* Fine Tech Corner Accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-indigo-500/60" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-indigo-500/60" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-indigo-500/60" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-indigo-500/60" />

            {/* Dossier Card Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-5 mb-6">
              <div className="flex items-center gap-2.5">
                <Shield className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-mono font-bold tracking-wider text-zinc-300 uppercase">
                  VERIFIED OPERATOR LOGS
                </span>
              </div>
              <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900/80 px-2 py-0.5 rounded border border-white/5">
                CORE v2.0
              </span>
            </div>

            {/* Simulated Live System Metrics Dashboard */}
            <div className="space-y-5 font-mono text-xs">
              <div className="space-y-1.5">
                <div className="text-zinc-600 text-[10px] tracking-wider uppercase font-semibold flex items-center gap-1.5">
                  <Layers className="w-3 h-3 text-zinc-500" /> // TARGET
                  ENVIRONMENT MATRICES
                </div>
                <div className="text-zinc-300 bg-zinc-950 p-3 rounded-lg border border-white/5 flex items-center justify-between text-[11px]">
                  <span>Web / Mobile / Desktop / Cloud</span>
                  <Cpu className="w-3.5 h-3.5 text-zinc-600" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="text-zinc-600 text-[10px] tracking-wider uppercase font-semibold flex items-center gap-1.5">
                  <Terminal className="w-3 h-3 text-zinc-500" /> // DISTRIBUTED
                  LEDGER METRICS
                </div>
                <div className="grid grid-cols-2 gap-3 text-zinc-300">
                  <div className="bg-zinc-950 p-3 rounded-lg border border-white/5">
                    <span className="block text-[9px] text-zinc-600 font-bold uppercase">
                      DATABASE LAYER
                    </span>
                    <span className="text-xs font-bold text-indigo-400">
                      PostgreSQL / Neon
                    </span>
                  </div>
                  <div className="bg-zinc-950 p-3 rounded-lg border border-white/5">
                    <span className="block text-[9px] text-zinc-600 font-bold uppercase">
                      AUTH ARCHITECTURE
                    </span>
                    <span className="text-xs font-bold text-purple-400">
                      NextAuth Engine
                    </span>
                  </div>
                </div>
              </div>

              {/* Matrix Console Log Activity Hook */}
              <div className="space-y-1.5 pt-1">
                <div className="text-zinc-600 text-[10px] tracking-wider uppercase font-semibold">
                  // LIVE SYSTEM INITIALIZATION
                </div>
                <div className="bg-zinc-950 p-3.5 rounded-lg border border-white/5 font-mono text-[11px] text-zinc-500 space-y-1.5 bg-opacity-70">
                  <p className="text-indigo-400/90">
                    &gt; npx next dev --turbo
                  </p>
                  <p className="text-zinc-400">
                    &gt; establishing cloud handshake with neon DB...
                  </p>
                  <p className="text-emerald-400/90">
                    &gt; secure cluster connection online.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
