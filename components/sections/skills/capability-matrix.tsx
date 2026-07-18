"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Cpu,
  Server,
  Layers,
  Bot,
  Terminal,
  Sliders,
  CheckCircle2,
  Activity,
  Shield,
  Code2,
  Globe,
  Zap,
  Database,
} from "lucide-react";
import { Container } from "@/components/common/container";

// Strict structural interface definitions matching your relational Prisma database models
interface SkillData {
  id: string;
  name: string;
  metric: string;
  desc: string;
  year: number | null;
}

interface SkillCategoryData {
  id: string;
  slug: string;
  title: string;
  iconName: string;
  colorClass: string;
  bgGlow: string;
  orderIndex: number;
  skills?: SkillData[];
}

interface CapabilityMatrixProps {
  initialCategories: SkillCategoryData[];
}

// High-Performance Primitive Icon Translation Engine Map
function getCategoryIcon(
  iconName: string,
  colorClass: string,
): React.ReactNode {
  const name = iconName.toLowerCase().trim();
  const baseClasses = `w-4 h-4 shrink-0 transition-colors ${colorClass}`;

  if (name === "server") return <Server className={baseClasses} />;
  if (name === "database") return <Database className={baseClasses} />;
  if (name === "cpu") return <Cpu className={baseClasses} />;
  if (name === "layers") return <Layers className={baseClasses} />;
  if (name === "code2") return <Code2 className={baseClasses} />;
  if (name === "globe") return <Globe className={baseClasses} />;
  if (name === "shield") return <Shield className={baseClasses} />;
  if (name === "bot") return <Bot className={baseClasses} />;
  if (name === "terminal") return <Terminal className={baseClasses} />;

  return <Cpu className={baseClasses} />;
}

export function CapabilityMatrix({ initialCategories }: CapabilityMatrixProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Sort and filter cluster category schemas cleanly using structural memoization filters
  const activeClusters = useMemo(() => {
    const sorted = [...initialCategories].sort(
      (a, b) => a.orderIndex - b.orderIndex,
    );
    if (activeCategory === "all") return sorted;
    return sorted.filter((cat) => cat.slug === activeCategory);
  }, [initialCategories, activeCategory]);

  if (initialCategories.length === 0) return null;

  return (
    <section className="relative w-full pt-32 pb-24 px-4 sm:px-6 md:px-12 border-b border-neutral-900 bg-[#020204] font-mono select-none overflow-hidden">
      {/* LAYER 1: Vector Line Blueprint technical grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/[0.02] rounded-full blur-[120px] pointer-events-none z-0" />

      <Container className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* COMPONET INTERACTIVE CONTROL DASHBOARD HEADER PANEL */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 border-b border-neutral-900 pb-8">
          <div className="space-y-3">
            <span className="text-[10px] tracking-[0.3em] text-indigo-400 uppercase font-bold block animate-pulse">
              // HARDWARE-SOFTWARE RUNTIME CAPABILITIES
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white uppercase font-sans">
              System Core Matrix
            </h2>
          </div>

          {/* DYNAMIC TELEMETRY SWITCH CONSOLE BAR */}
          <div className="flex flex-wrap gap-1 p-1 bg-neutral-950 border border-neutral-900 rounded-xl text-[10px] font-bold uppercase self-start xl:self-auto shadow-inner">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-3 py-2 rounded-lg transition-all cursor-pointer border ${
                activeCategory === "all"
                  ? "bg-white text-zinc-950 font-extrabold border-neutral-200"
                  : "text-zinc-500 hover:text-zinc-300 border-transparent"
              }`}
            >
              [ ALL_MODULES ]
            </button>
            {initialCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.slug)}
                className={`px-3 py-2 rounded-lg transition-all cursor-pointer border uppercase tracking-wider ${
                  activeCategory === category.slug
                    ? `${category.colorClass} bg-gradient-to-r ${category.bgGlow} border-current/20 font-extrabold`
                    : "text-zinc-500 hover:text-zinc-300 border-transparent"
                }`}
              >
                {category.slug.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* ANANIMATED INTERACTIVE LAYOUT DISPLAY MATRIX GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start w-full">
          <AnimatePresence mode="popLayout">
            {activeClusters.map((category) => {
              const hasChildSkills =
                category.skills && category.skills.length > 0;

              return (
                <motion.div
                  layout
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="relative rounded-2xl border border-neutral-900 bg-gradient-to-b from-neutral-950 via-neutral-900/40 to-neutral-950/80 p-5 sm:p-6 backdrop-blur-xl overflow-hidden group shadow-xl"
                >
                  {/* Specialized Variable Color Accent Ambient Blur Glow */}
                  <div
                    className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${category.bgGlow} to-transparent rounded-full blur-3xl pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity duration-500`}
                  />
                  <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neutral-800/30 to-transparent" />

                  {/* Cluster category description identification subrow */}
                  <div className="flex items-center gap-3 border-b border-neutral-900/60 pb-4 mb-5">
                    <div className="p-2 rounded-xl bg-neutral-950 border border-neutral-800/80 flex items-center justify-center shadow-inner shrink-0">
                      {getCategoryIcon(category.iconName, category.colorClass)}
                    </div>
                    <div>
                      <h3 className="text-xs font-bold tracking-wider text-neutral-100 uppercase font-sans">
                        {category.title}
                      </h3>
                      <span className="text-[9px] text-zinc-500 block tracking-tight font-mono lowercase mt-0.5">
                        shard_path: admin/node-clusters/{category.slug}
                      </span>
                    </div>
                  </div>

                  {/* Inner dynamic skills progress indicators list map */}
                  {hasChildSkills ? (
                    <div className="space-y-5">
                      {category.skills?.map((skill) => {
                        // Calculate experience weights based on the initialization year
                        const experienceYears = skill.year
                          ? new Date().getFullYear() - skill.year
                          : null;

                        return (
                          <div key={skill.id} className="space-y-2 group/row">
                            <div className="flex items-center justify-between text-[11px] w-full gap-4">
                              <span className="text-zinc-200 font-bold flex items-center gap-2 select-text font-sans">
                                <CheckCircle2
                                  className={`w-3.5 h-3.5 shrink-0 ${category.colorClass} opacity-80 group-hover/row:scale-110 transition-transform`}
                                />

                                {skill.name}
                                {experienceYears && (
                                  <span className="text-[8px] font-mono text-zinc-600 font-bold border border-neutral-800 px-1 py-0.2 rounded bg-neutral-950">
                                    {experienceYears}Y_EXP
                                  </span>
                                )}
                              </span>
                              <span className="text-zinc-500 font-bold bg-neutral-950 px-2 py-0.5 rounded border border-neutral-900 text-[9px] shrink-0 font-mono tracking-tight select-text">
                                {skill.metric}
                              </span>
                            </div>

                            {/* Detailed Telemetry Description logs block */}
                            <p className="text-[11px] font-sans font-medium text-neutral-400 leading-normal pl-5 pr-2 text-left">
                              {skill.desc}
                            </p>

                            {/* Dynamic Horizontal Laser Progress Indicator Line Gauge */}
                            <div className="pl-5 pt-1.5">
                              <div className="w-full h-1 bg-neutral-950 rounded-full overflow-hidden border border-neutral-900 relative">
                                {/* Injects an active structural glow animation mapping directly across your theme weights */}
                                <motion.div
                                  initial={{ width: 0 }}
                                  whileInView={{
                                    width: experienceYears
                                      ? `${Math.min(experienceYears * 15 + 40, 100)}%`
                                      : "85%",
                                  }}
                                  viewport={{ once: true }}
                                  transition={{
                                    duration: 1,
                                    ease: "easeOut",
                                    delay: 0.1,
                                  }}
                                  className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_12px_rgba(168,85,247,0.4)] rounded-full"
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="py-6 text-center text-zinc-600 italic text-[11px] tracking-wide">
                      No active telemetry parameters mapped to this node shard
                      matrix ledger segment.
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
