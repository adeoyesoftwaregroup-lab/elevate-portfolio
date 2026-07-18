"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// ======================================================
// Skill Validation Schema
// ======================================================
const SkillPayloadSchema = z.object({
  name: z.string().min(1, "Skill name identifier is required."),
  year: z.preprocess(
    (val) =>
      val === "" || val === null || val === undefined ? null : Number(val),
    // FIXED: Changed .integer() to .int() to align with strict Zod specifications
    z
      .number()
      .int()
      .min(1900, "Invalid year timeline format.")
      .nullable()
      .default(null),
  ),
  metric: z
    .string()
    .min(1, "Performance metric parameter specification is required."),
  desc: z.string().min(5, "A descriptive breakdown log statement is required."),
  categoryId: z
    .string()
    .min(1, "Parent skill category relational foreign key is required."),
});

// ======================================================
// Get All Skills (Includes Parent Category Metadata)
// ======================================================
export async function getAllSkillsAction() {
  try {
    const skills = await db.skill.findMany({
      include: {
        category: true, // Eagerly loads relational parent context metrics
      },
      orderBy: [
        {
          name: "asc",
        },
      ],
    });

    return {
      success: true,
      data: skills,
    };
  } catch (error) {
    console.error("🚨 [SERVER] Failed to query skills data stream:", error);
    return {
      success: false,
      data: [],
      error: "Critical database exception thrown inside the skills query loop.",
    };
  }
}

// ======================================================
// Get Skill By ID
// ======================================================
export async function getSkillByIdAction(id: string) {
  try {
    if (!id) throw new Error("Unique targeting index parameter is null.");

    const skill = await db.skill.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!skill) {
      return {
        success: false,
        error: "Target engineering skill node could not be resolved.",
      };
    }

    return {
      success: true,
      data: skill,
    };
  } catch (error: any) {
    console.error(`🚨 [SERVER] Skill node lookup failure for ID ${id}:`, error);
    return {
      success: false,
      error: error.message || "Failed to locate structural node entry.",
    };
  }
}

// ======================================================
// Create Skill Asset Node
// ======================================================
export async function createSkillAction(rawPayload: unknown) {
  try {
    console.log("📥 Incoming Skill asset registration payload:", rawPayload);

    const validation = SkillPayloadSchema.safeParse(rawPayload);

    if (!validation.success) {
      return {
        success: false,
        error: validation.error.issues
          .map((issue) => issue.message)
          .join(" | "),
      };
    }

    const data = validation.data;

    // Verify parent foreign key category block exists before writing child nodes
    const parentCategoryExists = await db.skillCategory.findUnique({
      where: { id: data.categoryId },
    });

    if (!parentCategoryExists) {
      return {
        success: false,
        error:
          "Relational payload mapping failed. Declared categoryId does not exist.",
      };
    }

    const newSkill = await db.skill.create({
      data: {
        name: data.name,
        year: data.year,
        metric: data.metric,
        desc: data.desc,
        categoryId: data.categoryId,
      },
    });

    // Cascade clear Next.js route caches across the ecosystem
    revalidatePath("/");
    revalidatePath("/skills");
    revalidatePath("/admin/skills");
    revalidatePath("/skill-category");
    revalidatePath("/admin/skill-category");

    return {
      success: true,
      data: newSkill,
    };
  } catch (error: any) {
    console.error("❌ Skill Asset Node Insertion Handshake Failed:", error);
    return {
      success: false,
      error: error.message || "Failed to commit skill configuration row entry.",
    };
  }
}

// ======================================================
// Update Skill Asset Node
// ======================================================
export async function updateSkillAction(id: string, rawPayload: unknown) {
  try {
    console.log(
      `📥 Incoming Mutation Dispatch for Skill Node ${id}:`,
      rawPayload,
    );

    const validation = SkillPayloadSchema.partial().safeParse(rawPayload);

    if (!validation.success) {
      return {
        success: false,
        error: validation.error.issues
          .map((issue) => issue.message)
          .join(" | "),
      };
    }

    const data = validation.data;

    // Verify target category allocation if the foreign key node is explicitly modified
    if (data.categoryId) {
      const parentCategoryExists = await db.skillCategory.findUnique({
        where: { id: data.categoryId },
      });
      if (!parentCategoryExists) {
        return {
          success: false,
          error:
            "Relational mapping aborted. Updated categoryId does not exist.",
        };
      }
    }

    const updatedSkill = await db.skill.update({
      where: { id },
      data,
    });

    revalidatePath("/");
    revalidatePath("/skills");
    revalidatePath("/admin/skills");
    revalidatePath("/skill-category");
    revalidatePath("/admin/skill-category");

    return {
      success: true,
      data: updatedSkill,
    };
  } catch (error: any) {
    console.error(
      `❌ Skill Mutation Processing Dropped on target node ${id}:`,
      error,
    );
    return {
      success: false,
      error:
        error.message ||
        "Failed to save updated adjustments layout to database layer.",
    };
  }
}

// ======================================================
// Delete Skill Asset Node
// ======================================================
export async function deleteSkillAction(id: string) {
  try {
    if (!id) throw new Error("Unique targeting index parameter is null.");

    await db.skill.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/skills");
    revalidatePath("/admin/skills");
    revalidatePath("/skill-category");
    revalidatePath("/admin/skill-category");

    return {
      success: true,
      message:
        "Skill node parameter entry detached successfully from database shards.",
    };
  } catch (error: any) {
    console.error(
      `❌ Skill Record Destruction Chain Dropped on target node ${id}:`,
      error,
    );
    return {
      success: false,
      error: error.message || "Failed to drop database node entry record.",
    };
  }
}
