"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ContributionMap() {
  const [activityGrid, setActivityGrid] = useState<number[]>([]);

  useEffect(() => {
    // Generate an absolute matrix block array array matching standard contribution maps
    const blocks = Array.from({ length: 64 }, () =>
      Math.floor(Math.random() * 4),
    );
    setActivityGrid(blocks);

    // Keep the system looking alive by randomly flickering activity cells over time
    const interval = setInterval(() => {
      setActivityGrid((prev) =>
        prev.map((val) =>
          Math.random() > 0.85 ? Math.floor(Math.random() * 4) : val,
        ),
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Map intensity indexes to matching non-vibrating, high-contrast dark tones
  const cellColors = [
    "bg-neutral-900 border-neutral-950", // Zero deployment metrics
    "bg-indigo-950/40 border-indigo-900/30", // Low frequency execution
    "bg-indigo-800/50 border-indigo-700/40", // Medium tracking stream
    "bg-indigo-500 border-indigo-400/50", // Peak system load velocity
  ];

  return (
    <div className="w-full flex flex-col space-y-2.5 font-mono text-xs select-none">
      <div className="flex justify-between items-center px-1">
        <span className="text-neutral-500 font-bold uppercase tracking-wider text-[10px]">
          Code Velocity Matrix Track
        </span>
        <span className="text-[9px] text-neutral-400 font-semibold tracking-normal flex items-center gap-1">
          Less{" "}
          <span className="w-2 h-2 rounded bg-neutral-900 border border-neutral-800" />
          <span className="w-2 h-2 rounded bg-indigo-500" /> More
        </span>
      </div>

      <div className="w-full p-4 rounded-2xl border border-neutral-900 bg-neutral-950/40 backdrop-blur-md flex flex-wrap gap-1.5 justify-center items-center">
        {activityGrid.map((intensity, idx) => (
          <motion.div
            key={idx}
            layout
            className={`w-[11px] h-[11px] sm:w-[13px] sm:h-[13px] rounded-[3px] border transition-colors duration-500 shrink-0 ${cellColors[intensity]}`}
            whileHover={{ scale: 1.25, zIndex: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          />
        ))}
      </div>
    </div>
  );
}
