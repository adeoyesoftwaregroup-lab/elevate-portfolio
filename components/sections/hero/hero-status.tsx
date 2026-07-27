"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, MapPin, Radio } from "lucide-react";

export function HeroStatus() {
  const [latency, setLatency] = useState("24ms");

  // Simulate subtle environment ping updates to create an authentic live-dashboard feel
  useEffect(() => {
    const interval = setInterval(() => {
      const randomPing = Math.floor(Math.random() * (32 - 18 + 1)) + 18;
      setLatency(`${randomPing}ms`);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex flex-wrap items-center gap-y-3 gap-x-6 rounded-2xl border border-neutral-800/80 bg-[#07070a]/60 px-4 py-3 text-xs backdrop-blur-md shadow-[0_12px_30px_rgba(0,0,0,0.5)] subpixel-antialiased text-neutral-300">
      {/* Segment 1: Live Deployment / Activity Node */}
      <div className="flex items-center gap-2.5">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-40" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 leading-none">
            System Engine
          </span>
          <span className="font-semibold text-neutral-200 mt-1 flex items-center gap-1">
            Active{" "}
            <Activity className="w-3 h-3 text-emerald-500 stroke-[2.5]" />
          </span>
        </div>
      </div>

      {/* Structural Divider Track Line */}
      <span className="hidden sm:inline h-6 w-px bg-neutral-800" />

      {/* Segment 2: Geographic Anchor Bounds */}
      <div className="flex items-center gap-2.5">
        <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 leading-none">
            Location Base
          </span>
          <span className="font-medium text-neutral-300 mt-1">
            Johannesburg, SA
          </span>
        </div>
      </div>

      {/* Structural Divider Track Line */}
      <span className="hidden sm:inline h-6 w-px bg-neutral-800" />

      {/* Segment 3: Continuous Latency Ping Pipeline */}
      <div className="flex items-center gap-2.5">
        <Radio className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 leading-none">
            Network Latency
          </span>
          <motion.span
            key={latency}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            className="font-mono text-neutral-400 mt-1 text-[11px]"
          >
            {latency}
          </motion.span>
        </div>
      </div>
    </div>
  );
}
