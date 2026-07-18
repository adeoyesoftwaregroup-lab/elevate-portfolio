"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/common/container";
import { HeroBackground } from "./hero-background";
import { HeroCode } from "./hero-code";
import { HeroContent } from "./hero-content";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const codeY = useTransform(scrollYProgress, [0, 1], ["0%", "-3%"]);
  const codeRotate = useTransform(scrollYProgress, [0, 1], [-4, -8]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-[100vh] w-full flex flex-col justify-center items-center overflow-hidden pt-24 pb-16 lg:pb-0 select-none subpixel-antialiased bg-[#020202]"
    >
      {/* 
        LAYER 1: PIANO BLACK ENAMEL CANVAS BASE
        Establishes a solid, high-contrast, pure-dark base layer.
      */}
      <div className="absolute inset-0 bg-[#020202] z-0" />

      {/* 
        LAYER 2: GLOSSY SPECULAR SHINE ENGINE
        Uses focused, high-contrast radial beams to mimic sharp light reflections on polished glass.
      */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {/* Top-centered crystalline glossy flare reflection */}
        <div className="absolute top-[-25%] left-1/2 -translate-x-1/2 h-[650px] w-[1200px] rounded-full bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08)_0%,rgba(99,102,241,0.05)_40%,rgba(168,85,247,0.01)_70%,transparent_100%)] blur-[40px]" />

        {/* Crisp lower-left neon mirror highlight */}
        <div className="absolute bottom-[-5%] left-[-5%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.05)_0%,transparent_75%)] blur-[70px] mix-blend-screen" />
      </div>

      {/* LAYER 3: Micro-Grain Satin Texturing */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.02] pointer-events-none bg-repeat mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://w3.org id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* LAYER 4: 3D Constellation Spark Field */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 z-[3] w-full h-full opacity-[0.25] mix-blend-screen"
      >
        <HeroBackground />
      </motion.div>

      {/* LAYER 5: Heavy Specular Dark Edge Vignette Mask */}
      <div className="absolute inset-0 z-[4] pointer-events-none bg-[radial-gradient(circle_at_center,transparent_45%,#020202_98%)]" />

      {/* 
        LAYER 6: CORE COMPONENT MATRIX
      */}
      <Container className="relative z-10 w-full">
        <div className="relative w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0">
          {/* Main Focus: Dashboard Typography Panel */}
          <motion.div
            style={{ y: textY }}
            className="w-full lg:w-[56%] shrink-0 z-20"
          >
            <HeroContent />
          </motion.div>

          {/* Interactive 3D IDE Code Terminal Viewport */}
          <motion.div
            style={{
              y: codeY,
              rotateX: 11,
              rotateY: -22,
              rotateZ: codeRotate,
              perspective: 1600,
            }}
            className="w-full max-w-lg lg:max-w-none lg:w-[46%] lg:-ml-8 xl:-ml-12 transform-gpu z-10"
            whileHover={{
              rotateX: 3,
              rotateY: -10,
              rotateZ: -1,
              scale: 1.015,
              transition: { type: "spring", stiffness: 260, damping: 32 },
            }}
          >
            {/* Glossy Edge Glow Backplate Shadow Overlay */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-indigo-500/15 via-white/5 to-transparent blur-xl opacity-50" />

            {/* Solid CAD obsidian block casing forces clear foreground text readability */}
            <div className="relative rounded-2xl bg-[#08080c] border border-neutral-800/70 shadow-[0_24px_70px_rgba(0,0,0,0.95)]">
              <HeroCode />
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Premium Studio Base Border Trim */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-900/60 to-transparent z-10" />
    </section>
  );
}
