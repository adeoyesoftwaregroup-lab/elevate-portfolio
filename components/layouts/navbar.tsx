"use client";

import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useVelocity,
  LayoutGroup,
} from "framer-motion";
import { Container } from "../common/container";
import { DesktopNav } from "./desktop-nav";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { ResumeButton } from "./resume-button";
import { ThemeToggle } from "./theme-toggle";
import { AccessButton } from "./access-button";

export function Navbar() {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const currentVelocity = scrollVelocity.get();
    const previous = lastScrollY.current;
    const diff = latest - previous;

    // Determine compact vs fluid docking boundaries based on scroll threshold depth
    if (latest > 30 && !scrolled) setScrolled(true);
    if (latest <= 30 && scrolled) setScrolled(false);

    // High-Velocity Threshold Guarding to prevent micro-scroll flicker
    if (Math.abs(currentVelocity) > 200) {
      if (diff > 0 && latest > 120) {
        setHidden(true); // Scrolling down fast -> Hide
      } else if (diff < 0) {
        setHidden(false); // Scrolling up fast -> Show
      }
    } else if (latest <= 50) {
      setHidden(false); // Force visible at top of page
    }

    lastScrollY.current = latest;
  });

  return (
    <LayoutGroup id="enterprise-navbar-system">
      <AnimatePresence mode="wait">
        <motion.header
          variants={{
            visible: { y: 0, opacity: 1 },
            hidden: { y: -80, opacity: 0 },
          }}
          animate={hidden ? "hidden" : "visible"}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 top-0 z-50 flex w-full justify-center pt-4 pointer-events-none select-none"
        >
          <Container className="w-full flex justify-center pointer-events-auto">
            <motion.div
              layout="position"
              id="navbar-dock"
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 28,
                mass: 0.8,
              }}
              style={{ willChange: "transform, max-width" }}
              className={`
                relative flex h-12 items-center justify-between rounded-full
                backdrop-blur-xl transition-all duration-500 ease-out subpixel-antialiased
                
                /* 
                  SMOKED OBSIDIAN TINT SCHEME:
                  Explicitly maps dark charcoal layers with tight micro-borders to keep link 
                  text text sharp against white background star field particles.
                */
                bg-neutral-950/40 border border-neutral-800/80 text-white
                
                ${
                  scrolled
                    ? "w-[640px] px-4 shadow-[0_24px_50px_rgba(0,0,0,0.7)] border-neutral-700/50 bg-neutral-950/60"
                    : "w-full px-6 shadow-sm border-neutral-800/40"
                }
              `}
            >
              {/* Context Layer: Inner Hardware Acceleration Layer */}
              <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

              {/* Left Segment: Brand Identity */}
              <motion.div
                layout="position"
                className="flex items-center shrink-0"
                whileTap={{ scale: 0.97 }}
              >
                <Logo />
              </motion.div>

              {/* Middle Segment: Links */}
              <div className="flex items-center justify-center flex-1 mx-2">
                <DesktopNav />
              </div>

              {/* Right Segment: System Controls */}
              <motion.div
                layout="position"
                className="flex items-center gap-1.5 shrink-0"
              >
                <ThemeToggle />

                <div className="hidden sm:block">
                  <ResumeButton />
                </div>

                <div className="hidden sm:block">
                  <AccessButton />
                </div>

                <MobileNav />
              </motion.div>
            </motion.div>
          </Container>
        </motion.header>
      </AnimatePresence>
    </LayoutGroup>
  );
}
