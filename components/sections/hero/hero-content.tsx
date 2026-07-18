"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  Variants,
} from "framer-motion";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { HeroActions } from "./hero-actions";
import { HeroBadge } from "./hero-badge";
import { HeroDescription } from "./hero-description";
import { HeroHeading } from "./hero-heading";
import { HeroStack } from "./hero-stack";
import { HeroStats } from "./hero-stats";
import { HeroStatus } from "./hero-status";

// High-performance staggering orchestrator variants
const dashboardVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const segmentVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 25 },
  },
};

export function HeroContent() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Initialize mouse mapping matrices for the 3D text tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  // Map mouse coordinate boundaries to subtle 3D structural angles (-8 to 8 degrees)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      variants={dashboardVariants}
      initial="hidden"
      animate="visible"
      className="relative w-full flex flex-col space-y-6 text-left subpixel-antialiased transform-gpu"
    >
      {/* 
        ROW 1: ACCESS SIGNALS 
        Keeps contextual micro-meta items tightly stacked and organized horizontally.
      */}
      <motion.div
        variants={segmentVariants}
        className="flex flex-wrap items-center gap-4"
        style={{ transform: "translateZ(30px)" }}
      >
        <HeroBadge />
        <HeroStatus />
      </motion.div>

      {/* 
        ROW 2: CORE BRAND TYPOGRAPHY
      */}
      <motion.div
        variants={segmentVariants}
        className="space-y-4"
        style={{ transform: "translateZ(45px)" }}
      >
        <HeroHeading />
        <HeroDescription />
      </motion.div>

      {/* 
        ROW 3: PREMIUM CONTROL COCKPIT 
        Integrates core actions alongside your social matrix seamlessly.
      */}
      <motion.div
        variants={segmentVariants}
        className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2 pb-2 border-y border-neutral-800/40"
        style={{ transform: "translateZ(35px)" }}
      >
        <div className="shrink-0">
          <HeroActions />
        </div>

        {/* Unified Premium Brand Social Matrix Row */}
        <div className="flex items-center gap-2 px-1">
          <span className="h-1 w-6 rounded-full bg-neutral-800" />
          {[
            {
              icon: <FaGithub className="w-4 h-4" />,
              href: "https://github.com",
              label: "Github Profile",
            },
            {
              icon: <FaLinkedinIn className="w-4 h-4" />,
              href: "https://linkedin.com",
              label: "Linkedin Profile",
            },
            {
              icon: <FaXTwitter className="w-4 h-4" />,
              href: "https://x.com",
              label: "X Profile",
            },
          ].map((social, idx) => (
            <motion.a
              key={idx}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-800 bg-neutral-950/40 text-neutral-400 hover:text-white hover:bg-neutral-900 hover:border-neutral-700 transition-colors duration-200"
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* 
        ROW 4: SYSTEM CAPABILITIES & METRICS
        Placing technical stacks and metrics side-by-side matches high-end dashboards.
      */}
      <motion.div
        variants={segmentVariants}
        className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start pt-2"
        style={{ transform: "translateZ(25px)" }}
      >
        <div className="md:col-span-7">
          <HeroStack />
        </div>
        <div className="md:col-span-5 border-l border-neutral-800/40 pl-0 md:pl-6">
          <HeroStats />
        </div>
      </motion.div>
    </motion.div>
  );
}
