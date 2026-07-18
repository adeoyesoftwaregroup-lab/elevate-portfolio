"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

interface ScrollLineProps {
  scrollYProgress: MotionValue<number>;
}

export function ScrollProgressLine({ scrollYProgress }: ScrollLineProps) {
  // Map raw scroll tracking values cleanly to percentage heights
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="absolute left-[17px] md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-neutral-900 pointer-events-none select-none">
      {/* 
        THE HIGH-CONTRAST LASER TRACK:
        Flashes bright silver down the dark axis line without illuminating background rows.
      */}
      <motion.div
        style={{ height }}
        className="absolute top-0 left-0 w-full bg-gradient-to-b from-indigo-500 via-neutral-100 to-neutral-400 origin-top shadow-[0_0_12px_rgba(99,102,241,0.5)]"
      />
    </div>
  );
}
