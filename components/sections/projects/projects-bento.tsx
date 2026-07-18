"use client";

import React from "react";
import Image from "next/image";
import { Terminal, ExternalLink, Code2, GitBranch } from "lucide-react";
import {
  Cpu,
  Database,
  Building2,
  Smartphone,
  ShieldCheck,
  BrainCircuit,
  Globe,
} from "lucide-react";

// Dynamic Lucide string translation dictionary protects against missing or incorrect exports
const ICON_REGISTRY: Record<string, React.ComponentType<any>> = {
  Cpu: Cpu,
  Database: Database,
  Building2: Building2,
  Smartphone: Smartphone,
  ShieldCheck: ShieldCheck,
  BrainCircuit: BrainCircuit,
  Globe: Globe,
};

interface ProjectAssetNode {
  id: string;
  title: string;
  category: string;
  desc: string;
  metric: string;
  stack: string[];
  type: string;
  size: string | null;
  iconName: string | null;
  accent: string | null;
  imageSrc: string;
  liveUrl: string | null;
  repoUrl: string | null;
}

interface DynamicProjectsBentoProps {
  initialProjects: ProjectAssetNode[];
}

export function ProjectsBento({ initialProjects }: DynamicProjectsBentoProps) {
  return (
    <section className="relative w-full pt-32 pb-24 px-6 md:px-12 xl:px-24 border-b border-white/5 bg-[#020203]">
      {/* Background Grid Underlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Header Block Layout */}
        <div className="space-y-3 border-b border-white/5 pb-8">
          <span className="text-[11px] font-mono tracking-[0.3em] text-indigo-400 uppercase font-semibold block">
            // ASYMMETRIC BENTO GRID PRODUCTION CATALOGUE
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
            Flagship Engineering Systems
          </h2>
        </div>

        {/* Dynamic Bento Grid Layout Framework */}
        {initialProjects.length === 0 ? (
          <div className="p-16 text-center font-mono text-xs text-zinc-500 border border-white/5 rounded-xl bg-zinc-950/40">
            &gt; No active configuration entries identified inside public
            dataset nodes.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {initialProjects.map((project) => {
              // Resolve matching functional component or fallback gracefully to standard Cpu element
              const ProjectIcon =
                ICON_REGISTRY[project.iconName || "Cpu"] || Cpu;
              const columnSize = project.size || "lg:col-span-6";

              return (
                <div
                  key={project.id}
                  className={`${columnSize} group relative rounded-xl border border-white/5 bg-[#050508] p-6 md:p-8 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-white/10`}
                >
                  {/* Visual Glow Ambient Background Layer */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/[0.01] to-transparent pointer-events-none" />

                  {/* Card Responsive Structural Splits */}
                  <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                    {/* TEXT DATA BLOCKS */}
                    <div
                      className={`${columnSize.includes("lg:col-span-8") ? "xl:col-span-7" : "xl:col-span-12"} space-y-5`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase flex items-center gap-2">
                          <Code2 className="w-3.5 h-3.5 text-zinc-600" />
                          {project.category}
                        </span>
                        <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-zinc-950 text-emerald-400 border border-emerald-500/10 font-bold">
                          {project.metric}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white group-hover:text-indigo-400 transition-colors duration-200 flex items-center gap-3">
                          <ProjectIcon className="w-5 h-5 opacity-60 transition-colors duration-200 group-hover:text-indigo-400" />
                          {project.title}
                        </h3>
                        <p className="text-zinc-400 text-sm font-light leading-relaxed">
                          {project.desc}
                        </p>
                      </div>
                    </div>

                    {/* VISUAL IMAGE BLOCK */}
                    <div
                      className={`${columnSize.includes("lg:col-span-8") ? "xl:col-span-5" : "xl:col-span-12"} w-full relative mt-2 xl:mt-0`}
                    >
                      <div className="relative aspect-[16/9] w-full bg-zinc-950 rounded-lg border border-white/5 overflow-hidden shadow-2xl group-hover:border-white/10 transition-colors duration-300">
                        <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 border-t border-l border-zinc-700 z-20" />
                        <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 border-b border-r border-zinc-700 z-20" />
                        <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] bg-[size:12px_12px] z-0" />

                        <Image
                          src={project.imageSrc || "/images/Church-CRM.png"}
                          alt={project.title}
                          fill
                          className="object-cover object-top opacity-60 group-hover:opacity-90 group-hover:scale-[1.02] transition-all duration-500 z-10"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card Interactive Footer Stack */}
                  <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-20">
                    <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded bg-zinc-950 text-zinc-400 border border-white/5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 font-mono text-xs">
                      <a
                        href={project.repoUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-white transition-colors duration-150 bg-zinc-950 px-2.5 py-1.5 rounded border border-white/5"
                      >
                        <GitBranch className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={project.liveUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors duration-150 bg-zinc-950 px-3 py-1.5 rounded border border-white/5"
                      >
                        LIVE_SYS <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Global Pipeline Output Registry Bar */}
        <div className="p-4 bg-zinc-950 rounded-lg border border-white/5 flex items-center gap-3 font-mono text-xs text-zinc-500">
          <Terminal className="w-4 h-4 text-indigo-400" />
          <span>
            &gt; architectural clusters instantiated successfully. assets
            streaming directly via serverless database engine pools.
          </span>
        </div>
      </div>
    </section>
  );
}
