import React, { Suspense } from "react";

import { Loader2, Mail, Database, ShieldCheck, Activity } from "lucide-react";
import { ContactMessagesManager } from "@/components/sections/admin/contact-message-manager";

// Enforce dynamic server execution to skip static build caches entirely
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Communications Deck // Inbound Feeds",
  description:
    "Enterprise portfolio system user messages telemetry control console layer.",
};

export default async function AdminContactsPage() {
  return (
    <div className="min-h-screen bg-zinc-50/50 p-4 sm:p-8 font-mono">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* TOP INFRASTRUCTURE RUNTIME META METRIC PANEL HEADER */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-zinc-200 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-zinc-900">
              <div className="p-2 bg-zinc-900 text-white rounded-xl shadow-sm border border-zinc-950 shrink-0">
                <Mail className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <h1 className="text-base font-extrabold tracking-tight text-zinc-950 font-mono uppercase">
                  Inbound Signals Queue
                </h1>
                <p className="text-[10px] text-zinc-400 font-bold tracking-wider uppercase">
                  SYSTEM CATALOGUE: USER COMMS WIRE TRANSCRIPT TERMINAL
                </p>
              </div>
            </div>
          </div>

          {/* TELEMETRY TELEGRAPH MATRIC STATUS BADGES */}
          <div className="flex flex-wrap items-center gap-2.5 text-[9px] font-bold uppercase tracking-wider text-zinc-500 select-none">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-zinc-200/80 rounded-lg shadow-sm">
              <Activity className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
              Stream:{" "}
              <span className="text-zinc-900 font-extrabold">
                REALTIME-POLL
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-zinc-200/80 rounded-lg shadow-sm">
              <Database className="w-3.5 h-3.5 text-emerald-500" />
              Data Source:{" "}
              <span className="text-zinc-900 font-extrabold">NEON-SHARDS</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-zinc-200/80 rounded-lg shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
              Security:{" "}
              <span className="text-zinc-900 font-extrabold">SSL-VERIFIED</span>
            </div>
          </div>
        </div>

        {/* ASYNCHRONOUS HIGH-DENSITY COMPONENT STREAMING BOUNDARY WRAPPER */}
        <Suspense
          fallback={
            <div className="w-full min-h-[500px] bg-zinc-950 border border-zinc-900 shadow-2xl rounded-xl p-6 flex flex-col justify-between font-mono text-[11px] text-zinc-500 select-none">
              {/* Simulated Terminal Loading Sequence Screen */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-zinc-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                  <span>SYNCHRONIZING SECURE MESSAGING WIRE SHARDS...</span>
                </div>
                <p className="text-zinc-600">
                  [OK] Opened non-blocking ingestion socket pipeline.
                </p>
                <p className="text-zinc-600">
                  [OK] Validated administrative access clearance keys.
                </p>
                <p className="text-zinc-600">
                  [WAIT] Buffering structural contact transcript rows from
                  relational matrix tables...
                </p>
              </div>

              {/* Bottom Loading Core Section */}
              <div className="flex items-center gap-2 border-t border-zinc-900 pt-4 text-zinc-400 font-semibold uppercase tracking-wider text-[10px]">
                <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                <span>
                  Mounting Split-Pane Core Console Layout Workspace...
                </span>
              </div>
            </div>
          }
        >
          <div className="bg-transparent">
            {/* INJECTING YOUR DYNAMIC CONTACT MESSAGES MANAGER SPLIT-DECK ENGINE COMPONENT */}
            <ContactMessagesManager />
          </div>
        </Suspense>
      </div>
    </div>
  );
}
