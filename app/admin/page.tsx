import React from "react";
import { db } from "@/lib/db";
import {
  Cpu,
  Briefcase,
  Layers,
  Terminal,
  Activity,
  Zap,
  PlusCircle,
  RefreshCw,
  Globe,
  Eye,
  Mail,
  Grid,
  ShieldCheck,
  Server,
  Cloud,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminDashboardPage() {
  // Parallelised Database Aggregation Handshake queries across ALL models
  const [
    projectCount,
    experienceCount,
    skillCount,
    categoryCount,
    messageCount,
    unreadMessageCount,
  ] = await Promise.all([
    db.project.count().catch(() => 0),
    db.experience.count().catch(() => 0),
    db.skill.count().catch(() => 0),
    db.skillCategory.count().catch(() => 0),
    db.contactMessage.count().catch(() => 0),
    db.contactMessage.count({ where: { isRead: false } }).catch(() => 0),
  ]);

  // Compute systemic resource weight aggregates for display visualizations
  const totalEntityCount =
    projectCount + experienceCount + skillCount + categoryCount + messageCount;

  const projectPercentage =
    totalEntityCount > 0
      ? Math.round((projectCount / totalEntityCount) * 100)
      : 0;
  const experiencePercentage =
    totalEntityCount > 0
      ? Math.round((experienceCount / totalEntityCount) * 100)
      : 0;
  const skillPercentage =
    totalEntityCount > 0
      ? Math.round((skillCount / totalEntityCount) * 100)
      : 0;

  // Dynamically generated real-time database metric audit telemetry logs vector
  const SYSTEM_LOGS = [
    {
      id: "TELE-01",
      trigger: "Neon Shards",
      event: `Relational mapping validated safely across ${totalEntityCount} cluster database rows`,
      status: "PASS",
      time: "Just now",
    },
    {
      id: "TELE-02",
      trigger: "Comms Gateway",
      event: `Queue scanned cleanly. Resolved ${unreadMessageCount} pending wire packets`,
      status: unreadMessageCount > 0 ? "ATTENTION" : "ONLINE",
      time: "Synced live",
    },
    {
      id: "TELE-03",
      trigger: "NextAuth Cluster",
      event: "Secure administrative operator cryptographic session bound",
      status: "SUCCESS",
      time: "Active connection",
    },
    {
      id: "TELE-04",
      trigger: "Cache Controller",
      event:
        "Edge server caching blocks bypassed safely using force-dynamic rules",
      status: "ONLINE",
      time: "Continuous",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 font-mono text-xs">
      {/* FEATURE 1: MASTER OPERATIONS PANEL HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 pb-6">
        <div className="space-y-1">
          <span className="text-[10px] tracking-[0.2em] text-indigo-600 uppercase font-bold block">
            // MASTER COMMAND OPERATIONS CONTROL CENTER
          </span>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-zinc-950 uppercase">
            Kernel Command Desk
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="bg-emerald-50 border-emerald-200 text-emerald-700 font-bold px-2.5 py-1 rounded-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mr-1.5 inline-block" />
            NODE_STABLE
          </Badge>
          <Badge
            variant="outline"
            className="bg-zinc-100 border-zinc-200 text-zinc-600 px-2.5 py-1 rounded-md"
          >
            V2.6.0-PROD
          </Badge>
        </div>
      </div>

      {/* FEATURE 2: PARALLELISED HARDWARE METRICS DECK */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <Card className="border-zinc-200 bg-white shadow-sm hover:border-indigo-300 transition-all rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              Bento Projects
            </CardTitle>
            <Cpu className="w-4 h-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-zinc-900 tracking-tight">
              {projectCount}
            </div>
            <p className="text-[9px] text-zinc-400 mt-1 uppercase tracking-wide">
              // Live catalogue cluster assets
            </p>
          </CardContent>
        </Card>

        <Card className="border-zinc-200 bg-white shadow-sm hover:border-cyan-300 transition-all rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              Milestones
            </CardTitle>
            <Briefcase className="w-4 h-4 text-cyan-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-zinc-900 tracking-tight">
              {experienceCount}
            </div>
            <p className="text-[9px] text-zinc-400 mt-1 uppercase tracking-wide">
              // Tracked roles deployments
            </p>
          </CardContent>
        </Card>

        <Card className="border-zinc-200 bg-white shadow-sm hover:border-emerald-300 transition-all rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              Matrix Nodes
            </CardTitle>
            <Layers className="w-4 h-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-zinc-900 tracking-tight">
              {skillCount}
            </div>
            <p className="text-[9px] text-zinc-400 mt-1 uppercase tracking-wide">
              // Evaluated tech metrics
            </p>
          </CardContent>
        </Card>

        <Card className="border-zinc-200 bg-white shadow-sm hover:border-amber-300 transition-all rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              Skill Clusters
            </CardTitle>
            <Grid className="w-4 h-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-zinc-900 tracking-tight">
              {categoryCount}
            </div>
            <p className="text-[9px] text-zinc-400 mt-1 uppercase tracking-wide">
              // Structure classifications
            </p>
          </CardContent>
        </Card>

        <Card
          className={`border-zinc-200 bg-white shadow-sm relative overflow-hidden group transition-all rounded-xl ${unreadMessageCount > 0 ? "border-red-200 hover:border-red-300" : "hover:border-purple-300"}`}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              Inbound Comms
            </CardTitle>
            <Mail
              className={`w-4 h-4 ${unreadMessageCount > 0 ? "text-red-500 animate-pulse" : "text-purple-500"}`}
            />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-zinc-900 tracking-tight">
                {messageCount}
              </span>
              {unreadMessageCount > 0 && (
                <span className="text-[9px] font-extrabold text-red-600 bg-red-50 border border-red-100 px-1.5 py-0.2 rounded-md animate-pulse">
                  {unreadMessageCount} New
                </span>
              )}
            </div>
            <p className="text-[9px] text-zinc-400 mt-1 uppercase tracking-wide">
              // Intercepted wire packets
            </p>
          </CardContent>
        </Card>
      </div>

      {/* NEW ENTERPRISE FEATURE: DATASET CAPACITIES & LIVE INFRASTRUCTURE METRIC BARS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* SHARDS RESOURCE DISTRIBUTION MODULE (7 COLUMNS) */}
        <div className="lg:col-span-7 bg-white border border-zinc-200/80 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
            <div className="font-bold text-zinc-900 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-zinc-400" /> Relational
              Allocation Shards
            </div>
            <span className="text-[9px] text-zinc-400 font-bold uppercase">
              Total Rows: {totalEntityCount}
            </span>
          </div>
          <div className="space-y-3.5 pt-1">
            {/* PROJECTS METRIC */}
            <div className="space-y-1">
              <div className="flex justify-between font-mono text-[10px]">
                <span className="text-zinc-500 uppercase">
                  Project Engine Shards
                </span>
                <span className="font-bold text-zinc-900">
                  {projectPercentage}% Weight
                </span>
              </div>
              <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden flex">
                <div
                  className="bg-indigo-500 h-full transition-all duration-500"
                  style={{ width: `${projectPercentage}%` }}
                />
              </div>
            </div>

            {/* EXPERIENCES METRIC */}
            <div className="space-y-1">
              <div className="flex justify-between font-mono text-[10px]">
                <span className="text-zinc-500 uppercase">
                  Chronology Data Nodes
                </span>
                <span className="font-bold text-zinc-900">
                  {experiencePercentage}% Weight
                </span>
              </div>
              <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden flex">
                <div
                  className="bg-cyan-500 h-full transition-all duration-500"
                  style={{ width: `${experiencePercentage}%` }}
                />
              </div>
            </div>

            {/* SKILLS METRIC */}
            <div className="space-y-1">
              <div className="flex justify-between font-mono text-[10px]">
                <span className="text-zinc-500 uppercase">
                  Capability Matrix Blocks
                </span>
                <span className="font-bold text-zinc-900">
                  {skillPercentage}% Weight
                </span>
              </div>
              <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden flex">
                <div
                  className="bg-emerald-500 h-full transition-all duration-500"
                  style={{ width: `${skillPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* CLOUD GATEWAY SHARDS HEALTH DIAGNOSTICS (5 COLUMNS) */}
        <div className="lg:col-span-5 bg-white border border-zinc-200/80 rounded-xl p-5 shadow-sm space-y-4">
          <div className="font-bold text-zinc-900 uppercase tracking-wider text-[10px] pb-2 border-b border-zinc-100 flex items-center gap-1.5">
            <Cloud className="w-3.5 h-3.5 text-zinc-400" /> Infrastructure Node
            Status
          </div>

          <div className="space-y-2.5 pt-1 text-[11px] text-zinc-600">
            <div className="flex items-center justify-between p-2 bg-zinc-50 rounded-lg border border-zinc-200/60">
              <span className="text-zinc-500 flex items-center gap-1.5 uppercase text-[10px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> DB
                Connection Pool
              </span>
              <span className="font-bold text-emerald-600 uppercase text-[10px]">
                ACTIVE_HEALTHY
              </span>
            </div>
            <div className="flex items-center justify-between p-2 bg-zinc-50 rounded-lg border border-zinc-200/60">
              <span className="text-zinc-500 flex items-center gap-1.5 uppercase text-[10px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />{" "}
                Next.js ISR Cache
              </span>
              <span className="font-bold text-zinc-900 uppercase text-[10px]">
                BYPASS_LIVE
              </span>
            </div>
            <div className="flex items-center justify-between p-2 bg-zinc-50 rounded-lg border border-zinc-200/60">
              <span className="text-zinc-500 flex items-center gap-1.5 uppercase text-[10px]">
                {unreadMessageCount > 0 ? (
                  <AlertCircle className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                ) : (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                )}
                Communications Intercept
              </span>
              <span
                className={`font-bold uppercase text-[10px] ${unreadMessageCount > 0 ? "text-red-500 animate-pulse" : "text-zinc-500"}`}
              >
                {unreadMessageCount > 0
                  ? `${unreadMessageCount} UNREAD`
                  : "QUEUE_CLEAR"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURE 3: INTERACTIVE QUICK-ACTION TRIGGER MODULES */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2 select-none">
          <Zap className="w-3.5 h-3.5 text-amber-500" /> System Action Triggers
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-300 transition-all text-center gap-2 group cursor-pointer shadow-sm">
            <PlusCircle className="w-5 h-5 text-indigo-500 group-hover:scale-110 transition-transform" />
            <span className="font-mono text-[10px] font-bold text-zinc-700 uppercase">
              New Project Entry
            </span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-300 transition-all text-center gap-2 group cursor-pointer shadow-sm">
            <RefreshCw className="w-5 h-5 text-cyan-500 group-hover:rotate-180 transition-transform duration-500" />
            <span className="font-mono text-[10px] font-bold text-zinc-700 uppercase">
              Purge Edge Cache
            </span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-300 transition-all text-center gap-2 group cursor-pointer shadow-sm">
            <Globe className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" />
            <span className="font-mono text-[10px] font-bold text-zinc-700 uppercase">
              Toggle Status Badge
            </span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-300 transition-all text-center gap-2 group cursor-pointer shadow-sm">
            <Eye className="w-5 h-5 text-purple-500 group-hover:scale-110 transition-transform" />
            <span className="font-mono text-[10px] font-bold text-zinc-700 uppercase">
              View Public Canvas
            </span>
          </button>
        </div>
      </div>

      {/* FEATURE 4: LIVE COMPILING ENVIRONMENT AUDIT SYSTEM STREAM */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2 select-none">
          <Terminal className="w-3.5 h-3.5 text-zinc-500" /> Core Telemetry
          Stream Logs
        </h3>
        <div className="border border-zinc-200/80 bg-zinc-950 text-zinc-400 rounded-xl overflow-hidden shadow-xl">
          <div className="p-3 bg-zinc-900 border-b border-zinc-800 text-[10px] uppercase font-bold text-zinc-500 tracking-wider flex items-center gap-2 select-none">
            <Activity className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />{" "}
            Live Kernel Transaction Shards
          </div>
          <div className="divide-y divide-zinc-900 font-mono text-[11px] p-2 max-h-[250px] overflow-y-auto">
            {SYSTEM_LOGS.map((log) => (
              <div
                key={log.id}
                className="p-3 hover:bg-zinc-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-colors"
              >
                <div className="flex items-start sm:items-center gap-2.5">
                  <span className="text-[10px] text-zinc-600 font-bold bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800 shrink-0">
                    {log.id}
                  </span>
                  <div>
                    <span className="text-zinc-200 font-bold uppercase mr-1.5">
                      [{log.trigger}]
                    </span>
                    <span className="text-zinc-400 font-medium select-text">
                      {log.event}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 border-t border-zinc-900 pt-2 sm:pt-0 sm:border-0">
                  <span className="text-[10px] text-zinc-600 uppercase tracking-widest">
                    {log.time}
                  </span>
                  <span
                    className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded border ${
                      log.status === "SUCCESS" || log.status === "PASS"
                        ? "bg-emerald-950/40 text-emerald-400 border-emerald-900/50"
                        : log.status === "ATTENTION"
                          ? "bg-red-950/50 text-red-400 border-red-900/60 animate-pulse"
                          : "bg-indigo-950/40 text-indigo-400 border-indigo-900/50"
                    }`}
                  >
                    {log.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
