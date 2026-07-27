"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "../common/container";
import {
  ArrowUpRight,
  FolderGit2,
  Layers,
  ShieldCheck,
  Cpu,
  Globe,
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

// Strict interface definition matching your Prisma data layer exactly
interface ProjectData {
  id: string;
  title: string;
  category: string;
  description: string;
  metric: string;
  stack: string[];
  type: string | null;
  size: string | null;
  imageSrc: string;
  liveUrl: string;
  repoUrl: string;
  featured: boolean;
  published: boolean;
  sortOrder: number;
}

interface ProjectsSectionProps {
  initialProjects: ProjectData[];
}

// Enterprise Dynamic Icon Map Factory
function getTechIcon(techName: string): React.ReactNode {
  const name = techName.toLowerCase().trim();
  if (name.includes("next")) return <SiNextdotjs className="text-black" />;
  if (name.includes("spring") || name.includes("boot"))
    return <SiSpringboot className="text-[#6db33f]" />;
  if (name.includes("react")) return <FaReact className="text-[#61dafb]" />;
  if (name.includes("java") && !name.includes("script"))
    return <FaJava className="text-[#e61f24]" />;
  if (name.includes("postgres"))
    return <SiPostgresql className="text-[#336791]" />;
  if (name.includes("prisma")) return <SiPrisma className="text-[#2d3748]" />;
  if (name.includes("docker")) return <SiDocker className="text-[#2496ed]" />;
  if (name.includes("node")) return <FaNodeJs className="text-[#339933]" />;
  if (name.includes("python")) return <FaPython className="text-[#3776ab]" />;
  if (name.includes("rust")) return <FaRust className="text-[#000000]" />;
  if (name.includes("aws") || name.includes("amazon"))
    return <FaAws className="text-[#ff9900]" />;
  if (name.includes("tailwind"))
    return <SiTailwindcss className="text-[#06b6d4]" />;
  if (name.includes("typescript") || name.includes("ts"))
    return <SiTypescript className="text-[#3178c6]" />;
  if (name.includes("redis")) return <SiRedis className="text-[#dc382d]" />;
  if (name.includes("kafka"))
    return <SiApachekafka className="text-[#000000]" />;
  if (name.includes("go") && name.length <= 4)
    return <SiGo className="text-[#00add8]" />;

  // Clean fallback structural icon token if specific icon matching misses
  return <Cpu className="w-3 h-3 text-zinc-400" />;
}

export function ProjectsSection({ initialProjects }: ProjectsSectionProps) {
  // Enforce validation constraints to filter visibility to published assets only
  const publicProjects = initialProjects
    .filter((p) => p.published)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  // Isolate the top prioritized asset to serve inside your premium flagship bento deck slot
  const flagshipProject =
    publicProjects.find((p) => p.featured) || publicProjects[0];

  // Cascade secondary components into secondary standard grid blocks
  const secondaryProjects = publicProjects.filter(
    (p) => p.id !== flagshipProject?.id,
  );

  // Fallback state mapping protection in case the Neon database returns empty tables
  if (publicProjects.length === 0) {
    return null;
  }

  return (
    <section
      id="projects"
      className="relative w-full py-28 bg-[#ffffff] text-neutral-900 overflow-hidden select-none"
    >
      {/* LAYER 1: LIGHT REFLECTION SPECULAR FLARES */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 h-150 w-300 rounded-full bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.06)_0%,rgba(168,85,247,0.02)_40%,transparent_100%)] blur-[60px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-100 w-100 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.03)_0%,transparent_80%)] blur-[80px]" />
      </div>

      {/* LAYER 2: Vector Grid Lines Matrix */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000004_1px,transparent_1px)] bg-size-[48px_48px] opacity-80 z-1" />

      {/* LAYER 3: Dynamic Ingest Interactive Layout Canvas */}
      <Container className="relative z-10 space-y-12 max-w-7xl mx-auto px-4">
        {/* SECTION HEADER BLOCK */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono tracking-[0.2em] text-indigo-600 uppercase font-bold block">
            // COMPILED PRODUCTION SYSTEMS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 uppercase">
            Flagship Engineering Catalog
          </h2>
        </div>

        {/* PRIMARY BENTO DECK MASTER GRID FRAME (12 COLUMNS) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* DYNAMIC CARD 1: EXTRUDED FLAGSHIP GRID SHARD (8 COLUMNS) */}
          {flagshipProject && (
            <motion.div
              whileHover={{ y: -6, scale: 1.002 }}
              transition={{ type: "spring", stiffness: 350, damping: 26 }}
              onClick={() =>
                window.open(flagshipProject.liveUrl, "_blank", "noreferrer")
              }
              className="relative col-span-12 lg:col-span-8 flex flex-col justify-between overflow-hidden rounded-3xl border border-neutral-200/60 bg-white/70 p-6 sm:p-8 backdrop-blur-xl shadow-[0_32px_60px_-15px_rgba(99,102,241,0.05)] group cursor-pointer min-h-90"
            >
              <span className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white to-transparent z-10" />
              <div className="flex items-center justify-between w-full relative z-10">
                <div className="flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-600 backdrop-blur-sm">
                  {flagshipProject.type === "backend" ? (
                    <Cpu className="w-3 h-3 text-indigo-500" />
                  ) : (
                    <Globe className="w-3 h-3 text-indigo-500" />
                  )}
                  {flagshipProject.type || "Production Ready"}
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm text-neutral-500 group-hover:text-black group-hover:border-neutral-400 group-hover:shadow transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
              <div className="mt-12 space-y-3 relative z-10">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 block">
                    {flagshipProject.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-neutral-900">
                    {flagshipProject.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm font-medium text-neutral-600 max-w-2xl leading-relaxed">
                  {flagshipProject.description}
                </p>

                {/* Tech Stack Tokens Array Extraction */}
                <div className="flex flex-wrap gap-2 pt-2 select-none">
                  {flagshipProject.stack.map((tech) => (
                    <span
                      key={tech}
                      className="flex items-center gap-1.5 rounded-lg border border-neutral-200/80 bg-white/80 px-2.5 py-1 text-xs font-semibold text-neutral-600 shadow-sm transition-colors group-hover:border-neutral-300"
                    >
                      {getTechIcon(tech)} {tech}
                    </span>
                  ))}
                </div>
              </div>
              // ... continuing right from your cut-off position
            </motion.div>
          )}

          {/* DYNAMIC CARD 2: REALTIME PERFORMANCE TELEMETRY MAP METRIC PANEL (4 COLUMNS) */}
          {flagshipProject && (
            <motion.div
              whileHover={{ y: -6, scale: 1.002 }}
              transition={{ type: "spring", stiffness: 350, damping: 26 }}
              className="relative col-span-12 lg:col-span-4 flex flex-col justify-between overflow-hidden rounded-3xl border border-neutral-200/60 bg-white/70 p-6 sm:p-8 backdrop-blur-xl shadow-[0_32px_60px_-15px_rgba(99,102,241,0.05)] group"
            >
              <span className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white to-transparent z-10" />

              <div className="flex items-center gap-2 text-neutral-500 font-semibold tracking-wide text-xs relative z-10">
                <Layers className="w-3.5 h-3.5 text-indigo-600" /> Operational
                Metrics Shard
              </div>

              {/* Functional Graphic Bar Array Animation Visual Anchors */}
              <div className="my-8 flex justify-center items-end gap-1.5 h-16 w-full px-4 select-none relative z-10">
                {[60, 80, 40, 90, 70, 50, 85, 65, 75, 55].map((height, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{
                      duration: 1,
                      delay: idx * 0.03,
                      ease: "easeOut",
                    }}
                    style={{ height: `${height}%` }}
                    className="w-full rounded-t bg-linear-to-t from-indigo-500/20 via-indigo-500/60 to-indigo-600 origin-bottom shadow-sm shadow-indigo-500/10"
                  />
                ))}
              </div>

              <div className="space-y-1 relative z-10">
                <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-tight">
                  High-Concurrency Index
                </h4>
                <p className="text-[11px] font-semibold text-emerald-600 font-mono tracking-wide">
                  BENCHMARK: {flagshipProject.metric}
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* SECONDARY SECOND-TIER GRID LIST SHARDS (2 COLUMNS PER ROW) */}
        {secondaryProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {secondaryProjects.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                onClick={() =>
                  window.open(project.liveUrl, "_blank", "noreferrer")
                }
                className="relative flex flex-col justify-between h-72 overflow-hidden rounded-3xl border border-neutral-200/50 bg-white/40 p-6 backdrop-blur-md shadow-sm group cursor-pointer"
              >
                <span className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white to-transparent z-10" />

                <div className="flex items-center justify-between w-full relative z-10">
                  <div className="flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400">
                    <FolderGit2 className="w-4 h-4 shrink-0 text-neutral-300 group-hover:text-indigo-600 transition-colors" />
                    <span className="truncate max-w-45">
                      {project.category}
                    </span>
                  </div>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm text-neutral-500 group-hover:text-black group-hover:border-neutral-400 transition-all duration-300">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="space-y-2 mt-auto relative z-10">
                  <div className="space-y-0.5">
                    <h3 className="text-base font-bold text-neutral-900 tracking-tight">
                      {project.title}
                    </h3>
                    <span className="text-[10px] font-mono font-semibold text-emerald-600 block">
                      Index: {project.metric}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-neutral-600 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.stack.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="flex items-center gap-1 text-[10px] font-semibold text-neutral-500 bg-white border border-neutral-200/60 px-2 py-0.5 rounded shadow-sm group-hover:border-neutral-300"
                      >
                        {getTechIcon(tech)} {tech}
                      </span>
                    ))}
                    {project.stack.length > 5 && (
                      <span className="text-[9px] text-neutral-400 font-bold font-mono pt-0.5 pl-0.5">
                        +{project.stack.length - 5}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
