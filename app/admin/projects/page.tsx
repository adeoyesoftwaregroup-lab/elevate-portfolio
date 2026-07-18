import { ProjectsManager } from "@/components/sections/admin/projects-manager";

export const metadata = {
  title: "Projects Inventory Cluster Manager // Kernel_OS",
  description: "Administrative catalog modification panel.",
};

export default function AdminProjectsPage() {
  return (
    <div className="space-y-6">
      {/* Structural Inner Title Section */}
      <div className="space-y-1 border-b border-zinc-200 pb-5">
        <span className="text-[10px] font-mono tracking-[0.2em] text-indigo-600 uppercase font-bold block">
          // INTERACTIVE DATASET TRANSACTION COCKPIT
        </span>
        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-zinc-900 uppercase">
          Projects Catalogue Catalog
        </h2>
      </div>

      {/* 
        LAYER 1: COMPILATION MANAGEMENT MODULE
        Invokes your responsive, advanced dataset management interface directly.
      */}
      <ProjectsManager />
    </div>
  );
}
