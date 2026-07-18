"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Terminal } from "lucide-react";

// Use react-icons for brand assets to replace the missing Lucide ones
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6"; // Updated to modern 'X' branding

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Africa/Lagos",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTime(new Date().toLocaleTimeString("en-US", options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative w-full border-t border-border/30 bg-background pt-24 pb-12 overflow-hidden subpixel-antialiased">
      <div className="absolute bottom-0 left-1/2 -z-10 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 pb-16 border-b border-border/20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5" /> Have an idea?
            </p>
            <Link
              href="mailto:your.email@example.com"
              className="group relative inline-flex items-end gap-2 text-4xl md:text-6xl font-black tracking-tight text-foreground transition-colors hover:text-primary"
            >
              Let's Build Together
              <motion.span
                className="inline-block text-primary mb-1 md:mb-2"
                whileHover={{ x: 5, y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <ArrowUpRight className="w-8 h-8 md:w-12 md:h-12 stroke-[2.5]" />
              </motion.span>
            </Link>
          </div>

          {/* Social Matrix Grid - Now using Fa6 React Icons */}
          <div className="flex gap-2">
            {[
              {
                icon: <FaGithub className="w-4 h-4" />,
                href: "https://github.com",
              },
              {
                icon: <FaLinkedinIn className="w-4 h-4" />,
                href: "https://linkedin.com",
              },
              {
                icon: <FaXTwitter className="w-4 h-4" />,
                href: "https://x.com",
              },
            ].map((social, idx) => (
              <Link
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/40 bg-secondary/20 text-muted-foreground hover:text-foreground hover:bg-secondary/50 hover:border-border transition-all duration-300"
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-12 text-xs text-muted-foreground font-medium">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-center md:text-left">
            <span>
              © {currentYear} Elevate. Engineering premium experiences.
            </span>
            <span className="hidden md:inline text-border">|</span>
            <div className="flex items-center gap-1.5 bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full text-emerald-600 dark:text-emerald-400 font-semibold tracking-wide text-[10px] uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              API Available: {time || "00:00:00"}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="#projects"
              className="hover:text-foreground transition-colors"
            >
              Projects
            </Link>
            <Link
              href="#experience"
              className="hover:text-foreground transition-colors"
            >
              Experience
            </Link>
            <Link
              href="#stack"
              className="hover:text-foreground transition-colors"
            >
              Stack
            </Link>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:text-foreground transition-colors cursor-pointer"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
