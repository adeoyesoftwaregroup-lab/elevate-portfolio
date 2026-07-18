"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export function Logo() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href="/"
      className="flex items-center gap-3 outline-none group select-none pointer-events-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Kinetic Geometric Mark Container */}
      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-950 dark:bg-neutral-50 overflow-hidden shadow-md">
        {/* Abstract Inner Structural Shapes */}
        <motion.div
          animate={{
            rotate: isHovered ? 45 : 0,
            scale: isHovered ? 0.9 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative flex h-5 w-5 items-center justify-center"
        >
          {/* Top Left Triangle Block */}
          <motion.span
            animate={{ x: isHovered ? -1 : 0, y: isHovered ? -1 : 0 }}
            className="absolute top-0 left-0 w-2 h-2 rounded-[2px] bg-neutral-50 dark:bg-neutral-950"
          />
          {/* Center Cross bar */}
          <motion.span
            animate={{ scaleX: isHovered ? 1.2 : 1 }}
            className="w-4 h-1 rounded-full bg-neutral-50 dark:bg-neutral-950"
          />
          {/* Bottom Right Dot Block */}
          <motion.span
            animate={{ x: isHovered ? 1 : 0, y: isHovered ? 1 : 0 }}
            className="absolute bottom-0 right-0 w-2 h-2 rounded-[2px] bg-neutral-50 dark:bg-neutral-950"
          />
        </motion.div>

        {/* High-End Peripheral Shimmer Track Overlay */}
        <span className="absolute inset-0 rounded-xl border border-white/10 dark:border-black/5 pointer-events-none" />
      </div>

      {/* Typography Block */}
      <div className="flex flex-col justify-center leading-none">
        <h3 className="text-sm font-bold tracking-tight text-foreground subpixel-antialiased flex items-center gap-1">
          Elevate
          <motion.span
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 2 : -2 }}
            transition={{ duration: 0.2 }}
            className="text-primary text-[10px]"
          >
            //
          </motion.span>
        </h3>
        <p className="text-[10px] font-medium tracking-wide text-muted-foreground mt-0.5 uppercase">
          Yusuf Adeoye
        </p>
      </div>
    </Link>
  );
}
