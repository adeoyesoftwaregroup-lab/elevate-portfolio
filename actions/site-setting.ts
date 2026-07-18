"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// ======================================================
// Site Settings Validation Schema
// ======================================================
const SiteSettingPayloadSchema = z.object({
  siteTitle: z
    .string()
    .min(2, "Global website title must contain at least 2 characters.")
    .default("Elevate"),
  siteDescription: z
    .string()
    .min(
      5,
      "SEO site description statement parameter must be a robust breakdown.",
    ),
  heroTitle: z
    .string()
    .min(2, "Main landing canvas Hero Title text is required."),
  heroSubtitle: z
    .string()
    .min(5, "Main landing canvas Hero Subtitle text parameter is required."),
  email: z
    .string()
    .email("A valid communication contact email node address is required."),
  phone: z.string().nullable().optional().default(null),
  location: z.string().nullable().optional().default(null),
  githubUrl: z.string().nullable().optional().default(null),
  linkedinUrl: z.string().nullable().optional().default(null),
  twitterUrl: z.string().nullable().optional().default(null),
  whatsappUrl: z.string().nullable().optional().default(null),
  resumeUrl: z.string().nullable().optional().default(null),
});

// ======================================================
// 1. Get Current Active Site Settings
// ======================================================
export async function getSiteSettingsAction() {
  try {
    let settings = await db.siteSetting.findFirst();

    // If the administrative schema table is fresh/empty, seed an operational baseline node
    if (!settings) {
      settings = await db.siteSetting.create({
        data: {
          siteTitle: "Elevate",
          siteDescription:
            "Enterprise Infrastructure portfolio node system engine context framework.",
          heroTitle: "Systems Architect & Production Engineering Specialist",
          heroSubtitle:
            "Engineering high-throughput, microservice telemetry networks backed by automated pipelines.",
          email: "operations@localhost.local",
        },
      });
    }

    return {
      success: true,
      data: settings,
    };
  } catch (error) {
    console.error(
      "🚨 [SERVER] Failed to query global website configuration metadata:",
      error,
    );
    return {
      success: false,
      data: null,
      error:
        "Critical infrastructure exception during website telemetry configuration query.",
    };
  }
}

// ======================================================
// 2. Save / Upsert Global Site Settings (Singleton Mode)
// ======================================================
export async function saveSiteSettingsAction(rawPayload: unknown) {
  try {
    console.log(
      "📥 Incoming Site Settings configuration payload transaction:",
      rawPayload,
    );

    const validation = SiteSettingPayloadSchema.safeParse(rawPayload);
    if (!validation.success) {
      return {
        success: false,
        error: validation.error.issues
          .map((issue) => issue.message)
          .join(" | "),
      };
    }

    const data = validation.data;
    const currentSettings = await db.siteSetting.findFirst();

    let result;
    if (currentSettings) {
      result = await db.siteSetting.update({
        where: { id: currentSettings.id },
        data,
      });
    } else {
      result = await db.siteSetting.create({
        data,
      });
    }

    revalidatePath("/");
    revalidatePath("/admin/settings");
    revalidatePath("/settings");

    return { success: true, data: result };
  } catch (error: any) {
    console.error(
      "❌ Website Settings Schema Mutation Processing Dropped:",
      error,
    );
    return {
      success: false,
      error:
        error.message ||
        "Failed to finalize website telemetry adjustments into data layer.",
    };
  }
}

// ======================================================
// 3. Update Specific Field Parameter Configurations
// ======================================================
export async function updateSiteSettingsAction(rawPayload: unknown) {
  try {
    console.log("📥 Incoming Partial Update for Site Settings:", rawPayload);

    // .partial() unlocks modular micro-transactions (e.g. updating ONLY social URLs or contact strings)
    const validation = SiteSettingPayloadSchema.partial().safeParse(rawPayload);
    if (!validation.success) {
      return {
        success: false,
        error: validation.error.issues
          .map((issue) => issue.message)
          .join(" | "),
      };
    }

    const currentSettings = await db.siteSetting.findFirst();
    if (!currentSettings) {
      return {
        success: false,
        error:
          "Configuration instance non-existent. Run baseline initialization first.",
      };
    }

    const updatedSettings = await db.siteSetting.update({
      where: { id: currentSettings.id },
      data: validation.data,
    });

    revalidatePath("/");
    revalidatePath("/admin/settings");
    revalidatePath("/settings");

    return {
      success: true,
      data: updatedSettings,
    };
  } catch (error: any) {
    console.error("❌ Website Settings Field Patch Failed:", error);
    return {
      success: false,
      error: error.message || "Failed to update target parameter slots.",
    };
  }
}

// ======================================================
// 4. Delete Configuration (Hard Reset to Default Seeding)
// ======================================================
export async function deleteSiteSettingsAction() {
  try {
    // Locate the structural record model row
    const currentSettings = await db.siteSetting.findFirst();

    if (currentSettings) {
      await db.siteSetting.delete({
        where: { id: currentSettings.id },
      });
    }

    // Instantly execute a clean, standardized re-seed operation to ensure app doesn't crash
    const factoryResetSettings = await db.siteSetting.create({
      data: {
        siteTitle: "Elevate Default",
        siteDescription:
          "System configuration parameter rollback executed cleanly.",
        heroTitle: "Systems Engineering Ledger",
        heroSubtitle:
          "Infrastructure platform components compiled with active factory reset flags.",
        email: "fallback-admin@localhost.local",
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/settings");
    revalidatePath("/settings");

    return {
      success: true,
      message:
        "Configuration instance purged. Factory parameters restored successfully.",
      data: factoryResetSettings,
    };
  } catch (error: any) {
    console.error("❌ Website Settings Hard Factory Reset Terminated:", error);
    return {
      success: false,
      error: error.message || "Failed to execute table erasure procedures.",
    };
  }
}

// ======================================================
// 5. Useful Bonus Function: Get System Configuration Telemetry
// ======================================================
export async function getSiteSettingsDiagnosticsAction() {
  try {
    const [settingsCount, projectsCount, experiencesCount, skillsCount] =
      await db.$transaction([
        db.siteSetting.count(),
        db.project.count(),
        db.experience.count(),
        db.skill.count(),
      ]);

    return {
      success: true,
      diagnostics: {
        hasSettingsNode: settingsCount > 0,
        associatedProjects: projectsCount,
        associatedExperiences: experiencesCount,
        associatedSkills: skillsCount,
        databaseProviderHandshake: "Neon-Serverless // Postgres",
        lastTelemetryPing: new Date().toISOString(),
      },
    };
  } catch (error: any) {
    console.error("🚨 Telemetry diagnostic probe aborted:", error);
    return {
      success: false,
      error: "Failed to pull transaction inventory counts from data shards.",
    };
  }
}
