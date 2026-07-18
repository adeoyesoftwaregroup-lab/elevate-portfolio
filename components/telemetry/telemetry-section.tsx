"use client";

import React from "react";
import { Container } from "../common/container";
import { MetricCell } from "./metric-cell";
import { ContributionMap } from "./contribution-map";
import { BarChart3 } from "lucide-react";

export function TelemetrySection() {
  return (
    <section
      id="telemetry"
      className="relative w-full py-28 bg-[#020202] overflow-hidden select-none"
    >
      <Container className="relative z-10 w-full space-y-12">
        {/* Core Layout Typography Header Section */}
        <div className="flex flex-col space-y-2 text-left">
          <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400 flex items-center gap-1.5">
            <BarChart3 className="w-3.5 h-3.5" /> Core System Telemetry
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Performance Vectors & Metrics.
          </h2>
        </div>

        {/* Master Asymmetric Layout Grid Node Splitting */}
        <div className="grid grid-cols-12 gap-5 w-full items-start">
          {/* Left Grid: Atomic Performance Cells */}
          <div className="col-span-12 lg:col-span-7 grid grid-cols-12 gap-4 w-full">
            <MetricCell
              title="Pipeline Throughput"
              value="14.2M/s"
              subtext="Aggregated ledger database query transactions optimized via custom internal mapping structures."
              badge="v2.4 stable"
              badgeColor="text-emerald-400 bg-emerald-500/5 border-emerald-500/10"
            />
            <MetricCell
              title="Render Frame Rates"
              value="120 FPS"
              subtext="Fluid canvas interface navigation paths updating seamlessly using hardware acceleration models."
              badge="Optimized"
              badgeColor="text-indigo-400 bg-indigo-500/5 border-indigo-500/10"
            />
          </div>

          {/* Right Grid: Continuous Activity Heat Matrix Block */}
          <div className="col-span-12 lg:col-span-5 w-full">
            <ContributionMap />
          </div>
        </div>
      </Container>
    </section>
  );
}
