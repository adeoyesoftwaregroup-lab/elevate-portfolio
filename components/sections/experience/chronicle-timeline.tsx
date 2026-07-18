"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Briefcase,
  Calendar,
  ShieldCheck,
  Terminal,
  ArrowUpRight,
  Cpu,
  Network,
  Zap,
} from "lucide-react";
import { Container } from "@/components/common/container";

// Strict structural interface definitions matching your relational Prisma database models perfectly
interface ExperienceData {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string | Date;
  endDate: string | Date | null;
  techStack: string[];
  milestones: string[];
  orderIndex: number;
  impactMetricLabel1: string | null;
  impactMetricValue1: string | null;
  impactMetricLabel2: string | null;
  impactMetricValue2: string | null;
}

interface ChronicleTimelineProps {
  initialExperiences: ExperienceData[];
}

export function ChronicleTimeline({
  initialExperiences,
}: ChronicleTimelineProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Helper macro engine to cleanly format dates for professional portfolio timelines
  const formatOperationalHorizon = (
    start: string | Date,
    end: string | Date | null,
  ) => {
    const format = (dateVal: string | Date) => {
      const d = new Date(dateVal);
      return isNaN(d.getTime())
        ? ""
        : d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
    };

    const startString = format(start);
    const endString = end ? format(end) : "PRESENT";

    return `${startString} — ${endString}`;
  };

  // Process data records sequentially using order weights and chronological parameters
  const activeTimeline = [...initialExperiences].sort(
    (a, b) => a.orderIndex - b.orderIndex,
  );

  if (activeTimeline.length === 0) return null;

  return (
    <section className="relative w-full pt-32 pb-24 px-4 sm:px-6 md:px-12 border-b border-neutral-900 bg-[#020204] overflow-hidden select-none font-mono">
      {/* Structural Grid Mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-[10%] left-[-10%] w-[400px] h-[400px] bg-indigo-500/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <Container className="max-w-6xl mx-auto relative z-10">
        {/* Experience Section Header */}
        <div className="space-y-3 mb-20">
          <span className="text-[10px] font-mono tracking-[0.3em] text-indigo-400 uppercase font-bold block animate-pulse">
            // HISTORICAL SYSTEM DEPLOYMENT LEDGER
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white uppercase font-sans">
            Professional Chronology
          </h2>
        </div>

        {/* Timeline Core Engine Layout Vertical Tracker Line */}
        <div className="relative border-l border-neutral-800 ml-4 md:ml-32 space-y-16 pl-8 md:pl-12">
          {activeTimeline.map((job) => {
            const timeHorizon = formatOperationalHorizon(
              job.startDate,
              job.endDate,
            );
            const hasMetrics =
              (job.impactMetricLabel1 && job.impactMetricValue1) ||
              (job.impactMetricLabel2 && job.impactMetricValue2);

            return (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.45 }}
                className="relative group/node"
                onMouseEnter={() => setHoveredNode(job.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Interactive Timeline Anchor Node Indicator */}
                <div
                  className={`absolute -left-[41px] md:-left-[57px] top-1.5 w-5 h-5 rounded-full border bg-neutral-950 flex items-center justify-center transition-all duration-300 z-10 ${
                    hoveredNode === job.id
                      ? "border-indigo-400 scale-125 shadow-lg shadow-indigo-500/20"
                      : "border-neutral-800"
                  }`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      hoveredNode === job.id
                        ? "bg-indigo-400"
                        : "bg-neutral-800"
                    }`}
                  />
                </div>

                {/* Float-Left Absolute Timestamp Label for Desktop Viewports */}
                <div className="hidden md:block absolute -left-[180px] top-1.5 w-[110px] text-right font-mono text-[10px] font-extrabold tracking-wider text-zinc-500 uppercase">
                  {timeHorizon}
                </div>

                {/* Main Structural Ledger Card */}
                <div className="relative rounded-2xl border border-neutral-900 bg-gradient-to-b from-neutral-950 via-neutral-900/20 to-neutral-950 p-5 sm:p-6 md:p-8 backdrop-blur-xl transition-all duration-300 hover:border-neutral-800/80 hover:bg-neutral-900/30 shadow-xl">
                  <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neutral-800/40 to-transparent" />

                  {/* Meta Layout Header */}
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 border-b border-neutral-900/60 pb-6 mb-6 w-full">
                    <div className="space-y-1.5 min-w-0">
                      <span className="md:hidden block font-mono text-[10px] text-indigo-400 font-bold tracking-wider mb-1 uppercase">
                        {timeHorizon}
                      </span>
                      <h3 className="text-lg md:text-xl font-black tracking-tight text-neutral-100 font-sans truncate">
                        {job.role}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-zinc-400">
                        <span className="text-zinc-300 font-bold flex items-center gap-1.5 truncate max-w-[200px]">
                          <Briefcase className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                          {job.company}
                        </span>
                        <span className="text-zinc-700 font-bold select-none">
                          //
                        </span>
                        <span className="text-zinc-500 truncate max-w-[160px]">
                          {job.location}
                        </span>
                      </div>
                    </div>

                    {/* Operational Infrastructure High-Impact Metrics Block */}
                    {hasMetrics && (
                      <div className="flex gap-2 self-start lg:self-auto shrink-0 font-mono text-[9px] font-bold">
                        {job.impactMetricLabel1 && job.impactMetricValue1 && (
                          <div className="bg-neutral-950 px-3 py-2 rounded-xl border border-neutral-900 text-right min-w-[110px] shadow-inner">
                            <span className="block text-[8px] text-zinc-600 font-bold tracking-wider uppercase truncate max-w-[100px]">
                              {job.impactMetricLabel1}
                            </span>
                            <span className="text-xs font-black text-emerald-400 block mt-0.5 select-text">
                              {job.impactMetricValue1}
                            </span>
                          </div>
                        )}
                        {job.impactMetricLabel2 && job.impactMetricValue2 && (
                          <div className="bg-neutral-950 px-3 py-2 rounded-xl border border-neutral-900 text-right min-w-[110px] shadow-inner">
                            <span className="block text-[8px] text-zinc-600 font-bold tracking-wider uppercase truncate max-w-[100px]">
                              {job.impactMetricLabel2}
                            </span>
                            <span className="text-xs font-black text-emerald-400 block mt-0.5 select-text">
                              {job.impactMetricValue2}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Granular Architectural Accomplishments Milestones Sublist */}
                  <div className="space-y-3.5 mb-6 text-neutral-400 font-sans text-xs leading-relaxed text-left font-medium select-text">
                    {job.milestones.map((milestone, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 group/line"
                      >
                        <ShieldCheck className="w-4 h-4 text-indigo-400/60 shrink-0 mt-0.5 group-hover/line:text-indigo-400 transition-colors" />
                        <p className="flex-1">{milestone}</p>
                      </div>
                    ))}
                  </div>

                  {/* Declared Compiled Technology Cluster Tags */}
                  <div className="flex flex-wrap gap-1.5 items-center font-mono text-[9px] font-bold select-none border-t border-neutral-900/40 pt-4">
                    <span className="text-zinc-600 uppercase tracking-widest font-extrabold text-[8px] mr-1 flex items-center gap-1 shrink-0">
                      <Cpu className="w-3 h-3 text-zinc-500" /> Stack Matrix:
                    </span>
                    {job.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-neutral-950 text-zinc-400 border border-neutral-900/80 rounded font-bold uppercase tracking-tight group-hover/node:border-neutral-800 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
