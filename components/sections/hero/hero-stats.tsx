"use client";

import React, { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
} from "framer-motion";

const stats = [
  { value: 8, suffix: "+", label: "Years Experience" },
  { value: 50, suffix: "+", label: "Global Projects" },
  { value: 20, suffix: "+", label: "Core Technologies" },
];

// Custom component to handle high-performance counter numbers cleanly
function Counter({ targetValue }: { targetValue: number }) {
  const count = useMotionValue(0);
  const springCount = useSpring(count, { stiffness: 45, damping: 15, mass: 1 });
  const displayCount = useTransform(springCount, (latest) =>
    Math.floor(latest),
  );
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Controls numerical count sequence dynamically on component mount
    const controls = animate(count, targetValue, {
      duration: 2,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [count, targetValue]);

  useEffect(() => {
    return displayCount.on("change", (latest) => {
      if (ref.current) ref.current.textContent = String(latest);
    });
  }, [displayCount]);

  return <span ref={ref}>0</span>;
}

export function HeroStats() {
  return (
    <div className="grid grid-cols-3 gap-x-4 sm:gap-x-6 w-full pt-2">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="relative flex flex-col p-3 rounded-xl border border-neutral-800/40 bg-neutral-950/20 backdrop-blur-sm transition-all duration-300 hover:border-neutral-700/60 hover:bg-neutral-900/30 group"
        >
          {/* Subtle component inner glare track line overlay */}
          <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Quantitative Matrix Counter Group */}
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-baseline">
            <Counter targetValue={stat.value} />
            <span className="text-indigo-400 font-bold ml-0.5 text-lg select-none">
              {stat.suffix}
            </span>
          </h3>

          {/* Descriptive Telemetry Label */}
          <p className="text-[10px] sm:text-xs font-medium tracking-wide text-neutral-400 mt-1 select-none line-clamp-1 group-hover:text-neutral-300 transition-colors duration-200">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
