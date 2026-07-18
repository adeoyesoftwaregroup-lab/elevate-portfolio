"use client";

import React, { useState, useEffect } from "react";
import {
  PlusCircle,
  Search,
  Trash2,
  ExternalLink,
  Loader2,
  RefreshCw,
  CheckCircle,
  Pencil,
  Briefcase,
  MapPin,
  Calendar,
  Layers,
  Flame,
} from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  createExperienceAction,
  deleteExperienceAction,
  getAllExperiencesAction,
  updateExperienceAction,
} from "@/actions/experience";

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

interface ExperienceFormState {
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrentRole: boolean;
  techStackInput: string;
  milestonesInput: string;
  orderIndex: number;
  impactMetricLabel1: string;
  impactMetricValue1: string;
  impactMetricLabel2: string;
  impactMetricValue2: string;
}

export function ExperiencesManager() {
  const { toast } = useToast();
  const [experiences, setExperiences] = useState<ExperienceData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isPurging, setIsPurging] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingExperienceId, setEditingExperienceId] = useState<string | null>(
    null,
  );
  const [deletingExperienceId, setDeletingExperienceId] = useState<
    string | null
  >(null);
  const [purgeConfirmationInput, setPurgeConfirmationInput] = useState("");

  const [formPayload, setFormPayload] = useState<ExperienceFormState>({
    role: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    isCurrentRole: false,
    techStackInput: "",
    milestonesInput: "",
    orderIndex: 0,
    impactMetricLabel1: "",
    impactMetricValue1: "",
    impactMetricLabel2: "",
    impactMetricValue2: "",
  });

  const syncExperiencesCatalogue = async () => {
    setIsLoading(true);
    const result = await getAllExperiencesAction();
    if (result.success && result.data) {
      setExperiences(result.data as unknown as ExperienceData[]);
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
    syncExperiencesCatalogue();
  }, []);

  const handleEditTrigger = (id: string) => {
    const exp = experiences.find((e) => e.id === id);
    if (!exp) return;

    // Helper to format Date objects or strings cleanly for HTML5 date inputs (YYYY-MM-DD)
    const formatDateForInput = (dateVal: any) => {
      if (!dateVal) return "";
      const d = new Date(dateVal);
      return isNaN(d.getTime()) ? "" : d.toISOString().split("T")[0];
    };

    setEditingExperienceId(id);
    setFormPayload({
      role: exp.role,
      company: exp.company,
      location: exp.location,
      startDate: formatDateForInput(exp.startDate),
      endDate: exp.endDate ? formatDateForInput(exp.endDate) : "",
      isCurrentRole: !exp.endDate,
      techStackInput: exp.techStack.join(", "),
      milestonesInput: exp.milestones.join("\n"),
      orderIndex: exp.orderIndex,
      impactMetricLabel1: exp.impactMetricLabel1 || "",
      impactMetricValue1: exp.impactMetricValue1 || "",
      impactMetricLabel2: exp.impactMetricLabel2 || "",
      impactMetricValue2: exp.impactMetricValue2 || "",
    });
    setIsDialogOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitLoading(true);

    try {
      const formattedTechStack = formPayload.techStackInput
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const formattedMilestones = formPayload.milestonesInput
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

      if (formattedMilestones.length === 0) {
        toast({
          variant: "destructive",
          title: "Milestones Missing",
          description:
            "Please specify at least one operational milestone breakdown statement.",
        });
        setIsSubmitLoading(false);
        return;
      }

      const purePayload = {
        role: String(formPayload.role).trim(),
        company: String(formPayload.company).trim(),
        location: String(formPayload.location).trim(),
        startDate: formPayload.startDate,
        endDate: formPayload.isCurrentRole ? null : formPayload.endDate || null,
        techStack: formattedTechStack,
        milestones: formattedMilestones,
        orderIndex: Number(formPayload.orderIndex),
        impactMetricLabel1: formPayload.impactMetricLabel1.trim() || null,
        impactMetricValue1: formPayload.impactMetricValue1.trim() || null,
        impactMetricLabel2: formPayload.impactMetricLabel2.trim() || null,
        impactMetricValue2: formPayload.impactMetricValue2.trim() || null,
      };

      let response;
      if (editingExperienceId) {
        response = await updateExperienceAction(
          editingExperienceId,
          purePayload,
        );
      } else {
        response = await createExperienceAction(purePayload);
      }

      if (response && response.success) {
        toast({
          title: editingExperienceId
            ? "Career Node Mutated"
            : "Experience Log Synced",
          description: editingExperienceId
            ? "Historical record modified securely."
            : "Professional asset successfully compiled into Neon tables.",
        });

        setIsDialogOpen(false);
        setEditingExperienceId(null);
        setFormPayload({
          role: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          isCurrentRole: false,
          techStackInput: "",
          milestonesInput: "",
          orderIndex: 0,
          impactMetricLabel1: "",
          impactMetricValue1: "",
          impactMetricLabel2: "",
          impactMetricValue2: "",
        });
        await syncExperiencesCatalogue();
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
        description:
          clientCatchErr?.message || "An unhandled runtime error occurred.",
      });
    } finally {
      setIsSubmitLoading(false);
    }
  };

  const executeAssetPurge = async () => {
    if (!deletingExperienceId || purgeConfirmationInput !== "FORCE-PURGE")
      return;

    setIsPurging(true);
    try {
      const response = await deleteExperienceAction(deletingExperienceId);
      if (response.success) {
        toast({ title: "Entity Purged", description: response.message });
        await syncExperiencesCatalogue();
      } else {
        toast({
          variant: "destructive",
          title: "Purge Handshake Failed",
          description: response.error,
        });
      }
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Critical Mutation Drop",
        description:
          err.message ||
          "A data transmission exception dropped the purge task.",
      });
    } finally {
      // ... continuing right from your cut-off position
      setIsPurging(false);
      setDeletingExperienceId(null);
      setPurgeConfirmationInput("");
    }
  };

  const filteredExperiences = experiences.filter(
    (exp) =>
      exp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.location.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Controls Container */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-zinc-200/80 shadow-sm">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <Input
            type="text"
            placeholder="Search professional timeline logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 font-mono text-xs border-zinc-200 bg-zinc-50/50 text-zinc-900"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={syncExperiencesCatalogue}
            disabled={isLoading}
            className="h-9 border-zinc-200 font-mono text-xs font-semibold text-zinc-700 bg-white hover:bg-zinc-50"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 mr-1.5 ${isLoading ? "animate-spin" : ""}`}
            />
            Sync Records
          </Button>

          {/* Core Creation/Mutation Form Dialog */}
          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) {
                setEditingExperienceId(null);
                setFormPayload({
                  role: "",
                  company: "",
                  location: "",
                  startDate: "",
                  endDate: "",
                  isCurrentRole: false,
                  techStackInput: "",
                  milestonesInput: "",
                  orderIndex: 0,
                  impactMetricLabel1: "",
                  impactMetricValue1: "",
                  impactMetricLabel2: "",
                  impactMetricValue2: "",
                });
              }
            }}
          >
            <DialogTrigger
              render={
                <Button className="h-9 bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs font-semibold px-4 rounded-lg flex items-center gap-2 shadow-sm cursor-pointer">
                  <PlusCircle className="w-4 h-4" />
                  Add Position
                </Button>
              }
            />

            <DialogContent className="sm:max-w-[580px] max-h-[85vh] overflow-y-auto bg-white border border-zinc-200 shadow-xl rounded-xl p-6">
              <DialogHeader>
                <DialogTitle className="font-mono font-bold text-zinc-900 tracking-tight text-lg">
                  {editingExperienceId
                    ? "Modify Professional Career Node"
                    : "Register Career Timeline Asset"}
                </DialogTitle>
                <DialogDescription className="text-zinc-500 font-mono text-xs mt-1">
                  Commit structural metrics and engineering milestones back into
                  your historical profile records.
                </DialogDescription>
              </DialogHeader>

              <form
                onSubmit={handleFormSubmit}
                className="space-y-4 font-mono text-xs mt-4"
              >
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                      Engineering Role Title
                    </Label>
                    <Input
                      value={formPayload.role}
                      onChange={(e) =>
                        setFormPayload({ ...formPayload, role: e.target.value })
                      }
                      placeholder="E.g., Senior Systems Architect"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                      Company / Organisation
                    </Label>
                    <Input
                      value={formPayload.company}
                      onChange={(e) =>
                        setFormPayload({
                          ...formPayload,
                          company: e.target.value,
                        })
                      }
                      placeholder="E.g., Stripe Corporate"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                      Geographical Location
                    </Label>
                    <Input
                      value={formPayload.location}
                      onChange={(e) =>
                        setFormPayload({
                          ...formPayload,
                          location: e.target.value,
                        })
                      }
                      placeholder="E.g., Dublin, IE (Hybrid)"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                      Sort Execution Weight
                    </Label>
                    <Input
                      type="number"
                      value={formPayload.orderIndex}
                      onChange={(e) =>
                        setFormPayload({
                          ...formPayload,
                          orderIndex: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 p-3 bg-zinc-50 border border-zinc-200/60 rounded-lg">
                  <div className="space-y-1.5">
                    <Label className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                      Deployment Start Date
                    </Label>
                    <Input
                      type="date"
                      value={formPayload.startDate}
                      onChange={(e) =>
                        setFormPayload({
                          ...formPayload,
                          startDate: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <Label className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                        Termination Date
                      </Label>
                      <label className="flex items-center gap-1 text-[9px] text-zinc-400 font-semibold cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={formPayload.isCurrentRole}
                          onChange={(e) =>
                            setFormPayload({
                              ...formPayload,
                              isCurrentRole: e.target.checked,
                            })
                          }
                          className="rounded border-zinc-300 text-zinc-900 focus:ring-0 w-3 h-3 cursor-pointer"
                        />
                        PRESENT
                      </label>
                    </div>
                    <Input
                      type="date"
                      value={
                        formPayload.isCurrentRole ? "" : formPayload.endDate
                      }
                      onChange={(e) =>
                        setFormPayload({
                          ...formPayload,
                          endDate: e.target.value,
                        })
                      }
                      disabled={formPayload.isCurrentRole}
                      required={!formPayload.isCurrentRole}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                    Technologies Used (Comma-separated)
                  </Label>
                  <Input
                    value={formPayload.techStackInput}
                    onChange={(e) =>
                      setFormPayload({
                        ...formPayload,
                        techStackInput: e.target.value,
                      })
                    }
                    placeholder="Golang, Kubernetes, AWS, Terraform, TypeScript"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                    Operational Milestone Logs (One bullet per line)
                  </Label>
                  <Textarea
                    value={formPayload.milestonesInput}
                    onChange={(e) =>
                      setFormPayload({
                        ...formPayload,
                        milestonesInput: e.target.value,
                      })
                    }
                    placeholder="• Architected real-time transactional ingestion engine processing 14k events/sec.&#10;• Reduced infrastructure operating expenses by 32% via resource scaling tuning parameters."
                    className="min-h-[100px] leading-relaxed"
                    required
                  />
                </div>

                {/* Enterprise Impact Metrics Slot Array */}
                <div className="p-4 border border-zinc-200 bg-zinc-50/50 rounded-xl space-y-3">
                  <div className="flex items-center gap-1.5 text-zinc-800 font-bold uppercase tracking-wider text-[10px] pb-1 border-b border-zinc-200">
                    <Flame className="w-3.5 h-3.5 text-orange-500" />
                    High-Impact Performance Metrics (Optional)
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-zinc-400 text-[9px] uppercase font-semibold">
                        Impact Metric Label 1
                      </Label>
                      <Input
                        value={formPayload.impactMetricLabel1}
                        onChange={(e) =>
                          setFormPayload({
                            ...formPayload,
                            impactMetricLabel1: e.target.value,
                          })
                        }
                        placeholder="E.g., Latency Optimization"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-zinc-400 text-[9px] uppercase font-semibold">
                        Impact Metric Value 1
                      </Label>
                      <Input
                        value={formPayload.impactMetricValue1}
                        onChange={(e) =>
                          setFormPayload({
                            ...formPayload,
                            impactMetricValue1: e.target.value,
                          })
                        }
                        placeholder="E.g., -40% Edge-to-Core"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-zinc-400 text-[9px] uppercase font-semibold">
                        Impact Metric Label 2
                      </Label>
                      <Input
                        value={formPayload.impactMetricLabel2}
                        onChange={(e) =>
                          setFormPayload({
                            ...formPayload,
                            impactMetricLabel2: e.target.value,
                          })
                        }
                        placeholder="E.g., Scale Volume Bounds"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-zinc-400 text-[9px] uppercase font-semibold">
                        Impact Metric Value 2
                      </Label>
                      <Input
                        value={formPayload.impactMetricValue2}
                        onChange={(e) =>
                          setFormPayload({
                            ...formPayload,
                            impactMetricValue2: e.target.value,
                          })
                        }
                        placeholder="E.g., 2.4M Active Nodes"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-zinc-100">
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
                    ) : editingExperienceId ? (
                      "Commit Changes"
                    ) : (
                      "Compile Asset"
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Main Table Infrastructure Grid */}
      <div className="bg-white rounded-xl border border-zinc-200/80 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-50/70 border-b border-zinc-200 font-mono text-[10px] text-zinc-400 font-bold uppercase">
            <TableRow>
              <TableHead className="w-[220px] text-zinc-500">
                Role / Node Position
              </TableHead>
              <TableHead className="w-[180px] text-zinc-500">
                Corporate Entity
              </TableHead>
              <TableHead className="w-[140px] text-zinc-500">
                Operational Horizon
              </TableHead>
              <TableHead className="max-w-[260px] text-zinc-500">
                Tech Stack Tokens
              </TableHead>
              <TableHead className="w-[120px] text-right text-zinc-500">
                Operations
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-xs text-zinc-700 font-mono">
            {filteredExperiences.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-zinc-400 font-mono text-xs"
                >
                  No active career nodes identified inside database tables.
                </TableCell>
              </TableRow>
            ) : (
              filteredExperiences.map((exp) => (
                <TableRow
                  key={exp.id}
                  className="hover:bg-zinc-50/50 border-b border-zinc-100 transition-colors"
                >
                  <TableCell className="font-bold text-zinc-900">
                    <span className="block max-w-[200px] truncate">
                      {exp.role}
                    </span>
                    <span className="text-[9px] text-zinc-400 font-normal block font-mono truncate uppercase tracking-widest mt-0.5">
                      {exp.id}
                    </span>
                  </TableCell>
                  <TableCell className="font-semibold text-zinc-800">
                    <div className="flex flex-col gap-0.5">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3 h-3 text-zinc-400" />{" "}
                        {exp.company}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-normal flex items-center gap-1">
                        <MapPin className="w-2.5 h-2.5" /> {exp.location}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-zinc-600 font-medium">
                    <div className="flex items-center gap-1 text-[11px]">
                      <Calendar className="w-3 h-3 text-zinc-400" />
                      <span>
                        {new Date(exp.startDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                        })}
                      </span>
                      <span>—</span>
                      <span
                        className={
                          !exp.endDate
                            ? "text-emerald-600 font-bold uppercase tracking-wider text-[9px] bg-emerald-50 px-1 py-0.2 rounded border border-emerald-100"
                            : ""
                        }
                      >
                        {exp.endDate
                          ? new Date(exp.endDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                            })
                          : "Present"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1 max-w-[260px]">
                      {exp.techStack.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className="text-[9px] bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-200 text-zinc-500 font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                      {exp.techStack.length > 4 && (
                        <span className="text-[9px] text-zinc-400 font-bold">
                          +{exp.techStack.length - 4}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleEditTrigger(exp.id)}
                        className="p-2 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer border border-transparent"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        // ... continuing right from your cut-off position
                        onClick={() => setDeletingExperienceId(exp.id)}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer border border-transparent"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Enterprise Critical Risk Purge Challenge Dialog Overlay */}
      <Dialog
        open={deletingExperienceId !== null}
        onOpenChange={(open) => {
          if (!open && !isPurging) {
            setDeletingExperienceId(null);
            setPurgeConfirmationInput("");
          }
        }}
      >
        <DialogContent className="sm:max-w-[460px] bg-white border border-zinc-200 shadow-2xl rounded-xl p-6 font-mono text-xs select-none">
          <DialogHeader className="space-y-3">
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
              terminates the targeted role record node metrics and scrubs
              related index arrays permanently from your production Neon storage
              system.
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

          <div className="flex justify-end gap-2 pt-4 mt-2 border-t border-zinc-100">
            <Button
              type="button"
              variant="outline"
              disabled={isPurging}
              onClick={() => {
                setDeletingExperienceId(null);
                setPurgeConfirmationInput("");
              }}
              className="border-zinc-200 text-zinc-700 h-9 font-mono text-xs cursor-pointer bg-white hover:bg-zinc-50"
            >
              Abort Lifecycle
            </Button>
            <Button
              type="button"
              onClick={executeAssetPurge}
              disabled={isPurging || purgeConfirmationInput !== "FORCE-PURGE"}
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
  );
}
