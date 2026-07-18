"use client";

import React from "react";

export function HeroHeading() {
  return (
    <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-white md:text-6xl xl:text-7xl leading-[1.05] md:leading-[1.02] subpixel-antialiased drop-shadow-[0_2px_16px_rgba(0,0,0,0.6)]">
      Engineering{" "}
      <span className="block bg-gradient-to-br from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent py-1">
        Software That Moves
      </span>
      Businesses Forward.
    </h1>
  );
}
