// FIXED PATH: Adjusted path directly matching your project folder tree setup

import { getAllProjectsAction } from "@/actions/projects";
import { ContactSection } from "@/components/contact/contact-section";
import { ProjectsBento } from "@/components/sections/projects/projects-bento";

// Force Next.js to bypass stale caches so dashboard database creations reveal instantly
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProjectsPage() {
  // 1. Fetch live transaction data nodes safely at the server layer level
  const response = await getAllProjectsAction();
  const currentProjects =
    response.success && response.data ? response.data : [];

  return (
    <main className="relative w-full min-h-screen bg-[#020203] text-white overflow-x-hidden antialiased subpixel-antialiased selection:bg-indigo-500/30 selection:text-white">
      {/* 
        LAYER 1: ASYMMETRIC BENTO GRID PRODUCTION CATALOGUE
        FIXED PROPS: Safely forwarding live Neon query arrays down into the visual grid engine
      */}
      <ProjectsBento initialProjects={currentProjects as any} />

      {/* Subsequent monitoring or telemetry systems deploy downstream here */}

      {/* 
        LAYER 6: COMMAND-LINE ENCRYPTED COMMUNICATION INPUT TERMINAL
      */}
      <ContactSection />
    </main>
  );
}
