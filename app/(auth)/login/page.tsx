"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Terminal,
  ShieldAlert,
  Loader2,
  KeyRound,
  Globe,
  Server,
  Cpu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"IDLE" | "PROCESSING">("IDLE");
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    "system: gate initialized. awaiting operator token allocation...",
  ]);

  const pushLog = (message: string) => {
    setConsoleLogs((prev) => [...prev, `> ${message}`]);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      pushLog(
        "error: identification parameters cannot parse empty structures.",
      );
      return;
    }

    setStatus("PROCESSING");
    pushLog(`initiating dynamic handshake protocol for: ${email}`);

    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (response?.error) {
        pushLog("error: dynamic access parameter verification rejected.");
        toast({
          variant: "destructive",
          title: "Access Parameter Mismatch",
          description:
            "The provided identification string or security key is invalid.",
        });
        setStatus("IDLE");
        return;
      }

      pushLog("session authenticated. parsing cluster redirect paths...");
      toast({
        title: "Handshake Verified",
        description: "Welcome back, Operator. Access to admin console granted.",
      });

      setTimeout(() => {
        router.push("/admin");
        router.refresh();
      }, 1000);
    } catch (err) {
      pushLog("error: internal verification matrix cluster drop.");
      setStatus("IDLE");
    }
  };

  return (
    <main className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-12 antialiased selection:bg-indigo-500/20">
      {/* 
        LEFT SIDE: HIGH-TIER LIGHT ENTERPRISE INTERACTION INTERFACE (7 Columns)
      */}
      <div className="lg:col-span-7 bg-white text-zinc-900 flex flex-col justify-between p-8 md:p-12 xl:p-16 relative">
        {/* Subtle top left identifier label */}
        <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400 tracking-wider">
          <Cpu className="w-3.5 h-3.5 text-indigo-500" />
          <span>// PORTFOLIO_KERNEL_PROD</span>
        </div>

        {/* Center operational form card wrapper (ANIMATION 1: Smooth Upward Fade Entrance) */}
        <div className="max-w-md w-full mx-auto my-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
          <div className="space-y-2">
            <h1 className="text-3xl font-black tracking-tight text-zinc-900">
              Identity Management
            </h1>
            <p className="text-zinc-500 text-sm font-light leading-relaxed">
              Provide your cryptographically initialized credentials to access
              the server infrastructure configurations dashboard.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-xs font-semibold text-zinc-700 tracking-wide"
              >
                Operator Email Address
              </Label>
              <Input
                id="email"
                type="email"
                required
                disabled={status === "PROCESSING"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@yourdomain.com"
                className="bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400 h-11 focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 transition-all rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-xs font-semibold text-zinc-700 tracking-wide"
                >
                  Passphrase Security Key
                </Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                disabled={status === "PROCESSING"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••••••"
                className="bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400 h-11 focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 transition-all rounded-lg"
              />
            </div>

            {/* Core Action Trigger */}
            <Button
              type="submit"
              disabled={status === "PROCESSING"}
              className="w-full h-11 bg-zinc-900 text-white hover:bg-zinc-800 transition-all font-medium text-sm rounded-lg shadow-sm shadow-zinc-950/10 flex items-center justify-center gap-2"
            >
              {status === "PROCESSING" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verifying Security Handshake...
                </>
              ) : (
                "Authenticate Account"
              )}
            </Button>
          </form>
        </div>

        {/* Access Warning compliance strings */}
        <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 justify-center lg:justify-start">
          <ShieldAlert className="w-3.5 h-3.5 text-zinc-300" />
          <span>
            Restricted administrative control environment access logs active.
          </span>
        </div>
      </div>

      {/* 
        RIGHT SIDE: DARK SYSTEM TELEMETRY DISPLAY PANEL (5 Columns)
      */}
      <div className="lg:col-span-5 bg-[#050508] border-l border-zinc-900 text-white hidden lg:flex flex-col justify-between p-12 relative overflow-hidden">
        {/* Decorative Grid Backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

        {/* ANIMATION 2: Breathing Ambient Background Color Glow Aura */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse duration-[4000ms]" />

        {/* Top Header Information Stack */}
        <div className="relative z-10 flex items-center justify-between text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-zinc-400 uppercase tracking-wider font-semibold">
              NEON_CLUSTER_READY
            </span>
          </div>
          <span>TLS 1.3 SECURE</span>
        </div>

        {/* Immersive Terminal Machine Framework Log Panel */}
        <div className="relative z-10 max-w-sm w-full mx-auto my-auto space-y-6">
          <div className="space-y-3 text-center lg:text-left">
            <div className="inline-flex p-3 rounded-xl bg-zinc-900 border border-white/5 text-indigo-400 shadow-xl shadow-black/40">
              <KeyRound className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold tracking-wider font-mono uppercase text-zinc-200">
              Handshake Terminal
            </h2>
          </div>

          {/* Secure Live Terminal Viewbox */}
          <div className="rounded-xl border border-white/5 bg-[#020204] overflow-hidden shadow-2xl relative">
            {/* ANIMATION 3: Vertical Matrix Cascading Scan Scanner Ray Layer */}
            <div
              className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent pointer-events-none animate-bounce top-0"
              style={{ animationDuration: "6000ms" }}
            />

            <div className="bg-zinc-950/80 px-4 py-2 border-b border-white/5 flex items-center justify-between text-[10px] font-mono text-zinc-600 font-bold">
              <span>auth_diagnostics.sh</span>
              <Terminal className="w-3 h-3 text-zinc-700" />
            </div>

            <div className="p-4 font-mono text-[10px] text-zinc-500 space-y-2 min-h-[120px] max-h-[160px] overflow-y-auto leading-normal bg-opacity-40">
              {consoleLogs.map((log, index) => (
                <p
                  key={index}
                  className={
                    log.includes("error")
                      ? "text-red-400 font-semibold"
                      : log.includes("authenticated")
                        ? "text-emerald-400 font-semibold"
                        : "text-zinc-500"
                  }
                >
                  {log}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Global Pipeline Footer Indicators */}
        <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-zinc-600">
          <span className="flex items-center gap-1.5">
            <Server className="w-3 h-3" /> NODE_LOC: ZA
          </span>
          <span className="flex items-center gap-1.5">
            <Globe className="w-3 h-3" /> CLOUD_EDGE: ON
          </span>
        </div>
      </div>
    </main>
  );
}
