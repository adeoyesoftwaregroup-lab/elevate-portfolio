"use client";

import React from "react";
import { motion } from "framer-motion";

interface CellProps {
  title: string;
  value: string;
  subtext: string;
  badge: string;
  badgeColor: string;
}

export function MetricCell({
  title,
  value,
  subtext,
  badge,
  badgeColor,
}: CellProps) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="relative col-span-12 sm:col-span-6 lg:col-span-4 flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral-900 bg-[#07070a]/40 p-5 backdrop-blur-md shadow-lg group select-none"
    >
      <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neutral-800/30 to-transparent" />

      {/* Card Metadata Top Segment Row */}
      <div className="flex items-center justify-between w-full font-mono">
        <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500">
          {title}
        </span>
        <span
          className={`text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wide ${badgeColor}`}
        >
          {badge}
        </span>
      </div>

      {/* Operational Yield Value Panel */}
      <div className="mt-8 space-y-1">
        <h3 className="text-2xl font-black text-white tracking-tight subpixel-antialiased">
          {value}
        </h3>
        <p className="text-[11px] font-medium text-neutral-400 leading-normal line-clamp-2">
          {subtext}
        </p>
      </div>
    </motion.div>
  );
}
