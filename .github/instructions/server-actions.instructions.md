---
description: Guidelines for implementing data mutations via server actions in this project.
---

# Server Actions Guidelines

All data mutations in this app must be done via **server actions**. Follow these rules strictly.

## 1. Server Actions Are Called from Client Components Only

Server actions must always be invoked from client components (`"use client"`). Never call server actions directly from server components.

## 2. File Naming and Colocation

- Server action files **must** be named `actions.ts`.
- The `actions.ts` file must be **colocated** in the same directory as the client component that calls it.

```
app/dashboard/
├── page.tsx          # server component
├── SomeForm.tsx      # client component ("use client")
└── actions.ts        # server actions called by SomeForm.tsx
```

## 3. TypeScript Types — No FormData

All data passed to server actions must have explicit TypeScript types. **Never use the `FormData` type** as a parameter.

```ts
// ✅ Correct
type CreateLinkInput = {
  url: string;
  slug: string;
};

export async function createLink(input: CreateLinkInput): Promise<{ success: boolean; error?: string }> { ... }

// ❌ Wrong
export async function createLink(formData: FormData) { ... }
```

## 4. Validate All Input with Zod

Every server action must validate its input using **Zod** before any database operation.

```ts
import { z } from "zod";

const createLinkSchema = z.object({
  url: z.string().url(),
  slug: z.string().min(1).max(50),
});

export async function createLink(input: CreateLinkInput): Promise<{ success: boolean; error?: string }> {
  const parsed = createLinkSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: "Invalid input" };
  // ...
}
```

## 5. Always Check for an Authenticated User First

Every server action must verify that a user is logged in (via Clerk) **before** performing any database operation.

```ts
import { auth } from "@clerk/nextjs/server";

export async function createLink(input: CreateLinkInput): Promise<{ success: boolean; error?: string }> {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };
  // proceed with validated input and database operations
}
```

## 6. Never Throw Errors — Return a Result Object

Server actions must **never** throw errors. Instead, always return a typed result object with a `success` property and an optional `error` message.

```ts
type ActionResult = { success: boolean; error?: string };

// ✅ Correct
export async function createLink(input: CreateLinkInput): Promise<ActionResult> {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  const parsed = createLinkSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: "Invalid input" };

  try {
    await insertLink({ ...parsed.data, userId });
    return { success: true };
  } catch {
    return { success: false, error: "Something went wrong" };
  }
}

// ❌ Wrong
export async function createLink(input: CreateLinkInput): Promise<void> {
  throw new Error("Unauthorized"); // never throw
}
```

## 7. Use Helper Functions from `/data` for Database Operations

Server actions must **not** use Drizzle queries directly. All database interactions must go through helper functions located in the `/data` directory.

```ts
// ✅ Correct
import { insertLink } from "@/data/links";

export async function createLink(input: CreateLinkInput): Promise<ActionResult> {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };
  const parsed = createLinkSchema.parse(input);
  await insertLink({ ...parsed, userId });
  return { success: true };
}

// ❌ Wrong — do not use Drizzle directly in server actions
import { db } from "@/db";
import { links } from "@/db/schema";
await db.insert(links).values({ ... });
```

## Summary Checklist

- [ ] Mutation logic lives in `actions.ts` colocated with the calling component
- [ ] Called only from `"use client"` components
- [ ] Input typed explicitly — no `FormData`
- [ ] Input validated with Zod
- [ ] Authenticated user verified first with `auth()` from Clerk
- [ ] Returns `{ success: boolean; error?: string }` — never throws errors
- [ ] Database operations delegated to `/data` helper functions
