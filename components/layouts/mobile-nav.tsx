"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import { MobileMenu } from "./mobile-menu";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="block md:hidden">
      {/* Trigger Button Toggle */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/30 text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors pointer-events-auto cursor-pointer"
        aria-label="Open mobile layout navigation panel"
      >
        <Menu className="w-[18px] h-[18px] stroke-[1.5]" />
      </button>

      {/* Manage mounting states sequentially via AnimatePresence */}
      <AnimatePresence>
        {isOpen && <MobileMenu onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
