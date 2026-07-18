"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// ======================================================
// Project Validation Schema
// ======================================================

const ProjectPayloadSchema = z.object({
  title: z.string().min(3, "Title must contain at least 3 characters."),
  category: z.string().min(2, "Category specification is required."),
  description: z
    .string()
    .min(5, "System description must be a robust breakdown."),
  metric: z.string().min(1, "Performance metric parameter is required."),
  stack: z
    .array(z.string())
    .min(1, "At least one framework token must be declared."),
  type: z.string().min(1, "Deployment type classification required."),
  size: z.string().default("lg:col-span-6"),
  iconName: z.string().default("Cpu"),
  accent: z.string().default("border-indigo-500/30 text-indigo-400"),
  imageSrc: z.string().min(1, "Project image is required."),
  liveUrl: z.string().default("#"),
  repoUrl: z.string().default("#"),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  sortOrder: z.number().default(0),
});

// ======================================================
// Get All Projects
// ======================================================

export async function getAllProjectsAction() {
  try {
    const projects = await db.project.findMany({
      orderBy: [
        {
          sortOrder: "asc",
        },
        {
          createdAt: "desc",
        },
      ],
    });

    return {
      success: true,
      data: projects,
    };
  } catch (error) {
    console.error("🚨 Failed to fetch projects:", error);

    return {
      success: false,
      data: [],
      error: "Failed to load projects.",
    };
  }
}

// ======================================================
// Create Project
// ======================================================

export async function createProjectAction(rawPayload: unknown) {
  try {
    console.log("📥 Incoming Project:", rawPayload);

    const validation = ProjectPayloadSchema.safeParse(rawPayload);

    if (!validation.success) {
      return {
        success: false,
        error: validation.error.issues
          .map((issue) => issue.message)
          .join(" | "),
      };
    }

    const data = validation.data;

    // Generate slug automatically
    const slug = data.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    const newProject = await db.project.create({
      data: {
        title: data.title,
        slug,
        category: data.category,
        description: data.description,
        metric: data.metric,
        stack: data.stack,
        type: data.type,
        size: data.size,
        iconName: data.iconName,
        accent: data.accent,
        imageSrc: data.imageSrc,
        liveUrl: data.liveUrl,
        repoUrl: data.repoUrl,
        featured: data.featured,
        published: data.published,
        sortOrder: data.sortOrder,
      },
    });

    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath("/admin/projects");

    return {
      success: true,
      data: newProject,
    };
  } catch (error: any) {
    console.error("❌ Project Creation Failed:", error);

    if (error.code === "P2002") {
      return {
        success: false,
        error:
          "A project with the same title already exists. Please choose another title.",
      };
    }

    return {
      success: false,
      error: error.message || "Failed to create project.",
    };
  }
}

// ======================================================
// Delete Project
// ======================================================

export async function deleteProjectAction(id: string) {
  try {
    await db.project.delete({
      where: {
        id,
      },
    });

    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath("/admin/projects");

    return {
      success: true,
      message: "Project deleted successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: "Failed to delete project.",
    };
  }
}

// ======================================================
// Update Project
// ======================================================

export async function updateProjectAction(id: string, rawPayload: unknown) {
  try {
    console.log(`📥 Incoming Update for Project ${id}:`, rawPayload);

    // .partial() makes all validation properties optional for partial updates (like publishing toggle)
    const validation = ProjectPayloadSchema.partial().safeParse(rawPayload);

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

    // Regenerate slug dynamically if the title changes during edit
    if (data.title) {
      updateData.slug = data.title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
    }

    const updatedProject = await db.project.update({
      where: {
        id,
      },
      data: updateData,
    });

    // Flush cache targets to ensure immediate interface sync
    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath("/admin/projects");

    return {
      success: true,
      data: updatedProject,
    };
  } catch (error: any) {
    console.error("❌ Project Update Failed:", error);

    if (error.code === "P2002") {
      return {
        success: false,
        error: "A project with this updated title already exists.",
      };
    }

    return {
      success: false,
      error: error.message || "Failed to update project data structure.",
    };
  }
}
