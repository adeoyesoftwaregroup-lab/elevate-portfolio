"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession, SessionProvider } from "next-auth/react";
import {
  LayoutDashboard,
  Cpu,
  Briefcase,
  Layers,
  LogOut,
  Radio,
  ChevronRight,
  User2,
  Lock,
  Clock,
  Cog,
  Shield,
  Layers2,
  Terminal,
  Grid,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup, // FIXED: Imported explicitly to patch the MenuGroupContext error
} from "@/components/ui/dropdown-menu";

import { FaEnvelope } from "react-icons/fa6";

const WORKSPACE_LINKS = [
  {
    name: "System Metrics Overview",
    href: "/admin",
    icon: LayoutDashboard,
    indicator: "SYS_STAT",
  },
  {
    name: "Manage Projects Catalog",
    href: "/admin/projects",
    icon: Cpu,
    indicator: "DB_BENTO",
  },
  {
    name: "Experience Timeline Ledger",
    href: "/admin/experience",
    icon: Briefcase,
    indicator: "CHRONO_LOG",
  },
  {
    name: "Skills Cluster Framework",
    href: "/admin/skill-category",
    icon: Grid, // FIXED: Swapped for cohesive Lucide grid matrix primitive
    indicator: "CORE_CLST",
  },
  {
    name: "Capabilities Matrix Gauge",
    href: "/admin/skills",
    icon: Layers,
    indicator: "TECH_SHRD",
  },
  {
    name: "Contact & Communication Directory",
    href: "/admin/contacts",
    icon: FaEnvelope,
    indicator: "COMMS_QUE",
  },
  {
    name: "Website Settings & Configuration",
    href: "/admin/site-setting", // FIXED: Aligned perfectly to your singular `/admin/site-setting` file route paths
    icon: Cog,
    indicator: "SITE_CONF",
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </SessionProvider>
  );
}

// Separate internal render shell mapping context parameters cleanly
function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const handleSystemSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="relative w-full min-h-screen flex antialiased select-none font-mono bg-zinc-50">
      {/* 
        SIDEBAR: HIGH-DENSITY ENTERPRISE COMMAND PANEL (Width: 290px)
      */}
      <aside className="hidden lg:flex w-[290px] shrink-0 h-screen sticky top-0 border-r border-zinc-900 bg-[#07070a] text-zinc-400 flex-col justify-between p-5 relative z-20 shadow-2xl">
        <div className="space-y-6">
          {/* High-Performance Brand Console Header */}
          <div className="flex items-center gap-2.5 px-1.5 py-1 bg-zinc-950/50 border border-zinc-900 rounded-xl">
            <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0">
              <Shield className="w-4 h-4 animate-pulse" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xs font-black tracking-wider uppercase text-zinc-100 truncate">
                Kernel_Operations
              </h1>
              <span className="text-[9px] text-zinc-600 block tracking-widest font-bold uppercase mt-0.5">
                // SYSTEM CORE v2.6
              </span>
            </div>
          </div>

          <Separator className="bg-zinc-900" />

          {/* Navigation Route Assignment Links Matrix */}
          <div className="space-y-1">
            <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest block px-3 pb-1 select-none">
              Infrastructure Nodes
            </span>
            <nav className="space-y-0.5">
              {WORKSPACE_LINKS.map((link) => {
                const LinkIcon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs transition-all border ${
                      isActive
                        ? "bg-zinc-900 border-zinc-800 text-white font-bold shadow-md transform translate-x-1"
                        : "text-zinc-500 hover:text-zinc-300 border-transparent hover:bg-white/[0.01]"
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <LinkIcon
                        className={`w-4 h-4 shrink-0 ${isActive ? "text-indigo-400" : "text-zinc-600"}`}
                      />
                      <span className="truncate">{link.name}</span>
                    </div>
                    <span
                      className={`text-[8px] font-extrabold uppercase tracking-wide px-1.5 py-0.5 rounded shrink-0 ${
                        isActive
                          ? "bg-indigo-950 text-indigo-400 border border-indigo-900/50"
                          : "bg-zinc-950 text-zinc-700"
                      }`}
                    >
                      {link.indicator}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* User Identity Section Container */}
        <div className="space-y-4">
          <Separator className="bg-zinc-900" />

          <div className="flex items-center justify-between p-2 rounded-xl bg-zinc-950/80 border border-zinc-900">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 shrink-0 select-none">
                <User2 className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="block text-[11px] font-bold text-zinc-200 truncate select-text">
                  {session?.user?.email || "Operator_Root"}
                </span>
                <span className="block text-[8px] text-indigo-500 font-extrabold uppercase tracking-wider mt-0.5">
                  SECURE ACCESS LEVEL 4
                </span>
              </div>
            </div>

            {/* FIX: Formatted Dropdown Content to be wrapped in DropdownMenuGroup Primitive */}
            <DropdownMenu>
              <DropdownMenuTrigger className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-900 cursor-pointer transition-colors focus:outline-none select-none border border-transparent">
                <ChevronRight className="w-3.5 h-3.5 transform rotate-90" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                side="top"
                sideOffset={10}
                className="w-48 bg-[#07070a] border border-zinc-900 text-zinc-400 font-mono text-xs rounded-xl shadow-2xl p-1"
              >
                {/* FIXED: All dropdown item layouts are now children of DropdownMenuGroup to inject missing contexts */}
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-zinc-600 text-[9px] uppercase font-bold tracking-wider px-2.5 py-1.5">
                    // CONTROL GATEWAY
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-zinc-900 my-1" />
                  <DropdownMenuItem
                    onClick={handleSystemSignOut}
                    className="text-red-400 focus:bg-red-950/50 focus:text-red-400 cursor-pointer flex items-center justify-between rounded-lg px-2.5 py-2 font-bold uppercase text-[10px] tracking-wide"
                  >
                    Disconnect Node
                    <LogOut className="w-3.5 h-3.5 text-red-500" />
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>

      {/* 
        MAIN CONTENT CANVAS: ENTERPRISE LIGHT THEME ENGINE
      */}
      <div className="flex-1 flex flex-col min-w-0 bg-zinc-50 text-zinc-900 min-h-screen">
        {/* Monitoring Ribbon Bar Header */}
        <header className="h-16 px-6 md:px-8 border-b border-zinc-200 bg-white/80 backdrop-blur-md sticky top-0 flex items-center justify-between relative z-10 select-none">
          <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 tracking-wider">
            <Radio className="w-3.5 h-3.5 text-indigo-600 animate-pulse shrink-0" />
            <span className="text-zinc-400 uppercase">CLUSTER_LINK:</span>
            <span className="text-zinc-900 font-extrabold uppercase bg-zinc-100 border border-zinc-200 px-2 py-0.5 rounded">
              NEON_PROD_ACTIVE
            </span>
          </div>

          <div className="flex items-center gap-4 text-[10px] font-bold text-zinc-400">
            <span className="hidden sm:inline bg-zinc-50 px-2.5 py-1 rounded-md border border-zinc-200 text-zinc-500">
              CIPHER: TLS_AES_256_GCM
            </span>
            <span className="text-zinc-800 font-extrabold flex items-center gap-1.5 bg-zinc-50 px-2.5 py-1 rounded-md border border-zinc-200">
              <Clock className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              {new Date().toLocaleTimeString("en-ZA", {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              SAST
            </span>
          </div>
        </header>

        {/* Primary Page Injection Content Box Frame */}
        <main className="flex-1 p-6 md:p-8 xl:p-12 overflow-y-auto">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
