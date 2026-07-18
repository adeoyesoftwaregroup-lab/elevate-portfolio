"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// ======================================================
// Skill Category Validation Schema
// ======================================================
const SkillCategoryPayloadSchema = z.object({
  title: z
    .string()
    .min(2, "Category structural title must contain at least 2 characters."),
  iconName: z.string().default("Server"),
  colorClass: z.string().default("text-indigo-400"),
  bgGlow: z.string().default("from-indigo-500/10"),
  orderIndex: z.number().default(0),
});

// ======================================================
// Get All Skill Categories (Includes Counts of Child Skills)
// ======================================================
export async function getAllSkillCategoriesAction() {
  try {
    const categories = await db.skillCategory.findMany({
      include: {
        skills: true, // Pull attached child skills context layout if required
      },
      orderBy: [
        {
          orderIndex: "asc",
        },
        {
          createdAt: "desc",
        },
      ],
    });

    return {
      success: true,
      data: categories,
    };
  } catch (error) {
    console.error("🚨 [SERVER] Failed to query skill categories stack:", error);
    return {
      success: false,
      data: [],
      error: "Critical infrastructure exception during category query loop.",
    };
  }
}

// ======================================================
// Get Skill Category By ID
// ======================================================
export async function getSkillCategoryByIdAction(id: string) {
  try {
    if (!id) throw new Error("Unique targeting index parameter is null.");

    const category = await db.skillCategory.findUnique({
      where: { id },
      include: { skills: true },
    });

    if (!category) {
      return {
        success: false,
        error: "Target skill category node could not be resolved.",
      };
    }

    return {
      success: true,
      data: category,
    };
  } catch (error: any) {
    console.error(
      `🚨 [SERVER] Category node lookup failed for ID ${id}:`,
      error,
    );
    return {
      success: false,
      error: error.message || "Failed to locate structural node entry.",
    };
  }
}

// ======================================================
// Create Skill Category
// ======================================================
export async function createSkillCategoryAction(rawPayload: unknown) {
  try {
    console.log("📥 Incoming Skill Category payload:", rawPayload);

    const validation = SkillCategoryPayloadSchema.safeParse(rawPayload);

    if (!validation.success) {
      return {
        success: false,
        error: validation.error.issues
          .map((issue) => issue.message)
          .join(" | "),
      };
    }

    const data = validation.data;

    // Generate unique slug automatically from structural title string
    const slug = data.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    const newCategory = await db.skillCategory.create({
      data: {
        title: data.title,
        slug,
        iconName: data.iconName,
        colorClass: data.colorClass,
        bgGlow: data.bgGlow,
        orderIndex: data.orderIndex,
      },
    });

    // Flush cache keys across all consumer touchpoints instantly
    revalidatePath("/");
    revalidatePath("/skill-category");
    revalidatePath("/admin/skill-category");

    return {
      success: true,
      data: newCategory,
    };
  } catch (error: any) {
    console.error("❌ Skill Category Creation Drop:", error);

    if (error.code === "P2002") {
      return {
        success: false,
        error:
          "A skill category matching this computed slug identifier already exists.",
      };
    }

    return {
      success: false,
      error: error.message || "Failed to write skill category node block.",
    };
  }
}

// ======================================================
// Update Skill Category
// ======================================================
export async function updateSkillCategoryAction(
  id: string,
  rawPayload: unknown,
) {
  try {
    console.log(
      `📥 Incoming Mutation Dispatch for Category Node ${id}:`,
      rawPayload,
    );

    // .partial() permits lightweight field-level changes such as single index positioning re-ranks
    const validation =
      SkillCategoryPayloadSchema.partial().safeParse(rawPayload);

    if (!validation.success) {
      return {
        success: false,
        error: validation.error.issues
          .map((issue) => issue.message)
          .join(" | "),
      };
    }

    const data = validation.data;
    const updateData: Record<string, any> = { ...data };

    // Regenerate slug context if title is explicitly altered during execution
    if (data.title) {
      updateData.slug = data.title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
    }

    const updatedCategory = await db.skillCategory.update({
      where: { id },
      data: updateData,
    });

    revalidatePath("/");
    revalidatePath("/skill-category");
    revalidatePath("/admin/skill-category");

    return {
      success: true,
      data: updatedCategory,
    };
  } catch (error: any) {
    console.error(
      `❌ Category Mutation Processing Dropped on node ${id}:`,
      error,
    );

    if (error.code === "P2002") {
      return {
        success: false,
        error:
          "Modification blocked. Resulting slug matches another active structural node.",
      };
    }

    return {
      success: false,
      error:
        error.message ||
        "Failed to commit updated configurations to data layer.",
    };
  }
}

// ======================================================
// Delete Skill Category
// ======================================================
export async function deleteSkillCategoryAction(id: string) {
  try {
    if (!id) throw new Error("Unique targeting index parameter is null.");

    await db.skillCategory.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/skill-category");
    revalidatePath("/admin/skill-category");

    return {
      success: true,
      message:
        "Skill category node successfully unmounted from database records.",
    };
  } catch (error: any) {
    console.error(
      `❌ Category Destruction Chain Dropped on node ${id}:`,
      error,
    );
    return {
      success: false,
      error: error.message || "Failed to purge database data block record.",
    };
  }
}

// ======================================================
// Batch Reorder Skill Categories
// ======================================================
export async function reorderSkillCategoriesAction(
  updates: { id: string; orderIndex: number }[],
) {
  try {
    await db.$transaction(
      updates.map((update) =>
        db.skillCategory.update({
          where: { id: update.id },
          data: { orderIndex: update.orderIndex },
        }),
      ),
    );

    revalidatePath("/");
    revalidatePath("/skill-category");
    revalidatePath("/admin/skill-category");

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
