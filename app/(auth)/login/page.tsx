"use client";

import React, { useState, useEffect, useRef } from "react";
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
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"IDLE" | "PROCESSING">("IDLE");
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    "system: cluster gate operational. awaiting operator handshake...",
    "network: security baseline policy enforced. tls_1.3 active.",
  ]);

  // Automatically scroll terminal logs to the bottom as events compile
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [consoleLogs]);

  const pushLog = (message: string) => {
    setConsoleLogs((prev) => [...prev, `> ${message}`]);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      pushLog("error: authentication token request parse error (null fields).");
      return;
    }

    setStatus("PROCESSING");
    pushLog(`initiating dynamic authorization pipeline: ${email}`);

    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (response?.error) {
        pushLog("error: cluster gateway handshake verification rejected.");
        toast({
          variant: "destructive",
          title: "Access Parameter Mismatch",
          description:
            "The provided identification string or security key is invalid.",
        });
        setStatus("IDLE");
        return;
      }

      pushLog(
        "session verified successfully. parsing dynamic redirect matrices...",
      );
      toast({
        title: "Handshake Verified",
        description: "Welcome back, Operator. Access to admin console granted.",
      });

      setTimeout(() => {
        router.push("/admin");
        router.refresh();
      }, 1000);
    } catch (err) {
      pushLog("critical: global verification cluster infrastructure drop.");
      setStatus("IDLE");
    }
  };

  return (
    <main className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-12 antialiased selection:bg-indigo-500/20 bg-white">
      {/* 
        LEFT SIDE: HIGH-TIER ENTERPRISE MANAGEMENT INTERFACE (7 Columns)
      */}
      <div className="lg:col-span-7 text-zinc-900 flex flex-col justify-between p-8 md:p-12 xl:p-16 relative bg-white">
        {/* Subtle engineering line background decoration */}
        <div className="absolute top-0 right-0 w-px h-full bg-zinc-100 hidden lg:block" />

        {/* Top Header Label */}
        <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400 tracking-wider">
          <Cpu className="w-3.5 h-3.5 text-indigo-500" />
          <span>// CORE_IDENTITY_GATEWAY_v2.4</span>
        </div>

        {/* Interactive Center Access Card Wrapper */}
        <div className="max-w-md w-full mx-auto my-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
          <div className="space-y-2.5">
            <h1 className="text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">
              Identity Management
            </h1>
            <p className="text-zinc-500 text-sm font-light leading-relaxed">
              Provide your cryptographically initialized credentials to access
              the internal server infrastructure dashboards.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            {/* Operator Email Field */}
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
                className="bg-zinc-50/70 border-zinc-200 text-zinc-900 placeholder:text-zinc-400/80 h-11 focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 transition-all rounded-lg"
              />
            </div>

            {/* Passphrase Input Field Wrapper with Toggle Eye */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-xs font-semibold text-zinc-700 tracking-wide"
                >
                  Passphrase Security Key
                </Label>
              </div>
              <div className="relative flex items-center">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  disabled={status === "PROCESSING"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••••••"
                  className="bg-zinc-50/70 border-zinc-200 text-zinc-900 placeholder:text-zinc-400/80 h-11 pr-11 focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 transition-all rounded-lg w-full"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={status === "PROCESSING"}
                  className="absolute right-3 p-1 rounded text-zinc-400 hover:text-zinc-600 focus:outline-none focus:text-indigo-500 transition-colors disabled:opacity-30"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 stroke-[2]" />
                  ) : (
                    <Eye className="w-4 h-4 stroke-[2]" />
                  )}
                </button>
              </div>
            </div>

            {/* Core Action Trigger Button */}
            <Button
              type="submit"
              disabled={status === "PROCESSING"}
              className="w-full h-11 bg-zinc-950 text-white hover:bg-zinc-800 active:scale-[0.99] transition-all font-medium text-sm rounded-lg shadow-sm shadow-zinc-950/15 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
            >
              {status === "PROCESSING" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                  Verifying Security Handshake...
                </>
              ) : (
                "Authenticate Account"
              )}
            </Button>
          </form>
        </div>

        {/* Footer Security Compliance Warning */}
        <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 justify-center lg:justify-start pt-6 border-t border-zinc-50 mt-8 lg:mt-0">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-500/80" />
          <span>
            Restricted environment. Unauthorized access connection
            configurations logged.
          </span>
        </div>
      </div>

      {/* 
        RIGHT SIDE: DARK SYSTEM TELEMETRY MONITORING DISPLAY PANEL (5 Columns)
      */}
      <div className="lg:col-span-5 bg-[#030305] text-white hidden lg:flex flex-col justify-between p-12 relative overflow-hidden">
        {/* Subtle Tech Grid Infrastructure Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Pulse Glowing Aura Accent */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[5000ms]" />

        {/* Telemetry Status Bar */}
        <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
            <span className="text-zinc-400 uppercase tracking-widest font-semibold">
              NEON_CLUSTER_UP
            </span>
          </div>
          <span className="bg-zinc-900 px-2 py-0.5 rounded border border-white/5 text-zinc-400">
            TLS 1.3 SECURE
          </span>
        </div>

        {/* Live Visual Telemetry Monitor Terminal Panel */}
        <div className="relative z-10 max-w-sm w-full mx-auto my-auto space-y-6">
          <div className="space-y-3">
            <div className="inline-flex p-3 rounded-xl bg-zinc-900/80 border border-white/5 text-indigo-400 shadow-2xl shadow-black/60 backdrop-blur-md">
              <KeyRound className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white font-sans">
              Real-time Access Telemetry
            </h2>
            <p className="text-zinc-400 text-xs font-light leading-relaxed font-sans">
              Monitor active interface processes, execution states, and routing
              handshakes straight from our telemetry array nodes.
            </p>
          </div>

          {/* Scrolling Shell Window Container */}
          <div className="w-full h-44 rounded-xl border border-zinc-800/60 bg-black/60 p-4 font-mono text-[11px] text-zinc-400 shadow-inner backdrop-blur-xl flex flex-col justify-between">
            <div className="w-full overflow-y-auto pr-1 space-y-1.5 max-h-[110px] scrollbar-thin scrollbar-thumb-zinc-800">
              {consoleLogs.map((log, idx) => (
                <div
                  key={idx}
                  className={`leading-normal break-all transition-all duration-300 ${
                    log.includes("error")
                      ? "text-rose-400 font-semibold"
                      : log.includes("successfully") || log.includes("Verified")
                        ? "text-emerald-400 font-semibold"
                        : "text-zinc-400"
                  }`}
                >
                  {log}
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>

            {/* Micro Stats Row Footnote */}
            <div className="flex items-center justify-between border-t border-zinc-900 pt-2 text-[10px] text-zinc-600 font-semibold tracking-wider uppercase">
              <div className="flex items-center gap-1.5">
                <Server className="w-3 h-3 text-zinc-500" />
                <span>Node: US-EAST</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="w-3 h-3 text-zinc-500" />
                <span>99.98% SLA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Minimalist Lower Environment Indicator */}
        <div className="relative z-10 flex items-center gap-1 text-[11px] font-mono text-zinc-500 uppercase tracking-widest justify-center lg:justify-start">
          <Terminal className="w-3.5 h-3.5" />
          <span>Secure Matrix Session</span>
        </div>
      </div>
    </main>
  );
}
