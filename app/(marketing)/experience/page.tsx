import React from "react";
import { ChronicleTimeline } from "@/components/sections/experience/chronicle-timeline";
import { ContactSection } from "@/components/contact/contact-section";

import { getAllExperiencesAction } from "@/actions/experience";

// Force Next.js server components to bypass stale compilation caches completely
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ExperiencePage() {
  const experiences = await getAllExperiencesAction();

  const initialExperiences =
    experiences.success && experiences.data ? experiences.data : [];

  return (
    <main className="relative w-full min-h-screen bg-[#020202] text-white overflow-x-hidden antialiased subpixel-antialiased selection:bg-indigo-500/30 selection:text-white">
      {/* 
        LAYER 1: SCROLL-PROGRESS TIMELINE CAREER REGISTRY
        Invokes the award-winning professional ledger visualizing major architecture milestones.
      */}
      <ChronicleTimeline initialExperiences={initialExperiences} />

      {/* Other database modules drop down sequentially from this node */}

      {/* 
        LAYER 6: COMMAND-LINE ENCRYPTED COMMUNICATION INPUT TERMINAL
      */}
      <ContactSection />
    </main>
  );
}
