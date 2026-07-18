"use client";

import React, { useState, useEffect } from "react";
import {
  Sliders,
  Layers,
  Globe,
  Mail,
  ShieldCheck,
  RefreshCw,
  Loader2,
  Trash2,
  CheckCircle,
  Eye,
  Settings,
  Database,
  Terminal,
  FileText,
  AlertTriangle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  getSiteSettingsAction,
  saveSiteSettingsAction,
  deleteSiteSettingsAction,
  getSiteSettingsDiagnosticsAction,
} from "@/actions/site-setting";

interface SiteSettingData {
  siteTitle: string;
  siteDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  email: string;
  phone: string | null;
  location: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  twitterUrl: string | null;
  whatsappUrl: string | null;
  resumeUrl: string | null;
}

interface DiagnosticMetrics {
  hasSettingsNode: boolean;
  associatedProjects: number;
  associatedExperiences: number;
  associatedSkills: number;
  databaseProviderHandshake: string;
  lastTelemetryPing: string;
}

type MenuTab = "METADATA" | "HERO" | "COMMS" | "SOCIAL";

export function SiteSettingsManager() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<MenuTab>("METADATA");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isResetLoading, setIsResetLoading] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [resetConfirmation, setResetConfirmation] = useState("");

  const [diagnostics, setDiagnostics] = useState<DiagnosticMetrics | null>(
    null,
  );
  const [formState, setFormState] = useState<SiteSettingData>({
    siteTitle: "",
    siteDescription: "",
    heroTitle: "",
    heroSubtitle: "",
    email: "",
    phone: "",
    location: "",
    githubUrl: "",
    linkedinUrl: "",
    twitterUrl: "",
    whatsappUrl: "",
    resumeUrl: "",
  });

  const syncControlPanel = async () => {
    setIsLoading(true);
    const [settingsRes, diagnosticsRes] = await Promise.all([
      getSiteSettingsAction(),
      getSiteSettingsDiagnosticsAction(),
    ]);

    if (settingsRes.success && settingsRes.data) {
      const d = settingsRes.data;
      setFormState({
        siteTitle: d.siteTitle || "",
        siteDescription: d.siteDescription || "",
        heroTitle: d.heroTitle || "",
        heroSubtitle: d.heroSubtitle || "",
        email: d.email || "",
        phone: d.phone || "",
        location: d.location || "",
        githubUrl: d.githubUrl || "",
        linkedinUrl: d.linkedinUrl || "",
        twitterUrl: d.twitterUrl || "",
        whatsappUrl: d.whatsappUrl || "",
        resumeUrl: d.resumeUrl || "",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Configuration Query Failed",
        description: settingsRes.error,
      });
    }

    if (diagnosticsRes.success && diagnosticsRes.diagnostics) {
      setDiagnostics(diagnosticsRes.diagnostics as DiagnosticMetrics);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    syncControlPanel();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitLoading(true);

    // Normalize blank strings securely to SQL Null primitives before server actions mapping
    const cleanPayload = Object.fromEntries(
      Object.entries(formState).map(([key, val]) => [
        key,
        typeof val === "string" && val.trim() === "" ? null : val,
      ]),
    );

    const response = await saveSiteSettingsAction(cleanPayload);
    if (response && response.success) {
      toast({
        title: "Runtime Context Synced",
        description:
          "Global system configuration keys flashed cleanly to core environment nodes.",
      });
      await syncControlPanel();
    } else {
      toast({
        variant: "destructive",
        title: "Schema Commit Rejected",
        description:
          response?.error ||
          "Transaction dropped during structural data parsing.",
      });
    }
    setIsSubmitLoading(false);
  };

  const executeFactoryReset = async () => {
    if (resetConfirmation !== "RESET-FACTORY") return;
    setIsResetLoading(true);

    const response = await deleteSiteSettingsAction();
    if (response.success) {
      toast({
        title: "Factory Defaults Restored",
        description: response.message,
      });
      setIsResetOpen(false);
      setResetConfirmation("");
      await syncControlPanel();
    } else {
      toast({
        variant: "destructive",
        title: "Reset Protocol Aborted",
        description: response.error,
      });
    }
    setIsResetLoading(false);
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-[450px] bg-white border border-zinc-200/80 rounded-xl flex flex-col items-center justify-center gap-3 font-mono text-xs">
        <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
        <p className="text-zinc-500 uppercase tracking-widest text-[10px] font-bold">
          Synchronizing System Manifest...
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono text-xs animate-in fade-in duration-300">
      {/* LEFT HAND CONTROLS NAVIGATION DOCK (4 COLUMNS) */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-zinc-950 text-zinc-400 border border-zinc-900 rounded-xl p-5 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-white border-b border-zinc-800 pb-3">
            <Settings className="w-4 h-4 text-indigo-400 animate-spin-slow" />
            <span className="font-bold tracking-tight text-xs uppercase">
              Command Shards
            </span>
          </div>

          <div className="flex flex-col gap-1">
            {[
              {
                id: "METADATA",
                label: "App & SEO Metadata",
                desc: "Core Titles & Index Parameters",
                icon: Globe,
              },
              {
                id: "HERO",
                label: "Hero Canvas Display",
                desc: "Landing Telemetry Layout Text",
                icon: Sliders,
              },
              {
                id: "COMMS",
                label: "Communications Array",
                desc: "Direct Endpoint Intercept Relays",
                icon: Mail,
              },
              {
                id: "SOCIAL",
                label: "Social Identity Map",
                desc: "External Remote Repository Links",
                icon: Layers,
              },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as MenuTab)}
                  className={`w-full text-left p-3 rounded-lg border transition-all text-xs flex items-start gap-3 cursor-pointer group ${
                    isSelected
                      ? "bg-white border-zinc-200 text-zinc-950 font-bold shadow-md transform translate-x-1"
                      : "bg-transparent border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? "text-indigo-600" : "text-zinc-500 group-hover:text-zinc-400"}`}
                  />
                  <div className="space-y-0.5">
                    <span className="block uppercase tracking-wide">
                      {tab.label}
                    </span>
                    <span
                      className={`text-[10px] font-normal block ${isSelected ? "text-zinc-500" : "text-zinc-600"}`}
                    >
                      {tab.desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* INTEGRATED RUNTIME TELEMETRY OVERLAY CARD */}
        {diagnostics && (
          <div className="bg-white border border-zinc-200/80 rounded-xl p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2 border-b border-zinc-100 pb-2 text-zinc-900 font-bold uppercase tracking-wider text-[10px]">
              <Database className="w-3.5 h-3.5 text-zinc-400" />
              Runtime System Diagnostics
            </div>

            <div className="space-y-2 text-[11px] font-mono text-zinc-600">
              <div className="flex justify-between">
                <span className="text-zinc-400">DB Stack:</span>{" "}
                <span className="font-bold text-zinc-900">
                  {diagnostics.databaseProviderHandshake}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Total Projects:</span>{" "}
                <span className="font-bold text-zinc-900">
                  {diagnostics.associatedProjects} nodes
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Total Experiences:</span>{" "}
                <span className="font-bold text-zinc-900">
                  {diagnostics.associatedExperiences} logs
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Total Skills Map:</span>{" "}
                <span className="font-bold text-zinc-900">
                  {diagnostics.associatedSkills} shards
                </span>
              </div>
            </div>
            <div className="pt-2 border-t border-zinc-100 flex justify-between items-center text-[9px] text-zinc-400 uppercase tracking-widest">
              <span>Telemetry Token: Active</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </div>
        )}
      </div>

      {/* RIGHT HAND CONFIGURATION ENGINE CANVAS (8 COLUMNS) */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        <form
          onSubmit={handleUpdate}
          className="bg-white border border-zinc-200/80 rounded-xl shadow-sm flex flex-col overflow-hidden"
        >
          {/* CONTROL SECTION DYNAMIC SHEET HEADER */}
          <div className="p-5 border-b border-zinc-100 bg-zinc-50/50 flex items-center justify-between">
            <div className="space-y-0.5">
              <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-tight">
                {activeTab} Parameter Block
              </h2>
              <p className="text-[10px] text-zinc-400 uppercase tracking-wider">
                Direct Memory Address Workspace Mutations
              </p>
            </div>
            <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-zinc-500 bg-zinc-100 border border-zinc-200 px-2.5 py-1 rounded">
              <Terminal className="w-3 h-3 text-zinc-400" /> Mode: Live-Upsert
            </div>
          </div>

          {/* DYNAMIC FORM INNER CONTENT LAYOUT FIELDS */}
          <div className="p-6 flex-1 min-h-[280px]">
            {activeTab === "METADATA" && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                    Global Application Title
                  </Label>
                  <Input
                    value={formState.siteTitle}
                    onChange={(e) =>
                      setFormState({ ...formState, siteTitle: e.target.value })
                    }
                    placeholder="E.g., Elevate Architecture // Core Ledger"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                    SEO Meta Description Statement
                  </Label>
                  <Textarea
                    value={formState.siteDescription}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        siteDescription: e.target.value,
                      })
                    }
                    placeholder="Provide search engine index logs configurations for active cross-origin scrapers..."
                    className="min-h-[120px] leading-relaxed"
                    required
                  />
                </div>
              </div>
            )}

            {activeTab === "HERO" && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                    Main Hero Headline Node
                  </Label>
                  <Input
                    value={formState.heroTitle}
                    onChange={(e) =>
                      setFormState({ ...formState, heroTitle: e.target.value })
                    }
                    placeholder="E.g., Engineering High-Throughput Production Ledgers"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                    Sub-Headline Breakdown Block
                  </Label>
                  <Textarea
                    value={formState.heroSubtitle}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        heroSubtitle: e.target.value,
                      })
                    }
                    placeholder="Provide detailed capabilities framework summary logs..."
                    className="min-h-[100px] leading-relaxed"
                    required
                  />
                </div>
              </div>
            )}

            {activeTab === "COMMS" && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                    Primary Routing Intercept Email
                  </Label>
                  <Input
                    type="email"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    placeholder="E.g., security-ledger@domain.com"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                      Secure Telephony Comms Node
                    </Label>
                    <Input
                      value={formState.phone || ""}
                      onChange={(e) =>
                        setFormState({ ...formState, phone: e.target.value })
                      }
                      placeholder="+1 (555) 0192-281"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                      Geographical Jurisdiction
                    </Label>
                    <Input
                      value={formState.location || ""}
                      onChange={(e) =>
                        setFormState({ ...formState, location: e.target.value })
                      }
                      placeholder="Zurich, CH (Enterprise Access)"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "SOCIAL" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                      Remote Repository URI (GitHub)
                    </Label>
                    <Input
                      value={formState.githubUrl || ""}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          githubUrl: e.target.value,
                        })
                      }
                      placeholder="https://github.com"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                      Corporate Registry Endpoint (LinkedIn)
                    </Label>
                    <Input
                      value={formState.linkedinUrl || ""}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          linkedinUrl: e.target.value,
                        })
                      }
                      placeholder="https://linkedin.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                      Social Routing Identity Feed (Twitter/X)
                    </Label>
                    <Input
                      value={formState.twitterUrl || ""}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          twitterUrl: e.target.value,
                        })
                      }
                      // ... continuing right from your cut-off position
                      placeholder="https://x.com"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                      Instant Messaging Gateway (WhatsApp)
                    </Label>
                    <Input
                      value={formState.whatsappUrl || ""}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          whatsappUrl: e.target.value,
                        })
                      }
                      placeholder="https://wa.me"
                    />
                  </div>
                </div>
                <div className="space-y-1.5 pt-2">
                  <Label className="text-zinc-500 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-zinc-400" /> Secure
                    Capability Dossier Token (Resume URL)
                  </Label>
                  <Input
                    value={formState.resumeUrl || ""}
                    onChange={(e) =>
                      setFormState({ ...formState, resumeUrl: e.target.value })
                    }
                    placeholder="https://googleapis.com"
                  />
                </div>
              </div>
            )}
          </div>

          {/* DUAL MODE CONTROL SYSTEM ACTION FOOTER */}
          <div className="p-4 border-t border-zinc-100 bg-zinc-50/50 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsResetOpen(true)}
              className="px-3 py-1.5 bg-white border border-red-200 text-red-600 hover:bg-red-50 font-bold uppercase tracking-wider text-[10px] rounded-lg cursor-pointer transition-colors shadow-sm flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" /> Hard Reset Matrix
            </button>

            <Button
              type="submit"
              disabled={isSubmitLoading}
              className="bg-zinc-900 text-white hover:bg-zinc-800 px-6 font-semibold min-w-[150px] shadow-md flex items-center justify-center gap-1.5 cursor-pointer h-9 rounded-lg"
            >
              {isSubmitLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Flashing Chips...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                  Save Configurations
                </>
              )}
            </Button>
          </div>
        </form>

        {/* SPLIT SCREEN LIVE PRESENTATION REALTIME CONTENT CANVASES PREVIEW */}
        <div className="bg-zinc-900 border border-zinc-950 p-5 rounded-xl shadow-xl text-zinc-400 space-y-4 select-none relative overflow-hidden">
          <div className="absolute top-0 right-0 p-1.5 bg-indigo-600 text-white font-bold uppercase tracking-widest text-[8px] rounded-bl border-l border-b border-zinc-950 flex items-center gap-1">
            <Eye className="w-2.5 h-2.5" /> Output Monitor Canvas
          </div>
          <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-zinc-500 tracking-wider">
            <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block mr-1" />{" "}
            Live Render Preview Node
          </div>
          <div className="space-y-2 border-t border-zinc-800 pt-3">
            <div className="text-white font-extrabold text-base tracking-tight leading-snug font-sans">
              {formState.heroTitle || "Awaiting Title Parameters Input..."}
            </div>
            <div className="text-[11px] text-zinc-500 font-normal leading-relaxed font-sans max-w-xl">
              {formState.heroSubtitle ||
                "Provide capabilities data breakdown logic details inside inputs arrays configuration frames..."}
            </div>
          </div>
        </div>
      </div>

      {/* ENTERPRISE FACTORY ROLLBACK CONFIRMATION OVERLAY */}
      <Dialog
        open={isResetOpen}
        onOpenChange={(open) => {
          if (!open && !isResetLoading) {
            setIsResetOpen(false);
            setResetConfirmation("");
          }
        }}
      >
        <DialogContent className="sm:max-w-[460px] bg-white border border-zinc-200 shadow-2xl rounded-xl p-6 font-mono text-xs select-none">
          <DialogHeader className="space-y-3">
            <div className="flex items-center gap-2.5 pb-2 border-b border-red-100 text-red-700">
              <div className="p-2 bg-red-50 border border-red-200/60 rounded-lg shrink-0">
                <AlertTriangle className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <DialogTitle className="font-mono font-bold tracking-tight text-sm uppercase text-red-700">
                  Emergency Reset Sequence
                </DialogTitle>
                <span className="text-[10px] text-red-500 font-semibold tracking-wider uppercase block mt-0.5">
                  Destructive Configuration Wipe Mutation
                </span>
              </div>
            </div>
            <DialogDescription className="text-zinc-600 font-mono text-xs leading-relaxed pt-1">
              Executing this operation terminates the entire configuration
              singleton row model, overwrites SEO tracking metadata parameters,
              and runs a hard fallback to local environment seeding defaults.
            </DialogDescription>
          </DialogHeader>

          {/* Security Input Challenge Block Wrapper */}
          <div className="mt-4 p-4 bg-zinc-50 border border-zinc-200/80 rounded-lg space-y-2.5">
            <label className="text-zinc-500 font-bold uppercase tracking-wider text-[10px] block">
              Security Verification Challenge
            </label>
            <p className="text-[11px] text-zinc-600 font-normal">
              Type{" "}
              <span className="font-bold text-zinc-950 select-text bg-zinc-200/80 px-1 py-0.5 rounded border border-zinc-300">
                RESET-FACTORY
              </span>{" "}
              down below to release write block limitations:
            </p>
            <Input
              type="text"
              disabled={isResetLoading}
              value={resetConfirmation}
              onChange={(e) => setResetConfirmation(e.target.value)}
              placeholder="Enter validation phrase"
              className="h-9 border-zinc-200 font-mono text-xs bg-white text-zinc-900 tracking-wider font-bold uppercase"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 mt-2 border-t border-zinc-100">
            <Button
              type="button"
              variant="outline"
              disabled={isResetLoading}
              onClick={() => {
                setIsResetOpen(false);
                setResetConfirmation("");
              }}
              className="border-zinc-200 text-zinc-700 h-9 font-mono text-xs cursor-pointer bg-white hover:bg-zinc-50"
            >
              Abort Lifecycle
            </Button>
            <Button
              type="button"
              onClick={executeFactoryReset}
              disabled={isResetLoading || resetConfirmation !== "RESET-FACTORY"}
              className="bg-red-600 hover:bg-red-700 disabled:bg-zinc-100 disabled:border-zinc-200 disabled:text-zinc-400 border border-transparent text-white h-9 font-mono text-xs font-bold px-4 rounded-lg cursor-pointer transition-colors shadow-sm min-w-[155px] flex items-center justify-center gap-1.5"
            >
              {isResetLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Wiping Registers...
                </>
              ) : (
                "Confirm Factory Reset"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
