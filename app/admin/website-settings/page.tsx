import React, { Suspense } from "react";
import { SiteSettingsManager } from "@/components/sections/admin/site-settings-manager";
import {
  Loader2,
  Sliders,
  Database,
  Activity,
  ShieldCheck,
} from "lucide-react";

// Enforce modern runtime parameters to skip stale cache storage engines completely
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Core System Config // Website Telemetry",
  description:
    "Enterprise portfolio system global configuration control layer console workspace.",
};

export default async function AdminSettingsPage() {
  return (
    <div className="min-h-screen bg-zinc-50/50 p-4 sm:p-8 font-mono">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* TOP INFRASTRUCTURE RUNTIME META METRIC PANEL HEADER */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-zinc-200 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-zinc-900">
              <div className="p-2 bg-zinc-900 text-white rounded-xl shadow-sm border border-zinc-950 shrink-0">
                <Sliders className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <h1 className="text-base font-extrabold tracking-tight text-zinc-950 font-mono uppercase flex items-center gap-1.5">
                  Global System Variables
                </h1>
                <p className="text-[10px] text-zinc-400 font-bold tracking-wider uppercase">
                  Environment Class: Portfolio System Core Orchestration
                </p>
              </div>
            </div>
          </div>

          {/* TELEMETRY TELEGRAPH MATRIC STATUS BADGES */}
          <div className="flex flex-wrap items-center gap-2.5 text-[9px] font-bold uppercase tracking-wider text-zinc-500 select-none">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-zinc-200/80 rounded-lg shadow-sm">
              <Activity className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
              Engine:{" "}
              <span className="text-zinc-900 font-extrabold">
                UPSERT-SINGLETON
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-zinc-200/80 rounded-lg shadow-sm">
              <Database className="w-3.5 h-3.5 text-emerald-500" />
              Cluster:{" "}
              <span className="text-zinc-900 font-extrabold">NEON-MAIN</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-zinc-200/80 rounded-lg shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
              Auth:{" "}
              <span className="text-zinc-900 font-extrabold">GATEWAY-OK</span>
            </div>
          </div>
        </div>

        {/* ASYNCHRONOUS HIGH-DENSITY COMPONENT STREAMING BOUNDARY WRAPPER */}
        <Suspense
          fallback={
            <div className="w-full min-h-[460px] bg-zinc-950 border border-zinc-900 shadow-2xl rounded-xl p-6 flex flex-col justify-between font-mono text-[11px] text-zinc-500 select-none">
              {/* Simulated Terminal Loading Sequence Screen */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-zinc-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                  <span>INITIALIZING DIAGNOSTIC PROBE TELEMETRY LINK...</span>
                </div>
                <p className="text-zinc-600">
                  [OK] Established concurrent database thread cluster link.
                </p>
                <p className="text-zinc-600">
                  [OK] Pulled active cryptographic token session verification
                  flags.
                </p>
                <p className="text-zinc-600">
                  [WAIT] Synchronizing singleton configuration schema rows from
                  Neon shards...
                </p>
              </div>

              {/* Bottom Loading Core Section */}
              <div className="flex items-center gap-2 border-t border-zinc-900 pt-4 text-zinc-400 font-semibold uppercase tracking-wider text-[10px]">
                <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                <span>Buffering Memory Addresses Workspace Layout...</span>
              </div>
            </div>
          }
        >
          <div className="bg-transparent">
            {/* INJECTING YOUR DYNAMIC SITE SETTINGS MANAGER COMMAND PANEL COMPONENT */}
            <SiteSettingsManager />
          </div>
        </Suspense>
      </div>
    </div>
  );
}
