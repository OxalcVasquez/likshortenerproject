# LLM Agent Instructions for Lik Shortener Project

This file defines coding standards and best practices for all AI agents and LLMs contributing to the **Lik Shortener** project. These instructions ensure consistent code quality, maintainability, and project integrity.

## ⚠️ CRITICAL RULE: ALWAYS READ /docs BEFORE WRITING CODE

**This is non-negotiable.** Before generating ANY code, you MUST read the relevant documentation files from the `/docs` directory. These documents define exact specifications, patterns, and standards for your implementation. Failure to read them will result in code that doesn't match project standards.

## Project Overview

**Lik Shortener** is a modern URL shortening service built with:
- **Frontend**: React 19 + Next.js 16 (App Router)
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (Neon) with Drizzle ORM
- **Styling**: Tailwind CSS + shadcn/ui
- **Authentication**: Clerk
- **Language**: TypeScript (strict mode)
- **Code Quality**: ESLint + TypeScript strict checks

## Quick Links to Documentation

All coding standards are documented in the `/docs` directory.

**🔴 MANDATORY: ALWAYS refer to the relevant .md file BEFORE generating any code.** No exceptions. No shortcuts. Read first, code second.

| Document | Purpose |
|----------|---------|
| [Authentication Guidelines](docs/authentication-guidelines.md) | Clerk setup, route protection, sign in/up modals |
| [shadcn/ui Guidelines](docs/shadcn-ui-guidelines.md) | Component usage, best practices, integration patterns |
| [Code Style](docs/code-style.md) | Formatting, naming, imports, comments |
| [TypeScript Guidelines](docs/typescript-guidelines.md) | Type system, generics, null handling |
| [React Component Guidelines](docs/react-component-guidelines.md) | Components, hooks, patterns, performance |
| [Database Conventions](docs/database-conventions.md) | Drizzle ORM, schema, queries, migrations |
| [File Structure](docs/file-structure.md) | Directory organization, module structure |
| [Testing & Quality](docs/testing-and-quality.md) | Testing practices, code review, linting |
| [API Design](docs/api-design.md) | Route structure, validation, error handling |

## Core Principles

### 1. **Type Safety First**
- Enable TypeScript strict mode to catch errors at compile time
- Always provide explicit type annotations for function parameters and returns
- Avoid `any` type entirely - use `unknown` when type is truly unknown
- Use type guards to narrow types safely

### 2. **Code Quality Over Speed**
- All code must pass `npm run lint` with zero errors
- Invalid TypeScript will not be merged
- Comments should explain "why" not "what"
- Prioritize readability and maintainability

### 3. **Consistency Matters**
- Follow the established naming conventions (PascalCase components, camelCase utilities)
- Maintain consistent code style across the codebase
- Use the configured path aliases (`@/*`) in all imports
- Keep directory structure organized and logical

### 4. **Security & Validation**
- Always validate user input on the backend
- Use Zod or similar for runtime validation of API requests
- Never hardcode secrets - use environment variables
- Protect sensitive operations with authentication checks

### 5. **Performance Conscious**
- Minimize unnecessary re-renders in React components
- Use memoization (`memo`, `useMemo`, `useCallback`) appropriately
- Optimize database queries - select only needed columns
- Add indexes to frequently queried database columns

## Essential Commands

```bash
# Development
npm run dev          # Start dev server (http://localhost:3000)

# Quality Assurance
npm run lint         # Run ESLint - MUST PASS before committing

# Building
npm run build        # Production build
npm start            # Run production build locally

# Database
drizzle-kit generate # Generate migrations
drizzle-kit push     # Apply migrations to database
```

## Before You Write Code

### ⚠️ STEP 0 (MANDATORY): READ THE RELEVANT /docs FILE FIRST
Before doing ANYTHING else, identify which `/docs` file is relevant to your task:
- Working with authentication? Read [Authentication Guidelines](docs/authentication-guidelines.md)
- Creating UI components? Read [shadcn/ui Guidelines](docs/shadcn-ui-guidelines.md)

**Do not skip this step.** Read the entire relevant documentation file(s) before writing a single line of code.

### Then proceed with:
1. **Understand the project structure** - see [File Structure](docs/file-structure.md)
2. **Check existing patterns** - follow established conventions in the codebase
3. **Plan database changes** - schema modifications require migrations

## Before You Commit Code

- [ ] Run `npm run lint` - must pass with zero errors
- [ ] All TypeScript errors resolved
- [ ] No `console.log()` statements (except error logging)
- [ ] No hardcoded secrets or API keys
- [ ] No unused imports or variables
- [ ] Component props have full TypeScript types
- [ ] Database operations use proper error handling
- [ ] API endpoints handle all error cases
- [ ] Comments explain complex logic

## Key Standards By Topic

### Authentication & Authorization
- **All authentication MUST use Clerk** - no other auth methods allowed
- `/dashboard` and sensitive routes require authentication checks
- Logged-in users on homepage should redirect to `/dashboard`
- Sign in/sign up always launch as modals, never as separate pages
- Always use `userId` from Clerk context for data association
- Server-side protected routes use `auth()` function from `@clerk/nextjs/server`
- Client-side auth checks use `useAuth()` or `useUser()` hooks
- **Clerk middleware lives in `proxy.ts` at the project root** — NEVER create or use `middleware.ts`
- See: [Authentication Guidelines](docs/authentication-guidelines.md)

### TypeScript
- Strict mode enabled - all strict checks active
- Explicit return types required on all functions
- No implicit `any` types
- Type inference for complex generics
- See: [TypeScript Guidelines](docs/typescript-guidelines.md)

### React Components
- Functional components only (no class components)
- Hooks for all state management
- Proper dependency arrays for effects
- Memoization for performance-critical components
- Semantic HTML with accessibility
- See: [React Component Guidelines](docs/react-component-guidelines.md)

### User Interface (shadcn/ui)
- **ALL UI elements use shadcn/ui** - no custom components allowed
- Always import from `@/components/ui`
- Combine shadcn components for features
- Use Tailwind CSS classes to customize appearance
- Components include accessibility out-of-the-box
- See: [shadcn/ui Guidelines](docs/shadcn-ui-guidelines.md)

### Database (Drizzle ORM)
- Schema defined in `db/schema.ts`
- Client initialized in `db/index.ts`
- All queries use proper error handling
- Transactions for related operations
- Type inference from schema
- See: [Database Conventions](docs/database-conventions.md)

### API Routes
- Consistent error response format
- Input validation with Zod
- Proper HTTP status codes
- Authentication checks where needed
- CORS headers if required
- See: [API Design](docs/api-design.md)

### Code Style
- 2-space indentation
- Double quotes for strings
- Trailing commas in multi-line objects
- No semicolon omission
- See: [Code Style](docs/code-style.md)

## File Organization

```
source/
├── app/              # Next.js App Router pages
├── components/       # Reusable React components
├── db/               # Database schema and client
├── lib/              # Utilities and helpers
├── public/           # Static assets
└── docs/             # Project documentation (this folder)
```

See [File Structure](docs/file-structure.md) for detailed directory organization.

## Testing Standards

- Unit tests for utility functions
- Component tests for UI interactions
- Async code tested with proper promise handling
- Edge cases covered
- No skipped tests (no `.skip`, `.only`)

See [Testing & Quality](docs/testing-and-quality.md) for detailed guidelines.

## Common Pitfalls to Avoid

### ❌ Do NOT:
- **START CODING WITHOUT READING THE RELEVANT /docs FILE** ← Most critical mistake
- Create or rename files to `middleware.ts` — **always use `proxy.ts`** for Clerk middleware
- Use `any` type
- Use array index as React key prop
- Call hooks conditionally
- Commit code that fails linting
- Use relative paths - use `@/*` aliases
- Leave console.log() statements
- Forget to handle errors in async code
- Skip TypeScript type checking
- Use hardcoded secrets
- Use auth methods other than Clerk
- Trust client-side auth checks for sensitive operations
- Forget to validate `userId` in API routes
- Create custom UI components - use shadcn/ui always

### ✅ Do:
- Use explicit types everywhere
- Validate all user input
- Handle all error cases
- Write self-documenting code
- Use path aliases for imports
- Structure components logically
- Keep components focused and small
- Test edge cases
- Document complex logic
- Verify authentication with `auth()` on the server
- Associate all user data with `userId`
- Redirect authenticated users away from login page
- Use shadcn/ui components for all UI elements

## Getting Help

When contributing to this project:

1. Check the relevant `/docs` file first
2. Review existing similar code in the codebase
3. Run `npm run lint` to catch issues early
4. Ensure all TypeScript errors are resolved
5. Follow the established patterns and conventions

## Project Dependencies

### Key Versions
- Next.js 16.1.6
- React 19.2.3
- TypeScript 5
- Drizzle ORM 0.45.1
- Tailwind CSS 4
- Clerk (Auth)

See `package.json` for full dependency list.

## Environment Variables

Required environment variables (add to `.env.local`):
- `CLERK_SECRET_KEY` - Clerk authentication secret
- `DATABASE_URL` - Neon PostgreSQL connection string
- Other API secrets - never commit to repository

## Common Tasks

### Protecting a Route with Authentication
1. Use `auth()` from `@clerk/nextjs/server` on server components
2. Check `userId` is present, redirect if not
3. Implement user data filtering by userId in database queries
4. Handle both server-side and client-side auth checks

See [Authentication Guidelines](docs/authentication-guidelines.md)

### Adding Sign In/Sign Up Modals
1. Create modal component using Clerk's `<SignIn />` or `<SignUp />` component
2. Manage modal state in parent component
3. Import from `@clerk/nextjs`
4. Always use modal pattern (never separate pages for auth)

See [Authentication Guidelines](docs/authentication-guidelines.md)

### Adding a New Component
1. Create file in `components/` following naming convention
2. Define TypeScript interface for props
3. Export as named export
4. Import and use with path alias

See [React Component Guidelines](docs/react-component-guidelines.md)

### Adding a New API Route
1. Create `app/api/route-name/route.ts`
2. Define request/response types with Zod
3. Implement proper error handling
4. Return consistent error responses

See [API Design](docs/api-design.md)

### Database Schema Changes
1. Modify `db/schema.ts`
2. Run `drizzle-kit generate` to create migration
3. Review generated migration SQL
4. Run `drizzle-kit push` to apply

See [Database Conventions](docs/database-conventions.md)

### Adding a New Utility Function
1. Create in `lib/` with camelCase name
2. Export from file
3. Add JSDoc comment explaining purpose
4. Write unit tests
5. Import with `@/lib/` path alias

See [File Structure](docs/file-structure.md)

## Linting & Code Quality

**The project uses ESLint with Next.js and TypeScript configurations.**

### DOCUMENTATION FIRST, THEN LINTING
1. **Read the relevant `/docs` file** - this is your foundation
2. **Write code following those specifications**
3. **Then run linting** to catch remaining issues

Before any contribution:
```bash
npm run lint
```

This must pass with **zero errors**. Common issues:
- Unused variables/imports (will fail)
- Missing React hook dependencies (will fail)
- Type errors (will fail)
- Implicit `any` types (will fail)

Fix linting issues by following the error messages and referencing the relevant documentation.

## Code Review Checklist

When reviewing or submitting code:

- [ ] Passes `npm run lint`
- [ ] All TypeScript errors resolved
- [ ] Follows naming conventions
- [ ] Props have TypeScript types
- [ ] Comments explain complex logic
- [ ] Error handling implemented
- [ ] No hardcoded secrets
- [ ] Database queries are efficient
- [ ] No console.log() left behind
- [ ] Follows established patterns

## Questions or Clarifications?

When in doubt:
1. Check the relevant `/docs` file
2. Look for similar code in the codebase
3. Follow the established patterns
4. Run the linter to catch issues
5. Ensure TypeScript strict mode passes

---

**Last Updated**: March 2024  
**Project**: Lik Shortener  
**Technology Stack**: Next.js 16, React 19, TypeScript, Drizzle ORM, Tailwind CSS, Clerk
