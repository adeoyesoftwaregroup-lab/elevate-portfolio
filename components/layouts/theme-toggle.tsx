"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-full border border-border/10 bg-background/20" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border/20 bg-background/30 text-muted-foreground outline-none transition-colors hover:bg-neutral-500/10 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 pointer-events-auto"
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 22,
            mass: 0.8,
          }}
          className="flex items-center justify-center"
        >
          {isDark ? (
            <Moon className="h-[18px] w-[18px] stroke-[1.5]" />
          ) : (
            <Sun className="h-[18px] w-[18px] stroke-[1.5]" />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Subtle UI Glare Effect (Enterprise Polish) */}
      <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/0 via-white/[0.03] to-white/[0.08] opacity-0 transition-opacity hover:opacity-100 pointer-events-none" />
    </button>
  );
}
