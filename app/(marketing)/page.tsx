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
import { TestimonialsSection } from "@/components/sections/testimonials/testimonials-carousel";
import { OpenSourceTelemetry } from "@/components/sections/oss/oss-telemetry";
import { CaseStudiesSection } from "@/components/sections/case-studies/engineering-breakdown";

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
    /* 
      RESPONSIVE POLISH NOTES:
      - 'overflow-x-hidden': Acts as a strict boundary shield to kill layout breakage caused by 3D canvas/absolute mesh leaks.
      - 'flex flex-col w-full': Forces sections to stack cleanly down the viewport axis across mobile breakpoints.
    */
    <main className="relative flex flex-col w-full min-h-screen bg-[#020202] text-white overflow-x-hidden antialiased subpixel-antialiased selection:bg-indigo-500/30 selection:text-white">
      {/* 
        LAYER 2: CINEMATIC GLOSSY GLASS HERO VIEWPORT
        Responsive Layout Check: Responsive typography shrinks font size gracefully on micro-displays.
      */}
      <div className="w-full px-4 sm:px-6 md:px-8">
        <HeroSection />
      </div>

      {/* 
        LAYER 3: ASYMMETRIC BENTO GRID PRODUCTION CATALOGUE
        Responsive Layout Check: Automatically forces wide grid blocks into single column tracks on mobile views.
      */}
      <div className="w-full px-4 sm:px-6 md:px-8 py-4 sm:py-8">
        <ProjectsSection initialProjects={initialProjects as any} />
      </div>

      {/* 
        LAYER 3.5: ARCHITECTURAL CASE STUDIES
        Responsive Layout Check: Standardized layout padding with full mobile swipe gesture boundaries.
      */}
      <div className="w-full px-4 sm:px-6 md:px-8 py-4 sm:py-8">
        <CaseStudiesSection />
      </div>

      {/* 
        LAYER 4: SCROLL-PROGRESS TIMELINE CAREER REGISTRY
        Responsive Layout Check: Shifts timeline layout indicators to the far left margin on smaller viewports.
      */}
      <div className="w-full px-4 sm:px-6 md:px-8 py-4 sm:py-8">
        <ExperienceSection initialExperiences={initialExperiences as any} />
      </div>

      {/* 
        LAYER 4.5: PEER SIGNED COMMENDATIONS (TESTIMONIALS)
        Responsive Layout Check: Truncates extra hash metadata blocks to avoid layout stretching.
      */}
      <div className="w-full px-4 sm:px-6 md:px-8 py-4 sm:py-8">
        <TestimonialsSection />
      </div>

      {/* 
        LAYER 5: WIREFRAME WEBGL CAPABILITY MATRIX GAUGE
        Responsive Layout Check: Throttles dynamic WebGL canvas dimensions so interactive 3D grids fit on touchscreens.
      */}
      <div className="w-full px-4 sm:px-6 md:px-8 py-4 sm:py-8">
        <StackSection initialCategories={initialCategories as any} />
      </div>

      {/* 
        LAYER 5.5: GLOBAL GIT ENGINE OPEN SOURCE TELEMETRY
        Responsive Layout Check: Introduces a touch-scroll boundary block allowing contribution arrays to be slidable on small screens.
      */}
      <div className="w-full px-4 sm:px-6 md:px-8 py-4 sm:py-8">
        <OpenSourceTelemetry />
      </div>

      {/* 
        LAYER 6: REAL-TIME DEPLOYMENT TELEMETRY CONSOLE
        Responsive Layout Check: Collapses dense secondary charts, keeping only core velocity metrics on screens < 640px.
      */}
      <div className="w-full px-4 sm:px-6 md:px-8 py-4 sm:py-8">
        <TelemetrySection />
      </div>

      {/* 
        LAYER 7: ENCRYPTED COMMAND-LINE MESSAGE INPUT TERMINAL
        Responsive Layout Check: Maps form panels in a clean, vertical stack on mobile while enabling grid layouts on computers.
      */}
      <div className="w-full px-4 sm:px-6 md:px-8 py-12 sm:py-16">
        <ContactSection />
      </div>
    </main>
  );
}
