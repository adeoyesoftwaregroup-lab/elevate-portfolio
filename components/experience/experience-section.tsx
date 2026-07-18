"use client";

import React, { useRef } from "react";
import { useScroll } from "framer-motion";
import { Container } from "../common/container";
import { ScrollProgressLine } from "./scroll-progress-line";
import { TimelineNode } from "./timeline-node";
import { Briefcase } from "lucide-react";

// Explicit data layer model matching your Prisma schema contract properties
interface ExperienceData {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string | Date;
  endDate: string | Date | null;
  techStack: string[];
  milestones: string[];
  orderIndex: number;
  impactMetricLabel1: string | null;
  impactMetricValue1: string | null;
  impactMetricLabel2: string | null;
  impactMetricValue2: string | null;
}

interface ExperienceSectionProps {
  initialExperiences: ExperienceData[];
}

export function ExperienceSection({
  initialExperiences,
}: ExperienceSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Hook tracking viewport intersection progress values over the element bounds
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Helper macro engine to cleanly format dates for career timeline components
  const formatOperationalHorizon = (
    start: string | Date,
    end: string | Date | null,
  ) => {
    const format = (dateVal: string | Date) => {
      const d = new Date(dateVal);
      return isNaN(d.getTime())
        ? ""
        : d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
    };

    const startString = format(start);
    const endString = end ? format(end) : "Present";

    return `${startString} - ${endString}`;
  };

  // Process data records sequentially using order weights and chronological parameters
  const activeTimeline = [...initialExperiences].sort(
    (a, b) => a.orderIndex - b.orderIndex,
  );

  // If table parameters are empty, terminate safely without breaking page wrappers
  if (activeTimeline.length === 0) {
    return null;
  }

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative w-full py-28 bg-[#020202] overflow-hidden select-none"
    >
      <Container className="relative z-10 w-full space-y-16 max-w-7xl mx-auto px-4">
        {/* Section Typography Header Block */}
        <div className="flex flex-col space-y-2 text-left md:text-center md:items-center">
          <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400 flex items-center gap-1.5 justify-start md:justify-center">
            <Briefcase className="w-3.5 h-3.5" /> Career Milestones Registry
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white max-w-xl">
            Building Distributed Enterprise Solutions.
          </h2>
        </div>

        {/* Outer Scroll Tracker Boundary Wrapper */}
        <div className="relative w-full mt-12">
          {/* Scroll Tracker Connector line item component */}
          <ScrollProgressLine scrollYProgress={scrollYProgress} />

          {/* Map dynamic database rows out sequentially */}
          <div className="flex flex-col w-full relative">
            {activeTimeline.map((job, idx) => (
              <TimelineNode
                key={job.id}
                index={idx}
                role={job.role}
                company={job.company}
                duration={formatOperationalHorizon(job.startDate, job.endDate)}
                // Injects your dynamic data milestones directly into your existing timeline view
                points={job.milestones}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
