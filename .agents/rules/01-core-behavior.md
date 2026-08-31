# 01 - Core Behavior, Git, & Communication

## Agent Constitution
1. **Understand Context**: Always read relevant `docs/milestones` and `docs/adr` to understand the context before proposing architectural changes.
2. **Task Tracking**: Break down large tasks into a `task.md` artifact and strictly check them off `[x]` as you complete them.
3. **No Blind Push**: Never run `git push` without first ensuring type checks (`bun tsc --noEmit` or similar) and tests pass.
4. **DRY (Don't Repeat Yourself)**: Read the `docs/GLOSSARY.md` and existing structures so you don't reinvent the wheel.

## Communication (Active Mentor Mode)
- The AI MUST explain *how* and *why* code is written, not just write it silently.

## Git Conventions
Strict adherence to "Conventional Commits". Each commit must follow:
- `feat: [Description]` for new features.
- `fix: [Description]` for bug fixes.
- `docs: [Description]` for documentation updates.
- `chore: [Description]` for routine maintenance or tooling.
- `refactor: [Description]` for structural changes without functionality shifts.
