import { ContactTerminal } from "@/components/sections/contact/contact-terminal";

export default function ContactPage() {
  return (
    <main className="relative w-full min-h-screen bg-[#020202] text-white overflow-x-hidden antialiased subpixel-antialiased selection:bg-indigo-500/30 selection:text-white">
      {/* 
        LAYER 1: ENCRYPTED COMMAND-LINE MESSAGE INPUT TERMINAL
        Direct, high-fidelity system linkage bypasses complex form wrappers.
      */}
      <ContactTerminal />

      {/* 
        LAYER 2: PREMIUM FINALISATION BASE SYSTEM TRACK
        Closes out page layout configurations seamlessly.
      */}
    </main>
  );
}
