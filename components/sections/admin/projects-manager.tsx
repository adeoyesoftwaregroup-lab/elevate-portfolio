"use client";

import React, { useState, useEffect } from "react";

import {
  PlusCircle,
  Search,
  Trash2,
  ExternalLink,
  Loader2,
  Cpu,
  Layers,
  Terminal,
  RefreshCw,
  UploadCloud,
  CheckCircle,
  Pencil,
} from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  createProjectAction,
  deleteProjectAction,
  getAllProjectsAction,
  updateProjectAction, // Ensure you add this update function to your actions file
} from "@/actions/projects";

interface ProjectData {
  id: string;
  title: string;
  category: string;
  description: string;
  metric: string;
  stack: string[];
  type: string | null;
  size: string | null;
  imageSrc: string;
  liveUrl: string;
  repoUrl: string;
  featured: boolean;
  published: boolean;
  sortOrder: number;
}

interface ProjectFormState {
  title: string;
  category: string;
  description: string;
  metric: string;
  stackInput: string;
  type: string;
  size: string;
  imageSrc: string;
  liveUrl: string;
  repoUrl: string;
  featured: boolean;
  published: boolean;
  sortOrder: number;
}

export function ProjectsManager() {
  const { toast } = useToast();
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(
    null,
  );
  const [isPurging, setIsPurging] = useState(false);
  const [purgeConfirmationInput, setPurgeConfirmationInput] = useState("");

  const [formPayload, setFormPayload] = useState<ProjectFormState>({
    title: "",
    category: "",
    description: "",
    metric: "",
    stackInput: "",
    type: "backend",
    size: "lg:col-span-6",
    imageSrc: "",
    liveUrl: "#",
    repoUrl: "#",
    featured: false,
    published: true,
    sortOrder: 0,
  });

  const syncProjectsCatalogue = async () => {
    setIsLoading(true);
    const result = await getAllProjectsAction();
    if (result.success && result.data) {
      setProjects(result.data as ProjectData[]);
    } else {
      toast({
        variant: "destructive",
        title: "Sync Operation Aborted",
        description: result.error,
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    syncProjectsCatalogue();
  }, []);

  // Handle Edit Activation
  const handleEditTrigger = (id: string) => {
    const project = projects.find((p) => p.id === id);
    if (!project) return;

    setEditingProjectId(id);
    setFormPayload({
      title: project.title,
      category: project.category,
      description: project.description,
      metric: project.metric,
      stackInput: project.stack.join(", "),
      type: project.type || "backend",
      size: project.size || "lg:col-span-6",
      imageSrc: project.imageSrc,
      liveUrl: project.liveUrl,
      repoUrl: project.repoUrl,
      featured: project.featured,
      published: project.published,
      sortOrder: project.sortOrder,
    });
    setIsDialogOpen(true);
  };

  // Handle Quick Status Publishing Toggle
  const handlePublishTrigger = async (
    id: string,
    currentPublishedStatus: boolean,
  ) => {
    try {
      const response = await updateProjectAction(id, {
        published: !currentPublishedStatus,
      });

      if (response && response.success) {
        toast({
          title: "Status Transmitted",
          description: `Project visibility updated successfully.`,
        });
        await syncProjectsCatalogue();
      } else {
        throw new Error(response?.error || "State mutation rejected.");
      }
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Publish Handshake Failed",
        description: err.message,
      });
    }
  };

  // Unified submission interceptor for creation and edits
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formPayload.imageSrc || formPayload.imageSrc.trim() === "") {
      toast({
        variant: "destructive",
        title: "Media Asset Missing",
        description:
          "Please upload a project image showcase before attempting compilation.",
      });
      return;
    }

    setIsSubmitLoading(true);

    try {
      const formattedStack = formPayload.stackInput
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const purePayload = {
        title: String(formPayload.title).trim(),
        category: String(formPayload.category).trim(),
        description: String(formPayload.description).trim(),
        metric: String(formPayload.metric).trim(),
        stack: formattedStack,
        type: String(formPayload.type),
        size: String(formPayload.size),
        imageSrc: String(formPayload.imageSrc).trim(),
        liveUrl: String(formPayload.liveUrl || "#").trim(),
        repoUrl: String(formPayload.repoUrl || "#").trim(),
        featured: formPayload.featured,
        published: formPayload.published,
        sortOrder: Number(formPayload.sortOrder),
        iconName: formPayload.type === "backend" ? "Cpu" : "Globe",
        accent: "border-indigo-500/30 text-indigo-400",
      };

      const sterilePayload = JSON.parse(JSON.stringify(purePayload));
      let response;

      if (editingProjectId) {
        // Run Edit Update Route
        response = await updateProjectAction(editingProjectId, sterilePayload);
      } else {
        // Run Standard Create Route
        response = await createProjectAction(sterilePayload);
      }

      if (response && response.success) {
        toast({
          title: editingProjectId
            ? "Entity Mutation Fixed"
            : "Database Node Synced",
          description: editingProjectId
            ? "Project node modified securely."
            : "Project asset successfully integrated into Neon.",
        });

        // Clean reset form environment
        setIsDialogOpen(false);
        setEditingProjectId(null);
        setFormPayload({
          title: "",
          category: "",
          description: "",
          metric: "",
          stackInput: "",
          type: "backend",
          size: "lg:col-span-6",
          imageSrc: "",
          liveUrl: "#",
          repoUrl: "#",
          featured: false,
          published: true,
          sortOrder: 0,
        });
        await syncProjectsCatalogue();
      } else {
        toast({
          variant: "destructive",
          title: "Server Transaction Dropped",
          description:
            response?.error || "Transaction rejected by processing layers.",
        });
      }
    } catch (clientCatchErr: any) {
      toast({
        variant: "destructive",
        title: "Pipeline Link Failure",
        description: clientCatchErr?.message || "An unhandled error occurred.",
      });
    } finally {
      setIsSubmitLoading(false);
    }
  };

  // This replaces your previous handlePostDelete function architecture completely
  const handleDeleteTrigger = (id: string) => {
    setDeletingProjectId(id);
  };

  // Separate dedicated execution layer to commit database deletion mutations
  const executeAssetPurge = async () => {
    if (!deletingProjectId || purgeConfirmationInput !== "FORCE-PURGE") return;

    setIsPurging(true);
    try {
      const response = await deleteProjectAction(deletingProjectId);
      if (response.success) {
        toast({ title: "Entity Purged", description: response.message });
        await syncProjectsCatalogue();
      } else {
        toast({
          variant: "destructive",
          title: "Purge Handshake Failed",
          description: response.error,
        });
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Critical Mutation Drop",
        description:
          "A hardware communication exception occurred during drop actions.",
      });
    } finally {
      setIsPurging(false);
      setDeletingProjectId(null);
      setPurgeConfirmationInput(""); // Reset tracking text field securely
    }
  };

  // ... continuing right from your cut-off position
  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Controls Container */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-zinc-200/80 shadow-sm">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <Input
            type="text"
            placeholder="Search projects catalog..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 font-mono text-xs border-zinc-200 bg-zinc-50/50 text-zinc-900"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={syncProjectsCatalogue}
            disabled={isLoading}
            className="h-9 border-zinc-200 font-mono text-xs font-semibold text-zinc-700 bg-white hover:bg-zinc-50"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 mr-1.5 ${isLoading ? "animate-spin" : ""}`}
            />
            Sync Grid
          </Button>

          {/* Dialog Container Wrapper */}
          {/** Dialog Modify */}
          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) {
                // Clear out edit status securely when closed out
                setEditingProjectId(null);
                setFormPayload({
                  title: "",
                  category: "",
                  description: "",
                  metric: "",
                  stackInput: "",
                  type: "backend",
                  size: "lg:col-span-6",
                  imageSrc: "",
                  liveUrl: "#",
                  repoUrl: "#",
                  featured: false,
                  published: true,
                  sortOrder: 0,
                });
              }
            }}
          >
            {/* REMOVED asChild completely, added render attribute instead */}
            <DialogTrigger
              render={
                <Button className="h-9 bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs font-semibold px-4 rounded-lg flex items-center gap-2 shadow-sm cursor-pointer">
                  <PlusCircle className="w-4 h-4" />
                  New Asset
                </Button>
              }
            />

            <DialogContent className="sm:max-w-[550px] max-h-[85vh] overflow-y-auto bg-white border border-zinc-200 shadow-xl rounded-xl p-6">
              <DialogHeader>
                <DialogTitle className="font-mono font-bold text-zinc-900 tracking-tight text-lg">
                  {editingProjectId
                    ? "Modify System Node Architecture"
                    : "Initialize New Pipeline Project"}
                </DialogTitle>
                <DialogDescription className="text-zinc-500 font-mono text-xs mt-1">
                  {editingProjectId
                    ? "Commit mutation adjustments back into your structural data store arrays."
                    : "Fill data nodes below cleanly to serialize a brand new application into Neon tables."}
                </DialogDescription>
              </DialogHeader>

              <form
                onSubmit={handleFormSubmit}
                className="space-y-4 font-mono text-xs mt-4"
              >
                <div className="space-y-1.5">
                  <Label className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                    Project Title
                  </Label>
                  <Input
                    value={formPayload.title}
                    onChange={(e) =>
                      setFormPayload({ ...formPayload, title: e.target.value })
                    }
                    placeholder="E.g., Hyperion Core Ledger"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                      Category Pipeline
                    </Label>
                    <Input
                      value={formPayload.category}
                      onChange={(e) =>
                        setFormPayload({
                          ...formPayload,
                          category: e.target.value,
                        })
                      }
                      placeholder="E.g., Infrastructure Automation"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                      Performance Metric Index
                    </Label>
                    <Input
                      value={formPayload.metric}
                      onChange={(e) =>
                        setFormPayload({
                          ...formPayload,
                          metric: e.target.value,
                        })
                      }
                      placeholder="E.g., 42ms Latency Max"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                    Core Stack Tokens (Comma-separated)
                  </Label>
                  <Input
                    value={formPayload.stackInput}
                    onChange={(e) =>
                      setFormPayload({
                        ...formPayload,
                        stackInput: e.target.value,
                      })
                    }
                    placeholder="Next.js, Rust, Kafka, Redis"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                      Pipeline Context Class
                    </Label>
                    <Select
                      value={formPayload.type}
                      onValueChange={(v) =>
                        setFormPayload({ ...formPayload, type: v as string })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-zinc-200">
                        <SelectItem value="backend">
                          Backend (Core Systems)
                        </SelectItem>
                        <SelectItem value="fullstack">
                          Fullstack (Web Canvas)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                      Sort Execution Weight
                    </Label>
                    <Input
                      type="number"
                      value={formPayload.sortOrder}
                      onChange={(e) =>
                        setFormPayload({
                          ...formPayload,
                          sortOrder: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                    Project Description Block
                  </Label>
                  <Textarea
                    value={formPayload.description}
                    onChange={(e) =>
                      setFormPayload({
                        ...formPayload,
                        description: e.target.value,
                      })
                    }
                    placeholder="Detailed structural logs and feature scope details..."
                    className="min-h-[80px]"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                      Live Operational URI
                    </Label>
                    <Input
                      value={formPayload.liveUrl}
                      onChange={(e) =>
                        setFormPayload({
                          ...formPayload,
                          liveUrl: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                      Repository Source Node
                    </Label>
                    <Input
                      value={formPayload.repoUrl}
                      onChange={(e) =>
                        setFormPayload({
                          ...formPayload,
                          repoUrl: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                {/* ADVANCED IMAGE UPLOAD METHOD: Leverages next-cloudinary with live visual previews */}
                <div className="space-y-2">
                  <Label className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">
                    Design Mockup Asset
                  </Label>

                  <CldUploadWidget
                    uploadPreset={
                      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ||
                      "portfolio_preset"
                    }
                    onSuccess={(result) => {
                      const info = result?.info as any;
                      if (info && info.secure_url) {
                        setFormPayload((prev) => ({
                          ...prev,
                          imageSrc: info.secure_url,
                        }));
                        toast({
                          title: "Asset Uploaded",
                          description:
                            "Image link mapped to the database handshake buffer.",
                        });
                      }
                    }}
                  >
                    {({ open }) => {
                      return (
                        <div className="w-full relative">
                          {formPayload.imageSrc ? (
                            /* LIVE IMAGE CANVAS VIEWPORT PREVIEW CONTAINER */
                            <div className="relative w-full h-32 rounded-lg border border-emerald-200 bg-zinc-50 overflow-hidden group shadow-sm animate-in fade-in zoom-in-95 duration-200">
                              {/* Native Next.js Image Element for pixel-perfect compression displays */}
                              <img
                                src={formPayload.imageSrc}
                                alt="Project Asset Preview"
                                className="w-full h-full object-cover object-top filter brightness-95"
                              />

                              {/* Overlay Glass Hover Mask to easily clear or update files */}
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-all duration-150">
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => open()}
                                  className="h-8 bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white font-mono text-[10px] font-bold"
                                >
                                  CHANGE MEDIA
                                </Button>
                                <Button
                                  type="button"
                                  variant="destructive"
                                  onClick={(e) => {
                                    e.stopPropagation(); // Prevents click bubbling triggers
                                    setFormPayload((prev) => ({
                                      ...prev,
                                      imageSrc: "",
                                    }));
                                  }}
                                  className="h-8 bg-red-600 font-mono text-[10px] text-white font-bold hover:bg-red-700"
                                >
                                  CLEAR
                                </Button>
                              </div>

                              {/* Verified status overlay indicator card badge */}
                              <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-emerald-500 text-white font-mono text-[9px] font-black uppercase tracking-wider shadow-md shadow-black/20 flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" /> VERIFIED
                              </div>
                            </div>
                          ) : (
                            /* COLD DRAG-ZONE TRIGGER LAYOUT FRAME */
                            <div
                              onClick={() => open()}
                              className="w-full h-24 rounded-lg border border-dashed border-zinc-200 bg-zinc-50 hover:bg-zinc-100/50 text-zinc-400 hover:text-zinc-500 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all duration-200 select-none"
                            >
                              <UploadCloud className="w-5 h-5 text-zinc-400" />
                              <span className="font-mono text-[10px] font-bold uppercase tracking-wider">
                                Deploy Canvas Image Asset
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    }}
                  </CldUploadWidget>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className="border-zinc-200"
                  >
                    Abort
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitLoading}
                    className="bg-zinc-900 text-white hover:bg-zinc-800"
                  >
                    {isSubmitLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : editingProjectId ? (
                      "Commit Mutation"
                    ) : (
                      "Compile Asset"
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
          {/* CUSTOM SYSTEM PURGE CONFIRMATION DIALOG INTERFACE */}
          {/* ENTERPRISE-GRADE INFRASTRUCTURE MUTATION PURGE INTERFACE */}
          <Dialog
            open={deletingProjectId !== null}
            onOpenChange={(open) => {
              if (!open && !isPurging) {
                setDeletingProjectId(null);
                setPurgeConfirmationInput("");
              }
            }}
          >
            <DialogContent className="sm:max-w-[460px] bg-white border border-zinc-200 shadow-2xl rounded-xl p-6 font-mono text-xs select-none">
              <DialogHeader className="space-y-3">
                {/* Risk Alert Indicator Header */}
                <div className="flex items-center gap-2.5 pb-2 border-b border-red-100 text-red-700">
                  <div className="p-2 bg-red-50 border border-red-200/60 rounded-lg shrink-0">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <DialogTitle className="font-mono font-bold tracking-tight text-sm uppercase text-red-700">
                      Critical Action Required
                    </DialogTitle>
                    <span className="text-[10px] text-red-500 font-semibold tracking-wider uppercase block mt-0.5">
                      Destructive Database Write Mutation
                    </span>
                  </div>
                </div>

                <DialogDescription className="text-zinc-600 font-mono text-xs leading-relaxed pt-1">
                  This transaction is **non-reversible**. Executing this action
                  terminates the target runtime asset node configuration
                  parameters and scrubs related index arrays permanently from
                  your production Neon storage system.
                </DialogDescription>
              </DialogHeader>

              {/* Operator Verification Input Challenge */}
              <div className="mt-4 p-4 bg-zinc-50 border border-zinc-200/80 rounded-lg space-y-2.5">
                <label className="text-zinc-500 font-bold uppercase tracking-wider text-[10px] block">
                  Security Verification Challenge
                </label>
                <p className="text-[11px] text-zinc-600 font-normal">
                  Type{" "}
                  <span className="font-bold text-zinc-950 select-text bg-zinc-200/80 px-1 py-0.5 rounded border border-zinc-300">
                    FORCE-PURGE
                  </span>{" "}
                  down below to release write block limitations:
                </p>
                <Input
                  type="text"
                  disabled={isPurging}
                  value={purgeConfirmationInput}
                  onChange={(e) => setPurgeConfirmationInput(e.target.value)}
                  placeholder="Enter verification phrase"
                  className="h-9 border-zinc-200 font-mono text-xs bg-white text-zinc-900 tracking-wider font-bold uppercase"
                />
              </div>

              {/* Execution Footer Action Array */}
              <div className="flex justify-end gap-2 pt-4 mt-2 border-t border-zinc-100">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isPurging}
                  onClick={() => {
                    setDeletingProjectId(null);
                    setPurgeConfirmationInput("");
                  }}
                  className="border-zinc-200 text-zinc-700 h-9 font-mono text-xs cursor-pointer bg-white hover:bg-zinc-50 disabled:opacity-50"
                >
                  Abort Lifecycle
                </Button>
                <Button
                  type="button"
                  onClick={executeAssetPurge}
                  disabled={
                    isPurging || purgeConfirmationInput !== "FORCE-PURGE"
                  }
                  className="bg-red-600 hover:bg-red-700 disabled:bg-zinc-100 disabled:border-zinc-200 disabled:text-zinc-400 border border-transparent text-white h-9 font-mono text-xs font-bold px-4 rounded-lg cursor-pointer transition-colors shadow-sm min-w-[140px] flex items-center justify-center gap-1.5"
                >
                  {isPurging ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Purging Storage...
                    </>
                  ) : (
                    "Confirm Purge"
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Main Table Grid Infrastructure */}
      <div className="bg-white rounded-xl border border-zinc-200/80 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-50/70 border-b border-zinc-200 font-mono text-[10px] text-zinc-400 font-bold uppercase">
            <TableRow>
              <TableHead className="w-[240px] text-zinc-500">
                Project Title
              </TableHead>
              <TableHead className="w-[180px] text-zinc-500">
                Category / Pipeline
              </TableHead>
              <TableHead className="w-[120px] text-zinc-500">
                Metric Index
              </TableHead>
              <TableHead className="max-w-[280px] text-zinc-500">
                Core Stack Array Tokens
              </TableHead>
              <TableHead className="w-[180px] text-right text-zinc-500">
                Operations
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-xs text-zinc-700 font-mono">
            {filteredProjects.map((project) => (
              <TableRow
                key={project.id}
                className="hover:bg-zinc-50/50 border-b border-zinc-100 transition-colors"
              >
                <TableCell className="font-bold text-zinc-900 group">
                  <span className="block max-w-[220px] truncate">
                    {project.title}
                  </span>
                  <span className="text-[9px] text-zinc-400 font-normal block font-mono truncate uppercase tracking-widest">
                    {project.id}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="bg-indigo-5/50 border-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase font-mono"
                  >
                    {project.type || "backend"}
                  </Badge>
                </TableCell>
                <TableCell className="font-bold text-emerald-600">
                  {project.metric}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1 max-w-[280px]">
                    {project.stack.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="text-[9px] bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-200 text-zinc-500 font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 4 && (
                      <span className="text-[9px] text-zinc-400 font-bold">
                        +{project.stack.length - 4}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    {/* PUBLISH ACTION BUTTON */}
                    <button
                      onClick={() =>
                        handlePublishTrigger(project.id, project.published)
                      }
                      className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded border transition-colors cursor-pointer mr-1 ${
                        project.published
                          ? "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                          : "bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100"
                      }`}
                    >
                      {project.published ? "Live" : "Publish"}
                    </button>

                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors inline-block"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    {/* EDIT ACTION BUTTON */}
                    <button
                      onClick={() => handleEditTrigger(project.id)}
                      className="p-2 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer border border-transparent"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleDeleteTrigger(project.id)}
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer border border-transparent"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
