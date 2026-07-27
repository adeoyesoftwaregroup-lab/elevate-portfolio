"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  AlertTriangle,
  ChevronDown,
  Cpu,
  Activity,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Container } from "@/components/common/container";

interface LogCase {
  id: string;
  incidentCode: string;
  title: string;
  symptom: string;
  rootCause: string;
  resolution: string;
  metricImpact: string;
}

const PRODUCTION_REPORTS: LogCase[] = [
  {
    id: "REPORT-01",
    incidentCode: "ERR_CONCURRENCY_LATENCY_409",
    title: "Database Query Latency Optimization",
    symptom:
      "Spiking read operations throttling connection pools during high concurrent event aggregation handshakes.",
    rootCause:
      "Unindexed subqueries triggering full table scans across relation nodes coupled with un-cached multi-table Prisma joins.",
    resolution:
      "Implemented optimized composite indexes, refactored raw query layers, and introduced a Redis caching layer to handle redundant requests.",
    metricImpact:
      "Reduced query response latency by 64% and decreased database cluster CPU overhead to a stable 12% baseline.",
  },
  {
    id: "REPORT-02",
    incidentCode: "ERR_MEMORY_LEAK_CORE_OS",
    title: "Asynchronous Memory Leak Mitigation",
    symptom:
      "Edge runtimes experiencing slow memory inflation, resulting in eventual cold-start crashes under sustained user load.",
    rootCause:
      "Unsubscripted global network event listeners leaking inside a high-frequency client telemetry streaming hook setup.",
    resolution:
      "Refactored execution pipelines with strict abort controller cleanups inside React side-effect return blocks.",
    metricImpact:
      "Completely eliminated runtime memory fragmentation, preserving a flat 42MB cluster footprint over 7 days.",
  },
];

export function CaseStudiesSection() {
  const [openId, setOpenId] = useState<string | null>("REPORT-01");

  return (
    <section
      id="case-studies"
      className="relative w-full py-24 bg-[#020202] overflow-hidden select-none"
    >
      <Container className="relative z-10 w-full max-w-3xl mx-auto space-y-10">
        {/* Module Section Header */}
        <div className="flex flex-col space-y-2 text-left md:text-center md:items-center">
          <span className="text-[10px] uppercase font-bold tracking-widest text-amber-500 flex items-center gap-1.5 md:justify-center">
            <Cpu className="w-3.5 h-3.5 shadow-[0_0_8px_#f59e0b]" /> Engineering
            Post-Mortems
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white max-w-xl">
            Architectural System Case Studies.
          </h2>
        </div>

        {/* Master Console Incident Accordion Block Container */}
        <div className="w-full flex flex-col space-y-4 font-mono text-xs">
          {PRODUCTION_REPORTS.map((report) => {
            const isOpen = openId === report.id;

            return (
              <div
                key={report.id}
                className={`w-full rounded-2xl border transition-all duration-300 backdrop-blur-xl ${
                  isOpen
                    ? "border-neutral-800 bg-[#060609]/80 shadow-2xl"
                    : "border-neutral-900/60 bg-[#040406]/40 hover:border-neutral-800"
                }`}
              >
                {/* Accordion Trigger Header Bar */}
                <button
                  onClick={() => setOpenId(isOpen ? null : report.id)}
                  className="w-full flex items-center justify-between p-5 text-left select-none cursor-pointer focus:outline-none group"
                >
                  <div className="flex items-center gap-3 truncate pr-4">
                    <div
                      className={`p-2 rounded-lg border transition-colors shrink-0 ${
                        isOpen
                          ? "bg-amber-950/20 border-amber-900/50 text-amber-400"
                          : "bg-neutral-950 border-neutral-900 text-neutral-500"
                      }`}
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex flex-col space-y-0.5 truncate">
                      <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-wider">
                        {report.incidentCode}
                      </span>
                      <span className="text-white font-bold text-sm tracking-tight font-sans truncate group-hover:text-zinc-200 transition-colors">
                        {report.title}
                      </span>
                    </div>
                  </div>

                  <ChevronDown
                    className={`w-4 h-4 text-neutral-500 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-white" : ""
                    }`}
                  />
                </button>

                {/* Smooth Expandable Content Body Block */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden border-t border-neutral-900/60"
                    >
                      <div className="p-5 space-y-4 text-zinc-400 font-sans font-light leading-relaxed">
                        {/* Section Item: Symptom Mapping */}
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold text-zinc-500 tracking-wider">
                            <Activity className="w-3 h-3 text-rose-500" />{" "}
                            Operational Symptom
                          </div>
                          <p className="text-xs text-neutral-300 font-light">
                            {report.symptom}
                          </p>
                        </div>

                        {/* Section Item: Root Cause Resolution Analysis */}
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold text-zinc-500 tracking-wider">
                            <ShieldCheck className="w-3 h-3 text-indigo-400" />{" "}
                            Root Cause Diagnosis
                          </div>
                          <p className="text-xs text-neutral-300 font-light">
                            {report.rootCause}
                          </p>
                        </div>

                        {/* Section Item: Resolution Core Execution script */}
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold text-zinc-500 tracking-wider">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />{" "}
                            Architecture Patch Execution
                          </div>
                          <p className="text-xs text-neutral-300 font-light">
                            {report.resolution}
                          </p>
                        </div>

                        {/* Highlight Section: Production Data Impact Metrics */}
                        <div className="mt-2 p-3 bg-neutral-950 border border-neutral-900 rounded-xl font-mono text-[11px] text-emerald-400 flex flex-col space-y-0.5">
                          <span className="text-[9px] uppercase text-zinc-600 font-bold tracking-wider">
                            Verified Metric Resolution:
                          </span>
                          <span className="font-semibold leading-normal">
                            {report.metricImpact}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
