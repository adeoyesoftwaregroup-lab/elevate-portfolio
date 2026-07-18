"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// ======================================================
// Experience Validation Schema
// ======================================================
const ExperiencePayloadSchema = z.object({
  role: z.string().min(2, "Role structural definition is required."),
  company: z.string().min(2, "Company entity designation required."),
  location: z.string().min(2, "Geographical infrastructure location required."),
  // FIX: Move the error object parameter inside the top-level z.date() initialization wrapper
  // FIX: Replace required_error with invalid_type_error
  // FIX: Pass custom messages directly into the 'message' parameter configuration key
  startDate: z.preprocess(
    (arg) =>
      typeof arg === "string" || arg instanceof Date ? new Date(arg) : arg,
    z.date({ message: "Target baseline execution start date is required." }),
  ),
  endDate: z.preprocess(
    (arg) =>
      arg === "" || arg === null || arg === undefined
        ? null
        : new Date(arg as string | Date),
    z.date().nullable().default(null),
  ),
  techStack: z
    .array(z.string())
    .min(
      1,
      "At least one framework array token must be declared for evaluation.",
    ),
  milestones: z
    .array(z.string())
    .min(
      1,
      "At least one historical operational milestone metric bullet is required.",
    ),
  orderIndex: z.number().default(0),
  impactMetricLabel1: z.string().nullable().optional().default(null),
  impactMetricValue1: z.string().nullable().optional().default(null),
  impactMetricLabel2: z.string().nullable().optional().default(null),
  impactMetricValue2: z.string().nullable().optional().default(null),
});

// ======================================================
// Get All Experiences (Sorted by Order Index & Timeline)
// ======================================================
export async function getAllExperiencesAction() {
  try {
    const experiences = await db.experience.findMany({
      orderBy: [
        {
          orderIndex: "asc",
        },
        {
          startDate: "desc",
        },
      ],
    });

    return {
      success: true,
      data: experiences,
    };
  } catch (error) {
    console.error(
      "🚨 [SERVER] Failed to query experiences array stack:",
      error,
    );
    return {
      success: false,
      data: [],
      error: "Critical infrastructure exception during matrix retrieval loop.",
    };
  }
}

// ======================================================
// Get Experience By ID
// ======================================================
export async function getExperienceByIdAction(id: string) {
  try {
    if (!id) throw new Error("Unique index key identifier missing.");

    const experience = await db.experience.findUnique({
      where: { id },
    });

    if (!experience) {
      return {
        success: false,
        error: "Target career historical node could not be resolved.",
      };
    }

    return {
      success: true,
      data: experience,
    };
  } catch (error: any) {
    console.error(
      `🚨 [SERVER] Experience node lookup failed for ID ${id}:`,
      error,
    );
    return {
      success: false,
      error: error.message || "Failed to locate structural node entry.",
    };
  }
}

// ======================================================
// Create Experience Node
// ======================================================
export async function createExperienceAction(rawPayload: unknown) {
  try {
    console.log("📥 Incoming Experience Data payload:", rawPayload);

    const validation = ExperiencePayloadSchema.safeParse(rawPayload);

    if (!validation.success) {
      return {
        success: false,
        error: validation.error.issues
          .map((issue) => issue.message)
          .join(" | "),
      };
    }

    const data = validation.data;

    const newExperience = await db.experience.create({
      data: {
        role: data.role,
        company: data.company,
        location: data.location,
        startDate: data.startDate,
        endDate: data.endDate,
        techStack: data.techStack,
        milestones: data.milestones,
        orderIndex: data.orderIndex,
        impactMetricLabel1: data.impactMetricLabel1,
        impactMetricValue1: data.impactMetricValue1,
        impactMetricLabel2: data.impactMetricLabel2,
        impactMetricValue2: data.impactMetricValue2,
      },
    });

    // Revalidate public interfaces and admin dashboard panels
    revalidatePath("/");
    revalidatePath("/experience");
    revalidatePath("/admin/experience");

    return {
      success: true,
      data: newExperience,
    };
  } catch (error: any) {
    console.error("❌ Experience Entry Insertion Handshake Failed:", error);
    return {
      success: false,
      error:
        error.message ||
        "Failed to commit experience transaction node into Neon.",
    };
  }
}

// ======================================================
// Update Experience Node (Supports Form Edits & Index Reordering)
// ======================================================
export async function updateExperienceAction(id: string, rawPayload: unknown) {
  try {
    console.log(
      `📥 Incoming Mutation Dispatch for Experience Node ${id}:`,
      rawPayload,
    );

    const validation = ExperiencePayloadSchema.partial().safeParse(rawPayload);

    if (!validation.success) {
      return {
        success: false,
        error: validation.error.issues
          .map((issue) => issue.message)
          .join(" | "),
      };
    }

    const updatedExperience = await db.experience.update({
      where: { id },
      data: validation.data,
    });

    revalidatePath("/");
    revalidatePath("/experience");
    revalidatePath("/admin/experience");

    return {
      success: true,
      data: updatedExperience,
    };
  } catch (error: any) {
    console.error(
      `❌ Experience Mutation Processing Dropped on target node ${id}:`,
      error,
    );
    return {
      success: false,
      error:
        error.message ||
        "Failed to commit updated adjustments layout to database layer.",
    };
  }
}

// ======================================================
// Delete Experience Node
// ======================================================
export async function deleteExperienceAction(id: string) {
  try {
    if (!id) throw new Error("Unique targeting index parameter is null.");

    await db.experience.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/experience");
    revalidatePath("/admin/experience");

    return {
      success: true,
      message:
        "Career pipeline record purged successfully from historical tables.",
    };
  } catch (error: any) {
    console.error(
      `❌ Experience Record Destruction Chain Dropped on target node ${id}:`,
      error,
    );
    return {
      success: false,
      error: error.message || "Failed to terminate database data block record.",
    };
  }
}

// ======================================================
// Batch Reorder Experiences (Bonus Optimization Function)
// ======================================================
export async function reorderExperiencesAction(
  updates: { id: string; orderIndex: number }[],
) {
  try {
    await db.$transaction(
      updates.map((update) =>
        db.experience.update({
          where: { id: update.id },
          data: { orderIndex: update.orderIndex },
        }),
      ),
    );

    revalidatePath("/");
    revalidatePath("/experience");
    revalidatePath("/admin/experience");

    return {
      success: true,
      message: "Positional matrix structure synchronized cleanly.",
    };
  } catch (error: any) {
    console.error("❌ Batch Position Realignment Pipeline Interrupted:", error);
    return {
      success: false,
      error: error.message || "Failed to finalize new sequence index mappings.",
    };
  }
}
