"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Copy, Check, FileCode, Cpu } from "lucide-react";

export function HeroCode() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("developer.ts");

  const rawCode = `const engineer = {
  name: 'Yusuf Adeoye',
  role: 'Fullstack Architect',
  stack: ['Next.js 16', 'Prisma', 'Three.js'],
  metrics: { cleanCode: true, performance: 100 }
};`;

  const codeLines = [
    { text: "const", type: "keyword" },
    { text: " engineer ", type: "variable" },
    { text: "=", type: "operator" },
    { text: " {", type: "punctuation" },
    { text: "\n  name:", type: "property" },
    { text: " 'Yusuf Adeoye'", type: "string" },
    { text: ",", type: "punctuation" },
    { text: "\n  role:", type: "property" },
    { text: " 'Fullstack Architect'", type: "string" },
    { text: ",", type: "punctuation" },
    { text: "\n  stack:", type: "property" },
    { text: " [", type: "punctuation" },
    { text: "'Next.js 16'", type: "string" },
    { text: ", ", type: "punctuation" },
    { text: "'Prisma'", type: "string" },
    { text: ", ", type: "punctuation" },
    { text: "'Three.js'", type: "string" },
    { text: "],", type: "punctuation" },
    { text: "\n  metrics:", type: "property" },
    { text: " { ", type: "punctuation" },
    { text: "cleanCode:", type: "property" },
    { text: " true", type: "boolean" },
    { text: ", ", type: "punctuation" },
    { text: "performance:", type: "property" },
    { text: " 100", type: "number" },
    { text: " }", type: "punctuation" },
    { text: "\n};", type: "punctuation" },
  ];

  // Map architectural tokens to high-contrast, non-vibrating modern colors
  const tokenColors: Record<string, string> = {
    keyword: "text-pink-400 font-semibold",
    variable: "text-sky-300",
    operator: "text-teal-400",
    punctuation: "text-neutral-400",
    property: "text-indigo-300",
    string: "text-amber-200/90",
    boolean: "text-orange-400 font-medium",
    number: "text-emerald-400",
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // Restructured multi-line data array to maintain correct code editor lines
  const organizedLines = rawCode.split("\n");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 26, delay: 0.3 }}
      className="relative w-full rounded-2xl border border-neutral-800 bg-[#0a0a0c]/90 p-5 font-mono text-[11px] sm:text-xs shadow-[0_30px_70px_rgba(0,0,0,0.8)] backdrop-blur-xl subpixel-antialiased select-none pointer-events-auto"
    >
      {/* Upper Specular Reflection Glare Accent Track Line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neutral-700/40 to-transparent" />

      {/* Terminal Title Bar Window Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-800/60">
        <div className="flex items-center gap-6">
          {/* OS Window Control Bulbs */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="h-3 w-3 rounded-full bg-red-500/40 border border-red-500/20" />
            <span className="h-3 w-3 rounded-full bg-amber-500/40 border border-amber-500/20" />
            <span className="h-3 w-3 rounded-full bg-green-500/40 border border-green-500/20" />
          </div>

          {/* Interactive Workspace IDE Tabs */}
          <div className="hidden sm:flex items-center gap-1.5 text-[11px]">
            {["developer.ts", "schema.prisma"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  activeTab === tab
                    ? "bg-neutral-900 border border-neutral-800 text-neutral-200 font-semibold shadow-sm"
                    : "text-neutral-500 hover:text-neutral-400"
                }`}
              >
                <FileCode
                  className={`w-3 h-3 ${activeTab === tab ? "text-indigo-400" : "text-neutral-600"}`}
                />
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Action Panel Group: Copy Button and Module Tags */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold tracking-wide uppercase bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10 animate-pulse">
            <Cpu className="w-2.5 h-2.5" /> Compiling
          </div>

          <button
            onClick={handleCopy}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-neutral-800 bg-neutral-900/60 text-neutral-400 transition-colors hover:text-neutral-200 hover:bg-neutral-800 active:scale-95 cursor-pointer"
            aria-label="Copy code snippets"
          >
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Copy className="h-3.5 w-3.5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Code Text Engine Display Block */}
      <div className="relative overflow-x-auto rounded-lg bg-neutral-950/40 p-4 border border-neutral-900/60 leading-relaxed font-normal tracking-wide">
        <AnimatePresence mode="wait">
          {activeTab === "developer.ts" ? (
            <motion.div
              key="ts-code"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="space-y-1.5"
            >
              {organizedLines.map((lineText, lineIdx) => (
                <div key={lineIdx} className="flex items-start gap-4">
                  {/* Absolute Editor Line Number Gutter Grid */}
                  <span className="w-5 shrink-0 text-right select-none text-neutral-600 font-semibold pr-1">
                    {lineIdx + 1}
                  </span>

                  {/* Inline Token Engine Parsing Layout */}
                  <div className="flex flex-wrap whitespace-pre">
                    {lineIdx === 0 && (
                      <>
                        <span className={tokenColors.keyword}>const</span>
                        <span className={tokenColors.variable}> engineer </span>
                        <span className={tokenColors.operator}>=</span>
                        <span className={tokenColors.punctuation}> {"{"}</span>
                      </>
                    )}
                    {lineIdx === 1 && (
                      <>
                        <span className={tokenColors.property}> name</span>
                        <span className={tokenColors.punctuation}>:</span>
                        <span className={tokenColors.string}>
                          {" "}
                          'Yusuf Adeoye'
                        </span>
                        <span className={tokenColors.punctuation}>,</span>
                      </>
                    )}
                    {lineIdx === 2 && (
                      <>
                        <span className={tokenColors.property}> role</span>
                        <span className={tokenColors.punctuation}>:</span>
                        <span className={tokenColors.string}>
                          {" "}
                          'Fullstack Architect'
                        </span>
                        <span className={tokenColors.punctuation}>,</span>
                      </>
                    )}
                    {lineIdx === 3 && (
                      <>
                        <span className={tokenColors.property}> stack</span>
                        <span className={tokenColors.punctuation}>:</span>
                        <span className={tokenColors.punctuation}> [</span>
                        <span className={tokenColors.string}>'Next.js 16'</span>
                        <span className={tokenColors.punctuation}>, </span>
                        <span className={tokenColors.string}>'Prisma'</span>
                        <span className={tokenColors.punctuation}>, </span>
                        <span className={tokenColors.string}>'Three.js'</span>
                        <span className={tokenColors.punctuation}>],</span>
                      </>
                    )}
                    {lineIdx === 4 && (
                      <>
                        <span className={tokenColors.property}> metrics</span>
                        <span className={tokenColors.punctuation}>:</span>
                        <span className={tokenColors.punctuation}> {"{ "}</span>
                        <span className={tokenColors.property}>cleanCode</span>
                        <span className={tokenColors.punctuation}>:</span>
                        <span className={tokenColors.boolean}> true</span>
                        <span className={tokenColors.punctuation}>, </span>
                        <span className={tokenColors.property}>
                          performance
                        </span>
                        <span className={tokenColors.punctuation}>:</span>
                        <span className={tokenColors.number}> 100</span>
                        <span className={tokenColors.punctuation}> {"}"}</span>
                      </>
                    )}
                    {lineIdx === 5 && (
                      <span className={tokenColors.punctuation}>{"};"}</span>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="prisma-code"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="space-y-1.5"
            >
              {[
                "datasource db { provider = 'postgresql' }",
                "model User {",
                "  id        String   @id @default(cuid())",
                "  name      String",
                "  role      String",
                "}",
              ].map((prismaLine, lineIdx) => (
                <div key={lineIdx} className="flex items-start gap-4">
                  <span className="w-5 shrink-0 text-right select-none text-neutral-600 font-semibold pr-1">
                    {lineIdx + 1}
                  </span>
                  <div className="whitespace-pre tracking-wide font-medium">
                    {prismaLine.includes("model") ||
                    prismaLine.includes("datasource") ? (
                      <span className="text-purple-400 font-semibold">
                        {prismaLine}
                      </span>
                    ) : prismaLine.includes("@") ? (
                      <span className="text-teal-400">{prismaLine}</span>
                    ) : (
                      <span className="text-neutral-300">{prismaLine}</span>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hidden Ambient Core Backdrop Glow to catch subtle screen focus points */}
      <div className="absolute -bottom-6 -right-6 -z-10 h-32 w-32 rounded-full bg-indigo-500/5 blur-2xl pointer-events-none" />
    </motion.div>
  );
}
