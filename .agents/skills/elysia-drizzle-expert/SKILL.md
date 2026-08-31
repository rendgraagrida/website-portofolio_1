---
name: elysia-drizzle-expert
description: Guidelines for building robust REST APIs with Elysia.js and Drizzle ORM on Bun.
---
# Elysia & Drizzle Expert

Use this skill when building or refactoring the backend API.

## Principles:
1. **Validation First**: Always use `t` from Elysia (TypeBox) to validate `body`, `query`, and `params`.
2. **Type Safety**: Leverage Drizzle's inferred types. Do not use `any`.
3. **Performance**: Avoid unnecessary awaits or large data transformations inside the route handler; let the DB do the work via Drizzle.
4. **Error Handling**: Use standardized try-catch blocks that return `{ success: false, message: string, error?: any }` with appropriate status codes (using `set.status`).
5. **Testing**: Companion routes must be tested with `bun test`.
