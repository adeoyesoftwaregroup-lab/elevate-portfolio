"use client";

import React from "react";
import { ShieldCheck, Loader2 } from "lucide-react";

interface BadgeProps {
  isSubmitting: boolean;
  isSuccess: boolean;
}

export function SecureSubmitBadge({ isSubmitting, isSuccess }: BadgeProps) {
  return (
    <div className="flex items-center gap-2 select-none text-[10px] uppercase font-bold tracking-wider">
      {isSubmitting ? (
        <div className="flex items-center gap-1.5 text-indigo-400 bg-indigo-500/5 border border-indigo-500/10 px-2.5 py-1 rounded-md">
          <Loader2 className="w-3 h-3 animate-spin" /> Executing Secure Transfer
          Protocols...
        </div>
      ) : isSuccess ? (
        <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-2.5 py-1 rounded-md animate-pulse">
          <ShieldCheck className="w-3 h-3" /> Connection Handshake Success [200
          OK]
        </div>
      ) : (
        <div className="flex items-center gap-1.5 text-neutral-500 bg-neutral-900/40 border border-neutral-800 px-2.5 py-1 rounded-md">
          <ShieldCheck className="w-3 h-3" /> Client-Side SSL Encryption Active
          [AES-256]
        </div>
      )}
    </div>
  );
}
