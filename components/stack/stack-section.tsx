"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Container } from "../common/container";
import {
  Sliders,
  Cpu,
  Database,
  Server,
  Layers,
  Code2,
  Globe,
  Shield,
  Terminal,
  ArrowUpRight,
  Activity,
  Zap,
} from "lucide-react";
import {
  FaJava,
  FaReact,
  FaNodeJs,
  FaPython,
  FaRust,
  FaAws,
} from "react-icons/fa6";
import {
  SiNextdotjs,
  SiSpringboot,
  SiPostgresql,
  SiPrisma,
  SiDocker,
  SiTailwindcss,
  SiTypescript,
  SiRedis,
  SiApachekafka,
  SiGo,
} from "react-icons/si";

// Strict structural interface signatures matching your relational database tables perfectly
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

interface StackSectionProps {
  initialCategories: SkillCategoryData[];
}

// Enterprise Dynamic Category Icon Map Factory
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
  if (name === "terminal") return <Terminal className={baseClasses} />;

  return <Cpu className={baseClasses} />;
}

// High-Performance Micro-Icon Technology Chip Factory
function getSkillIcon(techName: string): React.ReactNode {
  const name = techName.toLowerCase().trim();
  const baseStyle = "w-3.5 h-3.5 shrink-0";

  if (name.includes("next"))
    return <SiNextdotjs className={`${baseStyle} text-white`} />;
  if (name.includes("spring") || name.includes("boot"))
    return <SiSpringboot className={`${baseStyle} text-[#6db33f]`} />;
  if (name.includes("react"))
    return <FaReact className={`${baseStyle} text-[#61dafb]`} />;
  if (name.includes("java") && !name.includes("script"))
    return <FaJava className={`${baseStyle} text-[#e61f24]`} />;
  if (name.includes("postgres"))
    return <SiPostgresql className={`${baseStyle} text-[#336791]`} />;
  if (name.includes("prisma"))
    return <SiPrisma className={`${baseStyle} text-white opacity-80`} />;
  if (name.includes("docker"))
    return <SiDocker className={`${baseStyle} text-[#2496ed]`} />;
  if (name.includes("node"))
    return <FaNodeJs className={`${baseStyle} text-[#339933]`} />;
  if (name.includes("python"))
    return <FaPython className={`${baseStyle} text-[#3776ab]`} />;
  if (name.includes("rust"))
    return <FaRust className={`${baseStyle} text-white`} />;
  if (name.includes("aws") || name.includes("amazon"))
    return <FaAws className={`${baseStyle} text-[#ff9900]`} />;
  if (name.includes("tailwind"))
    return <SiTailwindcss className={`${baseStyle} text-[#06b6d4]`} />;
  if (name.includes("typescript") || name.includes("ts"))
    return <SiTypescript className={`${baseStyle} text-[#3178c6]`} />;
  if (name.includes("redis"))
    return <SiRedis className={`${baseStyle} text-[#dc382d]`} />;
  if (name.includes("kafka"))
    return <SiApachekafka className={`${baseStyle} text-white opacity-90`} />;
  if (name.includes("go") && name.length <= 4)
    return <SiGo className={`${baseStyle} text-[#00add8]`} />;

  return <Activity className={`${baseStyle} text-zinc-500`} />;
}

export function StackSection({ initialCategories }: StackSectionProps) {
  // Memoize sorted category clusters to maximize client rendering metrics
  const activeClusters = useMemo(() => {
    return [...initialCategories].sort((a, b) => a.orderIndex - b.orderIndex);
  }, [initialCategories]);

  if (activeClusters.length === 0) return null;

  return (
    <section
      id="stack"
      className="relative w-full py-28 bg-[#09090d] overflow-hidden select-none"
    >
      {/* LAYER 1: KINETIC REFLECTION LUNAR ATMOSPHERE */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.06)_0%,transparent_75%)] blur-[70px]" />
        <div className="absolute bottom-[-15%] left-[5%] h-[350px] w-[350px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.02)_0%,transparent_80%)] blur-[50px]" />
      </div>

      {/* LAYER 2: Blueprint Technical Grid Mesh */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:40px_40px] opacity-70 z-0" />

      {/* LAYER 3: Core Competency Data Interface */}
      <Container className="relative z-10 w-full space-y-12 max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col space-y-2 text-left">
          <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400 flex items-center gap-1.5 bg-neutral-900/80 w-max px-3 py-1 rounded-full border border-neutral-800/60 backdrop-blur-sm shadow-inner font-mono">
            <Sliders className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />{" "}
            Technical Systems Engine
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white uppercase font-sans">
            Validated Competencies Vector.
          </h2>
        </div>

        {/* HIGH-DENSITY ENTERPRISE CLUSTER CARDS DECK LAYOUT */}
        <div className="flex flex-col gap-6 w-full">
          {activeClusters.map((cluster, idx) => {
            const hasChildSkills = cluster.skills && cluster.skills.length > 0;
            const currentYear = new Date().getFullYear();

            return (
              <motion.div
                key={cluster.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="relative overflow-hidden rounded-2xl border border-neutral-800/40 bg-gradient-to-b from-neutral-900/60 to-neutral-950/90 p-5 sm:p-6 backdrop-blur-xl shadow-xl group"
              >
                {/* Internal Glow Accents Pinning */}
                <span
                  className={`absolute top-0 left-0 w-48 h-24 bg-gradient-to-br ${cluster.bgGlow} to-transparent opacity-40 blur-2xl transition-all duration-300 group-hover:scale-110 pointer-events-none`}
                />
                <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neutral-700/20 to-transparent" />

                {/* CARD CONTROL HEADER BAR ROW */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800/50 pb-4 relative z-10 w-full">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center shadow-inner group-hover:border-neutral-700 transition-colors">
                      {getCategoryIcon(cluster.iconName, cluster.colorClass)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-neutral-100 tracking-tight font-sans">
                        {cluster.title}
                      </h3>
                      <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest block mt-0.5">
                        // CLUSTER_NODE: /{cluster.slug}
                      </span>
                    </div>
                  </div>
                  {/* Operational Tags Badge indicators */}

                  <div className="flex items-center gap-2 self-start sm:self-auto font-mono text-[9px] font-bold uppercase">
                    <span className="px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-zinc-400">
                      Index_Rank: [{cluster.orderIndex}]
                    </span>
                    <span className="px-2 py-0.5 rounded bg-indigo-950/40 border border-indigo-900/40 text-indigo-400 tracking-wider">
                      {hasChildSkills
                        ? `${cluster.skills?.length} Tech Blocks Loaded`
                        : "Shard Empty"}
                    </span>
                  </div>
                </div>

                {/* HIGH-DENSITY CHIPS METRIC RECONCILIATION SUBLIST MATRIX */}
                {hasChildSkills ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-5 relative z-10">
                    {cluster.skills?.map((skill) => (
                      <div
                        key={skill.id}
                        className="p-3.5 rounded-xl border border-neutral-800/40 bg-neutral-950/40 flex flex-col justify-between gap-3 hover:border-neutral-700/60 hover:bg-neutral-950/80 transition-all duration-200 shadow-sm relative group/chip"
                      >
                        {/* Upper row: Skill title and core age */}
                        <div className="space-y-1">
                          <div className="flex justify-between items-center gap-2 w-full">
                            <div className="flex items-center gap-2 font-sans text-xs font-extrabold text-neutral-200">
                              {getSkillIcon(skill.name)}
                              <span className="truncate max-w-[140px]">
                                {skill.name}
                              </span>
                            </div>
                            {skill.year && (
                              <span className="text-[9px] font-mono text-zinc-500 font-bold tracking-tighter shrink-0 bg-neutral-900/60 px-1.5 py-0.5 rounded border border-neutral-800">
                                {currentYear - skill.year} Yrs Exp
                              </span>
                            )}
                          </div>

                          {/* Live database custom telemetry description text rendering */}
                          <p className="text-[11px] font-sans font-medium text-neutral-400 leading-normal text-left pt-1 pl-0.5">
                            {skill.desc}
                          </p>
                        </div>

                        {/* Lower row: Live Database performance benchmark telemetry tracker readout */}
                        <div className="mt-1 pt-2 border-t border-neutral-900 flex items-center justify-between w-full font-mono text-[9px] select-text">
                          <span className="text-zinc-500 uppercase flex items-center gap-1">
                            <Zap className="w-2.5 h-2.5 text-zinc-600 group-hover/chip:text-amber-500 transition-colors" />{" "}
                            Telemetry Benchmark:
                          </span>
                          <span className="font-extrabold text-emerald-400 uppercase tracking-wide bg-emerald-950/30 border border-emerald-900/40 px-2 py-0.5 rounded">
                            {skill.metric}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="pt-6 pb-2 text-center text-zinc-500 italic tracking-wide">
                    No verified infrastructure architecture keys assigned to
                    this stack cluster node database slice.
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </Container>

      {/* Precision Accent Edge Border Track */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-800/40 to-transparent z-10" />
    </section>
  );
}
