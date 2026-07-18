"use client";

import React, { useState, useEffect } from "react";
import {
  Mail,
  MailOpen,
  Trash2,
  Loader2,
  RefreshCw,
  Search,
  CheckSquare,
  Calendar,
  User,
  Inbox,
  Terminal,
  ShieldAlert,
  ArrowRight,
  Filter,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  getAllContactMessagesAction,
  toggleMessageReadStatusAction,
  deleteContactMessageAction,
  markAllMessagesAsReadAction,
} from "@/actions/contact";

interface ContactMessageData {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string | Date;
}

type FilterView = "ALL" | "UNREAD" | "READ";

export function ContactMessagesManager() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ContactMessageData[]>([]);
  const [selectedMessage, setSelectedMessage] =
    useState<ContactMessageData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterView>("ALL");
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [isPurging, setIsPurging] = useState(false);
  const [deletingMessageId, setDeletingMessageId] = useState<string | null>(
    null,
  );
  const [purgeConfirmationInput, setPurgeConfirmationInput] = useState("");

  const syncMessagesDesk = async (selectFirst: boolean = false) => {
    setIsLoading(true);
    const result = await getAllContactMessagesAction();
    if (result.success && result.data) {
      const data = result.data as unknown as ContactMessageData[];
      setMessages(data);

      // Auto-populate the viewport with the first element if required
      if (selectFirst && data.length > 0) {
        setSelectedMessage(data[0]);
      } else if (selectedMessage) {
        // Sync currently viewed message reference if it still exists
        const updatedMsg = data.find((m) => m.id === selectedMessage.id);
        setSelectedMessage(updatedMsg || null);
      }
    } else {
      toast({
        variant: "destructive",
        title: "Telemetry Sync Severed",
        description: result.error,
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    syncMessagesDesk(true);
  }, []);

  const handleMessageSelect = async (msg: ContactMessageData) => {
    setSelectedMessage(msg);

    // Optimistic instantaneous auto-mark-as-read transaction hook upon viewport expansion
    if (!msg.isRead) {
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, isRead: true } : m)),
      );
      const res = await toggleMessageReadStatusAction(msg.id, false);
      if (!res.success) {
        // Revert local array states silently if pipeline sync drops
        setMessages((prev) =>
          prev.map((m) => (m.id === msg.id ? { ...m, isRead: false } : m)),
        );
      }
    }
  };

  const handleToggleReadManual = async (
    msg: ContactMessageData,
    e: React.MouseEvent,
  ) => {
    e.stopPropagation(); // Block parent container component event bubbling loops
    setIsActionLoading(true);

    const response = await toggleMessageReadStatusAction(msg.id, msg.isRead);
    if (response.success) {
      await syncMessagesDesk();
    } else {
      toast({
        variant: "destructive",
        title: "State Mutation Aborted",
        description: response.error,
      });
    }
    setIsActionLoading(false);
  };

  const handleMarkAllRead = async () => {
    setIsActionLoading(true);
    const response = await markAllMessagesAsReadAction();
    if (response.success) {
      toast({
        title: "Buffer Registers Flushed",
        description: response.message,
      });
      await syncMessagesDesk();
    } else {
      toast({
        variant: "destructive",
        title: "Batch Sync Interrupted",
        description: response.error,
      });
    }
    setIsActionLoading(false);
  };

  const executeAssetPurge = async () => {
    if (!deletingMessageId || purgeConfirmationInput !== "FORCE-PURGE") return;
    setIsPurging(true);

    const response = await deleteContactMessageAction(deletingMessageId);
    if (response.success) {
      toast({ title: "Entity Purged", description: response.message });
      if (selectedMessage?.id === deletingMessageId) {
        setSelectedMessage(null);
      }
      setIsPurging(false);
      setDeletingMessageId(null);
      setPurgeConfirmationInput("");
      await syncMessagesDesk(true);
    } else {
      toast({
        variant: "destructive",
        title: "Purge Handshake Failed",
        description: response.error,
      });
      setIsPurging(false);
    }
  };

  const filteredMessages = messages.filter((msg) => {
    const matchesSearch =
      msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab =
      activeFilter === "ALL" ||
      (activeFilter === "UNREAD" && !msg.isRead) ||
      (activeFilter === "READ" && msg.isRead);

    return matchesSearch && matchesTab;
  });

  const unreadCount = messages.filter((m) => !m.isRead).length;

  if (isLoading && messages.length === 0) {
    return (
      <div className="w-full min-h-[450px] bg-white border border-zinc-200/80 rounded-xl flex flex-col items-center justify-center gap-3 font-mono text-xs">
        <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
        <p className="text-zinc-500 uppercase tracking-widest text-[10px] font-bold">
          Parsing Inbound Feed Shards...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 font-mono text-xs animate-in fade-in duration-300">
      {/* MACRO BAR OPERATION CONTROL SYSTEM CONTROLS BLOCK */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-zinc-200/80 shadow-sm">
        <div className="flex items-center gap-2 w-full max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <Input
              type="text"
              placeholder="Search incoming packet contents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 font-mono text-xs border-zinc-200 bg-zinc-50/50 text-zinc-900 h-9"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            disabled={isActionLoading || unreadCount === 0}
            onClick={handleMarkAllRead}
            className="h-9 border-zinc-200 text-zinc-700 font-semibold hover:bg-zinc-50 font-mono text-xs"
          >
            <CheckSquare className="w-3.5 h-3.5 mr-1.5 text-zinc-500" />
            Clear Active Badges
          </Button>
          <Button
            variant="outline"
            onClick={() => syncMessagesDesk(false)}
            disabled={isLoading}
            className="h-9 border-zinc-200 font-mono text-xs font-semibold text-zinc-700 bg-white hover:bg-zinc-50"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 mr-1.5 ${isLoading ? "animate-spin" : ""}`}
            />
            Refresh Queue
          </Button>
        </div>
      </div>

      {/* SEGMENTATION SUB-TABS INTERFACE BUTTONS SLOTS */}
      <div className="flex items-center gap-1.5 border-b border-zinc-200 pb-1 select-none">
        {[
          { id: "ALL", label: "All Bundles", count: messages.length },
          {
            id: "UNREAD",
            label: "Unread Telemetry",
            count: unreadCount,
            badge: true,
          },
          {
            id: "READ",
            label: "Processed Logs",
            count: messages.length - unreadCount,
          },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() =>
              setActiveFilter(
                tab.id as FilterView, // ... continuing right from your cut-off position
              )
            }
            className={`px-3 py-1.5 font-bold uppercase tracking-wider text-[10px] border-b-2 transition-all cursor-pointer ${
              activeFilter === tab.id
                ? "border-zinc-900 text-zinc-900"
                : "border-transparent text-zinc-400 hover:text-zinc-600"
            }`}
          >
            {tab.label}
            <span
              className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[9px] font-extrabold ${
                activeFilter === tab.id
                  ? tab.badge
                    ? "bg-red-500 text-white animate-pulse"
                    : "bg-zinc-900 text-white"
                  : "bg-zinc-100 text-zinc-400"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* CORE SPLIT SCREEN MAIL DECK PLATFORM GRID (12 COLUMNS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch min-h-[500px]">
        {/* PACKETS LIST STREAM SLOTS OVERLAY PANEL (5 COLUMNS) */}
        <div className="lg:col-span-5 bg-white border border-zinc-200/80 rounded-xl overflow-hidden shadow-sm flex flex-col max-h-[600px]">
          <div className="p-3 border-b border-zinc-100 bg-zinc-50/50 text-[10px] uppercase font-bold text-zinc-400 tracking-wider flex items-center gap-1.5">
            <Filter className="w-3 h-3" /> Messaging Packet Feeds
          </div>
          <div className="overflow-y-auto divide-y divide-zinc-100 flex-1 min-h-0">
            {filteredMessages.length === 0 ? (
              <div className="p-8 text-center text-zinc-400 italic">
                No message tokens resolved matching view scope.
              </div>
            ) : (
              filteredMessages.map((msg) => {
                const isCurrent = selectedMessage?.id === msg.id;
                return (
                  <div
                    key={msg.id}
                    onClick={() => handleMessageSelect(msg)}
                    className={`p-4 transition-all cursor-pointer relative group flex flex-col gap-1.5 ${
                      isCurrent
                        ? "bg-zinc-900 text-white shadow-inner"
                        : "bg-white hover:bg-zinc-50/70 text-zinc-800"
                    }`}
                  >
                    {/* Unread Alert Beacon dot element */}
                    {!msg.isRead && (
                      <span className="absolute top-4 left-2 w-2 h-2 rounded-full bg-red-500 shadow-sm animate-pulse" />
                    )}

                    <div className="flex justify-between items-start pl-1 w-full">
                      <span
                        className={`font-bold text-xs truncate max-w-[150px] ${isCurrent ? "text-white" : "text-zinc-900"}`}
                      >
                        {msg.name}
                      </span>
                      <span
                        className={`text-[9px] uppercase tracking-tighter ${isCurrent ? "text-zinc-400" : "text-zinc-400"}`}
                      >
                        {new Date(msg.createdAt).toLocaleDateString("en-ZA", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    <div
                      className={`text-[11px] font-semibold truncate pl-1 ${isCurrent ? "text-indigo-300" : "text-zinc-700"}`}
                    >
                      {msg.subject}
                    </div>

                    <p
                      className={`text-[10px] line-clamp-2 pl-1 leading-normal font-sans ${isCurrent ? "text-zinc-400" : "text-zinc-400 font-medium"}`}
                    >
                      {msg.message}
                    </p>

                    {/* Operational Actions Float Shortcuts triggers overlay on hover */}
                    <div className="absolute right-2 bottom-2 items-center gap-1 hidden group-hover:flex bg-inherit pl-2 rounded-l">
                      <button
                        onClick={(e) => handleToggleReadManual(msg, e)}
                        disabled={isActionLoading}
                        className={`p-1.5 rounded border transition-colors cursor-pointer ${
                          isCurrent
                            ? "border-zinc-800 bg-zinc-800 hover:bg-zinc-700 text-zinc-400"
                            : "border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-500"
                        }`}
                        title={msg.isRead ? "Mark as unread" : "Mark as read"}
                      >
                        {msg.isRead ? (
                          <Mail className="w-3 h-3" />
                        ) : (
                          <MailOpen className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* FULL CARD INSPECTION VIEWPORT CONSOLE SLOT (7 COLUMNS) */}
        <div className="lg:col-span-7 bg-white border border-zinc-200/80 rounded-xl overflow-hidden shadow-sm flex flex-col max-h-[600px]">
          {selectedMessage ? (
            <div className="flex flex-col h-full min-h-0">
              {/* Inspection Box System Action Headers Subbar */}
              <div className="p-4 border-b border-zinc-100 bg-zinc-50/50 flex items-center justify-between select-none">
                <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-zinc-500 tracking-wider">
                  <Terminal className="w-3.5 h-3.5 text-zinc-400" /> Token
                  Inspection Viewport
                </div>
                <div className="flex items-center gap-1.5">
                  <Badge
                    variant="outline"
                    className={`font-mono text-[9px] uppercase px-2 rounded-md font-bold tracking-wider ${
                      selectedMessage.isRead
                        ? "bg-zinc-100 text-zinc-500 border-zinc-200"
                        : "bg-red-50 text-red-600 border-red-200"
                    }`}
                  >
                    {selectedMessage.isRead ? "PROCESSED" : "UNREAD WIRE"}
                  </Badge>
                  <button
                    onClick={() => setDeletingMessageId(selectedMessage.id)}
                    className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 border border-transparent rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Message metadata details breakdown segment overlay layout */}
              <div className="p-5 border-b border-zinc-100 space-y-2 bg-gradient-to-b from-white to-zinc-50/30">
                <h3 className="text-zinc-950 font-black text-sm tracking-tight leading-normal">
                  {selectedMessage.subject}
                </h3>
                <div className="flex flex-col gap-1 text-[11px] text-zinc-500 font-mono">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-zinc-400" /> Sender:{" "}
                    <span className="font-bold text-zinc-900 select-text">
                      {selectedMessage.name}
                    </span>{" "}
                    &lt;{selectedMessage.email}&gt;
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-zinc-400" /> Logged:{" "}
                    <span className="font-medium text-zinc-700">
                      {new Date(selectedMessage.createdAt).toLocaleString(
                        "en-ZA",
                        { dateStyle: "long", timeStyle: "medium" },
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Dynamic scrollable body containing message text */}
              <div className="p-6 overflow-y-auto flex-1 font-sans text-xs text-zinc-800 leading-relaxed font-medium bg-white whitespace-pre-wrap select-text">
                {selectedMessage.message}
              </div>

              {/* Direct Quick Mail Client Action Forwarder Footer */}
              <div className="p-4 border-t border-zinc-100 bg-zinc-50/50 flex justify-end select-none">
                <a
                  href={`mailto:${selectedMessage.email}?subject=RE: ${encodeURIComponent(selectedMessage.subject)}`}
                  className="h-8 px-4 bg-zinc-900 hover:bg-zinc-800 text-white font-bold uppercase tracking-wider text-[9px] rounded-lg transition-colors shadow-sm inline-flex items-center gap-1.5 cursor-pointer font-mono"
                >
                  Intercept Outbound Relay <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ) : (
            // ... continuing right from your cut-off position
            <div className="flex-1 flex flex-col items-center justify-center text-zinc-400 p-12 gap-2 text-center select-none">
              <Inbox className="w-8 h-8 text-zinc-200 stroke-[1.5]" />
              <div className="space-y-0.5">
                <span className="block font-bold uppercase tracking-wider text-[10px] text-zinc-400">
                  Viewport Blank
                </span>
                <span className="block text-[10px]">
                  Select an inbound index packet element inside the streams
                  queue to mount full log telemetry bodies.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ENTERPRISE STRUCTURAL CRITICAL RISK DATA PURGE VERIFICATION CHALLENGE OVERLAY DIALOG */}
      <Dialog
        open={deletingMessageId !== null}
        onOpenChange={(open) => {
          if (!open && !isPurging) {
            setDeletingMessageId(null);
            setPurgeConfirmationInput("");
          }
        }}
      >
        <DialogContent className="sm:max-w-[460px] bg-white border border-zinc-200 shadow-2xl rounded-xl p-6 font-mono text-xs select-none">
          <DialogHeader className="space-y-3">
            <div className="flex items-center gap-2.5 pb-2 border-b border-red-100 text-red-700">
              <div className="p-2 bg-red-50 border border-red-200/60 rounded-lg shrink-0">
                <ShieldAlert className="w-4 h-4 text-red-600" />
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
              terminates the targeted inbound message transmission node logs and
              scrubs related record rows permanently from your production Neon
              storage system.
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
                setDeletingMessageId(null);
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
