"use client";

export function HeroBadge() {
  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-neutral-800 bg-neutral-900/40 px-3.5 py-1.5 text-xs font-medium tracking-wide text-neutral-300 subpixel-antialiased backdrop-blur-md transition-colors duration-300 hover:border-neutral-700 hover:text-white">
      {/* 
        PREMIUM OPERATIONAL METRIC INDICATOR:
        Replaces the loud icon with a precise, pulsing green status system node.
      */}
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
      </span>

      <span>Available for Opportunities</span>

      <span className="text-neutral-600 font-normal">|</span>

      {/* Secondary metadata group */}
      <span className="flex items-center gap-1 text-[11px] font-semibold text-neutral-400 tracking-normal uppercase bg-neutral-800/40 px-1.5 py-0.5 rounded-md">
        Remote
      </span>
    </div>
  );
}
