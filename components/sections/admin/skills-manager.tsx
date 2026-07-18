"use client";

import React, { useState, useEffect } from "react";
import {
  PlusCircle,
  Search,
  Trash2,
  Loader2,
  RefreshCw,
  Pencil,
  Grid,
  Layers,
  Sparkles,
  Award,
  Database,
  ShieldAlert,
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
  createSkillAction,
  deleteSkillAction,
  getAllSkillsAction,
  updateSkillAction,
} from "@/actions/skills";
import { getAllSkillCategoriesAction } from "@/actions/skill-categories";

interface CategoryMetadata {
  id: string;
  title: string;
  colorClass: string;
  bgGlow: string;
}

interface SkillData {
  id: string;
  name: string;
  year: number | null;
  metric: string;
  desc: string;
  categoryId: string;
  category?: CategoryMetadata;
}

interface SkillFormState {
  name: string;
  yearInput: string;
  metric: string;
  desc: string;
  categoryId: string;
}

export function SkillsManager() {
  const { toast } = useToast();
  const [skills, setSkills] = useState<SkillData[]>([]);
  const [categories, setCategories] = useState<CategoryMetadata[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("ALL");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isPurging, setIsPurging] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [deletingSkillId, setDeletingSkillId] = useState<string | null>(null);
  const [purgeConfirmationInput, setPurgeConfirmationInput] = useState("");

  const [formPayload, setFormPayload] = useState<SkillFormState>({
    name: "",
    yearInput: "",
    metric: "",
    desc: "",
    categoryId: "",
  });

  const syncDataAssets = async () => {
    setIsLoading(true);
    // Concurrent execution of relational tables ingestion
    const [skillsResult, categoriesResult] = await Promise.all([
      getAllSkillsAction(),
      getAllSkillCategoriesAction(),
    ]);

    if (skillsResult.success && skillsResult.data) {
      setSkills(skillsResult.data as unknown as SkillData[]);
    } else {
      toast({
        variant: "destructive",
        title: "Skills Pipeline Severed",
        description: skillsResult.error,
      });
    }

    if (categoriesResult.success && categoriesResult.data) {
      setCategories(categoriesResult.data as unknown as CategoryMetadata[]);
    } else {
      toast({
        variant: "destructive",
        title: "Category Maps Inaccessible",
        description: categoriesResult.error,
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    syncDataAssets();
  }, []);

  const handleEditTrigger = (id: string) => {
    const item = skills.find((s) => s.id === id);
    if (!item) return;

    setEditingSkillId(id);
    setFormPayload({
      name: item.name,
      yearInput: item.year !== null ? String(item.year) : "",
      metric: item.metric,
      desc: item.desc,
      categoryId: item.categoryId,
    });
    setIsDialogOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitLoading(true);

    try {
      const purePayload = {
        name: String(formPayload.name).trim(),
        year:
          formPayload.yearInput.trim() === ""
            ? null
            : Number(formPayload.yearInput),
        metric: String(formPayload.metric).trim(),
        desc: String(formPayload.desc).trim(),
        categoryId: String(formPayload.categoryId),
      };

      let response;
      if (editingSkillId) {
        response = await updateSkillAction(editingSkillId, purePayload);
      } else {
        response = await createSkillAction(purePayload);
      }

      if (response && response.success) {
        toast({
          title: editingSkillId
            ? "Technology Block Mutated"
            : "Core Skill Serialized",
          description: editingSkillId
            ? "Global core metric modifications saved securely."
            : "Technology node verified and loaded into active infrastructure.",
        });

        setIsDialogOpen(false);
        setEditingSkillId(null);
        setFormPayload({
          name: "",
          yearInput: "",
          metric: "",
          desc: "",
          categoryId: "",
        });
        await syncDataAssets();
      } else {
        toast({
          variant: "destructive",
          title: "Database Relational Dropped",
          description:
            response?.error ||
            "Transaction rejected by core pipeline parsing rules.",
        });
      }
    } catch (clientCatchErr: any) {
      toast({
        variant: "destructive",
        title: "Client Frame Disconnection",
        description:
          clientCatchErr?.message ||
          "An unhandled exception blocked structural updates.",
      });
    } finally {
      setIsSubmitLoading(false);
    }
  };

  const executeAssetPurge = async () => {
    if (!deletingSkillId || purgeConfirmationInput !== "FORCE-PURGE") return;

    setIsPurging(true);
    try {
      const response = await deleteSkillAction(deletingSkillId);
      if (response.success) {
        toast({ title: "Entity Purged", description: response.message });
        await syncDataAssets();
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
          "A hardware communication drop terminated write procedures.",
      });
    } finally {
      setIsPurging(false);
      setDeletingSkillId(null);
      setPurgeConfirmationInput("");
    }
  };

  const filteredSkills = skills.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.metric.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategoryFilter === "ALL" ||
      item.categoryId === selectedCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Enterprise Multi-Tier Filtering Interface Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-zinc-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-2xl">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <Input
              type="text"
              placeholder="Search skill parameters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 font-mono text-xs border-zinc-200 bg-zinc-50/50 text-zinc-900"
            />
          </div>

          <div className="w-full sm:max-w-[200px]">
            <Select
              value={selectedCategoryFilter}
              // FIX: Catch the value with an explicit inline function and force string fallback assignment
              onValueChange={(val) => setSelectedCategoryFilter(val || "ALL")}
            >
              <SelectTrigger className="font-mono text-xs h-9 bg-zinc-50/50 border-zinc-200 text-zinc-700">
                <SelectValue placeholder="Filter Cluster Category" />
              </SelectTrigger>
              <SelectContent className="bg-white border-zinc-200 font-mono text-xs text-zinc-700">
                <SelectItem value="ALL">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.title}
                  </SelectItem>
                ))}
                // ... continuing right from your cut-off position
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            onClick={syncDataAssets}
            disabled={isLoading}
            className="h-9 border-zinc-200 font-mono text-xs font-semibold text-zinc-700 bg-white hover:bg-zinc-50"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 mr-1.5 ${isLoading ? "animate-spin" : ""}`}
            />
            Sync Shards
          </Button>

          {/* Form Ingestion System Modal Wrapper */}
          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) {
                setEditingSkillId(null);
                setFormPayload({
                  name: "",
                  yearInput: "",
                  metric: "",
                  desc: "",
                  categoryId: "",
                });
              }
            }}
          >
            <DialogTrigger
              render={
                <Button className="h-9 bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs font-semibold px-4 rounded-lg flex items-center gap-2 shadow-sm cursor-pointer">
                  <PlusCircle className="w-4 h-4" />
                  Register Skill
                </Button>
              }
            />

            <DialogContent className="sm:max-w-[540px] max-h-[85vh] overflow-y-auto bg-white border border-zinc-200 shadow-xl rounded-xl p-6">
              <DialogHeader>
                <DialogTitle className="font-mono font-bold text-zinc-900 tracking-tight text-lg">
                  {editingSkillId
                    ? "Modify Infrastructure Asset Parameters"
                    : "Compile New Engineering Technology"}
                </DialogTitle>
                <DialogDescription className="text-zinc-500 font-mono text-xs mt-1">
                  Inject detailed telemetry performance metrics and structural
                  experience parameters into the remote ledger.
                </DialogDescription>
              </DialogHeader>

              <form
                onSubmit={handleFormSubmit}
                className="space-y-4 font-mono text-xs mt-4"
              >
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                      Technology Name
                    </Label>
                    <Input
                      value={formPayload.name}
                      onChange={(e) =>
                        setFormPayload({ ...formPayload, name: e.target.value })
                      }
                      placeholder="E.g., Apache Kafka"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                      Year Baseline Initialized
                    </Label>
                    <Input
                      type="number"
                      value={formPayload.yearInput}
                      onChange={(e) =>
                        setFormPayload({
                          ...formPayload,
                          yearInput: e.target.value,
                        })
                      }
                      placeholder="E.g., 2019"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                      Relational Cluster Parent
                    </Label>
                    <Select
                      value={formPayload.categoryId}
                      onValueChange={(v) =>
                        setFormPayload({ ...formPayload, categoryId: v || "" })
                      }
                    >
                      <SelectTrigger className="bg-white border-zinc-200 text-zinc-700 font-mono text-xs h-9">
                        <SelectValue placeholder="Map to cluster..." />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-zinc-200 font-mono text-xs text-zinc-700">
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                      placeholder="E.g., 4.2M Replicated Msgs/s"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                    Production Telemetry Scope breakdown
                  </Label>
                  <Textarea
                    value={formPayload.desc}
                    onChange={(e) =>
                      setFormPayload({ ...formPayload, desc: e.target.value })
                    }
                    placeholder="Provide production runtime operational cases, workload scaling strategies, and architectural deployment parameters..."
                    className="min-h-[90px] leading-relaxed"
                    required
                  />
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
                    ) : editingSkillId ? (
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

      {/* Main Table Matrix Component Grid Layout */}
      <div className="bg-white rounded-xl border border-zinc-200/80 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-50/70 border-b border-zinc-200 font-mono text-[10px] text-zinc-400 font-bold uppercase">
            <TableRow>
              <TableHead className="w-[180px] text-zinc-500">
                Technology Identifier
              </TableHead>
              <TableHead className="w-[180px] text-zinc-500">
                Relational Cluster Class
              </TableHead>
              <TableHead className="w-[110px] text-zinc-500">
                Horizon Age
              </TableHead>
              <TableHead className="max-w-[260px] text-zinc-500">
                Performance Telemetry Benchmark
              </TableHead>
              <TableHead className="w-[110px] text-right text-zinc-500">
                Operations
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-xs text-zinc-700 font-mono">
            {filteredSkills.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-zinc-400 font-mono text-xs"
                >
                  No active engineering nodes matched this session search index
                  parameters.
                </TableCell>
              </TableRow>
            ) : (
              filteredSkills.map((item) => (
                <TableRow
                  key={item.id}
                  className="hover:bg-zinc-50/50 border-b border-zinc-100 transition-colors"
                >
                  <TableCell className="font-bold text-zinc-900">
                    <span className="block max-w-[160px] truncate">
                      {item.name}
                    </span>
                    <span className="text-[9px] text-zinc-400 font-normal block font-mono truncate tracking-tight uppercase mt-0.5">
                      ID: {item.id}
                    </span>
                  </TableCell>
                  <TableCell>
                    {item.category ? (
                      <span
                        className={`px-2 py-0.5 border rounded uppercase tracking-wider text-[10px] font-bold bg-gradient-to-r ${item.category.colorClass} ${item.category.bgGlow} border-current/20`}
                      >
                        {item.category.title}
                      </span>
                    ) : (
                      // ... continuing right from your cut-off position
                      <span className="text-zinc-400 text-[10px] italic">
                        Orphan Shard
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-zinc-600 font-medium">
                    <div className="flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-zinc-400" />
                      <span>
                        {item.year
                          ? `${new Date().getFullYear() - item.year} Yrs`
                          : "N/A"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-bold text-emerald-600">
                    <div className="flex items-center gap-1.5 truncate max-w-[240px]">
                      <Database className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      <span className="truncate">{item.metric}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleEditTrigger(item.id)}
                        className="p-2 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer border border-transparent"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeletingSkillId(item.id)}
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

      {/* Enterprise Destructive Challenge Dialog Overlay Panel */}
      <Dialog
        open={deletingSkillId !== null}
        onOpenChange={(open) => {
          if (!open && !isPurging) {
            setDeletingSkillId(null);
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
              terminates the targeted engineering parameter index definitions
              permanently from your production Neon storage system.
            </DialogDescription>
          </DialogHeader>

          {/* Security Verification Challenge Field Block */}
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
                setDeletingSkillId(null);
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
