"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// ======================================================
// Contact Ingestion Validation Schema
// ======================================================
const ContactPayloadSchema = z.object({
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

// ======================================================
// 1. Submit Contact Message (Public Ingestion Route)
// ======================================================
export async function submitContactMessageAction(rawPayload: unknown) {
  try {
    console.log("📥 Incoming Inbound Public Contact Message:", rawPayload);

    const validation = ContactPayloadSchema.safeParse(rawPayload);
    if (!validation.success) {
      return {
        success: false,
        error: validation.error.issues
          .map((issue) => issue.message)
          .join(" | "),
      };
    }

    const data = validation.data;

    const newMessage = await db.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        isRead: false, // Explicitly initialised as unread inside active queues
      },
    });

    // Invalidate dashboard panels securely to bump the indicator increments instantly
    revalidatePath("/admin/contacts");
    revalidatePath("/admin");

    return {
      success: true,
      message: "Message payload intercepted and logged into structural memory.",
      data: newMessage,
    };
  } catch (error: any) {
    console.error("❌ Public Contact Message Ingestion Failed:", error);
    return {
      success: false,
      error:
        error.message || "Failed to transmit message node block into Neon.",
    };
  }
}

// ======================================================
// 2. Get All Contact Messages (Administrative Interface Queue)
// ======================================================
export async function getAllContactMessagesAction() {
  try {
    const messages = await db.contactMessage.findMany({
      orderBy: [
        {
          isRead: "asc", // Unread telemetry floats to the top of the command desk queue
        },
        {
          createdAt: "desc", // Newest inbound items sort down sequentially
        },
      ],
    });

    return {
      success: true,
      data: messages,
    };
  } catch (error) {
    console.error(
      "🚨 [SERVER] Failed to query contact messages stack array:",
      error,
    );
    return {
      success: false,
      data: [],
      error:
        "Critical infrastructure exception during messages retrieval loop.",
    };
  }
}

// ======================================================
// 3. Toggle Message Read Status Telemetry (Read / Unread)
// ======================================================
export async function toggleMessageReadStatusAction(
  id: string,
  currentStatus: boolean,
) {
  try {
    if (!id)
      throw new Error(
        "Unique messaging targeting node index parameter is null.",
      );

    const updatedMessage = await db.contactMessage.update({
      where: { id },
      data: {
        isRead: !currentStatus,
      },
    });

    revalidatePath("/admin/contacts");
    revalidatePath("/admin");

    return {
      success: true,
      data: updatedMessage,
    };
  } catch (error: any) {
    console.error(
      `❌ Message Read Status Switch Terminated on ID ${id}:`,
      error,
    );
    return {
      success: false,
      error: error.message || "Failed to patch read status variable.",
    };
  }
}

// ======================================================
// 4. Delete Specific Message Node Block
// ======================================================
export async function deleteContactMessageAction(id: string) {
  try {
    if (!id) throw new Error("Unique targeting index parameter is null.");

    await db.contactMessage.delete({
      where: { id },
    });

    revalidatePath("/admin/contacts");
    revalidatePath("/admin");

    return {
      success: true,
      message:
        "Message data block purged permanently from active database shards.",
    };
  } catch (error: any) {
    console.error(
      `❌ Message Record Destruction Chain Dropped on target node ${id}:`,
      error,
    );
    return {
      success: false,
      error: error.message || "Failed to drop database record row entry.",
    };
  }
}

// ======================================================
// 5. Batch Mark All Messages as Read (Optimization Macro)
// ======================================================
export async function markAllMessagesAsReadAction() {
  try {
    const transaction = await db.contactMessage.updateMany({
      where: { isRead: false },
      data: { isRead: true },
    });

    revalidatePath("/admin/contacts");
    revalidatePath("/admin");

    return {
      success: true,
      message: `Successfully processed mutation updates across ${transaction.count} messaging nodes.`,
    };
  } catch (error: any) {
    console.error("❌ Batch Read State Macro Transmission Halted:", error);
    return {
      success: false,
      error:
        error.message || "Failed to execute batch update transaction block.",
    };
  }
}
