"use client";

import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  label: string;
  commandPrompt: string;
  placeholder: string;
  error?: string;
  register: UseFormRegisterReturn;
  isTextArea?: boolean;
}

export function TerminalInput({
  label,
  commandPrompt,
  placeholder,
  error,
  register,
  isTextArea = false,
}: InputProps) {
  return (
    <div className="flex flex-col space-y-1.5 w-full font-mono text-xs select-none">
      {/* Structural Micro Data Labels */}
      <div className="flex justify-between items-center px-1">
        <span className="text-neutral-500 font-bold uppercase tracking-wider text-[10px]">
          {label}
        </span>
        {error && (
          <span className="text-rose-400 font-semibold tracking-wide text-[10px] animate-pulse">
            ! Error: {error}
          </span>
        )}
      </div>

      {/* Simulated Console Entry Input Line */}
      <div
        className={`flex items-start gap-2 w-full p-2.5 rounded-lg border bg-neutral-950/60 transition-all duration-300 ${error ? "border-rose-900/60 focus-within:border-rose-500" : "border-neutral-900 focus-within:border-neutral-700"}`}
      >
        <span className="text-indigo-400 font-bold shrink-0">
          {commandPrompt}
        </span>

        {isTextArea ? (
          <textarea
            {...register}
            placeholder={placeholder}
            rows={3}
            className="w-full bg-transparent text-neutral-200 outline-none placeholder-neutral-700 font-medium tracking-wide leading-relaxed resize-none pointer-events-auto"
          />
        ) : (
          <input
            {...register}
            type="text"
            placeholder={placeholder}
            className="w-full bg-transparent text-neutral-200 outline-none placeholder-neutral-700 font-medium tracking-wide pointer-events-auto"
          />
        )}
      </div>
    </div>
  );
}
