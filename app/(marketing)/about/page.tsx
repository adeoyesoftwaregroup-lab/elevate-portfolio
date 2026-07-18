import { IdentityHero } from "@/components/sections/about/identity-hero";
import { ContactSection } from "@/components/contact/contact-section";

export default function AboutPage() {
  return (
    <main className="relative w-full min-h-screen bg-[#020202] text-white overflow-x-hidden antialiased subpixel-antialiased selection:bg-indigo-500/30 selection:text-white">
      {/* 
        LAYER 1: BIOMETRIC IDENTITY HERO OVERVIEW
        Award-winning modular interface projecting enterprise-scale systems mastery.
      */}

      <IdentityHero />
      {/* Subsequent database-connected components will cascade right here */}

      {/* 
        LAYER 6: COMMAND-LINE ENCRYPTED COMMUNICATION INPUT TERMINAL
      */}
      <ContactSection />
    </main>
  );
}
