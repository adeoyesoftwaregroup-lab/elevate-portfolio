"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Container } from "../common/container";
import { TerminalInput } from "./terminal-input";
import { SecureSubmitBadge } from "./secure-submit-badge";
import { Mail, Terminal, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { submitContactMessageAction } from "@/actions/contact";

// Aligned 1:1 with your production Zod server schema rules
const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name identifier must contain at least 2 characters."),
  email: z
    .string()
    .email("A valid communication transmission email address is required."),
  subject: z
    .string()
    .min(
      3,
      "Subject specification parameter must contain at least 3 characters.",
    ),
  message: z
    .string()
    .min(
      10,
      "Inbound message content block must be a robust breakdown (min 10 chars).",
    ),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactSection() {
  const { toast } = useToast();
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Force strict flat type string serialization to clean payload parameters
      const sterilePayload = JSON.parse(
        JSON.stringify({
          name: String(data.name).trim(),
          email: String(data.email).trim(),
          subject: String(data.subject).trim(),
          message: String(data.message).trim(),
        }),
      );

      // Dispatch the payload over the network pipeline
      const response = await submitContactMessageAction(sterilePayload);

      if (response && response.success) {
        setSuccess(true);
        toast({
          title: "Transmission Clear",
          description:
            "Your typographic message packet was accepted by the server.",
        });

        // Hold success confirmation states before resetting fields
        setTimeout(() => {
          setSuccess(false);
          reset();
        }, 4000);
      } else {
        toast({
          variant: "destructive",
          title: "Pipeline Rejection",
          description:
            response?.error ||
            "The gateway cluster rejected the transmission tokens.",
        });
      }
    } catch (clientErr) {
      console.error("Transmission Thread Crash:", clientErr);
      toast({
        variant: "destructive",
        title: "Link Dropped",
        description:
          "An unhandled interface exception occurred during package transport.",
      });
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full py-28 bg-[#020202] overflow-hidden select-none"
    >
      <Container className="relative z-10 w-full max-w-3xl space-y-12">
        {/* Section Heading Group */}
        <div className="flex flex-col space-y-2 text-left md:text-center md:items-center">
          <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5" /> Direct Comms Pipeline
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white max-w-xl">
            Initialize Cryptographic Message Transfer.
          </h2>
        </div>

        {/* Master Console Interface Terminal Form block */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative w-full rounded-2xl border border-neutral-900 bg-[#07070a]/50 p-5 font-mono text-xs shadow-2xl backdrop-blur-xl subpixel-antialiased flex flex-col space-y-5"
        >
          {/* Upper spec reflection line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neutral-800/40 to-transparent" />

          {/* Window Control Header Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-neutral-900">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-neutral-800" />
              <span className="h-2.5 w-2.5 rounded-full bg-neutral-800" />
              <span className="h-2.5 w-2.5 rounded-full bg-neutral-800" />
            </div>
            <div className="flex items-center gap-1 text-[10px] text-neutral-500 font-bold uppercase tracking-wider">
              <Terminal className="w-3 h-3" /> secure-session.sh
            </div>
          </div>

          {/* FIXED CORE GRID: Both inputs are now explicitly mapped side-by-side without any empty blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <TerminalInput
              label="label for (Name)"
              commandPrompt="Visitor@name:~$"
              placeholder="John Doe"
              error={errors.name?.message}
              register={register("name")}
            />

            <TerminalInput
              label="Return Routing Path (Email)"
              commandPrompt="visitor@mail:~$"
              placeholder="e.g., john@company.com"
              error={errors.email?.message}
              register={register("email")}
            />
          </div>

          <TerminalInput
            label="Port Intent (Subject)"
            commandPrompt="visitor@sub:~$"
            placeholder="e.g., System Architecture Project Consultation"
            error={errors.subject?.message}
            register={register("subject")}
          />

          <TerminalInput
            label="Data Packet Payload"
            commandPrompt="visitor@msg:~$"
            placeholder="Write your message packet payload definitions here..."
            error={errors.message?.message}
            register={register("message")}
            isTextArea={true}
          />

          {/* Submission and Status Feedback Row Layout */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-neutral-900 w-full">
            <SecureSubmitBadge
              isSubmitting={isSubmitting}
              isSuccess={success}
            />

            <button
              type="submit"
              disabled={isSubmitting || success}
              className="flex h-9 items-center justify-center gap-2 rounded-lg bg-white px-4 text-xs font-bold text-black shadow transition-all hover:bg-neutral-100 disabled:opacity-40 disabled:pointer-events-none shrink-0 cursor-pointer pointer-events-auto"
            >
              <span>Transmit Stream</span> <Send className="w-3 h-3" />
            </button>
          </div>
        </form>
      </Container>
    </section>
  );
}
