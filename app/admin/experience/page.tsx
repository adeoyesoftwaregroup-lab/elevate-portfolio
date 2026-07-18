import React, { Suspense } from "react";

import { Loader2, Briefcase, Database, ShieldCheck } from "lucide-react";
import { ExperiencesManager } from "@/components/sections/admin/experience-manager";

// Enforce modern runtime parameter limits for secure server execution
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Timeline Core // Operational Matrix",
  description:
    "Enterprise portfolio system career node telemetry control console layer.",
};

export default async function AdminExperiencePage() {
  return (
    <div className="min-h-screen bg-zinc-50/50 p-4 sm:p-8 font-mono">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* TOP INFRASTRUCTURE RUNTIME META METRIC PANEL HEADER */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-zinc-200 pb-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-zinc-900">
              <div className="p-2 bg-zinc-900 text-white rounded-xl shadow-sm">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-zinc-900 font-mono uppercase">
                  Career Node Logs
                </h1>
                <p className="text-xs text-zinc-400 font-medium tracking-wide">
                  CLUSTER CLASSIFICATION: HISTORICAL TIMELINE SYSTEM
                  ORCHESTRATION
                </p>
              </div>
            </div>
          </div>

          {/* TELEMETRY TELEGRAPH MATRIC STATUS BADGES */}
          <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-zinc-200/80 rounded-lg shadow-sm">
              <Database className="w-3.5 h-3.5 text-emerald-500" />
              Data Node:{" "}
              <span className="text-zinc-900 font-extrabold">NEON-LIVE</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-zinc-200/80 rounded-lg shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
              Gateway:{" "}
              <span className="text-zinc-900 font-extrabold">SECURE-TLS</span>
            </div>
          </div>
        </div>

        {/* ASYNCHRONOUS COMPONENT STREAMING BOUNDARY WRAPPER */}
        <Suspense
          fallback={
            <div className="w-full min-h-[400px] bg-white border border-zinc-200/80 shadow-sm rounded-xl flex flex-col items-center justify-center gap-3 p-12">
              <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
              <div className="text-center space-y-1">
                <p className="text-xs text-zinc-900 font-bold uppercase tracking-widest">
                  Resolving Data Pipeline Matrix
                </p>
                <p className="text-[10px] text-zinc-400 font-semibold uppercase">
                  Pulling career history indices securely from memory shards...
                </p>
              </div>
            </div>
          }
        >
          <div className="bg-transparent">
            {/* INJECTING YOUR UPDATED EXPERIENCES MANAGER COMPONENT ELEMENT */}
            <ExperiencesManager />
          </div>
        </Suspense>
      </div>
    </div>
  );
}
