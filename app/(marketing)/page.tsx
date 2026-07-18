import React from "react";
import { getAllProjectsAction } from "@/actions/projects";
import { getAllExperiencesAction } from "@/actions/experience";
import { getAllSkillCategoriesAction } from "@/actions/skill-categories";
import { getSiteSettingsAction } from "@/actions/site-setting";

import { HeroSection } from "@/components/sections/hero/hero-section";
import { ExperienceSection } from "@/components/experience/experience-section";
import { StackSection } from "@/components/stack/stack-section";
import { TelemetrySection } from "@/components/telemetry/telemetry-section";
import { ContactSection } from "@/components/contact/contact-section";
import { ProjectsSection } from "@/components/projects/projects-bento";

// FIXED: Updated component import path to match your dynamic public section location

// Force Next.js server runtime components to bypass stale compilation caches completely
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  // Concurrent data aggregation handshake via Neon / Prisma engine layers
  const [projectsRes, experiencesRes, categoriesRes, settingsRes] =
    await Promise.all([
      getAllProjectsAction(),
      getAllExperiencesAction(),
      getAllSkillCategoriesAction(),
      getSiteSettingsAction(),
    ]);

  // Extract raw dataset layers while initializing safe fallbacks to prevent rendering crashes
  const initialProjects =
    projectsRes.success && projectsRes.data ? projectsRes.data : [];
  const initialExperiences =
    experiencesRes.success && experiencesRes.data ? experiencesRes.data : [];
  const initialCategories =
    categoriesRes.success && categoriesRes.data ? categoriesRes.data : [];
  const siteSettings =
    settingsRes.success && settingsRes.data ? settingsRes.data : null;

  return (
    <main className="relative w-full min-h-screen bg-[#020202] text-white overflow-x-hidden antialiased subpixel-antialiased selection:bg-indigo-500/30 selection:text-white">
      {/* 
        LAYER 1: GLOBAL FIXED FLOATING NAVIGATION HUB
        Docks smoothly and shifts sizes based on the client viewport scroll depth indicators.
      */}

      {/* 
        LAYER 2: CINEMATIC GLOSSY GLASS HERO VIEWPORT
        Passes global site configurations straight into the landing typography matrices
      */}
      <HeroSection />

      {/* 
        LAYER 3: ASYMMETRIC BENTO GRID PRODUCTION CATALOGUE
        FIXED: Injected the active projects dataset straight into the dynamic component prop
      */}
      <ProjectsSection initialProjects={initialProjects as any} />

      {/* 
        LAYER 4: SCROLL-PROGRESS TIMELINE CAREER REGISTRY
        Tracks occupational progress via animated laser lines that light up dynamically on scroll.
      */}
      <ExperienceSection initialExperiences={initialExperiences as any} />

      {/* 
        LAYER 5: WIREFRAME WEBGL CAPABILITY MATRIX GAUGE
        Displays language expert proficiencies using floating, interactive 3D distortion meshes.
      */}
      <StackSection initialCategories={initialCategories as any} />

      {/* 
        LAYER 6: REAL-TIME DEPLOYMENT TELEMETRY CONSOLE
        Monitors pipeline data throughput records alongside flashing code velocity maps.
      */}
      <TelemetrySection />

      {/* 
        LAYER 7: ENCRYPTED COMMAND-LINE MESSAGE INPUT TERMINAL
        Processes direct user message packets using valid Zod layout string validation scripts.
      */}
      <ContactSection />

      {/* 
        LAYER 8: PREMIUM FINALISATION BASE SYSTEM TRACK
        Closes out the site layout with local time monitoring matrices and brand links.
      */}
    </main>
  );
}
