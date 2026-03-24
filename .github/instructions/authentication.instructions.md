---
description: This file provides detailed guidelines for implementing authentication using Clerk in the project.
---

# Authentication Guidelines

## Overview

**ALL authentication in this project is handled by Clerk. NO OTHER AUTH METHOD SHOULD BE USED.**

Clerk manages user identity, sign-in, sign-up, and session management. These guidelines ensure consistent and secure authentication across the application.

## Clerk Setup

### Environment Variables Required

```
CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

Never commit these keys - use `.env.local` for local development.

### Clerk App Router Integration

Clerk is integrated via `@clerk/nextjs` package. The integration handles:

- Authentication middleware
- Session management
- User context providers
- Built-in UI components

## Route Protection

### Protected Routes

**The `/dashboard` route is protected and requires authentication.**

Use the `auth()` function to check if a user is logged in:

```typescript
// app/dashboard/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = await auth();

  // Redirect unauthenticated users to home
  if (!userId) {
    redirect("/");
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {/* Dashboard content */}
    </div>
  );
}
```

### Public Routes

Public routes like the homepage don't require authentication but should redirect logged-in users to the dashboard.

```typescript
// app/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const { userId } = await auth();

  // Redirect authenticated users to dashboard
  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div>
      <h1>Welcome to Lik Shortener</h1>
      {/* Homepage content */}
    </div>
  );
}
```

## Sign In & Sign Up

### Modal Components

**Sign in and sign up always launch as modals.** Users should not navigate to separate pages.

Use Clerk's built-in components:

```typescript
"use client";

import { SignIn } from "@clerk/nextjs";

export const LoginModal = () => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <SignIn
          appearance={{
            elements: {
              rootBox: "w-full",
              cardBox: "shadow-lg rounded-lg",
            },
          }}
        />
      </div>
    </div>
  );
};
```

### Sign Up Modal

```typescript
"use client";

import { SignUp } from "@clerk/nextjs";

export const SignUpModal = () => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <SignUp
          appearance={{
            elements: {
              rootBox: "w-full",
              cardBox: "shadow-lg rounded-lg",
            },
          }}
        />
      </div>
    </div>
  );
};
```

### Trigger Authentication from Buttons

```typescript
"use client";

import { useState } from "react";
import { LoginModal } from "@/components/auth/LoginModal";
import { SignUpModal } from "@/components/auth/SignUpModal";

export const AuthButtons = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <>
      <button onClick={() => setShowLogin(true)}>Sign In</button>
      <button onClick={() => setShowSignUp(true)}>Sign Up</button>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showSignUp && <SignUpModal onClose={() => setShowSignUp(false)} />}
    </>
  );
};
```

## Client-Side Auth Checks

### Using useAuth Hook

For client components, use the `useAuth` hook to access authentication state:

```typescript
"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export const ProtectedComponent = () => {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();

  // Show loading state while Clerk initializes
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // Redirect if not authenticated
  if (!userId) {
    router.push("/");
    return null;
  }

  return <div>Protected content for {userId}</div>;
};
```

### Using useUser Hook

Access the current user's full profile:

```typescript
"use client";

import { useUser } from "@clerk/nextjs";

export const UserProfile = () => {
  const { isLoaded, user } = useUser();

  if (!isLoaded) return <div>Loading...</div>;
  if (!user) return <div>Not signed in</div>;

  return (
    <div>
      <h2>{user.firstName} {user.lastName}</h2>
      <p>{user.primaryEmailAddress?.emailAddress}</p>
    </div>
  );
};
```

## API Route Authentication

### Checking Auth in API Routes

Use `auth()` in API route handlers to verify authentication:

```typescript
// app/api/urls/route.ts
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { userId } = await auth();

  // Return 401 if not authenticated
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Fetch user-specific data
  const urls = await fetchUserUrls(userId);
  return NextResponse.json({ urls });
}

export async function POST(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const newUrl = await createUrl(userId, body);

  return NextResponse.json({ url: newUrl }, { status: 201 });
}
```

## User Identification

### Accessing User ID

Always use the `userId` from Clerk's `auth()` or hooks. Never use session tokens directly:

```typescript
// ✅ Good: Use userId for data association
const { userId } = await auth();
const userUrls = await db
  .select()
  .from(shortUrls)
  .where(eq(shortUrls.userId, userId));

// ❌ Bad: Don't parse tokens or use other auth methods
const token = request.headers.get('authorization');
// Don't do this - use Clerk's auth() instead
```

### Storing User References

When storing user data in the database, always associate it with `userId`:

```typescript
// db/schema.ts
import { pgTable, varchar, serial, timestamp } from 'drizzle-orm/pg-core';

export const shortUrls = pgTable('short_urls', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id').notNull(), // Always include userId
  slug: varchar('slug', { length: 50 }).unique().notNull(),
  originalUrl: varchar('original_url', { length: 2048 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
```

## User Management Features

### Sign Out

Users can sign out using Clerk's `useClerk` hook:

```typescript
"use client";

import { useClerk } from "@clerk/nextjs";

export const SignOutButton = () => {
  const { signOut } = useClerk();

  return (
    <button onClick={() => signOut({ redirectUrl: "/" })}>
      Sign Out
    </button>
  );
};
```

### User Profile Updates

Direct users to Clerk's user profile page for account management:

```typescript
"use client";

import { useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export const ManageAccount = () => {
  const { openUserProfile } = useClerk();

  return (
    <Button onClick={() => openUserProfile()}>
      Manage Account
    </Button>
  );
};
```

## Security Best Practices

### ✅ Do:

- Always check `userId` in protected routes and API endpoints
- Use `auth()` on the server side for sensitive operations
- Redirect unauthenticated users from protected pages
- Store `userId` with user-generated data
- Use environment variables for Clerk keys
- Log authentication errors for debugging

### ❌ Do NOT:

- Use any auth method other than Clerk
- Hardcode Clerk keys in code
- Trust client-side auth checks for sensitive operations
- Store user passwords or sensitive data
- Bypass authentication checks
- Expose Clerk keys to the frontend (except the publishable key)

## Middleware Configuration

Clerk provides middleware to protect routes automatically. This project uses **`proxy.ts`** (at the project root) as the middleware file. **Never use `middleware.ts`** — `proxy.ts` is the project standard.

```typescript
// proxy.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    // Check if user is authenticated
    auth().protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
```

## Common Patterns

### Protected Page Layout

```typescript
// app/dashboard/layout.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DashboardNav } from "@/components/dashboard/DashboardNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  return (
    <div className="dashboard-layout">
      <DashboardNav userId={userId} />
      <main>{children}</main>
    </div>
  );
}
```

### Conditional UI Based on Auth

```typescript
"use client";

import { useAuth } from "@clerk/nextjs";
import { LoginModal } from "@/components/auth/LoginModal";
import { useState } from "react";

export const CreateUrlButton = () => {
  const { userId } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  if (!userId) {
    return (
      <>
        <button onClick={() => setShowLogin(true)}>
          Create Short URL
        </button>
        {showLogin && <LoginModal />}
      </>
    );
  }

  return (
    <button onClick={() => navigateToDashboard()}>
      Create Short URL
    </button>
  );
};
```

## Environment Setup

### Development

```bash
# .env.local
CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### Production

- Set environment variables in your hosting platform (Vercel, etc.)
- Never expose `CLERK_SECRET_KEY` to the client
- Use the publishable key only on the frontend
