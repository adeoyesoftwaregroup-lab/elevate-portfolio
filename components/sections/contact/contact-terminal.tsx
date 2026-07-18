"use client";

import React, { useState } from "react";
import {
  Terminal,
  Shield,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

export function ContactTerminal() {
  const [formData, setFormData] = useState({
    sender: "",
    email: "",
    subject: "",
    payload: "",
  });

  const [status, setStatus] = useState<
    "IDLE" | "PROCESSING" | "SUCCESS" | "ERROR"
  >("IDLE");
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    "system: ready to receive incoming transmission data...",
  ]);

  const pushLog = (message: string) => {
    setConsoleLogs((prev) => [...prev, `> ${message}`]);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.sender || !formData.email || !formData.payload) {
      pushLog(
        "error: critical validation failure. missing required operational parameters.",
      );
      setStatus("ERROR");
      return;
    }

    setStatus("PROCESSING");
    pushLog(`initiating packet handshake for: ${formData.email}`);
    pushLog("compiling form payloads via client runtime validation tools...");

    try {
      // Simulated secure server action or endpoint submission delay
      await new Promise((resolve) => setTimeout(resolve, 1800));

      pushLog(
        "database handshake verified. payload injected into secure relational stream.",
      );
      pushLog("transmission package status: 200 OK. signal clear.");
      setStatus("SUCCESS");
      setFormData({ sender: "", email: "", subject: "", payload: "" });
    } catch (err) {
      pushLog(
        "error: pipeline connection dropped. database layer unreachable.",
      );
      setStatus("ERROR");
    }
  };

  return (
    <section className="relative w-full pt-32 pb-24 px-6 md:px-12 xl:px-24 border-b border-white/5 bg-[#020203]">
      {/* Visual Tech Grid Mesh Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        {/* LEFT COLUMN: COMMUNICATION GATEWAY INTEL (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <span className="text-[11px] font-mono tracking-[0.3em] text-indigo-400 uppercase font-semibold block">
              // ENCRYPTED DIRECT ROUTING ENDPOINT
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
              Signal Uplink
            </h2>
          </div>

          <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-light max-w-md">
            Have an enterprise framework that needs restructuring, a mobile
            application looking for a clean architecture roadmap, or a global
            software system requiring scaling? Ping my direct connection array.
          </p>

          <div className="space-y-4 pt-4 font-mono text-xs text-zinc-500">
            <div className="p-4 bg-zinc-900/30 rounded-lg border border-white/5 space-y-1">
              <span className="block text-[10px] text-zinc-600 uppercase">
                // PRIMARY INSTANT RELAY
              </span>
              <a
                href="mailto:your.email@domain.com"
                className="text-zinc-300 hover:text-indigo-400 transition-colors text-sm break-all font-semibold"
              >
                your.email@domain.com
              </a>
            </div>

            <div className="p-4 bg-zinc-900/30 rounded-lg border border-white/5 space-y-1">
              <span className="block text-[10px] text-zinc-600 uppercase">
                // NETWORK RESPONSE WINDOW
              </span>
              <span className="text-zinc-300 block text-sm font-semibold">
                &lt; 12 Hours Across All Timezones
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: COLD SECURE COMMAND TERMINAL FORM (7 Cols) */}
        <div className="lg:col-span-7 w-full">
          <div className="relative rounded-xl border border-white/10 bg-[#050508] overflow-hidden shadow-2xl shadow-indigo-950/20">
            {/* Terminal Window Chrome Headers */}
            <div className="bg-zinc-950 px-4 py-3 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
                <span className="text-[10px] font-mono text-zinc-500 ml-2 tracking-wider">
                  sh secure_uplink.sh
                </span>
              </div>
              <Shield className="w-3.5 h-3.5 text-indigo-500/60" />
            </div>

            {/* Terminal Messaging Body */}
            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block font-mono text-[10px] uppercase text-zinc-500 font-semibold">
                    // IDENTIFIER / NAME
                  </label>
                  <input
                    type="text"
                    name="sender"
                    value={formData.sender}
                    onChange={handleInputChange}
                    placeholder="e.g. John Doe"
                    disabled={status === "PROCESSING"}
                    className="w-full bg-zinc-950 border border-white/5 rounded-lg px-3.5 py-2.5 font-mono text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-indigo-500/40 disabled:opacity-50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-mono text-[10px] uppercase text-zinc-500 font-semibold">
                    // ROUTING LINK / EMAIL
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@company.com"
                    disabled={status === "PROCESSING"}
                    className="w-full bg-zinc-950 border border-white/5 rounded-lg px-3.5 py-2.5 font-mono text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-indigo-500/40 disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block font-mono text-[10px] uppercase text-zinc-500 font-semibold">
                  // PORT INTENT / SUBJECT
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="System Infrastructure Project Consultation"
                  disabled={status === "PROCESSING"}
                  className="w-full bg-zinc-950 border border-white/5 rounded-lg px-3.5 py-2.5 font-mono text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-indigo-500/40 disabled:opacity-50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-mono text-[10px] uppercase text-zinc-500 font-semibold">
                  // TRANSMISSION TEXT PAYLOAD
                </label>
                <textarea
                  rows={4}
                  name="payload"
                  value={formData.payload}
                  onChange={handleInputChange}
                  placeholder="Enter architectural requirements or project context protocols here..."
                  disabled={status === "PROCESSING"}
                  className="w-full bg-zinc-950 border border-white/5 rounded-lg p-3.5 font-mono text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-indigo-500/40 resize-none disabled:opacity-50"
                />
              </div>

              {/* Live Terminal Output Console Block */}
              <div className="bg-zinc-950 rounded-lg border border-white/5 p-3 font-mono text-[10px] text-zinc-500 space-y-1 max-h-[85px] overflow-y-auto">
                {consoleLogs.map((log, index) => (
                  <p
                    key={index}
                    className={
                      log.includes("error")
                        ? "text-red-400"
                        : log.includes("200")
                          ? "text-emerald-400"
                          : "text-zinc-500"
                    }
                  >
                    {log}
                  </p>
                ))}
              </div>

              {/* Action Trigger Buttons */}
              <button
                type="submit"
                disabled={status === "PROCESSING"}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-mono text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/20 active:bg-indigo-500/30 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-indigo-950/30"
              >
                {status === "PROCESSING" ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    TRANSMITTING_PACKETS...
                  </>
                ) : status === "SUCCESS" ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    TRANSMISSION_SUCCESSFUL
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    EXECUTE_SEND_PROTOCOL
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
