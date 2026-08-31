# 03 - Backend, Systems, & Infrastructure

## Architecture & Integration
1. **Bun & Elysia**: Backend must use Bun.
2. **Thin Router, Fat Controller**: Keep route definitions clean; offload logic to controllers/services.
3. **End-to-End Type Safety**: Frontend integration MUST use Elysia Eden to ensure type safety between client and server.

## API Standards
1. **TypeBox Validation**: All inputs (body, query, params) must be validated with Elysia `t` (TypeBox).
2. **Uniform Responses**: DO NOT return raw arrays or plain strings. All endpoints MUST return a standard JSON structure:
   `{ success: boolean, data: any, error?: string | null }`

## Database (Drizzle ORM)
1. **Migration Safety**: DO NOT blindly use `drizzle-kit push` in production. Always secure data before modifying table schemas.

## Performance & Security
1. **Astro Image Optimization**: Use Astro's built-in `<Image />` component (not standard `<img>`) for WebP compression.
2. **Lazy Loading**: React components below the fold MUST use `client:visible` to optimize hydration.
3. **No Secrets in Frontend**: NEVER expose backend `.env` variables to the frontend.

## Testing & QA
1. **Test Framework**: Use `bun:test` for all Unit and Integration tests.
2. **Test Planning**: Do not create a separate QA folder. All test plans and edge-cases MUST be written into the `implementation_plan.md` before coding begins.
