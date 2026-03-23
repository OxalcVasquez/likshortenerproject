"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { shortUrls } from "@/db/schema";
import { and, eq } from "drizzle-orm";

type CreateLinkInput = {
  url: string;
  slug: string;
};

type ActionResult = { success: boolean; error?: string };

const createLinkSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(50, "Slug must be 50 characters or less")
    .regex(/^[a-z0-9-]+$/, "Slug may only contain lowercase letters, numbers, and hyphens"),
});

export async function createLink(input: CreateLinkInput): Promise<ActionResult> {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  const parsed = createLinkSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    await db.insert(shortUrls).values({
      userId,
      slug: parsed.data.slug,
      originalUrl: parsed.data.url,
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "";
    if (message.includes("unique") || message.includes("duplicate")) {
      return { success: false, error: "That slug is already taken. Please choose another." };
    }
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

type UpdateLinkInput = {
  id: number;
  url: string;
  slug: string;
};

const updateLinkSchema = z.object({
  id: z.number().int().positive(),
  url: z.string().url("Please enter a valid URL"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(50, "Slug must be 50 characters or less")
    .regex(/^[a-z0-9-]+$/, "Slug may only contain lowercase letters, numbers, and hyphens"),
});

export async function updateLink(input: UpdateLinkInput): Promise<ActionResult> {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  const parsed = updateLinkSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    const result = await db
      .update(shortUrls)
      .set({ slug: parsed.data.slug, originalUrl: parsed.data.url })
      .where(and(eq(shortUrls.id, parsed.data.id), eq(shortUrls.userId, userId)));

    if (result.rowCount === 0) {
      return { success: false, error: "Link not found." };
    }

    revalidatePath("/dashboard");
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "";
    if (message.includes("unique") || message.includes("duplicate")) {
      return { success: false, error: "That slug is already taken. Please choose another." };
    }
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

type DeleteLinkInput = {
  id: number;
};

const deleteLinkSchema = z.object({
  id: z.number().int().positive(),
});

export async function deleteLink(input: DeleteLinkInput): Promise<ActionResult> {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  const parsed = deleteLinkSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    await db
      .delete(shortUrls)
      .where(and(eq(shortUrls.id, parsed.data.id), eq(shortUrls.userId, userId)));

    revalidatePath("/dashboard");
    return { success: true };
  } catch {
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
