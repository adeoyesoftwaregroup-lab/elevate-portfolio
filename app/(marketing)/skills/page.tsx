import { getAllSkillCategoriesAction } from "@/actions/skill-categories";
import { CapabilityMatrix } from "@/components/sections/skills/capability-matrix";
import { ContactSection } from "@/components/contact/contact-section";

// Force Next.js server components to bypass stale compilation caches completely
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function SkillsPage() {
  // Fetch active relational skill cluster frameworks from your Neon database shards
  const result = await getAllSkillCategoriesAction();

  // Initialize an empty fallback array to prevent rendering page crashes if the database returns empty
  const initialCategories = result.success && result.data ? result.data : [];

  return (
    <main className="relative w-full min-h-screen bg-[#020202] text-white overflow-x-hidden antialiased subpixel-antialiased selection:bg-indigo-500/30 selection:text-white">
      {/* 
        LAYER 1: INTERACTIVE CAPABILITY RUNTIME MATRIX
        FIXED: Injected the live categories and eager-loaded skills straight into the component prop
      */}
      <CapabilityMatrix initialCategories={initialCategories as any} />

      {/* Subsequent database telemetry modules can layer down cleanly here */}

      {/* 
        LAYER 6: COMMAND-LINE ENCRYPTED COMMUNICATION INPUT TERMINAL
      */}
      <ContactSection />
    </main>
  );
}
