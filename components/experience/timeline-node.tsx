"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Briefcase, ChevronRight } from "lucide-react";

interface NodeProps {
  role: string;
  company: string;
  duration: string;
  points: string[];
  index: number;
}

export function TimelineNode({
  role,
  company,
  duration,
  points,
  index,
}: NodeProps) {
  const isEven = index % 2 === 0;

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-12 w-full items-start gap-8 md:gap-0 pb-16">
      {/* Content Block (Alternates sides on desktop) */}
      <div
        className={`col-span-11 md:col-span-5 flex flex-col pl-10 md:pl-0 ${isEven ? "md:text-right md:items-end order-2 md:order-1" : "order-2 md:order-3 md:col-start-8"}`}
      >
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 24,
            delay: 0.1,
          }}
          className="relative w-full rounded-2xl border border-neutral-900 bg-[#07070a]/40 p-5 backdrop-blur-md shadow-lg group hover:border-neutral-800 transition-colors"
        >
          {/* Subtle micro reflection line */}
          <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

          <div
            className={`flex flex-col ${isEven ? "md:items-end" : "md:items-start"}`}
          >
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/5 px-2 py-0.5 rounded border border-indigo-500/10 mb-2">
              <Calendar className="w-3 h-3" /> {duration}
            </span>
            <h3 className="text-base font-black text-white tracking-tight">
              {role}
            </h3>
            <h4 className="text-xs font-semibold text-neutral-400 mt-0.5">
              {company}
            </h4>
          </div>

          {/* Bullet points array */}
          <ul
            className={`mt-4 space-y-2 text-xs font-medium text-neutral-500 text-left flex flex-col`}
          >
            {points.map((point, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 group-hover:text-neutral-400 transition-colors duration-200"
              >
                <ChevronRight className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Axis Marker Circle (Locked perfectly onto the scroll track line) */}
      <div className="absolute left-[17px] md:left-1/2 top-1.5 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full border border-neutral-700 bg-neutral-950 flex items-center justify-center col-span-1 md:col-span-2 order-1 md:order-2">
        <motion.span
          initial={{ scale: 0.5 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className="h-1.5 w-1.5 rounded-full bg-indigo-500"
        />
      </div>
    </div>
  );
}
