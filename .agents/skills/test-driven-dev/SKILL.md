---
name: test-driven-dev
description: Rules for enforcing test-driven development (TDD) across the stack.
---
# Test-Driven Development Champion

Use this skill whenever adding new functionality or modifying existing logic.

## Rules:
1. **Frontend Unit Tests**: Any new React component must have a corresponding test in `src/components/__tests__/`. Use `vitest` and `@testing-library/react`. 
2. **Backend Tests**: Any new route in Elysia must be tested using `bun test`. Ensure you test both success (200/201) and failure (400/422/500) cases.
3. **No Mocks unless necessary**: Prefer testing the real Elysia instance over mocking internal functions. Use `vi.useFakeTimers()` in Vitest only for UI animations or intervals.
