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
  Paintbrush,
  Folder,
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
  createSkillCategoryAction,
  deleteSkillCategoryAction,
  getAllSkillCategoriesAction,
  updateSkillCategoryAction,
} from "@/actions/skill-categories";

interface SkillData {
  id: string;
  name: string;
}

interface SkillCategoryData {
  id: string;
  slug: string;
  title: string;
  iconName: string;
  colorClass: string;
  bgGlow: string;
  orderIndex: number;
  skills?: SkillData[];
}

interface SkillCategoryFormState {
  title: string;
  iconName: string;
  colorClass: string;
  bgGlow: string;
  orderIndex: number;
}

// Preset visual design configurations for enterprise alignment
const PRESET_ICONS = [
  "Server",
  "Database",
  "Cpu",
  "Layers",
  "Code2",
  "Globe",
  "Shield",
  "Terminal",
];
const PRESET_COLORS = [
  {
    label: "Indigo Accent",
    value: "text-indigo-400",
    glow: "from-indigo-500/10",
  },
  {
    label: "Emerald Success",
    value: "text-emerald-400",
    glow: "from-emerald-500/10",
  },
  { label: "Cyan Pipeline", value: "text-cyan-400", glow: "from-cyan-500/10" },
  {
    label: "Orange Core",
    value: "text-orange-400",
    glow: "from-orange-500/10",
  },
  {
    label: "Violet Engine",
    value: "text-violet-400",
    glow: "from-violet-500/10",
  },
  { label: "Rose Terminal", value: "text-rose-400", glow: "from-rose-500/10" },
];

export function SkillCategoriesManager() {
  const { toast } = useToast();
  const [categories, setCategories] = useState<SkillCategoryData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isPurging, setIsPurging] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null,
  );
  const [deletingCategoryId, setDeletingCategoryId] = useState<string | null>(
    null,
  );
  const [purgeConfirmationInput, setPurgeConfirmationInput] = useState("");

  const [formPayload, setFormPayload] = useState<SkillCategoryFormState>({
    title: "",
    iconName: "Server",
    colorClass: "text-indigo-400",
    bgGlow: "from-indigo-500/10",
    orderIndex: 0,
  });

  const syncCategoriesCatalogue = async () => {
    setIsLoading(true);
    const result = await getAllSkillCategoriesAction();
    if (result.success && result.data) {
      setCategories(result.data as unknown as SkillCategoryData[]);
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
    syncCategoriesCatalogue();
  }, []);

  const handleEditTrigger = (id: string) => {
    const cat = categories.find((c) => c.id === id);
    if (!cat) return;

    setEditingCategoryId(id);
    setFormPayload({
      title: cat.title,
      iconName: cat.iconName || "Server",
      // FIX: Force fallback to avoid 'string | null' assignment errors
      colorClass: cat.colorClass || "text-indigo-400",
      bgGlow: cat.bgGlow || "from-indigo-500/10",
      orderIndex: cat.orderIndex,
    });
    setIsDialogOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitLoading(true);

    try {
      const purePayload = {
        title: String(formPayload.title).trim(),
        iconName: String(formPayload.iconName),
        colorClass: String(formPayload.colorClass),
        bgGlow: String(formPayload.bgGlow),
        orderIndex: Number(formPayload.orderIndex),
      };

      let response;
      if (editingCategoryId) {
        response = await updateSkillCategoryAction(
          editingCategoryId,
          purePayload,
        );
      } else {
        response = await createSkillCategoryAction(purePayload);
      }

      if (response && response.success) {
        toast({
          title: editingCategoryId
            ? "Matrix Token Mutated"
            : "Skill Category Logged",
          description: editingCategoryId
            ? "Structural cluster node modified securely."
            : "Skill category node integrated into remote ledger.",
        });

        setIsDialogOpen(false);
        setEditingCategoryId(null);
        setFormPayload({
          title: "",
          iconName: "Server",
          colorClass: "text-indigo-400",
          bgGlow: "from-indigo-500/10",
          orderIndex: 0,
        });
        await syncCategoriesCatalogue();
      } else {
        toast({
          variant: "destructive",
          title: "Server Transaction Dropped",
          description:
            response?.error || "Transaction rejected by core parsing layers.",
        });
      }
    } catch (clientCatchErr: any) {
      toast({
        variant: "destructive",
        title: "Pipeline Link Failure",
        description:
          clientCatchErr?.message ||
          "An unhandled runtime exception dropped structural deployment.",
      });
    } finally {
      setIsSubmitLoading(false);
    }
  };

  const executeAssetPurge = async () => {
    if (!deletingCategoryId || purgeConfirmationInput !== "FORCE-PURGE") return;

    setIsPurging(true);
    try {
      const response = await deleteSkillCategoryAction(deletingCategoryId);
      if (response.success) {
        toast({ title: "Entity Purged", description: response.message });
        await syncCategoriesCatalogue();
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
          "A hardware communication drop forced pipeline termination.",
      });
    } finally {
      setIsPurging(false);
      setDeletingCategoryId(null);
      setPurgeConfirmationInput("");
    }
  };

  const filteredCategories = categories.filter((cat) =>
    cat.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Controls Container Layout Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-zinc-200/80 shadow-sm">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <Input
            type="text"
            placeholder="Search structural core categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 font-mono text-xs border-zinc-200 bg-zinc-50/50 text-zinc-900"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={syncCategoriesCatalogue}
            disabled={isLoading}
            className="h-9 border-zinc-200 font-mono text-xs font-semibold text-zinc-700 bg-white hover:bg-zinc-50"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 mr-1.5 ${isLoading ? "animate-spin" : ""}`}
            />
            Sync Shards
          </Button>

          {/* Creation/Mutation Structural Modal Dialog */}
          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) {
                setEditingCategoryId(null);
                setFormPayload({
                  title: "",
                  iconName: "Server",
                  colorClass: "text-indigo-400",
                  bgGlow: "from-indigo-500/10",
                  orderIndex: 0,
                });
              }
            }}
          >
            <DialogTrigger
              render={
                <Button className="h-9 bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs font-semibold px-4 rounded-lg flex items-center gap-2 shadow-sm cursor-pointer">
                  <PlusCircle className="w-4 h-4" />
                  New Category
                </Button>
              }
            />

            <DialogContent className="sm:max-w-[520px] max-h-[85vh] overflow-y-auto bg-white border border-zinc-200 shadow-xl rounded-xl p-6">
              <DialogHeader>
                <DialogTitle className="font-mono font-bold text-zinc-900 tracking-tight text-lg">
                  {editingCategoryId
                    ? "Modify Matrix Cluster Node"
                    : "Initialize Skill Core Shard"}
                </DialogTitle>
                <DialogDescription className="text-zinc-500 font-mono text-xs mt-1">
                  Adjust categorization configurations to bucket underlying
                  engineering language tokens cleanly.
                </DialogDescription>
              </DialogHeader>

              <form
                onSubmit={handleFormSubmit}
                className="space-y-4 font-mono text-xs mt-4"
              >
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                      Category Title
                    </Label>
                    <Input
                      value={formPayload.title}
                      onChange={(e) =>
                        setFormPayload({
                          ...formPayload,
                          title: e.target.value,
                        })
                      }
                      placeholder="E.g., Cloud & Infrastructure"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                      Sequence Rank Weight
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

                <div className="grid grid-cols-2 gap-3 p-4 bg-zinc-50 border border-zinc-200/60 rounded-xl space-y-0">
                  <div className="space-y-1.5">
                    <Label className="text-zinc-500 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1">
                      <Folder className="w-3 h-3" /> Icon Primitive
                    </Label>
                    <Select
                      value={formPayload.iconName}
                      // FIX: Force fallback evaluation to satisfy type constraints
                      onValueChange={(v) =>
                        setFormPayload({
                          ...formPayload,
                          iconName: v || "Server",
                        })
                      }
                    >
                      <SelectTrigger className="bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-zinc-200">
                        {PRESET_ICONS.map((icon) => (
                          <SelectItem key={icon} value={icon}>
                            {icon}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-zinc-500 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1">
                      <Paintbrush className="w-3 h-3" /> System Style Profile
                    </Label>
                    <Select
                      value={formPayload.colorClass}
                      onValueChange={(colorValue) => {
                        const matchedPreset = PRESET_COLORS.find(
                          (c) => c.value === colorValue,
                        );
                        setFormPayload({
                          ...formPayload,
                          // FIX: Force fallback string evaluation to clear type mismatches
                          colorClass: colorValue || "text-indigo-400",
                          bgGlow: matchedPreset
                            ? matchedPreset.glow
                            : "from-indigo-500/10",
                        });
                      }}
                    >
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select stylistic profile" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-zinc-200">
                        {PRESET_COLORS.map((color) => (
                          <SelectItem key={color.value} value={color.value}>
                            {color.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Micro Live Sandbox Render Box Preview */}
                <div className="p-4 border border-dashed border-zinc-200 bg-white rounded-xl flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest block">
                      Live Token Preview
                    </span>
                    <span className="text-zinc-900 font-bold text-xs font-mono">
                      {formPayload.title || "Untitled Cluster Node"}
                    </span>
                  </div>
                  <div
                    className={`px-2.5 py-1 rounded border bg-gradient-to-r text-[10px] font-bold uppercase tracking-wider ${formPayload.colorClass} ${formPayload.bgGlow} border-current/20`}
                  >
                    {formPayload.iconName} Primitive Frame
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
                    ) : editingCategoryId ? (
                      "Commit Configuration"
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
              <TableHead className="w-[200px] text-zinc-500">
                Cluster Title / Slug
              </TableHead>
              <TableHead className="w-[140px] text-zinc-500">
                Icon Primitive
              </TableHead>
              <TableHead className="w-[180px] text-zinc-500">
                Styling Class Tokens
              </TableHead>
              <TableHead className="w-[120px] text-zinc-500">
                Linked Array Nodes
              </TableHead>
              <TableHead className="w-[120px] text-right text-zinc-500">
                Operations
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-xs text-zinc-700 font-mono">
            {filteredCategories.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-zinc-400 font-mono text-xs"
                >
                  No active cluster classifications matched this session search
                  index.
                </TableCell>
              </TableRow>
            ) : (
              filteredCategories.map((cat) => (
                <TableRow
                  key={cat.id}
                  className="hover:bg-zinc-50/50 border-b border-zinc-100 transition-colors"
                >
                  <TableCell className="font-bold text-zinc-900">
                    <span className="block max-w-[180px] truncate">
                      {cat.title}
                    </span>
                    <span className="text-[9px] text-zinc-400 font-normal block font-mono truncate tracking-tight lowercase mt-0.5">
                      /{cat.slug}
                    </span>
                  </TableCell>
                  <TableCell className="font-semibold">
                    <Badge
                      variant="outline"
                      className="bg-zinc-50 font-mono text-[10px] text-zinc-600 font-bold tracking-wide uppercase px-2 py-0.5 border-zinc-200 rounded"
                    >
                      {cat.iconName}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-[10px]">
                      <span
                        className={`font-bold px-2 py-0.5 border rounded uppercase tracking-wider bg-gradient-to-r ${cat.colorClass} ${cat.bgGlow} border-current/20`}
                      >
                        {cat.colorClass}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-bold text-indigo-600">
                    <div className="flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{cat.skills?.length || 0} Child Nodes</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleEditTrigger(cat.id)}
                        className="p-2 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer border border-transparent"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeletingCategoryId(cat.id)}
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

      {/* Enterprise Critical Structural Risk Purge Challenge Dialog Overlay */}
      <Dialog
        open={deletingCategoryId !== null}
        onOpenChange={(open) => {
          if (!open && !isPurging) {
            setDeletingCategoryId(null);
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
              terminates the target classification array configuration
              parameters and orphan-blocks any attached child skills permanently
              inside your Neon storage system.
            </DialogDescription>
          </DialogHeader>

          {/* Security input verification section */}
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
                setDeletingCategoryId(null);
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
