"use client";

import React from "react";
import { motion } from "framer-motion";

// Import precise brand vectors from react-icons
import {
  FaJava,
  FaReact,
  FaDocker,
  FaHtml5,
  FaCss3,
  FaPython,
} from "react-icons/fa6";
import { SiSpringboot, SiNextdotjs, SiPostgresql } from "react-icons/si";
import { Cpu, Database } from "lucide-react"; // Generic fallback token for AI / custom structures

const stackItems = [
  { name: "Java", icon: <FaJava className="w-3.5 h-3.5 text-[#e61f24]" /> },
  {
    name: "Spring Boot",
    icon: <SiSpringboot className="w-3.5 h-3.5 text-[#6db33f]" />,
  },
  { name: "Next.js", icon: <SiNextdotjs className="w-3.5 h-3.5 text-white" /> },
  { name: "React", icon: <FaReact className="w-3.5 h-3.5 text-[#149eca]" /> },
  {
    name: "React Native",
    icon: <FaReact className="w-3.5 h-3.5 text-[#61dafb]" />,
  },
  {
    name: "PostgreSQL",
    icon: <SiPostgresql className="w-3.5 h-3.5 text-[#336791]" />,
  },
  { name: "Docker", icon: <FaDocker className="w-3.5 h-3.5 text-[#2496ed]" /> },
  { name: "AI Systems", icon: <Cpu className="w-3.5 h-3.5 text-[#a855f7]" /> },
  { name: "HTML5", icon: <FaHtml5 className="w-3.5 h-3.5 text-[#086e28]" /> },
  { name: "CSS3", icon: <FaCss3 className="w-3.5 h-3.5 text-[#dd273c]" /> },
  {
    name: "Mongo DB",
    icon: <Database className="w-3.5 h-3.5 text-[#776488]" />,
  },
  {
    name: "MySql",
    icon: <Database className="w-3.5 h-3.5 text-[#4c3b97]" />,
  },

  {
    name: "Python",
    icon: <FaPython className="w-3.5 h-3.5 text-[#7d8864]" />,
  },

  {
    name: "JavaFx",
    icon: <FaJava className="w-3.5 h-3.5 text-[#ce8622]" />,
  },

  {
    name: "Spring Security",
    icon: <SiSpringboot className="w-3.5 h-3.5 text-[#181014]" />,
  },
];

export function HeroStack() {
  // Double the array to create a seamless, gapless infinity loop scroll connection
  const doubledStack = [...stackItems, ...stackItems];

  return (
    <div className="w-full flex flex-col space-y-2.5 pt-2">
      {/* Structural Micro-Header */}
      <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500 select-none px-1">
        Core Capabilities Registry
      </span>

      {/* Infinite Horizontal Tracking Ribbon */}
      <div className="relative w-full overflow-hidden rounded-xl border border-neutral-800/40 bg-neutral-950/20 p-2.5 backdrop-blur-sm [mask-image:linear-gradient(to_right,transparent_0%,#000_15%,#000_85%,transparent_100%)]">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 18,
            repeat: Infinity,
          }}
          className="flex gap-2 w-max shrink-0"
        >
          {doubledStack.map((tech, idx) => (
            <div
              key={idx}
              className="flex items-center gap-1.5 rounded-lg border border-neutral-800/60 bg-neutral-900/40 px-2.5 py-1.5 text-xs font-semibold text-neutral-300 transition-colors duration-200 hover:border-neutral-700 hover:text-white group select-none"
            >
              {/* Brand Icon Module wrapper */}
              <span className="opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-200">
                {tech.icon}
              </span>
              <span className="tracking-wide text-neutral-400 group-hover:text-neutral-200 transition-colors duration-200">
                {tech.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
