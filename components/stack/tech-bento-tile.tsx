"use client";

import React from "react";
import { motion } from "framer-motion";
import { Canvas3DNode } from "./canvas-3d-node";
import { Cpu } from "lucide-react";

interface TileProps {
  title: string;
  category: string;
  items: string[];
  icon: React.ReactNode;
  show3D?: boolean;
}

export function TechBentoTile({
  title,
  category,
  items,
  icon,
  show3D = false,
}: TileProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="relative col-span-12 md:col-span-6 lg:col-span-4 flex flex-col justify-between overflow-hidden rounded-3xl border border-neutral-800/60 bg-[#07070a]/40 p-6 backdrop-blur-md shadow-xl group select-none"
    >
      {/* Specular premium layout track reflection line overlay */}
      <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neutral-700/20 to-transparent" />

      {/* Conditionally deploy the low-impact WebGL element block inside specified bento zones */}
      {show3D && <Canvas3DNode />}

      {/* Core Meta Card Header */}
      <div className="relative z-10 flex items-center justify-between w-full">
        <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500 bg-neutral-900/50 px-2 py-0.5 rounded border border-neutral-800/40 flex items-center gap-1.5">
          <Cpu className="w-2.5 h-2.5 text-indigo-400" /> {category}
        </span>
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-800 bg-neutral-950 text-neutral-400 group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
      </div>

      {/* Typography Description Panel */}
      <div className="relative z-10 mt-14 space-y-3">
        <h3 className="text-base font-black text-white tracking-tight">
          {title}
        </h3>

        {/* Metric Capabilities Node List */}
        <div className="flex flex-wrap gap-1.5">
          {items.map((tech) => (
            <span
              key={tech}
              className="rounded-lg border border-neutral-800/80 bg-neutral-900/20 px-2 py-1 text-[11px] font-semibold text-neutral-400 group-hover:border-neutral-700/60 group-hover:text-neutral-300 transition-colors duration-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
