"use client";

import { Container } from "@/components/common/container";
import { motion } from "framer-motion";

import {
  GitBranch,
  GitPullRequest,
  Flame,
  CheckCircle,
  RefreshCw,
} from "lucide-react";

// Generate clean historical grid coordinates programmatically (7 rows, 24 columns for a sleek subset viewport)
const DAYS_OF_WEEK = ["Mon", "", "Wed", "", "Fri", ""];
const GRID_COLUMNS = 24;
const TOTAL_CELLS = 7 * GRID_COLUMNS;

// Seed structural simulation values for realistic engineering profiles (0 = empty, 1 = low, 2 = mid, 3 = maximum push volume)
const SEED_ACTIVITY_ARRAY = [
  2, 0, 1, 3, 0, 0, 1, 2, 0, 3, 1, 0, 2, 2, 1, 0, 3, 0, 1, 2, 0, 1, 3, 0, 0, 1,
  3, 0, 2, 1, 0, 0, 2, 1, 3, 0, 1, 0, 2, 3, 0, 1, 0, 2, 1, 0, 0, 3, 1, 2, 0, 1,
  0, 3, 2, 1, 0, 0, 1, 3, 2, 0, 1, 0, 2, 3, 1, 0, 0, 2, 1, 0, 3, 0, 1, 2, 0, 1,
  3, 0, 2, 1, 0, 3, 0, 1, 2, 2, 0, 1, 3, 0, 1, 0, 2, 1, 0, 1, 2, 0, 3, 1, 0, 2,
  1, 0, 3, 0, 1, 2, 0, 1, 3, 0, 2, 1, 0, 0, 2, 3, 2, 3, 0, 1, 0, 2, 1, 0, 3, 2,
  1, 0, 1, 3, 0, 2, 1, 0, 0, 3, 1, 2, 0, 1, 1, 0, 2, 3, 1, 0, 0, 2, 1, 0, 3, 1,
  2, 0, 1, 0, 3, 2, 1, 0, 1, 3, 2, 0,
];

export function OpenSourceTelemetry() {
  // Map functional color arrays perfectly matching an advanced cyber aesthetic
  const getIntensityClass = (level: number) => {
    switch (level) {
      case 1:
        return "bg-indigo-950/40 border-indigo-900/40";
      case 2:
        return "bg-indigo-700/60 border-indigo-600/50 shadow-[0_0_4px_rgba(99,102,241,0.2)]";
      case 3:
        return "bg-indigo-500 border-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.4)]";
      default:
        return "bg-neutral-950 border-neutral-900";
    }
  };

  return (
    <section
      id="oss-matrix"
      className="relative w-full py-24 bg-[#020202] overflow-hidden select-none"
    >
      <Container className="relative z-10 w-full max-w-3xl mx-auto space-y-10">
        {/* Module Section Header */}
        <div className="flex flex-col space-y-2 text-left md:text-center md:items-center">
          <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400 flex items-center gap-1.5 md:justify-center">
            <GitBranch className="w-3.5 h-3.5 shadow-[0_0_8px_#6366f1]" /> Core
            Telemetry Matrix
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white max-w-xl">
            Live Open-Source Continuous Integration.
          </h2>
        </div>

        {/* Master Console Panel Grid */}
        <div className="relative w-full rounded-2xl border border-neutral-900 bg-[#060609]/60 p-6 font-mono text-xs shadow-2xl backdrop-blur-xl subpixel-antialiased flex flex-col space-y-6">
          {/* Top Panel Sync Notification Banner Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-neutral-900/80 w-full">
            <div className="flex items-center gap-2 text-zinc-400">
              <RefreshCw
                className="w-3 h-3 text-indigo-400 animate-spin"
                style={{ animationDuration: "6s" }}
              />
              <span className="text-[10px] text-zinc-500 uppercase font-semibold tracking-wider">
                git_engine: production_sync_active
              </span>
            </div>
            <div className="text-[10px] text-emerald-400 font-bold bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-900/40 flex items-center gap-1">
              <CheckCircle className="w-2.5 h-2.5" /> LIVE CONNECTED
            </div>
          </div>

          {/* Three-Column Operational Real-Time Statistics Array block */}
          <div className="grid grid-cols-3 gap-4 border-b border-neutral-900/40 pb-4">
            <div className="flex flex-col space-y-1 bg-neutral-950/40 border border-neutral-900 p-3 rounded-xl">
              <span className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">
                Yearly Commits
              </span>
              <span className="text-xl font-black text-white tracking-tight sm:text-2xl">
                2,481
              </span>
            </div>
            <div className="flex flex-col space-y-1 bg-neutral-950/40 border border-neutral-900 p-3 rounded-xl">
              <span className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider flex items-center gap-1">
                <Flame className="w-3 h-3 text-orange-500 animate-pulse" />{" "}
                Daily Streak
              </span>
              <span className="text-xl font-black text-white tracking-tight sm:text-2xl">
                48 Days
              </span>
            </div>
            <div className="flex flex-col space-y-1 bg-neutral-950/40 border border-neutral-900 p-3 rounded-xl">
              <span className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider flex items-center gap-1">
                <GitPullRequest className="w-3 h-3 text-indigo-400" /> Merged
                PRs
              </span>
              <span className="text-xl font-black text-white tracking-tight sm:text-2xl">
                142
              </span>
            </div>
          </div>

          {/* Contribution Heatmap Wrapper Element */}
          <div className="w-full flex items-start gap-2 overflow-x-auto pb-2 scrollbar-none pt-2">
            {/* Days Label Column */}
            <div className="flex flex-col justify-between text-[9px] text-zinc-600 font-semibold uppercase h-[90px] pt-1 select-none pr-1">
              {DAYS_OF_WEEK.map((day, i) => (
                <span key={i} className="h-2.5 block leading-none">
                  {day}
                </span>
              ))}
            </div>

            {/* Matrix Block Array Wrapper Layout */}
            <div className="grid grid-flow-col grid-rows-7 gap-1.5 flex-1 min-w-[380px]">
              {SEED_ACTIVITY_ARRAY.slice(0, TOTAL_CELLS).map((level, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.002, duration: 0.2 }}
                  className={`h-2.5 w-2.5 rounded-sm border transition-all duration-300 ${getIntensityClass(level)}`}
                  title={`Activity Node Level [${level}]`}
                />
              ))}
            </div>
          </div>

          {/* Heatmap Footer Notation Legend Guide */}
          <div className="flex items-center justify-between pt-2 text-[10px] text-zinc-600 font-semibold tracking-wider uppercase select-none w-full">
            <span>Data scope: GitHub Main Pipeline</span>
            <div className="flex items-center gap-1">
              <span>Less</span>
              <div className="h-2 w-2 rounded-sm bg-neutral-950 border border-neutral-900" />
              <div className="h-2 w-2 rounded-sm bg-indigo-950/40 border border-indigo-900/40" />
              <div className="h-2 w-2 rounded-sm bg-indigo-700/60 border border-indigo-600/50" />
              <div className="h-2 w-2 rounded-sm bg-indigo-500 border border-indigo-400" />
              <span>More</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
