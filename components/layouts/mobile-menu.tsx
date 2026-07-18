"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { X } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { navigation } from "@/data/navigation";

interface MenuProps {
  onClose: () => void;
}

const menuVariants: Variants = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 350,
      damping: 32,
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const linkVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 260, damping: 22 },
  },
  exit: { opacity: 0, x: 20 },
};

const NAV_LINKS = [
  { name: "Projects", href: "/projects" },
  { name: "Experience", href: "/experience" },
  { name: "SKills", href: "/skills" },
  { name: "Contact", href: "/contact" },
  { name: "About", href: "/about" },
];

export function MobileMenu({ onClose }: MenuProps) {
  return (
    <motion.div
      variants={menuVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-[100] h-screen w-screen flex flex-col justify-between bg-neutral-950/95 p-6 backdrop-blur-2xl pointer-events-auto select-none sm:p-12"
    >
      {/* Specular premium edge ray accent line overlay */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neutral-800/40 to-transparent" />

      {/* Terminal Close Button Header Row */}
      <div className="flex items-center justify-end w-full">
        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors cursor-pointer"
          aria-label="Close mobile interface navigation"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Primary Links Center Panel Row Column */}
      <nav className="flex flex-col space-y-6 text-left font-mono my-auto">
        {navigation.map((link) => (
          <motion.div key={link.href} variants={linkVariants}>
            <a
              href={link.href}
              onClick={onClose}
              className="text-3xl font-black text-neutral-400 hover:text-white tracking-tight transition-colors flex items-center gap-2 group"
            >
              <span className="text-indigo-500 font-bold text-lg opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200">
                //
              </span>
              {link.title}
            </a>
          </motion.div>
        ))}
      </nav>

      {/* Footer Branding Social Matrix row */}
      <motion.div
        variants={linkVariants}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-neutral-900 w-full font-mono text-[10px] text-neutral-500 font-bold uppercase tracking-wider"
      >
        <span>Elevate // Yusuf Adeoye</span>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-neutral-400 hover:text-white transition-colors"
          >
            <FaGithub className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="text-neutral-400 hover:text-white transition-colors"
          >
            <FaLinkedinIn className="w-4 h-4" />
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noreferrer"
            className="text-neutral-400 hover:text-white transition-colors"
          >
            <FaXTwitter className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
